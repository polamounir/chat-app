import ChatConversation from "./ChatConversation";
import ChatMenu from "./ChatMenu";

export default function ChatSection() {
  return (
    <div className="flex h-full bg-white ">
      <div className="h-full">
        <ChatMenu />
      </div>
      <div className="flex-1">
        <ChatConversation />
      </div>
    </div>
  );
}
