// src/hooks/useSearchUsers.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"; // your configured axios instance

export default function useSearchUsers(query, page = 1, limit = 10) {
  return useQuery({
    queryKey: ["searchUsers", query, page, limit],
    queryFn: async () => {
      const { data } = await api.get(
        `/search?query=${query}&page=${page}&limit=${limit}`
      );
      return data;
    },
    enabled: !!query,
  });
}
