import { useState } from 'react';

interface docType {
  date: string;
  type: string;
  content: string;
  price: number;
  id: string;
}

const useReduce = (docList: docType[], type: string) => {
  const [calc, setCalc] = useState(0);

  const typeCheck = docList.filter((item) => item.type === type);
  setCalc(typeCheck.map((item) => item.price).reduce((acc, el) => acc + Number(el), 0));

  return { calc };
};

export default useReduce;
