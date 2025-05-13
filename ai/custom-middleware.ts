import { Experimental_LanguageModelV1Middleware } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  onRequest: (request: any, next) => {
    // Tạm thời sử dụng 'any' nếu không có kiểu chính xác
    // Logic xử lý trước khi gửi request
    return next(request);
  },
  onResponse: (response: any, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }
    return next(response);
  },
};
