package com.wecp.medicalequipmentandtrackingsystem.entitiy;

// import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
// import javax.persistence.Table;




@Entity
public class Feedback 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String feedbackText;
    private int rating;
    private String recommend;

    @ManyToOne
    @JoinColumn(name = "hospital_Id", nullable = false)
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "order_Id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "maintenance_Id")
    private Maintenance maintenance;

    public Feedback()
    {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public int getRating() 
    {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String isRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }

    public Hospital getUser() 
    {
        return hospital;
    }

    public void setUser(Hospital hospital) 
    {
        this.hospital = hospital;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Maintenance getMaintenance() 
    {
        return maintenance;
    }

    public void setMaintenance(Maintenance maintenance) 
    {
        this.maintenance = maintenance;
    }  
}
