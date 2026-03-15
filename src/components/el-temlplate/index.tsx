"use client";
import useAdDisplay from "@/hooks/useAdDisplay";
import { forwardRef, useEffect, useRef, useState } from "react";

interface AdTemplateProps {
  id: string;
  className?: string;
  "data-ad-client": string;
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive"?: boolean | string;
  "data-ad-channel"?: string;
  style?: React.CSSProperties;
  channelId?: string;
}

const ElTemplate = forwardRef<HTMLModElement, AdTemplateProps>(function AdTemplate(props, ref) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [status, setStatus] = useState<"pending" | "filled" | "unfilled">("pending");

  useAdDisplay(adRef, setStatus);

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) {
      return;
    }

    if (
      adElement.dataset.adInit === "true" ||
      adElement.getAttribute("data-adsbygoogle-status") === "done"
    ) {
      return;
    }

    let cancelled = false;
    const frameId = window.requestAnimationFrame(() => {
      const currentAdElement = adRef.current;
      if (
        cancelled ||
        !currentAdElement ||
        currentAdElement.dataset.adInit === "true" ||
        currentAdElement.getAttribute("data-adsbygoogle-status") === "done"
      ) {
        return;
      }

      currentAdElement.dataset.adInit = "true";

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (error) {
        currentAdElement.dataset.adInit = "false";
        console.error("Failed to initialize AdSense slot:", error);
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [props.id, props["data-ad-slot"]]);

  const setRefs = (node: HTMLModElement | null) => {
    adRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  return (
    <div
      className="ad-placeholder"
      data-ad-ui-status={status}
      aria-busy={status === "pending"}
      style={{
        textAlign: "center",
        paddingBlock: 12,
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <p className="ad-placeholder__label">Sponsored</p>
      <ins 
        ref={setRefs}
        {...props}
        {...process.env.NODE_ENV === 'development' ? { "data-adtest": "on" } : {}}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          ...(props.style ?? {}),
        }}
      />
      {status === "unfilled" ? (
        <p className="ad-placeholder__fallback">Ad space is warming up. Please check back shortly.</p>
      ) : null}
    </div>
  );
});

export default ElTemplate;
