import { ChangeEvent, useState } from 'react';

const useInput = (id: string) => {
  const [data, setData] = useState('');
  const today = new Date().toISOString();
  const [date, setDate] = useState(today);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (id === 'price') {
      const onlyNumberValue = e.target.value.replace(/[^\d]/g, '');
      setData(Number(onlyNumberValue).toLocaleString());
    } else if (id === 'date') {
      setDate(e.target.value);
    } else {
      setData(e.target.value);
    }
  };

  return { onChange, data, date };
};

export default useInput;
