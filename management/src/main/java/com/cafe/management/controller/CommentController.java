package com.cafe.management.controller;

import com.cafe.management.dto.CommentDTO;
import com.cafe.management.dto.StarCountDTO;
import com.cafe.management.model.Comment;
import com.cafe.management.model.User;
import com.cafe.management.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            return user;
        }
        return null;
    }
    @PostMapping("/customer_only/addComment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
        User user = getUser();
        comment.setUser(user);
        try{
            return  ResponseEntity.status(HttpStatus.CREATED).body(commentService.addComment(comment));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FOUND).build();
        }
    }

    @GetMapping("/public/getCommentsByProductId")
    public ResponseEntity<List<Comment>> getCommentsByProduct(@RequestParam Long id){
        Optional<List<Comment>> commentsOfProduct = commentService.getCommentsByProductId(id);
        if(commentsOfProduct.isPresent()){
            return ResponseEntity.ok(commentsOfProduct.get());
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("employee_and_admin/getRecentComments")
    public List<CommentDTO> getRecentComments(){
        return commentService.getRecentComments();
    }


    @GetMapping("employee_and_admin/starCount")
    public StarCountDTO getStarCounts(){
        return commentService.getStarCounts();
    }
}
