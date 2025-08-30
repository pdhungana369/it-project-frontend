import React from 'react';
import Service from '@setup/network';
import { isAxiosError } from 'axios';

const useFetch = (url: string, noCall?: boolean) => {
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const getData = React.useCallback(async () => {
    setIsLoading(true);
    setError('');
    setData([]);
    if (noCall) return;
    try {
      const { data } = await Service.get(url);
      const { data: responseData } = data;
      setIsLoading(false);
      setData(responseData);
      setError('');
    } catch (err) {
      if (isAxiosError(err)) {
        const error = err?.response?.data?.message;
        setError(error);
      }
      setIsLoading(false);
    }
  }, [noCall, url]);

  React.useEffect(() => {
    getData();
  }, [getData, url]);

  return { isLoading, data, error, getData };
};

export default useFetch;
