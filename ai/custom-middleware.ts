import { Experimental_LanguageModelV1Middleware } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  processMessages: async (messages, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    const limitedMessages = messages.slice(-10);

    // Chuyển tiếp danh sách đã giới hạn đến middleware tiếp theo
    return next(limitedMessages);
  },
};
