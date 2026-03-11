"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/en-US");
  }, []);

  return (
    <main style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      <p>Redirecting to the default locale...</p>
      <p>
        <a href="/en-US">Continue to /en-US</a>
      </p>
    </main>
  );
}
