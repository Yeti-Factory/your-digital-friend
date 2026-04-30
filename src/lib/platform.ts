import { useEffect, useState } from "react";

export type IOSBrowser = "safari" | "chrome" | "firefox" | "edge" | "other";

export interface PlatformInfo {
  isIOS: boolean;
  isIPad: boolean;
  isIPhone: boolean;
  isAndroid: boolean;
  isAndroidMobile: boolean;
  isMobile: boolean;
  iosBrowser: IOSBrowser | null;
  isIOSSafari: boolean;
}

export function detectPlatform(): PlatformInfo {
  if (typeof navigator === "undefined") {
    return {
      isIOS: false, isIPad: false, isIPhone: false, isAndroid: false,
      isAndroidMobile: false, isMobile: false, iosBrowser: null, isIOSSafari: false,
    };
  }
  const ua = navigator.userAgent || "";
  const platform = (navigator as any).platform || "";
  const maxTouch = navigator.maxTouchPoints || 0;

  const isIPhone = /iPhone/.test(ua) && !/iPad/.test(ua);
  const isIPod = /iPod/.test(ua);
  // iPadOS desktop mode reports MacIntel + touch
  const isIPad = /iPad/.test(ua) || (platform === "MacIntel" && maxTouch > 1);
  const isIOS = isIPhone || isIPod || isIPad;

  const isAndroid = /Android/i.test(ua) && !/Android TV|GoogleTV/i.test(ua);
  // Mobile keyword distinguishes phone from tablet on Android
  const isAndroidMobile = isAndroid && /Mobile/i.test(ua);

  let iosBrowser: IOSBrowser | null = null;
  if (isIOS) {
    if (/CriOS/i.test(ua)) iosBrowser = "chrome";
    else if (/FxiOS/i.test(ua)) iosBrowser = "firefox";
    else if (/EdgiOS/i.test(ua)) iosBrowser = "edge";
    else if (/Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua)) iosBrowser = "safari";
    else iosBrowser = "other";
  }

  const isMobile = isIPhone || isIPod || isAndroidMobile || (isIPad && maxTouch > 1);

  return {
    isIOS,
    isIPad,
    isIPhone: isIPhone || isIPod,
    isAndroid,
    isAndroidMobile,
    isMobile,
    iosBrowser,
    isIOSSafari: iosBrowser === "safari",
  };
}

export function detectStandalone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia?.("(display-mode: standalone)").matches) return true;
    if (window.matchMedia?.("(display-mode: fullscreen)").matches) return true;
    if (window.matchMedia?.("(display-mode: minimal-ui)").matches) return true;
    if ("standalone" in navigator && (navigator as any).standalone === true) return true;
    // Trusted Web Activity (Android)
    if (document.referrer.startsWith("android-app://")) return true;
  } catch {
    // ignore
  }
  return false;
}

export function useStandalone(): boolean {
  const [standalone, setStandalone] = useState<boolean>(() => detectStandalone());

  useEffect(() => {
    const update = () => setStandalone(detectStandalone());
    const mql = window.matchMedia?.("(display-mode: standalone)");
    mql?.addEventListener?.("change", update);
    window.addEventListener("appinstalled", update);
    return () => {
      mql?.removeEventListener?.("change", update);
      window.removeEventListener("appinstalled", update);
    };
  }, []);

  return standalone;
}
