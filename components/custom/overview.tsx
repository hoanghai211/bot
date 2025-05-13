import { motion } from "framer-motion";
import Link from "next/link";

export const Overview = () => (
  <motion.div
    key="overview"
    className="max-w-[500px] mt-20 mx-4 md:mx-auto bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 shadow-lg rounded-3xl p-8"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: 0.5 }}
  >
    <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-300">
      <motion.h1
        className="text-center text-xl font-semibold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Gặp Tama – Trợ lý AI thông minh! 🚀
      </motion.h1>
      <motion.p
        className="text-center text-base leading-relaxed"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Đơn giản, hiện đại và dễ sử dụng. Biến ý tưởng của bạn thành hiện thực ngay hôm nay!
      </motion.p>
      <p className="text-center text-sm">
        BOT đang trong quá trình thử nghiệm nên có thể lỗi, mọi thắc mắc vui lòng liên hệ admin {" "}
        <Link
          className="text-blue-600 dark:text-blue-400 font-medium underline"
          href="https://www.facebook.com/1O2OO4"
          target="_blank"
        >
          Telegram
        </Link>
        . Cảm ơn các bạn rất nhiều! 😉
      </p>
    </div>
  </motion.div>
);
