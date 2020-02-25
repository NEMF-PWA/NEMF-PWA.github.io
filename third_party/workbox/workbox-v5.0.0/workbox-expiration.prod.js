this.workbox=this.workbox||{},this.workbox.expiration=function(t,s,e,i,a,n,h){"use strict";try{self["workbox:expiration:5.0.0"]&&_()}catch(t){}const r="workbox-expiration",c="cache-entries",o=t=>{const s=new URL(t,location.href);return s.hash="",s.href};class u{constructor(t){this.t=t,this.s=new i.DBWrapper(r,1,{onupgradeneeded:t=>this.i(t)})}i(t){const s=t.target.result.createObjectStore(c,{keyPath:"id"});s.createIndex("cacheName","cacheName",{unique:!1}),s.createIndex("timestamp","timestamp",{unique:!1}),a.deleteDatabase(this.t)}async setTimestamp(t,s){const e={url:t=o(t),timestamp:s,cacheName:this.t,id:this.h(t)};await this.s.put(c,e)}async getTimestamp(t){return(await this.s.get(c,this.h(t))).timestamp}async expireEntries(t,s){const e=await this.s.transaction(c,"readwrite",(e,i)=>{const a=e.objectStore(c).index("timestamp").openCursor(null,"prev"),n=[];let h=0;a.onsuccess=(()=>{const e=a.result;if(e){const i=e.value;i.cacheName===this.t&&(t&&i.timestamp<t||s&&h>=s?n.push(e.value):h++),e.continue()}else i(n)})}),i=[];for(const t of e)await this.s.delete(c,t.id),i.push(t.url);return i}h(t){return this.t+"|"+o(t)}}class w{constructor(t,s={}){this.o=!1,this.u=!1,this.l=s.maxEntries,this.m=s.maxAgeSeconds,this.t=t,this.p=new u(t)}async expireEntries(){if(this.o)return void(this.u=!0);this.o=!0;const t=this.m?Date.now()-1e3*this.m:0,e=await this.p.expireEntries(t,this.l),i=await self.caches.open(this.t);for(const t of e)await i.delete(t);this.o=!1,this.u&&(this.u=!1,s.dontWaitFor(this.expireEntries()))}async updateTimestamp(t){await this.p.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.m){return await this.p.getTimestamp(t)<Date.now()-1e3*this.m}return!1}async delete(){this.u=!1,await this.p.expireEntries(1/0)}}return t.CacheExpiration=w,t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=(async({event:t,request:e,cacheName:i,cachedResponse:a})=>{if(!a)return null;let n=this.k(a);const h=this.D(i);s.dontWaitFor(h.expireEntries());const r=h.updateTimestamp(e.url);if(t)try{t.waitUntil(r)}catch(t){}return n?a:null}),this.cacheDidUpdate=(async({cacheName:t,request:s})=>{const e=this.D(t);await e.updateTimestamp(s.url),await e.expireEntries()}),this.N=t,this.m=t.maxAgeSeconds,this.g=new Map,t.purgeOnQuotaError&&h.registerQuotaErrorCallback(()=>this.deleteCacheAndMetadata())}D(t){if(t===n.cacheNames.getRuntimeName())throw new e.WorkboxError("expire-custom-caches-only");let s=this.g.get(t);return s||(s=new w(t,this.N),this.g.set(t,s)),s}k(t){if(!this.m)return!0;const s=this._(t);return null===s||s>=Date.now()-1e3*this.m}_(t){if(!t.headers.has("date"))return null;const s=t.headers.get("date"),e=new Date(s).getTime();return isNaN(e)?null:e}async deleteCacheAndMetadata(){for(const[t,s]of this.g)await self.caches.delete(t),await s.delete();this.g=new Map}},t}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core);
//# sourceMappingURL=workbox-expiration.prod.js.map
