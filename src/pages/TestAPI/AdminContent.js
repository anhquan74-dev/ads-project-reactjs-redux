import { useEffect, useState } from 'react';
import TestApiService from '../../services/testApiService';

const AdminContent = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    TestApiService.getAdminBoard()
      .then((res) => {
        setContent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div>{content}</div>;
};

export default AdminContent;
