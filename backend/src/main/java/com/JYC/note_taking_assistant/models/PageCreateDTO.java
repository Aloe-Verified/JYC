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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}
