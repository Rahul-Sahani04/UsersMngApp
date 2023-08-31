package com.user.backend.BackendUserApi.service.impl;

import com.user.backend.BackendUserApi.exception.ResourceNotFoundException;
import com.user.backend.BackendUserApi.model.UserModel;
import com.user.backend.BackendUserApi.repository.UserRepository;
import com.user.backend.BackendUserApi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

    @Override
    public UserModel getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel does not exist with id: " + id));
    }

    @Override
    public UserModel updateUser(long id, UserModel updatedUser) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel does not exist with id: " + id));
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel does not exist with id: " + id));
        userRepository.delete(user);
    }


}
