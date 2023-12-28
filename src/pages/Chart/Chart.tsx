import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useGetDoc from '../../hooks/useGetDoc';
import Header from '../../components/Header/Header';

ChartJS.register(ArcElement, Tooltip, Legend);

interface userType {
  user: {
    id: string;
    name: string | null;
  } | null;
}

const Chart = ({ user }: userType) => {
  const { docList } = useGetDoc(user?.id, '전체');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${user?.name}님 소비 내역`,
      },
    },
  };

  const types = ['수입', '지출'];
  const totalData = {
    labels: types,
    datasets: [
      {
        label: '분류 1', //그래프 분류되는 항목
        data: [1, 2], //실제 그려지는 데이터(Y축 숫자)

        backgroundColor: ['rgba(255, 0, 0, 0.3)', 'rgba(0, 160, 235, 0.2)'],
        borderColor: ['rgba(255, 0, 0, 1)', 'rgba(0, 160, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const items = ['식당', '간식', '술자리', '쇼핑', '기타'];
  const detailDate = {
    labels: items,
    datasets: [
      {
        label: '분류 2', //그래프 분류되는 항목
        data: [1, 2, 3], //실제 그려지는 데이터(Y축 숫자)

        backgroundColor: ['rgba(255, 0, 0, 0.3)', 'rgba(0, 160, 235, 0.2)'],
        borderColor: ['rgba(255, 0, 0, 1)', 'rgba(0, 160, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100%-3.5rem)] flex flex-col items-center">
        <div className="w-64 h-full flex flex-col justify-around">
          <Doughnut options={options} data={totalData} />
          <Doughnut options={options} data={detailDate} />
        </div>
      </div>
    </>
  );
};

export default Chart;
