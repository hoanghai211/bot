import { Experimental_LanguageModelV1Middleware } from "ai";

// Tắt kiểm tra kiểu tạm thời
export const customMiddleware: any = {
  onRequest: (request, next) => {
    // Logic xử lý tin nhắn (nếu cần)
    return next(request);
  },
  onResponse: (response, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }
    return next(response);
  },
};
