import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayBooks, setDisplayBooks] = useState([]);
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
      if (searchTerm === "") {
        setFilteredBooks([]);
        return;
      }
      const filtered = books.filter(
        (book) =>
          book.author.includes(searchTerm) ||
          book.title.includes(searchTerm)
      );
      setFilteredBooks(filtered);
      setSelectedIndex(-1);
    };

    filterBooks();
  }, [searchTerm, books]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (title) => {
    setSearchTerm(title);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = books.filter(
      (book) =>
        book.author.includes(searchTerm) ||
        book.title.includes(searchTerm)
    );
    setDisplayBooks(filtered);
    setFilteredBooks([]); // 필터링된 리스트를 숨기기 위해 빈 배열로 설정
  };

  const handleKeyDown = (event) => {
    if (filteredBooks.length > 0) {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
      } else if (event.key === "Enter" && selectedIndex >= 0) {
        handleItemClick(filteredBooks[selectedIndex].title);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedIndex]);

  const containerClass = `relative my-8 mx-auto text-gray-600 w-9/12`;
  const inputClass =
    "border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full";
  const buttonClass = "absolute right-0 top-3 mr-4";
  const iconClass = "text-gray-600 h-4 w-4 fill-current";

  return (
    <div className="mt-4 flex flex-col justify-center">
      <form onSubmit={handleSearch} className={containerClass}>
        <input
          ref={inputRef}
          placeholder={"검색어를 입력해주세요"}
          type="search"
          className={inputClass}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className={buttonClass}>
          <SlMagnifier className={iconClass} />
        </button>
        {filteredBooks.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-10">
            {filteredBooks.slice(0, 10).map((book, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${
                  selectedIndex === index ? "bg-gray-300" : ""
                }`}
                onClick={() => handleItemClick(book.title)}
              >
                {book.title} | {book.author} 지음
              </li>
            ))}
          </ul>
        )}
      </form>
      {displayBooks.length > 0 ? (
        <div className="mb-12">
          <div className="mt-4 flex flex-wrap justify-start">
            {displayBooks.map((book) => (
              <div key={book.id} className="mb-4 mx-3">
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-44 h-72 object-cover hover:scale-110 overflow-hidden"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto my-12">검색된 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default BookSearch;
