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

    @Query(value = """
        WITH ranked_products AS (
            SELECT 
                p.id, 
                p.name, 
                SUM(ci.amount) AS total_sales,
                ROW_NUMBER() OVER (ORDER BY SUM(ci.amount) DESC) AS sales_rank
            FROM 
                cart_item ci
            INNER JOIN 
                product p ON ci.product_id = p.id
            GROUP BY 
                p.id, p.name
        )
        SELECT 
            CASE 
                WHEN sales_rank <= 3 THEN name
                ELSE 'Others'
            END AS name,
            SUM(total_sales) AS total_sales
        FROM 
            ranked_products
        GROUP BY 
            CASE 
                WHEN sales_rank <= 3 THEN name
                ELSE 'Others'
            END
        ORDER BY 
            total_sales DESC
    """, nativeQuery = true)
    List<Object[]> findTop3ProductsAndOthers();
}
