/* ==========================================================================
   api.js — the ONE place the Laravel backend is configured and called.
   Load this BEFORE store.js on every page (admin pages: ../js/api.js).

   Backend URL: change API_BASE below, or set window.UPADYAY_API_BASE in an
   inline <script> before this file (e.g. for staging/production).
   Auth: Laravel Sanctum bearer token. Token is the only thing kept client-side;
   the user and role always come from GET /auth/me.
   ========================================================================== */
(function(){
  const API_BASE = (window.UPADYAY_API_BASE || 'http://localhost:8000/api').replace(/\/+$/, '');
  const TOKEN_KEY = 'upadyay_api_token';
  const ROLE_HINT_KEY = 'upadyay_role_hint';   // first-paint hint only; never used for access decisions

  const SITE_ROOT = (function(){
    try{ const s = document.currentScript.src; return s.substring(0, s.lastIndexOf('/js/') + 1); }
    catch(e){ return '/'; }
  })();

  class ApiError extends Error {
    constructor(message, status, errors){ super(message); this.status = status; this.errors = errors || null; }
  }

  function getToken(){ try{ return localStorage.getItem(TOKEN_KEY); }catch(e){ return null; } }
  function setToken(t){ try{ t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); }catch(e){} }
  function clearAuth(){
    setToken(null);
    try{ localStorage.removeItem(ROLE_HINT_KEY); }catch(e){}
    api.user = null;
  }

  /* Turn a Laravel error body into one readable message (validation errors included). */
  function messageFrom(body, status){
    if(body && body.errors){
      const first = Object.values(body.errors).flat()[0];
      if(first) return String(first);
    }
    if(body && body.message) return body.message;
    return status ? ('Request failed (' + status + ')') : 'Cannot reach the server. Check your connection and try again.';
  }

  function toast(msg){
    if(typeof showGenericToast === 'function' && document.getElementById('genericToast')){ showGenericToast(msg); return; }
    let el = document.getElementById('apiToast');
    if(!el){
      el = document.createElement('div'); el.id = 'apiToast';
      el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0B1F45;color:#fff;padding:10px 16px;border-radius:8px;font-size:13.5px;z-index:99999;max-width:90vw;box-shadow:0 8px 24px rgba(0,0,0,.25);';
      document.body.appendChild(el);
    }
    el.textContent = msg; el.style.display = 'block';
    clearTimeout(el._t); el._t = setTimeout(function(){ el.style.display = 'none'; }, 3500);
  }

  function loginUrl(){
    const inAdmin = /\/admin\//.test(location.pathname);
    return SITE_ROOT + (inAdmin ? 'admin/login.html' : 'pages/login.html');
  }
  function redirectToLogin(){
    if(/\/(login|register)\.html$/.test(location.pathname)) return;   // already on an auth page
    location.replace(loginUrl());
  }

  async function request(method, path, body, opts){
    opts = opts || {};
    const headers = { 'Accept': 'application/json' };
    if(body !== undefined && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';
    const token = getToken();
    if(token) headers['Authorization'] = 'Bearer ' + token;

    let res;
    try{
      res = await fetch(API_BASE + path, {
        method: method, headers: headers,
        body: body === undefined ? undefined : (body instanceof FormData ? body : JSON.stringify(body))
      });
    }catch(e){
      throw new ApiError(messageFrom(null, 0), 0);
    }
    let data = null;
    try{ data = await res.json(); }catch(e){}

    if(res.ok) return data ? data.data : null;

    // 401 = missing/invalid/expired token: drop the session and go to login.
    if(res.status === 401 && !opts.noAuthRedirect){
      clearAuth();
      if(typeof api.onUnauthenticated === 'function') api.onUnauthenticated();
      redirectToLogin();
    }
    // 403 = logged in but not allowed (or blocked account).
    if(res.status === 403 && !opts.silent403) toast(messageFrom(data, 403));
    throw new ApiError(messageFrom(data, res.status), res.status, data && data.errors);
  }

  const api = {
    BASE: API_BASE, SITE_ROOT: SITE_ROOT, ApiError: ApiError,
    user: null,                    // filled by me()/login()/register()
    onUnauthenticated: null,
    getToken: getToken,
    hasToken: function(){ return !!getToken(); },
    roleHint: function(){ try{ return localStorage.getItem(ROLE_HINT_KEY); }catch(e){ return null; } },
    get:    function(p, o){ return request('GET', p, undefined, o); },
    post:   function(p, b, o){ return request('POST', p, b === undefined ? {} : b, o); },
    put:    function(p, b, o){ return request('PUT', p, b === undefined ? {} : b, o); },
    del:    function(p, o){ return request('DELETE', p, undefined, o); },

    _accept: function(payload){
      setToken(payload.token);
      api.user = payload.user;
      try{ localStorage.setItem(ROLE_HINT_KEY, payload.user.role); }catch(e){}
      return payload.user;
    },
    login: async function(email, password){
      const d = await request('POST', '/auth/login', { email: email, password: password }, { noAuthRedirect: true });
      return api._accept(d);
    },
    /* role must be 'candidate' | 'company' (frontend 'seeker' is mapped here). */
    register: async function(fields){
      const body = Object.assign({}, fields);
      if(body.role === 'seeker') body.role = 'candidate';
      const d = await request('POST', '/auth/register', body, { noAuthRedirect: true });
      return api._accept(d);
    },
    logout: async function(){
      try{ if(getToken()) await request('POST', '/auth/logout', {}, { noAuthRedirect: true, silent403: true }); }
      catch(e){ /* token may already be invalid server-side; still clear locally */ }
      clearAuth();
    },
    /* Source of truth for "who am I". Resolves to the user, or null if not logged in. */
    me: async function(){
      if(!getToken()){ api.user = null; return null; }
      try{
        const u = await request('GET', '/auth/me', undefined, { noAuthRedirect: true, silent403: true });
        api.user = u;
        try{ localStorage.setItem(ROLE_HINT_KEY, u.role); }catch(e){}
        return u;
      }catch(e){
        if(e.status === 401 || e.status === 403){ clearAuth(); return null; }   // invalid/expired/blocked
        throw e;                                                                  // network/server error: keep token
      }
    },
    clearAuth: clearAuth,
    redirectToLogin: redirectToLogin,
    toast: toast,
    /* backend role -> frontend role name used throughout the existing UI */
    toUiRole: function(role){ return role === 'company' ? 'company' : (role === 'candidate' ? 'seeker' : role); }
  };
  window.api = api;
})();
