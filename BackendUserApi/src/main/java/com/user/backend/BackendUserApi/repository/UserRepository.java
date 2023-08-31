package com.user.backend.BackendUserApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.user.backend.BackendUserApi.model.userModel;
public interface UserRepository extends JpaRepository<userModel, Long> {
}
