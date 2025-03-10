/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { urlBase64ToUint8Array } from "@/lib/pwa";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/actions/push-notifications";

export default function NotificationBanner() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }

    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg md:hidden">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
        {!isStandalone && (
          <Button
            size="sm"
            className="w-full"
            onClick={async () => {
              await navigator.share({
                title: "StockQuest",
                text: "Check out StockQuest, the best stock market simulator!",
                url: window.location.href,
              });
            }}
          >
            Add to Home Screen
          </Button>
        )}
      </div>
    </div>
  );
}
