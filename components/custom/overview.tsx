import { motion } from "framer-motion";
import Link from "next/link";

import { LogoGoogle, MessageIcon, VercelIcon } from "./icons";

export const Overview = () => (
  <motion.div
    key="overview"
    className="max-w-[500px] mt-20 mx-4 md:mx-0"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ delay: 0.5 }}
  >
    <div className="bg-muted/50 rounded-2xl p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400">
      <p className="flex justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
        <VercelIcon /> <span>+</span> <MessageIcon />
      </p>
      <motion.p
        className="text-zinc-800 dark:text-zinc-50"
        initial={{ opacity: 0.5, textShadow: "0 0 8px #fff" }}
        animate={{ opacity: 1, textShadow: "0 0 12px #fff" }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        Gặp Tama – trợ lý AI thông minh, đơn giản và dễ sử dụng! 🚀
      </motion.p>
      <p>
        BOT đang trong quá trình thử nghiệm nên có thể lỗi, mọi thắc mắc vui lòng liên hệ admin{" "}
        <Link
          className="text-blue-500 dark:text-blue-400"
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
