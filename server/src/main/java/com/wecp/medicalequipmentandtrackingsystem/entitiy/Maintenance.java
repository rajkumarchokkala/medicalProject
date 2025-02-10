package com.wecp.medicalequipmentandtrackingsystem.entitiy;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "maintenances") // do not change table name
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    // @Temporal(TemporalType.DATE)
    private Date scheduledDate;
 
    // @Temporal(TemporalType.DATE)
    private Date completedDate;
 
    private String description;
    private String status;
 
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
 
    // Default constructor
    public Maintenance() 
    {

    }
 
    // Parameterized constructor
    public Maintenance(Long id, Date scheduledDate, Date completedDate, String description, String status, Equipment equipment) {
        this.id = id;
        this.scheduledDate = scheduledDate;
        this.completedDate = completedDate;
        this.description = description;
        this.status = status;
        this.equipment = equipment;
    }
 
    // Getters and Setters
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public Date getScheduledDate() {
        return scheduledDate;
    }
 
    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }
 
 
    public Date getCompletedDate() {
        return completedDate;
    }
 
    public void setCompletedDate(Date completedDate) {
        this.completedDate = completedDate;
    }
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public String getStatus() {
        return status;
    }
 
    public void setStatus(String status) {
        this.status = status;
    }
 
    public Equipment getEquipment() {
        return equipment;
    }
 
    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }
    
}
