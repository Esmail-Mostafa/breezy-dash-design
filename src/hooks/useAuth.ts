import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, getCurrentUser } from "../services/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      navigate("/login", { replace: true });
    },
  });
};

// export const useCurrentUser = () => {
//   const { data, isError, isSuccess } = useQuery({
//     queryKey: ["currentUser"],
//     queryFn: getCurrentUser,
//     retry: 1,
//   });
// };
