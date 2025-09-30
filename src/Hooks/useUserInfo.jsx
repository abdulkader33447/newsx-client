import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUserInfo = (email) => {
  const axios = useAxios();

  const {
    data: adminInfo = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminInfo", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/admin/${email}`);
      return res.data;
    },
    retry: false,
  });

  return { adminInfo, isLoading, isError, refetch };
};

export default useUserInfo;
