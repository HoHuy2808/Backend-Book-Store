package com.hohuy.bookstore.modules.book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface bookRepo extends JpaRepository<bookEntity, Long> {
}
