package com.cafe.management.repository;

import com.cafe.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String username);
    Optional<User> findByEmailVerificationLink(String emailVerificationLink);
}
