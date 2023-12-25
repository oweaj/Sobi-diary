import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [data, setData] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  return { onChange, data };
};

export default useInput;
