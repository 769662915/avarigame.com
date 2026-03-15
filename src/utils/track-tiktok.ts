"use client";

import { TIKTOK_CONTENT_ID } from "@/configs";

const getTikTokPayload = (data?: Record<string, unknown>) => {
  const payload = {
    ...(TIKTOK_CONTENT_ID ? { content_id: TIKTOK_CONTENT_ID } : {}),
    ...data,
  };

  return Object.keys(payload).length > 0 ? payload : undefined;
};

export const trackTikTokEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.ttq?.track?.(eventName, getTikTokPayload(data));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("TikTok Pixel tracking skipped:", error);
    }
  }
};
