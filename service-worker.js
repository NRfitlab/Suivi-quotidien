self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});

self.addEventListener("push", event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) {}
  event.waitUntil(self.registration.showNotification(d.title || "Rappel", {
    body: d.body || "",
    icon: "./icons/icon-192.png",
    badge: "./icons/favicon-32.png",
    tag: "rappel-quotidien",
    data: { url: d.url || "./" }
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.startsWith(url) && "focus" in c) return c.focus();
    return clients.openWindow(url);
  }));
});
// v2
