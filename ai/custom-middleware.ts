import { Experimental_LanguageModelV1Middleware, LanguageModelRequest, LanguageModelResponse } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  onRequest: (request: LanguageModelRequest, next) => {
    // Bạn có thể bổ sung logic xử lý request tại đây nếu cần
    return next(request);
  },
  onResponse: (response: LanguageModelResponse, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }
    return next(response);
  },
};
