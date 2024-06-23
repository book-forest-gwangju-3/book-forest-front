import { SlMagnifier } from "react-icons/sl";
// 호출할때 props로 type={"max-w-md"} 넣으면 짧은 검색창, 안넣으면 긴 검색창
const SearchForm = ({ text, type }) => {
  const containerClass = `relative mx-auto text-gray-600 w-full ${type}`;
  const inputClass =
    "border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full";
  const buttonClass = "absolute right-0 top-3 mr-4";
  const iconClass = "text-gray-600 h-4 w-4 fill-current";
  return (
    <div className={containerClass}>
      <input placeholder={text} type="search" className={inputClass} />
      <button type="submit" className={buttonClass}>
        <SlMagnifier className={iconClass} />
      </button>
    </div>
  );
};

export default SearchForm;
