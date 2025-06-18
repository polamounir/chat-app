// src/hooks/useInfiniteSearchUsers.js
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadMoreFriends, setSearchedNewFriends } from "../app/slices/friendsSlice";

export default function useInfiniteSearchUsers() {
  const dispatch = useDispatch();
  const { searchQuery, searchPage, searchLimit, hasMore } = useSelector(
    (state) => state.friends
  );

  const query = useInfiniteQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(
        `/search?query=${searchQuery}&page=${pageParam}&limit=${searchLimit}`
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.data.pagination.total / searchLimit);
      return nextPage <= totalPages ? nextPage : undefined;
    },
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5, 
  });


  useEffect(() => {
    if (query.data) {
      const allUsers = query.data.pages.flatMap(page => page.data.users);
      const currentPage = query.data.pages.length;
      const hasMore = currentPage < Math.ceil(
        query.data.pages[0]?.data.pagination.total / searchLimit
      );

      if (currentPage === 1) {
        dispatch(setSearchedNewFriends({ users: allUsers, hasMore }));
      } else {
        dispatch(loadMoreFriends({ users: allUsers, hasMore }));
      }
    }
  }, [query.data, dispatch, searchLimit]);

  return query;
}