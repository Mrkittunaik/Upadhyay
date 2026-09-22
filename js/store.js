/* ==========================================================================
   store.js — shared state that survives page navigation
   --------------------------------------------------------------------------
   The app used to be one HTML page, so state lived in plain JS variables.
   With separate pages, every navigation reloads the JS, so anything that must
   carry over (who is logged in, their profile, the company profile, posted
   jobs, notifications) is saved to localStorage here.

   Load this FIRST on every page, before employer.js / auth.js / etc.
   ========================================================================== */

const STORE_KEY = 'upadyay_state_v1';

const DEFAULT_USER = {
  name:'', email:'', avatar:'https://i.pravatar.cc/160?img=68',
  subject:'', qualification:'', category:'', experience:'', location:'', college:''
};
const DEFAULT_COMPANY = {
  name:'', type:'', city:'', website:'', desc:'', contactName:'',
  designation:'', email:'', phone:'', logo:'', saved:false
};

function _loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){ /* corrupt or blocked storage — fall through to defaults */ }
  return {};
}

const _saved = _loadState();

/* ---- shared state (same variable names the old scripts already use) ---- */
let isLoggedIn      = !!_saved.isLoggedIn;
let currentRole     = _saved.currentRole || null;                 // 'seeker' | 'company' | null
let currentUser     = Object.assign({}, DEFAULT_USER,    _saved.currentUser    || {});
let currentCompany  = Object.assign({}, DEFAULT_COMPANY,  _saved.currentCompany || {});
let dashNotifs      = Array.isArray(_saved.dashNotifs) ? _saved.dashNotifs : [];
let hasUnreadNotif  = !!_saved.hasUnreadNotif;
let postedJobs      = _saved.postedJobs || {};        // jobs the employer posted this session
let candidateStatus = _saved.candidateStatus || {};   // invited / shortlisted per faculty id
let postedJobCount  = _saved.postedJobCount || 0;

/* Write everything back. Call after any change to the values above. */
function saveState(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify({
      isLoggedIn, currentRole, currentUser, currentCompany,
      dashNotifs, hasUnreadNotif, postedJobs, candidateStatus, postedJobCount
    }));
  }catch(e){
    /* Storage full (e.g. big base64 avatar) or blocked: drop the heavy image and retry once. */
    try{
      const lite = JSON.parse(JSON.stringify({ currentUser, currentCompany }));
      if(lite.currentUser.avatar && lite.currentUser.avatar.startsWith('data:')) lite.currentUser.avatar = DEFAULT_USER.avatar;
      if(lite.currentCompany.logo && lite.currentCompany.logo.startsWith('data:')) lite.currentCompany.logo = '';
      localStorage.setItem(STORE_KEY, JSON.stringify({
        isLoggedIn, currentRole, currentUser: lite.currentUser, currentCompany: lite.currentCompany,
        dashNotifs, hasUnreadNotif, postedJobs, candidateStatus, postedJobCount
      }));
    }catch(e2){ console.warn('Could not persist state', e2); }
  }
}

function clearSession(){
  isLoggedIn = false;
  currentRole = null;
  saveState();
}

/* ---- tiny navigation helpers so page names + folder layout live in one place ----
   index.html lives at the site root; every other page lives under pages/.
   These paths are root-relative ("/index.html", "/pages/login.html") so
   goTo() and links built by layout.js work the same regardless of which
   folder the current page happens to be in. */
const SITE_ROOT = '/';
const PAGES = {
  home:      SITE_ROOT + 'index.html',
  login:     SITE_ROOT + 'pages/login.html',
  register:  SITE_ROOT + 'pages/register.html',
  jobs:      SITE_ROOT + 'pages/jobs.html',
  faculty:   SITE_ROOT + 'pages/faculty-dashboard.html',
  employer:  SITE_ROOT + 'pages/employer-dashboard.html',
  profile:   SITE_ROOT + 'pages/profile.html',
  admin:     SITE_ROOT + 'pages/admin.html'
};
function goTo(page, params){
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  window.location.href = (PAGES[page] || page) + qs;
}
function getParam(name){
  return new URLSearchParams(window.location.search).get(name);
}
/* Where a logged-in user should land */
function dashboardPageForRole(){
  return currentRole === 'company' ? 'employer' : 'faculty';
}
/* Redirect helper used by protected pages */
function requireLogin(role){
  if(!isLoggedIn){ goTo('login', { role: role === 'company' ? 'company' : 'seeker' }); return false; }
  if(role && currentRole !== role){ goTo(dashboardPageForRole()); return false; }
  return true;
}
