import { Experimental_LanguageModelV1Middleware, LanguageModel, LanguageModelOutput } from "ai";

// Middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = (next) => {
  return async (input: LanguageModel): Promise<LanguageModelOutput> => {
    // Xử lý trước khi gửi yêu cầu
    console.log("Input before processing:", input);

    // Gửi yêu cầu tới mô hình ngôn ngữ
    const response = await next(input);

    // Xử lý sau khi nhận phản hồi
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10); // Giới hạn tin nhắn gần nhất
    }

    console.log("Response after processing:", response);
    return response;
  };
};
