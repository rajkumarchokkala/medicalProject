package com.wecp.medicalequipmentandtrackingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Feedback;
import com.wecp.medicalequipmentandtrackingsystem.service.FeedbackService;

@RestController
@RequestMapping
public class FeedbackController 
{
@Autowired
FeedbackService feedbackService;

    @PostMapping("/api/feedback/maintenance")
    public ResponseEntity<Feedback> createFeedbackByMaintenanceId(@RequestParam Long maintenanceId,@RequestBody Feedback feedback) 
    {
        Feedback saved = feedbackService.createFeedbackByMaintenanceId(maintenanceId,feedback);
        return ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/api/feedback/order")
    public ResponseEntity<Feedback> createFeedbackByOrderId(@RequestParam Long orderId,@RequestBody Feedback feedback) 
    {
        Feedback saved = feedbackService.createFeedbackByOrderId(orderId,feedback);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping("/api/feedback/{id}")
    public ResponseEntity<Feedback> viewFeedbackById(@PathVariable Long id) 
    {
        Feedback saved = feedbackService.getFeedbackById(id);
        return ResponseEntity.status(200).body(saved);
    }

    @GetMapping("/api/feedback")
    public ResponseEntity<?> viewAllFeedbacks() 
    {
        List<Feedback> saved = feedbackService.getAllFeedbacks();
        return ResponseEntity.status(200).body(saved);
    }

    @DeleteMapping("/api/feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) 
    {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.status(200).build();    
    }

    // @GetMapping("api/feedback/user/{userId}")
    // public ResponseEntity<Feedback> getFeedbackbyUserId(@PathVariable Long userId) 
    // {
    //     List<Feedback> f = feedbackService.getFeedbacksByUserId(userId);
    //     return ResponseEntity.status(200).body(f);
    // }
}
