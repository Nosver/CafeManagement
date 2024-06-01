package com.cafe.management.service;

import com.cafe.management.dto.CommentDTO;
import com.cafe.management.model.Comment;
import com.cafe.management.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<CommentDTO> getRecentComments() {
        Pageable pageable = PageRequest.of(0, 6); // Get the first page with 3 comments
        List<Comment> comments = commentRepository.getRecentComments(pageable);

        List<CommentDTO> dtos= new ArrayList<>();
        for(Comment c: comments){
            CommentDTO dto= new CommentDTO();
            dto.setProduct(c.getProduct().getName());
            dto.setComment(c.getDescription());
            dto.setStar(c.getStar());
            dtos.add(dto);
        }
        return dtos;
    }
}
