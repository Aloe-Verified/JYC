package com.JYC.note_taking_assistant.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blocks")
public class Block {
    @Id @GeneratedValue private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "page_id")
    private Page page;

    @ManyToOne
    @JoinColumn(name = "parent_block")
    private Block parentBlock;

    @OneToMany(mappedBy = "parentBlock", cascade = CascadeType.ALL)
    @OrderBy("position")
    private List<Block> children = new ArrayList<>();

    @Column(nullable = false)
    private String type;           // e.g. "paragraph", "heading"

    @Column(columnDefinition = "jsonb", nullable = false)
    private String content;        // store JSON as String

    @Column(nullable = false) private Integer position = 0;
}
