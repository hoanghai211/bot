import { Experimental_LanguageModelV1Middleware } from "ai";

export const customMiddleware: Experimental_LanguageModelV1Middleware = (next) => async (input: any): Promise<any> => {
  console.log("Input before processing:", input);

  const response = await next(input);

  if (Array.isArray(response.messages)) {
    response.messages = response.messages.slice(-10);
  }

  console.log("Response after processing:", response);
  return response;
};
