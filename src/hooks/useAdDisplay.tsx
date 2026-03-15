import { RefObject, useEffect, useRef } from "react";

import { trackTikTokEvent } from "@/utils/track-tiktok";

export type AdDisplayStatus = "pending" | "filled" | "unfilled";

// Monitor ad fill state and count a view only after the iframe stays visible long enough.
const useAdDisplay = (
  adRef: RefObject<HTMLElement>,
  onStatusChange?: (status: AdDisplayStatus) => void
) => {
  const timeoutIdRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(1000);
  const startTimestampRef = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const trackedViewRef = useRef(false);

  useEffect(() => {
    const el = adRef.current;
    if (!el) {
      return;
    }

    const clearCountdown = () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      startTimestampRef.current = null;
      remainingTimeRef.current = 1000;
    };

    const cleanupIntersection = () => {
      clearCountdown();
      intersectionObserverRef.current?.disconnect();
      intersectionObserverRef.current = null;
    };

    const getStatus = () => {
      const status = el.getAttribute("data-ad-status");

      if (status === "filled" || status === "unfilled") {
        return status;
      }

      return "pending";
    };

    const syncStatus = () => {
      const status = getStatus();
      onStatusChange?.(status);
      return status;
    };

    const onCountdownEnd = (iframe: HTMLIFrameElement) => {
      if (!trackedViewRef.current && iframe.getAttribute("src")) {
        trackTikTokEvent("ViewContent");
        trackedViewRef.current = true;
      }
      cleanupIntersection();
    };

    const startCountdown = (iframe: HTMLIFrameElement) => {
      if (timeoutIdRef.current !== null || trackedViewRef.current) {
        return;
      }

      startTimestampRef.current = Date.now();
      timeoutIdRef.current = window.setTimeout(() => {
        onCountdownEnd(iframe);
      }, remainingTimeRef.current);
    };

    const pauseCountdown = () => {
      if (timeoutIdRef.current === null) {
        return;
      }

      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;

      if (startTimestampRef.current !== null) {
        remainingTimeRef.current = Math.max(
          0,
          remainingTimeRef.current - (Date.now() - startTimestampRef.current)
        );
      }

      startTimestampRef.current = null;
    };

    const setupIntersectionObserver = () => {
      if (intersectionObserverRef.current || trackedViewRef.current) {
        return;
      }

      const iframe = el.querySelector("iframe");
      if (!(iframe instanceof HTMLIFrameElement)) {
        return;
      }

      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCountdown(iframe);
              return;
            }

            pauseCountdown();
          });
        },
        { threshold: 0.1 }
      );

      intersectionObserverRef.current.observe(iframe);
    };

    const handleMutation = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
          const status = syncStatus();

          if (status === "filled") {
            setupIntersectionObserver();
          } else if (status === "unfilled") {
            cleanupIntersection();
          }

          continue;
        }

        if (mutation.type === "childList" && getStatus() === "filled") {
          setupIntersectionObserver();
        }
      }
    };

    syncStatus();

    if (getStatus() === "filled") {
      setupIntersectionObserver();
    }

    mutationObserverRef.current = new MutationObserver(handleMutation);
    mutationObserverRef.current.observe(el, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
      childList: true,
      subtree: true,
    });

    return () => {
      clearCountdown();
      cleanupIntersection();
      mutationObserverRef.current?.disconnect();
      mutationObserverRef.current = null;
    };
  }, [adRef, onStatusChange]);

  return null;
};

export default useAdDisplay;
