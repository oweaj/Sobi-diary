import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [data, setData] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === 'price') {
      const onlyNumberValue = e.target.value.replace(/[^\d]/g, '');
      setData(Number(onlyNumberValue).toLocaleString());
    } else {
      setData(e.target.value);
    }
  };

  const onReset = () => {
    setData('');
  };

  return { onChange, onReset, data };
};

export default useInput;
