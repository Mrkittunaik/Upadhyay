// admin/js/auth.js — admin authentication via the Laravel backend (js/api.js).
// No PIN, password or hash lives in the browser any more. The admin signs in with their
// email + password, the backend issues a token, and the backend role ("admin") decides access.
// Requires ../js/api.js to be loaded first.

// Resolves { ok, message }. Non-admin accounts are rejected and their token is revoked.
async function adminLogin(email, password){
  try{
    const user = await api.login(email, password);
    if(user.role !== 'admin'){
      await api.logout();
      return { ok:false, message:'This account does not have admin access.' };
    }
    return { ok:true };
  }catch(e){
    return { ok:false, message:e.message || 'Login failed.' };
  }
}
async function adminLogout(){
  await api.logout();
  window.location.href = "login.html";
}
// Async gate: resolves true only if the backend confirms an active admin session.
async function requireAdmin(){
  let u = null;
  try{ u = await api.me(); }
  catch(e){ api.toast('Cannot reach the server. Please try again.'); return false; }
  if(!u){ window.location.replace("login.html"); return false; }
  if(u.role !== 'admin'){
    api.toast('You do not have access to the admin area.');
    setTimeout(function(){ window.location.replace(api.SITE_ROOT + 'index.html'); }, 900);
    return false;
  }
  return true;
}
