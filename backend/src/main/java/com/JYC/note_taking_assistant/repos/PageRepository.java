package com.JYC.note_taking_assistant.repos;

import com.JYC.note_taking_assistant.entities.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;


public interface PageRepository extends JpaRepository<Page, Long> {
    List<Page> findByUserUsernameOrderByPositionAscIdAsc(String username);
//    List<Page> findPagesByParent(Page parent, int position);
//
//    List<Page> findPagesByOwner(User owner, int position);

    Optional<Page> findById(Long id);


}


