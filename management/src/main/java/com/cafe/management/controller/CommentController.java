package com.cafe.management.controller;

import com.cafe.management.model.Comment;
import com.cafe.management.model.Product;
import com.cafe.management.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer_only")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/addComment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
        try{
            return  ResponseEntity.status(HttpStatus.CREATED).body(commentService.addComment(comment));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FOUND).build();
        }
    }

    @GetMapping("/getCommentsByProduct")
    public ResponseEntity<List<Comment>> getCommentsByProduct(@RequestParam Long id){
        Optional<List<Comment>> commentsOfProduct = commentService.getCommentsByProductId(id);
        if(commentsOfProduct.isPresent()){
            return ResponseEntity.ok(commentsOfProduct.get());
        }else{
            return ResponseEntity.badRequest().build();
        }
    }


}
