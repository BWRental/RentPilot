// RentPilot : service worker minimal, nécessaire pour l'installer comme application.
// Il ne garde rien en cache : chaque ouverture charge la dernière version publiée.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;   // les données (Supabase) passent sans détour
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>RentPilot</title>' +
    '<body style="font-family:Arial,sans-serif;background:#12263a;color:#fff;display:grid;place-items:center;height:100vh;margin:0;text-align:center">' +
    '<div><h1>RentPilot</h1><p>Pas de connexion internet.<br>Reconnecte-toi puis rouvre l’application.</p></div>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
