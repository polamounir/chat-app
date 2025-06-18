import React from "react";

export default function ChatConversation() {
  return (
    <div className="flex flex-col h-full w-full mx-auto overflow-hidden">
      <div className="bg-indigo-500 text-white px-4 py-2 text-xl font-semibold">
        Chat
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-100/50">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="self-start bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg max-w-xs">
            Hello! How can I help you?
          </div>
        ))}
        <div className="self-start bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg max-w-xs">
          Hello! How can I help you?
        </div>
        <div className="self-end bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-xs">
          I have a question about your services.
        </div>
        <div className="self-start bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg max-w-xs">
          Sure, go ahead!
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 flex">
        <input
          type="text"
          name="messageInput"
          className="flex-1 border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:border-indigo-500"
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Send
        </button>
      </div>
    </div>
  );
}
