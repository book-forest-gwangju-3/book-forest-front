const Button = ({ text, type, onClick }) => {
  return (
    <button
      className={`bg-${type} cursor-pointer border-none rounded-md py-2 px-4 text-lg whitespace-nowrap hover:bg-opacity-80 transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
