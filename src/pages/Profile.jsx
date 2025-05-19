import { useState } from "react";
import {
  UserCircleIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Pola Mounir",
    username: "pola.mounir",
    email: "polamounir103@gmail.com",
    bio: "text",
    joinDate: "Since March 2022",
    // location: "San Francisco, CA",
    // website: "alexjohnson.design",
    avatar: null,
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="mr-6 mb-4 sm:mb-0 relative">
              {profile.avatar ? (
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={profile.avatar}
                  alt="Profile"
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-400" />
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                  <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="username"
                    value={tempProfile.username}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    name="bio"
                    rows="2"
                    value={tempProfile.bio}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {profile.name}
                  </h1>
                  <p className="text-gray-500 mb-2">@{profile.username}</p>
                  <p className="text-gray-700 mb-4">{profile.bio}</p>
                </div>
              )}

              <div className="flex space-x-4 mt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm font-medium transition-colors flex items-center"
                    >
                      <CheckIcon className="h-5 w-5 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm font-medium transition-colors flex items-center"
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm font-medium transition-colors flex items-center"
                  >
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-800">{profile.joinDate}</p>
              </div>
            </div>
{/* 
            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Location</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={tempProfile.location}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile.location}</p>
                )}
              </div>
            </div> */}

            {/* <div className="flex items-start">
              <LinkIcon className="h-5 w-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Website</p>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={tempProfile.website}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                )}
              </div>
            </div> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">142</p>
            <p className="text-sm text-gray-500">Friends</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">24</p>
            <p className="text-sm text-gray-500">Groups</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">1.2K</p>
            <p className="text-sm text-gray-500">Messages</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">89%</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
