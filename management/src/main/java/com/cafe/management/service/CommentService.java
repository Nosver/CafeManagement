package com.cafe.management.service;

import com.cafe.management.dto.CommentDTO;
import com.cafe.management.dto.StarCountDTO;
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

    public StarCountDTO getStarCounts() {
        List<Object[]> starCounts = commentRepository.countStars();
        StarCountDTO starCountDTO = new StarCountDTO();

        for (Object[] starCount : starCounts) {
            Integer star = (Integer) starCount[0];
            Long count = (Long) starCount[1];
            switch (star) {
                case 1:
                    starCountDTO.setOneStar(count);
                    break;
                case 2:
                    starCountDTO.setTwoStar(count);
                    break;
                case 3:
                    starCountDTO.setThreeStar(count);
                    break;
                case 4:
                    starCountDTO.setFourStar(count);
                    break;
                case 5:
                    starCountDTO.setFiveStar(count);
                    break;
            }
        }
        // Ensure all star ratings are represented even if the count is zero
        if (starCountDTO.getOneStar() == null) starCountDTO.setOneStar(0L);
        if (starCountDTO.getTwoStar() == null) starCountDTO.setTwoStar(0L);
        if (starCountDTO.getThreeStar() == null) starCountDTO.setThreeStar(0L);
        if (starCountDTO.getFourStar() == null) starCountDTO.setFourStar(0L);
        if (starCountDTO.getFiveStar() == null) starCountDTO.setFiveStar(0L);

        return starCountDTO;
    }
}
