import {
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  PaperClipIcon,
  FaceSmileIcon,
  BellAlertIcon,
  MoonIcon,
  SunIcon,
  BoltIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-100 hover:shadow-md transition-shadow">
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-lg bg-indigo-50 mr-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function AboutPage() {
  const mvpFeatures = [
    {
      icon: ShieldCheckIcon,
      title: "Secure Authentication",
      description:
        "Sign up and login with JWT-based sessions for secure access to your conversations.",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Real-Time Messaging",
      description:
        "Instant 1-on-1 private chats powered by WebSockets for seamless communication.",
    },
    {
      icon: UserPlusIcon,
      title: "Contact Management",
      description:
        "Search for users and start new conversations with an intuitive contact list.",
    },
    {
      icon: ClockIcon,
      title: "Message Status",
      description:
        "See when messages are delivered and read with seen/unseen indicators.",
    },
  ];

  const intermediateFeatures = [
    {
      icon: UsersIcon,
      title: "Dark/Light Mode",
      description:
        "Switch between themes for comfortable viewing in any environment.",
    },
    {
      icon: UserGroupIcon,
      title: "Group Chats",
      description:
        "Create, rename, and manage groups with custom avatars for team communication.",
    },
    {
      icon: PaperClipIcon,
      title: "Media Sharing",
      description:
        "Share images, videos, and files with preview and download support.",
    },
    {
      icon: FaceSmileIcon,
      title: "Message Reactions",
      description: "Express yourself with emoji reactions to messages.",
    },
    {
      icon: BellAlertIcon,
      title: "Push Notifications",
      description:
        "Get browser notifications for new messages when you're away.",
    },
    // {
    //   icon: BoltIcon,
    //   title: "Typing Indicators",
    //   description: "See when others are typing in real-time."
    // },
    {
      icon: MoonIcon,
      title: "Dark/Light Mode",
      description:
        "Switch between themes for comfortable viewing in any environment.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our Chat App
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting people with a modern, feature-rich messaging experience
            designed for both personal and professional communication.
          </p>
        </div>

        {/* MVP Features */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="h-0.5 bg-indigo-200 flex-1"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mx-4">
              Core Features
            </h2>
            <div className="h-0.5 bg-indigo-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mvpFeatures.map((feature, index) => (
              <FeatureCard key={`mvp-${index}`} {...feature} />
            ))}
          </div>
        </div>

        {/* Intermediate Features */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="h-0.5 bg-indigo-200 flex-1"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mx-4">
              Enhanced Experience
            </h2>
            <div className="h-0.5 bg-indigo-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateFeatures.map((feature, index) => (
              <FeatureCard key={`intermediate-${index}`} {...feature} />
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-indigo-600 font-medium">React</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-indigo-600 font-medium">Socket.IO</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-indigo-600 font-medium">Node.js</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-indigo-600 font-medium">MongoDB</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying seamless
            communication with our app.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm font-medium transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}
