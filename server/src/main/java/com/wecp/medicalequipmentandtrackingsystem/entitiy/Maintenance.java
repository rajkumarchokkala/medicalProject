package com.wecp.medicalequipmentandtrackingsystem.entitiy;


import javax.persistence.*;
// import java.util.Date;

@Entity
@Table(name = "maintenances") // do not change table name
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    // @Temporal(TemporalType.DATE)
    private String scheduledDate;
 
    // @Temporal(TemporalType.DATE)
    private String completedDate;
 
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
    // Getters and Setters
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getScheduledDate() {
        return scheduledDate;
    }
 
    public void setScheduledDate(String scheduledDate) {
        this.scheduledDate = scheduledDate;
    }
 
 
    public String getCompletedDate() {
        return completedDate;
    }
 
    public void setCompletedDate(String completedDate) {
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
