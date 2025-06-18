
import { useEffect, useState } from "react";

export default function useFormatTime(timestamp) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!timestamp) return;

    const updateTime = () => {
      const date = new Date(timestamp);
      setTime(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return time;
}
