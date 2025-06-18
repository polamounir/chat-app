import React, { useState } from 'react';
import axios from 'axios';
import {
  UserCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Input({ label, type = "text", name, value, onChange, onFocus, onBlur, isActive, Icon, showPasswordToggle, onTogglePassword }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 border ${
            isActive ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-gray-300'
          } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-150`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onTogglePassword}
          >
            {type === 'password' ? (
              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profilePicture: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setIsSubmitting(false);
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return
    }

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('username', formData.username);
    submitData.append('bio', formData.bio);
    if (formData.profilePicture) {
      submitData.append('profilePicture', formData.profilePicture);
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', submitData);

      setFormData({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        bio: '',
        profilePicture: null,
      });
      toast.success("Registration successful! You can now login.");
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.data?.message || "Registration failed. Please try again.");
      toast.error(err.response?.data?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
            <UserCircleIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-gray-500 mt-2">Join our community today</p>
        </div>

        {/* {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start">
            <ExclamationCircleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )} */}
        {/* 
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100 flex items-start">
            <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>{success}</div>
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "name"}
              Icon={UserIcon}
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setActiveField("email")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "email"}
              Icon={EnvelopeIcon}
            />
            <Input
              label="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setActiveField("username")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "username"}
              Icon={EnvelopeIcon}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setActiveField("password")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "password"}
              Icon={LockClosedIcon}
              showPasswordToggle={true}
              onTogglePassword={togglePasswordVisibility}
            />
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setActiveField("confirmPassword")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "confirmPassword"}
              Icon={LockClosedIcon}
              showPasswordToggle={true}
              onTogglePassword={toggleConfirmPasswordVisibility}
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture (optional)
            </label>
            <div className="flex items-center space-x-4 justify-between">
              <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm ">
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-full w-full text-gray-300 p-4" />
                )}
              </div>
              <label className="cursor-pointer">
                <span className="px-4 py-2.5 border border-gray-300 text-sm rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 inline-flex items-center">
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  Upload
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </span>
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <LockOpenIcon className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}