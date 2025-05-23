import { useState } from 'react';
import {
  UserCircleIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  UserPlusIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: 'user1', avatar: null },
    { id: 2, name: 'user2', avatar: null },
    { id: 3, name: 'user3', avatar: null },
  ]);

  const [friends, setFriends] = useState([
    { id: 4, name: 'user4', avatar: null, status: 'online', lastSeen: null },
    { id: 5, name: 'user5', avatar: null, status: 'online', lastSeen: null },
    { id: 6, name: 'user6', avatar: null, status: 'offline', lastSeen: '2h ago' },
    { id: 7, name: 'user7', avatar: null, status: 'offline', lastSeen: '5h ago' },
    { id: 8, name: 'user8', avatar: null, status: 'online', lastSeen: null },
  ]);

  const handleAcceptRequest = (id) => {
    const request = friendRequests.find(req => req.id === id);
    if (request) {
      setFriends(prev => [...prev, { ...request, status: 'online', lastSeen: null }]);
      setFriendRequests(prev => prev.filter(req => req.id !== id));
    }
  };

  const handleDeclineRequest = (id) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Friends</h1>
          <div className="flex items-center text-sm text-gray-500">
            <UserGroupIcon className="h-5 w-5 mr-1" />
            <span>{friends.length} friends</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search friends..."
            className="block w-full pl-10 pr-3 py-2.5 border bg-gray-50 border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Friend Requests Section */}
        {friendRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <UserPlusIcon className="h-5 w-5 text-indigo-600 mr-2" />
              Friend Requests ({friendRequests.length})
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      {request.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={request.avatar}
                          alt=""
                        />
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {request.name}
                      </p>
                  
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Accept"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(request.id)}
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Decline"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends List Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Friends
          </h2>
          {filteredFriends.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500">
                {searchQuery
                  ? "No friends match your search"
                  : "You have no friends yet"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4 relative">
                      {friend.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={friend.avatar}
                          alt=""
                        />
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                      )}
                      {friend.status === "online" && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {friend.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {friend.status === "online"
                          ? "Online"
                          : `Last seen ${friend.lastSeen}`}
                      </p>
                    </div>
                    <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;