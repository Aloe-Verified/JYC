package com.JYC.note_taking_assistant.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.JYC.note_taking_assistant.entities.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
