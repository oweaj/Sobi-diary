import useGetDoc from '../../hooks/useGetDoc';

interface userType {
  userId: string | undefined;
}
const MainTotal = ({ userId }: userType) => {
  const plusTotal = useGetDoc(userId, '수입').handleTotal();
  const minusTotal = useGetDoc(userId, '지출').handleTotal();

  return (
    <div className="text-center border border-gray-400 rounded-xl py-4 bg-white">
      <div className="text-xl font-medium pb-5">
        총 <span className="text-2xl font-semibold">{(plusTotal + -minusTotal).toLocaleString()}</span>원
      </div>
      <div className="flex items-center justify-evenly">
        <div className="flex-grow text-lg border-r border-gray-400">
          <p className="mb-1">수입</p>
          <p className="font-medium text-sky-500">{plusTotal.toLocaleString()}원</p>
        </div>
        <div className="flex-grow text-lg">
          <p className="mb-1">지출</p>
          <p className="font-medium text-red-400">{minusTotal.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default MainTotal;
