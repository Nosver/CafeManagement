package com.cafe.management.service;

import com.cafe.management.dto.UserRoleCount;
import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.UserRepository;


import java.util.List;
import java.util.Optional;

import com.stripe.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

@Service
public class UserService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CouponService couponService;

    @Autowired
    private JwtService jwtService;

    public List<User> getAllCustomers() {
        List<User> asd =  userRepository.findAllByRole(Role.CUSTOMER);
        //System.out.println(asd);
        return asd;
    }

    public void changePassword(){

    }
    public void sendCoupon(User customer, Coupon coupon){

        try {

           couponService.createCoupon(customer,coupon);
        } catch (Exception e) {
            throw new RuntimeException("Failed to append coupon to customer: " + e.getMessage());
        }

    }

    public void sendCoupons(Coupon coupon){

        // Get all customers
        List<User> customerList = userRepository.findAllByRole(Role.CUSTOMER);
        for(User customer : customerList){
            Coupon c= new Coupon();
            c.setDescription(coupon.getDescription());
            c.setTitle(coupon.getTitle());
            c.setDiscountPercent(coupon.getDiscountPercent());
            c.setExpireDate(coupon.getExpireDate());
            sendCoupon(customer, c);
        }
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllEmployees(){
        return userRepository.findAllByRole(Role.EMPLOYEE);
    }

    public User updateUser(User user){

        Optional<User> nUser  = userRepository.findById(user.getId());

        if(nUser.isEmpty()) throw new IllegalArgumentException("User not found!");

        nUser.get().setFullName(user.getFullName());
        nUser.get().setAddress(user.getAddress());
        if(user.getAvatar()!=null){
            nUser.get().setAvatar(user.getAvatar());
            
        }
        nUser.get().setEmail(user.getEmail());
        nUser.get().setPassword(passwordEncoder.encode(user.getPassword()));
        nUser.get().setPhoneNumber(user.getPhoneNumber());
        nUser.get().setPosition(user.getPosition());
        nUser.get().setSalary(user.getSalary());
        nUser.get().setUpdatedAt(user.getUpdatedAt());
        nUser.get().setCreatedAt(user.getCreatedAt());
        nUser.get().setTokens(user.getTokens());

        System.out.print(nUser.get());

        return userRepository.save(nUser.get());
    }

    public void deleteEmployee(Long employeeId){
        Optional<User> employee= userRepository.findById(employeeId);
        if(employee.isEmpty()){
            throw new IllegalArgumentException("No Employee found with given id");
        }
        if(employee.get().getRole()!=Role.EMPLOYEE){
            throw new IllegalArgumentException("user with given id is not employee");
        }
        jwtService.deleteUserTokens(employeeId);
        userRepository.deleteById(employeeId);

    }

    public void updatePassword(User user, String password) {
        Optional<User> user1 =userRepository.findByEmail(user.getEmail());

        if(user1.isEmpty()){
            throw new IllegalArgumentException("User not found");
        }
        user1.get().setPassword(passwordEncoder.encode(password));
        userRepository.save(user1.get());

    }

    public User updateAdminEmployeeProfile(User user){
        Optional<User> user1= userRepository.findById(user.getId());
        if(user1.isEmpty()){
            throw new IllegalArgumentException("User not found");
        }
        if(user1.get().getRole()==Role.CUSTOMER){
            throw new IllegalArgumentException("Invalid role");
        }
        user1.get().setEmail(user.getEmail());
        user1.get().setAddress(user.getAddress());
        user1.get().setFullName(user.getFullName());

        return userRepository.save(user1.get());
    }

    public void updateAvatar(User user) {
       Optional<User> user1= userRepository.findById(user.getId());
        if(user1.isEmpty()){
            throw new IllegalArgumentException("User not found");
        }
        user1.get().setAvatar(user.getAvatar());
        userRepository.save(user1.get());
    }

    public User updateCustomer(User updatedUser) {

        Optional<User> currentUser = userRepository.findById(updatedUser.getId());

        if(currentUser.isEmpty()){
            throw new IllegalArgumentException("user is not found");
        }
        currentUser.get().setFullName(updatedUser.getFullName());
        currentUser.get().setEmail(updatedUser.getEmail());
        currentUser.get().setPhoneNumber(updatedUser.getPhoneNumber());

        return userRepository.save(currentUser.get());
    }

    public List<UserRoleCount> getCompanyDetails() {
        return userRepository.getCompanyDetails();
    }
}
