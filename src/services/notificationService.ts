/**
 * Push Notification Service for AstroFindings P0 MVP
 * Handles browser Web Push / FCM registration and server sync.
 */

export interface DeviceRegistrationResult {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * Requests browser notification permission and registers device with the backend
 */
export async function requestAndRegisterPushNotifications(
  userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
): Promise<DeviceRegistrationResult> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { success: false, error: "Push notifications are not supported by this browser." };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return { success: false, error: "Notification permission was denied." };
    }

    // Generate or retrieve persistent web push device identifier / mock FCM token
    let pushToken = localStorage.getItem("astrofindings_push_token");
    if (!pushToken) {
      pushToken = `fcm_web_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("astrofindings_push_token", pushToken);
    }

    const res = await fetch("/api/notifications/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: pushToken,
        deviceType: "web",
        timezone: userTimezone,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.error || "Failed to register device" };
    }

    return { success: true, token: pushToken };
  } catch (err: any) {
    console.error("Push registration error:", err);
    return { success: false, error: err.message || "Failed to register notifications" };
  }
}
