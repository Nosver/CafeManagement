package com.cafe.management.repository;

import com.cafe.management.model.CartItem;
import com.cafe.management.model.enums.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    @Query("select c from CartItem c WHERE c.cart.id =:cartId AND c.product.id =:productId AND c.size =:size")
    public Optional<CartItem> getCartItemByCartIdAndProductId(@Param("cartId")  Long cartId, @Param("productId") Long productId, @Param("size") ProductSize size);

    @Query("select c from CartItem c WHERE c.cart.id =:cartId AND c.product.id =:productId AND c.size =:size")
    public List<CartItem> getAllDuplicateCartItemsByProductAndCartId(@Param("cartId")  Long cartId, @Param("productId") Long productId, @Param("size") ProductSize size);
}
