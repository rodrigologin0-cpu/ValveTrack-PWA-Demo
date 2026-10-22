// Interface estática apenas; fotos e inspeções ficam em localStorage/IndexedDB.
const CACHE='valvetrack-demo-shell-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('valvetrack-demo-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('./index.html')))}else if(ASSETS.some(x=>new URL(x,self.registration.scope).href===r.url)){e.respondWith(caches.match(r).then(c=>c||fetch(r)))}});
