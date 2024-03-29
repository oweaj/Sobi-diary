import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import useGetDoc from '../../hooks/useGetDoc';
import Header from '../../components/Header/Header';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Chart = () => {
  const getUser = localStorage.getItem('user');
  const userData = getUser ? JSON.parse(getUser) : null;
  const { docList } = useGetDoc(userData?.uid, '전체');
  const plusTotal = useGetDoc(userData?.uid, '수입').total;
  const minusTotal = useGetDoc(userData?.uid, '지출').total;

  const totalOptions = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: `< ${userData?.name}님 수입 및 지출 내역 >`,
        font: { size: 16 },
        padding: { bottom: 20 },
      },
    },
  };

  const detailOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { padding: 20 },
      },
      title: {
        display: true,
        text: '< 세부 지출 내역 분류 >',
        padding: { bottom: 16 },
        font: { size: 16 },
      },
    },
  };

  const totalData = {
    labels: ['수입', '지출'],
    datasets: [
      {
        data: [plusTotal, minusTotal],
        backgroundColor: ['rgba(53, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  const chartData = (label: string) => {
    const check = docList.filter((item) => item.detailType);
    let calc = 0;
    check.map((item) => {
      if (label === item.detailType) {
        const changPrice = item.price.replace(/[^\d]/g, '');
        calc += Number(changPrice);
      }
    });
    return calc;
  };

  const detailDate = {
    labels: ['식당', '간식', '술', '쇼핑', '기타'],
    datasets: [
      {
        label: '지출',
        data: [chartData('식당'), chartData('간식'), chartData('술'), chartData('쇼핑'), chartData('기타')],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(29, 148, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(29, 148, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100%-3.5rem)] flex flex-col items-center">
        <p className="pt-4 text-sm text-red-400">※ 차트 그래프에 마우스를 올리면 금액을 알 수 있습니다.</p>
        <div className="flex flex-col w-4/5 h-full transition-all duration-300 justify-evenly 2xl:w-11/12">
          <Bar options={totalOptions} data={totalData} />
          <Pie options={detailOptions} data={detailDate} />
        </div>
      </div>
    </>
  );
};

export default Chart;
