"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "framer-motion";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { toast } from "sonner";

import { ArrowUpIcon, PaperclipIcon, StopIcon } from "./icons";
import { PreviewAttachment } from "./preview-attachment";
import useWindowSize from "./use-window-size";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const suggestedActions = [
  {
    title: "Hướng dẫn mẹo học tập giúp tiếp thu nhanh",
    label: "Giúp bạn học hiệu quả hơn!",
    action: "Hãy chia sẻ một mẹo học tập giúp hiểu bài nhanh và nhớ lâu hơn!",
  },
  {
    title: "Trò đùa hài hước giúp thư giãn sau giờ học",
    label: "Kể một câu chuyện cười nào!",
    action: "Bạn có thể kể một câu chuyện cười thú vị giúp thư giãn không?",
  },
];

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  messages,
  append,
  handleSubmit,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [input]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });
    setAttachments([]);
    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [attachments, handleSubmit, setAttachments, width]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;
        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      } else {
        const { error } = await response.json();
        toast.error(error);
      }
    } catch (error) {
      toast.error("Failed to upload file, please try again!");
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );
        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error("Error uploading files!", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments],
  );

  return (
    <div className="relative w-full max-w-[50rem] flex flex-col gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg">
      {/* Suggested Actions */}
      {messages.length === 0 &&
        attachments.length === 0 &&
        uploadQueue.length === 0 && (
          <div className="grid sm:grid-cols-2 gap-4 w-full mx-auto">
            {suggestedActions.map((suggestedAction, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  append({
                    role: "user",
                    content: suggestedAction.action,
                  });
                }}
                className="p-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span className="font-semibold block">{suggestedAction.title}</span>
                <span className="text-sm">{suggestedAction.label}</span>
              </motion.button>
            ))}
          </div>
        )}

      {/* File Input */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
      />

      {/* Attachments */}
      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <div className="flex flex-row gap-2 overflow-x-auto pb-2">
          {attachments.map((attachment) => (
            <PreviewAttachment key={attachment.url} attachment={attachment} />
          ))}
          {uploadQueue.map((filename) => (
            <PreviewAttachment
              key={filename}
              attachment={{
                url: "",
                name: filename,
                contentType: "",
              }}
              isUploading={true}
            />
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Hãy nhập nội dung của bạn..."
          value={input}
          onChange={handleInput}
          className="min-h-[40px] w-full resize-none rounded-2xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
          rows={3}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (isLoading) {
                toast.error("Đang xử lý, vui lòng chờ...");
              } else {
                submitForm();
              }
            }
          }}
        />

        {/* Buttons */}
        {isLoading ? (
          <Button
            className="absolute bottom-3 right-3 bg-red-600 text-white hover:bg-red-700 rounded-full p-3 transition-all hover:scale-105"
            onClick={(event) => {
              event.preventDefault();
              stop();
            }}
          >
            <StopIcon size={16} />
          </Button>
        ) : (
          <Button
            className="absolute bottom-3 right-3 bg-green-600 text-white hover:bg-green-700 rounded-full p-3 transition-all hover:scale-105 disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0 || uploadQueue.length > 0}
          >
            <ArrowUpIcon size={16} />
          </Button>
        )}

        <Button
          className="absolute bottom-3 right-14 bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 rounded-full p-3 transition-all"
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current?.click();
          }}
          disabled={isLoading}
        >
          <PaperclipIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
