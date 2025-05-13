import { Experimental_LanguageModelV1Middleware, LanguageModelResponse } from "ai";

// Middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = (next) => async (input: any): Promise<LanguageModelResponse> => {
  // Xử lý đầu vào trước khi gửi yêu cầu
  console.log("Input before processing:", input);

  // Gửi yêu cầu tới mô hình ngôn ngữ Gemini
  const response = await next(input);

  // Xử lý đầu ra sau khi nhận phản hồi
  if (Array.isArray(response.messages)) {
    response.messages = response.messages.slice(-10); // Giới hạn 10 tin nhắn gần nhất
  }

  console.log("Response after processing:", response);
  return response;
};
