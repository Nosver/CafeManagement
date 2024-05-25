package com.cafe.management.repository;

import com.cafe.management.model.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {


    @Query("""
select t from Token t inner join User u on t.user.id = u.id
where t.user.id = :userId and t.loggedOut = false
""")
    List<Token> findAllTokensByUser(Long userId);

    Optional<Token> findByToken(String token);


    @Modifying
    @Transactional
    @Query("delete from Token t where t.user.id = :userId")
    void deleteUserTokens(@Param("userId") Long userId);
}
