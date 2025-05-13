import { Experimental_LanguageModelV1Middleware } from "ai";

// Định nghĩa kiểu tùy chỉnh (giả định dựa trên logic hiện tại)
interface CustomRequest {
  // Thêm các thuộc tính phù hợp với cấu trúc request
  [key: string]: any;
}

interface CustomResponse {
  messages?: any[];
  [key: string]: any;
}

export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  onRequest: (request: CustomRequest, next) => {
    // Logic xử lý trước khi gửi request
    console.log("Processing request:", request);
    return next(request);
  },
  onResponse: (response: CustomResponse, next) => {
    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }
    console.log("Processed response:", response);
    return next(response);
  },
};
