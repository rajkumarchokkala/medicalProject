package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService 
{
@Autowired
private UserRepository userRepository;

@Autowired
AuthenticationManager authenticationManager;


public User registerUser(User user)
{
    return userRepository.save(user);
}

public LoginResponse loginUser(LoginRequest loginRequest)
{     
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(),loginRequest.getPassword()
        )
    );
    return new LoginResponse("Login Successfull");
}

    
}
