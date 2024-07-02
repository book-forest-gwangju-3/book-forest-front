import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

// 호출할 때 props로 type={"max-w-md"} 넣으면 짧은 검색창, 안 넣으면 긴 검색창
const SearchForm = ({ text, type, value, onChange, onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/books");
        setBooks(response.data.items);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filterBooks = () => {
      if (value === "") {
        setFilteredBooks([]);
        return;
      }

      // value와 book.title이 일치하는 경우 리스트 초기화
      if (books.some(book => book.title === value)) {
        setFilteredBooks([]);
        return;
      }

      const filtered = books.filter(
        (book) =>
          book.author.includes(value) || book.title.includes(value)
      );
      setFilteredBooks(filtered);
      setSelectedIndex(-1); // Reset selected index when filtering changes
    };

    filterBooks();
  }, [value, books]);

  const handleKeyDown = (event) => {
    if (filteredBooks.length > 0) {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
      } else if (event.key === "Enter" && selectedIndex >= 0) {
        handleSelect(filteredBooks[selectedIndex]);
      }
    }
  };

  const handleSelect = (book) => {
    onBookSelect(book);
    setFilteredBooks([]); // 선택 후 리스트 숨기기
    onChange({ target: { value: book.title } }); // 입력 창에 선택된 값 설정
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedIndex]);

  const containerClass = `relative mx-auto text-gray-600 w-full ${type}`;
  const inputClass =
    "border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full";

  return (
    <div className={containerClass}>
      <input
        ref={inputRef}
        placeholder={text}
        type="search"
        className={inputClass}
        value={value || ""}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {filteredBooks.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-10 max-h-40 overflow-y-auto">
          {filteredBooks.map((book, index) => (
            <li
              key={book.id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedIndex === index ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelect(book)}
            >
              {book.title} | {book.author} 지음
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchForm;
