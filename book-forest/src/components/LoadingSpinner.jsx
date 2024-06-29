const LoadingSpinner = () => {
  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-full">
        <img
          className="h-16 w-16 mb-4" // 크기를 h-16 w-16으로 증가
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt="Loading spinner"
        />
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
