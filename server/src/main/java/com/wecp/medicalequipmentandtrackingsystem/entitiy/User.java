package com.wecp.medicalequipmentandtrackingsystem.entitiy;
<<<<<<< HEAD
 
 
import javax.persistence.*;
 
@Entity
@Table(name = "users") // do not change table name
public class User
=======


import javax.persistence.*;

@Entity
@Table(name = "users") // do not change table name
public class User 
>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
{
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private String username;
private String password;
private String email;
private String role;
<<<<<<< HEAD
 
public User()
{
 
}
 
public User(Long id, String username, String password, String email, String role)
=======

public User() 
{

}

public User(Long id, String username, String password, String email, String role) 
>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
{
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
}
<<<<<<< HEAD
 
public Long getId()
{
    return id;
}
 
public void setId(Long id)
{
    this.id = id;
}
 
public String getUsername()
{
    return username;
}
 
=======

public Long getId() 
{
    return id;
}

public void setId(Long id) 
{
    this.id = id;
}

public String getUsername() 
{
    return username;
}

>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
public void setUsername(String username)
{
    this.username = username;
}
<<<<<<< HEAD
 
public String getPassword()
{
    return password;
}
 
public void setPassword(String password)
{
    this.password = password;
}
 
public String getEmail()
{
    return email;
}
 
public void setEmail(String email)
{
    this.email = email;
}
 
public String getRole()
{
    return role;
}
 
public void setRole(String role)
{
    this.role = role;
}
   
}
=======

public String getPassword() 
{
    return password;
}

public void setPassword(String password) 
{
    this.password = password;
}

public String getEmail() 
{
    return email;
}

public void setEmail(String email) 
{
    this.email = email;
}

public String getRole() 
{
    return role;
}

public void setRole(String role) 
{
    this.role = role;
}
    
}
>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
