package com.JYC.note_taking_assistant.models;

public class PageCreateDTO {
    private String title;
    private Integer position;
    private Long parentId;
    public PageCreateDTO(){}

    public String getTitle() {
        return title;
    }

    public Integer getPosition() {
        return position;
    }

    public Long getParentId() {
        return parentId;
    }
}
