package com.cafe.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cafe.management.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT c FROM Cart c WHERE c.user.id = :id AND c.order IS NULL")
    Optional<Cart> getActiveCartByUserId(@Param("id") Long id);

    @Query("SELECT c FROM Cart c WHERE c.sessionID = :sessionID")
    Optional<Cart> findBySessionId(@Param("sessionID") String sessionID);

}
