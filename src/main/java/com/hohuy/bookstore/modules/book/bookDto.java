package com.hohuy.bookstore.modules.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class bookDto {
    private Long id;
    private String title;
    private String url;
    private String description;
}
