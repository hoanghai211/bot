import { Experimental_LanguageModelV1Middleware } from "ai";

// Định nghĩa middleware phù hợp với kiểu được hỗ trợ
export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  // Nếu middleware này có các hook khác, bạn cần kiểm tra tài liệu của thư viện `ai`
  onRequest: (request, next) => {
    // Xử lý logic tại đây nếu cần, trước khi gửi request
    return next(request);
  },
  onResponse: (response, next) => {
    // Giả sử bạn muốn giới hạn tin nhắn ở đây
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10); // Giới hạn lại còn 10 tin nhắn
    }
    return next(response);
  },
};
