package com.cafe.management.repository;

import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailVerificationLink(String emailVerificationLink);
    List<User> findAllByRole(Role role);
    Optional<User> findById(Long id);
    Optional<User> findByRoleAndId(Role role, Long id);
}
