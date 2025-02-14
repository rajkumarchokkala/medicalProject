package com.wecp.medicalequipmentandtrackingsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Feedback;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.repository.FeedbackRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    MaintenanceRepository maintenanceRepository;

    @Autowired
    OrderRepository orderRepository;

    public Feedback createFeedbackByMaintenanceId(Long maintenanceId,Feedback feedback) 
    {
        Maintenance maintenance=maintenanceRepository.findById(maintenanceId).orElse(null);
        if(maintenance!=null)
        {
        feedback.setMaintenance(maintenance);
        return feedbackRepository.save(feedback);
        }
        return null;
    }

    public Feedback createFeedbackByOrderId(Long orderId,Feedback feedback) 
    {
        Order order=orderRepository.findById(orderId).orElse(null);
        if(order!=null)
        {
        feedback.setOrder(order);
        return feedbackRepository.save(feedback);
        }
        return null;
    }

    public List<Feedback> getAllFeedbacks() 
    {
        return feedbackRepository.findAll();
    }

    public void deleteFeedback(Long id) 
    {
        if (feedbackRepository.existsById(id)) 
        {
            feedbackRepository.deleteById(id);
        }
    }

    public Feedback getFeedbackById(Long feedbackId)
    {
        return feedbackRepository.findById(feedbackId).orElse(null);
    }

    // public List<Feedback> getFeedbacksBy(Long userId) 
    // {
    //     List<Feedback> exists = feedbackRepository.findByUser(userId);
    //     return feedbackRepository.findByUser(userId);
    // }

    public Feedback updateFeedback(Long feedbackId,Feedback feedback)
    {
        Feedback oldFeedback=feedbackRepository.findById(feedbackId).orElse(null);
        if(oldFeedback!=null)
        {
            feedback.setId(oldFeedback.getId());
            feedbackRepository.save(feedback);
        }
        return null;
    }
}
