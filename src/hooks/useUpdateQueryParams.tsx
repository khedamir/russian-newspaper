import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

const useUpdateQueryParams = (
  page: number,
  pageParam: number,
  navigate: NavigateFunction
) => {
  useEffect(() => {
    if (page !== pageParam) {
      navigate(`?page=${page}`);
    }
  }, [page, pageParam, navigate]);
};

export default useUpdateQueryParams;
