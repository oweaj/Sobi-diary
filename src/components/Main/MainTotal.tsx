const MainTotal = () => {
  return (
    <div className="text-center border border-gray-300 rounded-xl py-6 bg-white">
      <div className="text-2xl font-medium pb-6">100,000,000원</div>
      <div className="flex items-center justify-evenly">
        <div className="flex-grow border-r border-gray-400">
          <p className="mb-1 text-lg">한 달 수입</p>
          <p className="font-medium text-sky-500">5,000,000원</p>
        </div>
        <div className="flex-grow">
          <p className="mb-1 text-lg">한 달 지출</p>
          <p className="font-medium text-red-400">-1,000,000원</p>
        </div>
      </div>
    </div>
  );
};

export default MainTotal;
