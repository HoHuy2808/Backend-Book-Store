package com.hohuy.bookstore.modules.book;

public class bookMapper {
    public bookDto toDTO(bookEntity bookEntity){
        bookDto dto = new bookDto();
        dto.setId(bookEntity.getId());
        dto.setTitle(bookEntity.getTitle());
        dto.setUrl(bookEntity.getUrl());
        dto.setDescription(bookEntity.getDescription());
        return dto;
    }
}
