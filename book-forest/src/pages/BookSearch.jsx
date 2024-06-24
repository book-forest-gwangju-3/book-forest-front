import SearchForm from "../components/SearchForm";
const BookSearch = () => {
  // 책 조회 api에서 include로 제목 포함한것만 보여주기
  return (
    <div className="mt-4">
      <SearchForm text={"검색어를 입력해주세요"} />
    </div>
  );
};
export default BookSearch;
