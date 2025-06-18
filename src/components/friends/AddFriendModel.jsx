// src/components/AddFriendModal.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  UserCircleIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteSearchUsers from "../../hooks/useInfiniteSearchUsers";
import { resetSearch, setSearchQuery } from "../../app/slices/friendsSlice";
import { acceptRequest, addFriend, cancelRequest, removeFriend } from "../../api/friend";

export default function AddFriendModal({ isOpen, onClose, onSendRequest }) {
  const dispatch = useDispatch();
  const { searchQuery, searchedNewFriends, hasMore } = useSelector(
    (state) => state.friends
  );
  const [requestSent, setRequestSent] = useState({});
  const observer = useRef();
  const { isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteSearchUsers();

  const lastUserRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasMore, fetchNextPage]
  );

  const handleSendRequest = async (userId) => {
    setRequestSent((prev) => ({ ...prev, [userId]: true }));
    if (onSendRequest) onSendRequest(userId);
    try {
      const res = await addFriend(userId)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };
  const handleRemoveFriend = async (userId) => {
    try {
      const res = await removeFriend(userId)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeclineRequest = async (userId) => {
    try {
      const res = await declineRequest(userId)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      const res = await acceptRequest(userId)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancelRequest = async (userId) => {
    try {
      const res = await cancelRequest(userId)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    // API call to cancel sent request
  };

  const handleInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));

  };

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50 p-4 duration-300">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <UserPlusIcon className="h-5 w-5 text-indigo-600 mr-2" />
            Add Friend
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Field */}
        <div className="p-6">
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, username or email"
              className="block w-full pl-10 pr-3 py-2.5 border bg-gray-50 border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>

          {/* Results */}
          <div className="max-h-[300px] overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-500 mb-3">
              SEARCH RESULTS
            </h4>

            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : searchedNewFriends.length > 0 ? (
              <ul className="space-y-3">
                {searchedNewFriends.map((user, index) => (
                  <SearchResultItem
                    key={user._id}
                    ref={
                      index === searchedNewFriends.length - 1
                        ? lastUserRef
                        : null
                    }
                    user={user}
                    isSent={!!requestSent[user._id]}
                    onSendRequest={() => handleSendRequest(user._id)}
                    onRemoveFriend={handleRemoveFriend}
                    onDeclineRequest={handleDeclineRequest}
                    onAcceptRequest={handleAcceptRequest}
                    onCancelRequest={handleCancelRequest}
                  />
                ))}
                {isFetchingNextPage && (
                  <div className="flex justify-center py-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                )}
              </ul>
            ) : searchQuery ? (
              <div className="text-center py-6 text-gray-500">
                No users found
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>Search for friends by their name, username, or email.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

//  ftp://192.168.100.3:2221

const SearchResultItem = React.forwardRef(
  ({ user, isSent, onSendRequest, onRemoveFriend, onDeclineRequest, onAcceptRequest, onCancelRequest }, ref) => {
    return (
      <li
        ref={ref}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div className="flex items-center gap-2">
          {user.profilePicture ? (
            <img
              className="rounded-full"
              src={user.profilePicture}
              alt={user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserCircleIcon className="h-10 w-10 text-gray-400 mr-3" />
          )}
          <div>
            <span className="font-medium text-gray-800 block">{user.name}</span>
            <span className="text-sm text-gray-500">@{user.username}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Already Friends */}
          {user.isFriend && (
            <button
              className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
              onClick={() => onRemoveFriend(user._id)}
              title="Remove Friend"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          {/* No Relationship */}
          {!user.isFriend && !user.isRequested && !user.isRequestedByMe && (
            <button
              onClick={onSendRequest}
              disabled={isSent}
              className={`p-2 rounded-md ${
                isSent
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              } transition-colors`}
              title={isSent ? "Request Sent" : "Add Friend"}
            >
              {isSent ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <UserPlusIcon className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Received Friend Request */}
          {user.isRequested && (
            <div className="flex space-x-2">
              <button
                className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                onClick={() => onDeclineRequest(user._id)}
                title="Decline Request"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <button
                className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors"
                onClick={() => onAcceptRequest(user._id)}
                title="Accept Request"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Sent Friend Request */}
          {user.isRequestedByMe && (
            <button
              className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => onCancelRequest(user._id)}
              title="Cancel Request"
            >
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </li>
    );
  }
);
