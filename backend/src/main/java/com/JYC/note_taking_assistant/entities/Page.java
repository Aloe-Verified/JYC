package com.JYC.note_taking_assistant.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "pages")
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn
    @ManyToOne
    private User user;

    @Column(nullable = false)
    private String title;

    @JoinColumn
    @ManyToOne
    private Page parent;

//    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
//    @OrderBy("position")
//    LinkedList<Page> children;

    @Column(nullable = false)
    private Integer position = 0;

    @Column
    Instant createdAt;
    @Column
    Instant updatedAt;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Page getParent() {
        return parent;
    }

    public void setParent(Page parent) {
        this.parent = parent;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
