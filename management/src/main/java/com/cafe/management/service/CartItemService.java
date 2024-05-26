package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.Product;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.ProductSize;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.CartItemRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.management.RuntimeErrorException;
import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    public CartItem addCartItem(CartItem cartItem, Long userId) throws NameNotFoundException {

        // Find user
        Optional<User> user = userService.findById(userId);

        if (!user.isPresent()) {
            throw new IllegalArgumentException("User not found!");
        }

        if (user.get().getRole() != Role.CUSTOMER) {
            throw new IllegalArgumentException("User is not customer!");
        }

        // Find cart corresponding to user id
        Optional<Cart> activeCart = cartService.getActiveCartByUserId(user.get().getId());

        if (!activeCart.isPresent()) {
            throw new IllegalArgumentException("Cart is not found!");
        }

        if (cartItem.getProduct() == null) {
            throw new IllegalArgumentException("Request does not contain product");
        }

        Product p = productService.getProductById(cartItem.getProduct().getId());
        if (p == null) {
            throw new IllegalArgumentException("Corresponding product not found!");
        }
        if (p.getPredictedStock() < cartItem.getAmount()) {
            throw new IllegalArgumentException("Not enough stock!");
        }

        Optional<CartItem> products = getCartItemByCartIdAndProductId(activeCart.get().getId(), p.getId(),
                cartItem.getSize());

        // update existing cart item
        if (products.isPresent()) {
            // update the amount
            if (p.getPredictedStock() >= products.get().getAmount() + cartItem.getAmount()) {
                products.get().setAmount(products.get().getAmount() + cartItem.getAmount());

                CartItem c = cartItemRepository.save(products.get());
                activeCart.get().setTotalPrice(cartService.calculateTotalPrice(activeCart.get()));
                cartService.addCart(activeCart.get());
                return c;
            } else {

                throw new NameNotFoundException("Not enough stock!");
            }

        }

        // Set the new cart item
        CartItem newCartItem = new CartItem();
        newCartItem.setAmount(cartItem.getAmount());
        newCartItem.setCart(activeCart.get());
        newCartItem.setProduct(p);
        newCartItem.setSize(cartItem.getSize());

        CartItem c = cartItemRepository.save(newCartItem);

        activeCart.get().setTotalPrice(cartService.calculateTotalPrice(activeCart.get()));
        cartService.addCart(activeCart.get());

        return c;
    }

    public Optional<CartItem> getCartItemByCartIdAndProductId(Long cartId, Long productId, ProductSize size) {
        return cartItemRepository.getCartItemByCartIdAndProductId(cartId, productId, size);

    }

    public CartItem updateCartItem(CartItem cartItem) {
        Optional<CartItem> item = cartItemRepository.findById(cartItem.getId());
        if (item.isEmpty()) {
            throw new IllegalArgumentException("Cart item is not found");
        }

        if (cartItem.getProduct() == null) {
            throw new IllegalArgumentException("product is not found");
        }
        Optional<Cart> cart = cartService.getActiveCartByUserId(cartItem.getCart().getUser().getId());

        if (!cart.isPresent()) {
            throw new IllegalArgumentException("user is not found");
        }

        // check if predicted stock is available
        if (item.get().getProduct().getPredictedStock() > cartItem.getAmount()) {
            item.get().setAmount(cartItem.getAmount());
            item.get().setSize(cartItem.getSize());
            CartItem saved = cartItemRepository.save(item.get());

            // recalculate total price of cart
            Double totalPrice = cartService.calculateTotalPrice(cart.get());
            cart.get().setTotalPrice(totalPrice);
            cartService.addCart(cart.get());

            mergeDuplicateCartItems(saved);
            return saved;
        }

        throw new IllegalArgumentException("not enough stock to update cartItem");

    }

    public void deleteCartItemById(Long cartItemId) {

        CartItem cartItem = cartItemRepository.findById(cartItemId).get();
        cartItemRepository.deleteById(cartItemId);

        Cart c = cartService.getCartById(cartItem.getCart().getId());
        c.setTotalPrice(cartService.calculateTotalPrice(c));
        cartService.addCart(c);

    }

    public void mergeDuplicateCartItems(CartItem cartItem) {

        List<CartItem> duplicates = cartItemRepository.getAllDuplicateCartItemsByProductAndCartId(
                cartItem.getCart().getId(), cartItem.getProduct().getId(), cartItem.getSize());

        // Check if duplicates exists
        if (duplicates.size() <= 1) {
            return;
        }

        int amount = 0;

        for (CartItem dup : duplicates) {
            amount += dup.getAmount();
        }

        // Delete second one
        cartItemRepository.deleteById(duplicates.get(1).getId());

        // Update first one
        duplicates.get(0).setAmount(amount);
        cartItemRepository.save(duplicates.get(0));
    }

}
