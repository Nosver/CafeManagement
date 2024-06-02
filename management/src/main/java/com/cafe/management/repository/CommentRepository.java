package com.cafe.management.repository;

import com.cafe.management.model.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("SELECT c FROM Comment c WHERE c.product.id = :productId")
    Optional<List<Comment>> findCommentsByProductId(@Param("productId") Long productId);

    @Query("SELECT c FROM Comment c ORDER BY c.id DESC")
    List<Comment> getRecentComments(Pageable pageable);

    @Query("SELECT c.star as star, COUNT(c) as count FROM Comment c GROUP BY c.star")
    List<Object[]> countStars();
}
