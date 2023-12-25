import useGetDoc from '../../hooks/useGetDoc';

interface userType {
  userId: string | undefined;
}
const MainTotal = ({ userId }: userType) => {
  const { handleTotal } = useGetDoc(userId);
  const plusTotal = handleTotal('수입');
  const minusTotal = -handleTotal('지출');

  return (
    <div className="text-center border border-gray-400 rounded-xl py-6 bg-white">
      <div className="text-2xl font-medium pb-6">{(plusTotal + minusTotal).toLocaleString()}원</div>
      <div className="flex items-center justify-evenly">
        <div className="flex-grow text-lg border-r border-gray-400">
          <p className="mb-1">한 달 수입</p>
          <p className="font-medium text-sky-500">{plusTotal.toLocaleString()}원</p>
        </div>
        <div className="flex-grow text-lg">
          <p className="mb-1">한 달 지출</p>
          <p className="font-medium text-red-400">{minusTotal.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default MainTotal;
