package com.wecp.medicalequipmentandtrackingsystem.repository;
<<<<<<< HEAD
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
 
@Repository
public interface UserRepository extends JpaRepository<User,Long>  
{
    
    User findByUsername(String username);
}
=======


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>  
{

}

>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
