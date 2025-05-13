import { google } from "@ai-sdk/google";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

// Cấu hình mô hình Google Gemini Pro
export const geminiProModel = wrapLanguageModel({
  model: google("gemini-2.0-flash"),
  middleware: customMiddleware, // Tích hợp middleware tùy chỉnh
});

// Cấu hình mô hình Google Gemini Flash Lite
export const geminiFlashModel = wrapLanguageModel({
  model: google("gemini-2.0-flash-lite-preview-02-05"),
  middleware: customMiddleware, // Tích hợp middleware tùy chỉnh
});
