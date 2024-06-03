package com.cafe.management.repository;

import com.cafe.management.dto.UserRoleCount;
import com.cafe.management.dto.UserSpendingDTO;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailVerificationLink(String emailVerificationLink);
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findAllByRole(@Param("role") Role role);
    Optional<User> findById(Long id);

    @Query("SELECT u.role as role, COUNT(u) as count FROM User u GROUP BY u.role")
    List<UserRoleCount> getCompanyDetails();


    @Query("SELECT new com.cafe.management.dto.UserSpendingDTO(u.id, u.fullName, u.email, SUM(o.totalPrice)) " +
            "FROM User u " +
            "JOIN u.orders o " +
            "WHERE u.role = 'CUSTOMER' " +
            "GROUP BY u.id, u.fullName, u.email " +
            "ORDER BY SUM(o.totalPrice) DESC")
    List<UserSpendingDTO> findCustomerSpending(Pageable pageable);

    @Query("SELECT new com.cafe.management.dto.UserSpendingDTO(u.id, u.fullName, u.email, SUM(o.totalPrice)) " +
            "FROM User u " +
            "JOIN u.orders o " +
            "WHERE u.role = 'CUSTOMER' " +
            "GROUP BY u.id, u.fullName, u.email " +
            "ORDER BY SUM(o.totalPrice) DESC")
    List<UserSpendingDTO> findCustomerSpending();
}
