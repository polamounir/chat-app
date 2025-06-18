import Chat from "../components/home/Chat";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
export default function Home() {
    const socket = useRef();
  
    useEffect(() => {
      socket.current = io("ws://localhost:3000");
  
      socket.current.on("connnection", () => {
        console.log("connected to server");
      });
      console.log("start")
    }, []);
    const handleClick = () => {
      socket.current.emit("message", new Date().getTime());
    };
  
  return (
    <div className="lg:ps-20">
      <Chat />
      <button type="button" onClick={handleClick}>
        Emit a time message
      </button>
    </div>
  );
}
