import { Experimental_LanguageModelV1Middleware } from "ai";

// Định nghĩa middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  onResponse: (response, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }
    console.log("Processed response:", response);
    return next(response);
  },
};
