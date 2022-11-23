import { useEffect, useState } from 'react';
import TestApiService from '../../services/testApiService';

const AdvertiserContent = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    TestApiService.getAdvertiserBoard()
      .then((res) => {
        setContent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div>{content}</div>;
};

export default AdvertiserContent;
