package com.user.backend.BackendUserApi.service;

import com.user.backend.BackendUserApi.model.UserModel;

import java.util.List;

public interface UserService {
    List<UserModel> getAllUsers();

    UserModel createUser(UserModel user);

    UserModel getUserById(long id);

    UserModel updateUser(long id, UserModel updatedUser);

    void deleteUser(long id);
}
