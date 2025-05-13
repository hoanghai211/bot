import { Experimental_LanguageModelV1Middleware } from "ai";

// Middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = (next) => async (input) => {
  // Logic xử lý trước khi gửi yêu cầu
  console.log("Input before processing:", input);

  // Gửi yêu cầu tới mô hình ngôn ngữ
  const response = await next(input);

  // Logic xử lý sau khi nhận phản hồi
  if (Array.isArray(response.messages)) {
    response.messages = response.messages.slice(-10); // Giới hạn tin nhắn gần nhất
  }

  console.log("Response after processing:", response);
  return response;
};
