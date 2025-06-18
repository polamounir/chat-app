import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { use, useEffect, useRef } from "react";

const StatCard = ({ label, end }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration: 1.5,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, count, end]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center"
    >
      <motion.p
        className="text-2xl font-bold text-gray-800"
        aria-label={`${label} count is ${Math.floor(end)}`}
      >
        {rounded}
      </motion.p>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  );
};

const UserStats = ({ user }) => {
  const stats = [
    { label: "Friends", value: user?.friends || 0 },
    { label: "Requests", value: user?.friendRequests || 0 },
    { label: "Groups", value: user?.groups || 0 },
    { label: "Chats", value: user?.chats || 0 },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((item) => (
        <StatCard key={item.label} label={item.label} end={item.value.length} />
      ))}
    </motion.div>
  );
};

export default UserStats;
