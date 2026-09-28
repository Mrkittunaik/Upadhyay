// admin/js/auth.js — admin-only session, 12-digit PIN login.
// Separate localStorage key from the public site.
// DEMO ONLY: front-end code can always be read/bypassed. Real protection needs a backend.
const ADMIN_SESSION_KEY = "upadyay_admin_session";
const ADMIN_LOCK_KEY    = "upadyay_admin_lock";
const ADMIN_PIN_LENGTH  = 12;
// SHA-256 of the PIN (the PIN itself is NOT stored here). To change the PIN, run in a terminal:
//   printf "YOUR12DIGITPIN" | sha256sum
// and paste the result below.
const ADMIN_PIN_HASH = "3faf2cfea68d974177474b2dfa62a24f4eee85e31b185dc36a221d41e00f5dde";
const MAX_TRIES = 5, LOCK_MS = 5 * 60 * 1000;

async function sha256Hex(text){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}
function adminIsLoggedIn(){
  try { return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null")?.ok === true; }
  catch(e){ return false; }
}
// returns ms left if locked, else 0
function adminLockRemaining(){
  try {
    const l = JSON.parse(localStorage.getItem(ADMIN_LOCK_KEY) || "{}");
    return l.until && l.until > Date.now() ? l.until - Date.now() : 0;
  } catch(e){ return 0; }
}
// result: { ok, reason: "format"|"locked"|"wrong"|null, triesLeft, lockMs }
async function adminLoginPin(pin){
  if(!new RegExp("^\\d{" + ADMIN_PIN_LENGTH + "}$").test(pin)) return { ok:false, reason:"format" };
  const left = adminLockRemaining();
  if(left) return { ok:false, reason:"locked", lockMs:left };
  if(await sha256Hex(pin) === ADMIN_PIN_HASH){
    localStorage.removeItem(ADMIN_LOCK_KEY);
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ok:true, at:Date.now() }));
    return { ok:true };
  }
  let l = {}; try { l = JSON.parse(localStorage.getItem(ADMIN_LOCK_KEY) || "{}"); } catch(e){}
  l.fails = (l.fails || 0) + 1;
  if(l.fails >= MAX_TRIES){ l.until = Date.now() + LOCK_MS; l.fails = 0; }
  localStorage.setItem(ADMIN_LOCK_KEY, JSON.stringify(l));
  return { ok:false, reason: l.until && l.until > Date.now() ? "locked" : "wrong",
           triesLeft: MAX_TRIES - l.fails, lockMs: l.until ? l.until - Date.now() : 0 };
}
function adminLogout(){
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "login.html";
}
function requireAdmin(){
  if(!adminIsLoggedIn()){ window.location.replace("login.html"); return false; }
  return true;
}
