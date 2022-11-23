import { useEffect, useState } from 'react';
import TestApiService from '../../services/testApiService';

const DACContent = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    TestApiService.getDACBoard()
      .then((res) => {
        setContent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div>{content}</div>;
};

export default DACContent;
