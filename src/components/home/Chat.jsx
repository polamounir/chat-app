import ChatConversation from "./ChatConversation";
import ChatSection from "./ChatSection";

export default function Chat() {
  return (
    <div className="flex items-center justify-center">
      <div className=" w-full min-h-[88svh] lg:min-h-[95svh] max-h-[88svh] lg:max-h-[95svh] rounded-lg shadow-lg overflow-hidden">
        <div>
          {/* <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-950"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div> */}
        </div>
        <div className=" h-[88svh] lg:h-[95svh] ">
          <ChatSection />
        </div>
      </div>
   
    </div>
  );
}
