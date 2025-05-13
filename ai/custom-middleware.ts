import { Experimental_LanguageModelV1Middleware, LanguageModelInput, LanguageModelOutput } from "ai";

// Middleware tùy chỉnh
export const customMiddleware: Experimental_LanguageModelV1Middleware = {
  async execute(input: LanguageModelInput, next): Promise<LanguageModelOutput> {
    console.log("Input before processing:", input);

    // Gửi yêu cầu đến mô hình ngôn ngữ
    const response = await next(input);

    // Giới hạn danh sách tin nhắn chỉ giữ lại 10 tin gần nhất
    if (Array.isArray(response.messages)) {
      response.messages = response.messages.slice(-10);
    }

    console.log("Response after processing:", response);
    return response;
  },
};
