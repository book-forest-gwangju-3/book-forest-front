const Button = ({ text, color, onClick }) => {
  const buttonClass = `${color} cursor-pointer border-none rounded-md py-2 px-4 text-lg whitespace-nowrap hover:bg-opacity-80 transition duration-300 ease-in-out`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
