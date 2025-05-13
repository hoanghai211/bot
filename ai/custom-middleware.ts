import { Experimental_LanguageModelV1Middleware } from "ai";

// Định nghĩa middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = (next) => async (input) => {
  // Bổ sung logic xử lý trước khi yêu cầu (pre-request)
  console.log("Input before processing:", input);

  // Gửi yêu cầu đến mô hình ngôn ngữ
  const response = await next(input);

  // Bổ sung logic xử lý sau khi nhận phản hồi (post-response)
  if (Array.isArray(response.messages)) {
    response.messages = response.messages.slice(-10); // Giới hạn tin nhắn gần nhất
  }

  console.log("Response after processing:", response);
  return response;
};
