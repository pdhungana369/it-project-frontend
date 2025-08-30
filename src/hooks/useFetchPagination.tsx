import React from 'react';
import Service from '@setup/network';
import { isAxiosError } from 'axios';

const useFetchPagination = (url: string, searchText?: string) => {
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(10);

  const [metaData, setMetaData] = React.useState({
    currentPage: 0,
    totalPages: 0,
  });

  const getData = React.useCallback(async () => {
    setIsLoading(true);
    setError('');
    setData([]);
    try {
      const { data } = await Service.get(
        `${url}?limit=${pageLimit}&page=${pageNumber}&search=${searchText}`
      );
      const { data: responseData } = data;
      setIsLoading(false);
      setData(responseData);
      setMetaData({
        currentPage: data?.meta?.currentPage,
        totalPages: data?.meta?.totalPages,
      });
      setError('');
    } catch (err) {
      if (isAxiosError(err)) {
        const error = err?.response?.data?.message;
        setError(error);
      }
      setIsLoading(false);
    }
  }, [pageLimit, pageNumber, searchText, url]);

  React.useEffect(() => {
    getData();
  }, [getData, url]);

  return {
    isLoading,
    data,
    error,
    getData,
    metaData,
    pageLimit,
    setPageLimit,
    setPageNumber,
  };
};

export default useFetchPagination;
