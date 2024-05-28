package com.cafe.management.service;

import com.cafe.management.model.Comment;
import com.cafe.management.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment addComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Optional<List<Comment>> getCommentsByProductId(Long productId) {
        return commentRepository.findCommentsByProductId(productId);
    }
}
