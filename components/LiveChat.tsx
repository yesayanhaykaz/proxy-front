"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

type Props = {
  propertyId?: string; // required
  widgetId?: string;   // optional (often required)
};

export default function LiveChat({
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
}: Props) {
  useEffect(() => {
    if (!propertyId) {
      console.warn("Missing NEXT_PUBLIC_TAWK_PROPERTY_ID");
      return;
    }

    // avoid double load
    if (document.getElementById("tawk-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;

    // If widgetId exists => use /propertyId/widgetId (most reliable)
    // else fallback to /propertyId/default
    s.src = widgetId
      ? `https://embed.tawk.to/${propertyId}/${widgetId}`
      : `https://embed.tawk.to/${propertyId}/default`;

    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");

    s.onload = () => console.log("Tawk loaded:", s.src);
    s.onerror = () => console.error("Tawk failed to load:", s.src);

    document.body.appendChild(s);
  }, [propertyId, widgetId]);

  return null;
}
