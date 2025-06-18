import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import useFormatDate from "../hooks/useFormatDate";
import { motion, AnimatePresence } from "framer-motion";
import UserStats from "../components/profile/UserStats";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const joindDate = useFormatDate(user?.createdAt);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
  });
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profilePicture: user?.profilePicture || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Dispatch action to update profile
    // dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profilePicture: user?.profilePicture || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          variants={cardVariants}
        >
          <div className="flex flex-col items-center md:flex-row justify-center md:items-start">
            <motion.div
              className="mr-6 mb-4 sm:mb-0 relative md:pt-5"
              whileHover={{ scale: 1.02 }}
            >
              {formData.profilePicture ? (
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={formData.profilePicture}
                  alt="Profile"
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-400" />
              )}

              {isEditing && (
                <motion.label
                  whileTap={{ scale: 0.95 }}
                  className={`absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    isUploading ? "opacity-50" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="h-5 w-5 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
                  ) : (
                    <PhotoIcon className="h-5 w-5 text-gray-600" />
                  )}
                </motion.label>
              )}
            </motion.div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg shadow-sm`}
                        placeholder="Full Name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-2 border ${
                          errors.username ? "border-red-500" : "border-gray-300"
                        } rounded-lg shadow-sm`}
                        placeholder="Username"
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <textarea
                      name="bio"
                      rows="2"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                      placeholder="Tell us about yourself..."
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center md:items-start"
                  >
                    <h1 className="text-2xl font-bold text-gray-800">
                      {user?.name}
                    </h1>
                    <p className="text-gray-500 mb-2">@{user?.username}</p>
                    <p className="text-gray-700 mb-4">
                      {user?.bio || "No bio yet"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex space-x-4 mt-4">
                {isEditing ? (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 shadow-sm font-medium flex items-center disabled:opacity-50"
                      disabled={isUploading}
                    >
                      <CheckIcon className="h-5 w-5 mr-2" />
                      {isUploading ? "Saving..." : "Save"}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm font-medium flex items-center"
                      disabled={isUploading}
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" />
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm font-medium flex items-center"
                  >
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-4 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-gray-800">{joindDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <UserStats user={user} />
      </div>
    </motion.div>
  );
};

export default Profile;
