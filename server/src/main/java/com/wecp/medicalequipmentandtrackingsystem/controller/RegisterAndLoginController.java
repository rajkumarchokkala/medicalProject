package com.wecp.medicalequipmentandtrackingsystem.controller;


import com.wecp.medicalequipmentandtrackingsystem.dto.LoginRequest;
import com.wecp.medicalequipmentandtrackingsystem.dto.LoginResponse;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtUtil;
import com.wecp.medicalequipmentandtrackingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

<<<<<<< HEAD
@RestController
public class RegisterAndLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
=======

public class RegisterAndLoginController {
   
   @Autowired
   private UserService userService;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // register user and return the registered user with status code 201 created
        return ResponseEntity.HttpStatus(201).body(userService.registerUser(user));

>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
<<<<<<< HEAD
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        User user = userService.getUserByUsername(loginRequest.getUsername());

        return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getEmail(), user.getRole()));
    }
}
=======
        // login user and return the login response with status code 200 ok
        // if authentication fails, return status code 401 unauthorized
        try
        {
        return ResponseEntity.HttpStatus(200).body(userService.loginUser(loginRequest));
        }
        catch(Exception e)
        {
            return ResponseEntity.HttpStatus(401).build();
        }
         
    }
}
>>>>>>> 3a1eb4f5fa8a9cacda5b78088babe5fb69a1930e
