package com.cafe.management.model;

import com.cafe.management.model.enums.Position;
import com.cafe.management.model.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    private String fullName;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @Email
    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(min = 6)
    private String password;

    @Size(max = 255)
    private String address;


    private String avatar;


    private String phoneNumber;


    private String emailVerificationLink;

    @Enumerated(EnumType.STRING)
    private Position position;

    @Min(value = 0)
    private Double salary;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    private Timestamp lastLogin;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToOne
    private Cart cart;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<Coupon> coupons;

    @NotNull
    private Boolean isAccountEnabled;

}
