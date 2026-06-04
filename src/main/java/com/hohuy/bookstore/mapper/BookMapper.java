package com.hohuy.bookstore.mapper;

import com.hohuy.bookstore.dto.BookDto;
import com.hohuy.bookstore.model.Book;

public class BookMapper {
    public BookDto toDTO(Book book){
        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setUrl(book.getUrl());
        dto.setDescription(book.getDescription());
        return dto;
    }
}
