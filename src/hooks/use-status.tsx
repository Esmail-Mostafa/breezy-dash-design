import { useQueries } from "@tanstack/react-query";
import { getProducts, getUsers, getOrders, getReviews } from "../services/products-service";

interface UseStatsStatisticProps {
  queriesArray: {
    queryKey: string[];
    queryFn: () => Promise<any>;
  }[];
}
export const useStatsStatistic = ({queriesArray}: UseStatsStatisticProps) => {
  const results = useQueries({
    queries:queriesArray,
  });

  const [products, users, orders, reviews] = results;

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const isSuccess = results.every((r) => r.isSuccess);

  const data = {
    totalProducts: products.data?.totalProducts || 0,
    totalUsers: users.data?.totalUsers || 0,
    totalOrders: orders.data?.totalOrders || 0,
    totalReviews: reviews.data?.totalReviews || 0,
  };

  return { isLoading, isError, isSuccess, data };
};