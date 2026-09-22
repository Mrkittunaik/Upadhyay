/* ==========================================================================
   layout.js — shared page chrome (nav bar, footer, toast, notifications, mini-profile)
   --------------------------------------------------------------------------
   Every page has <div id="siteNav"></div> and <div id="siteChrome"></div>.
   Call  mountNav('home' | 'jobs' | ...)  and  mountChrome()  once on load.
   Editing the nav here changes it on every page.
   ========================================================================== */

const BRAND_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;"><path d="M12 3L1 8.5L12 14L21 9.7V16.5H23V8.5L12 3Z" fill="white"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5L12 15L5 11.5Z" fill="white" fill-opacity="0.85"/></svg>`;
const BELL_SVG  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

/* ---- Top nav bar --------------------------------------------------------- */
function mountNav(active){
  const el = document.getElementById('siteNav');
  if(!el) return;
  const cls = (n)=> active===n ? ' class="active"' : '';
  el.innerHTML = `
  <nav class="nav">
    <div class="nav-inner">
      <a class="brand" href="${PAGES.home}" style="text-decoration:none; color:inherit;"><div class="brand-mark">${BRAND_SVG}</div>Upadyay</a>
      <div class="nav-links">
        <a href="${PAGES.home}"${cls('home')}>Home</a>
        <a href="${PAGES.home}#faculty">For Faculty</a>
        <a href="${PAGES.home}#employers">For Employers</a>
        <div class="nav-drop" onmouseenter="openNavDrop()" onmouseleave="closeNavDrop()">
          <a href="${PAGES.jobs}"${cls('jobs')}>Browse jobs by type ▾</a>
          <div class="nav-drop-menu" id="navDropMenu">
            <div class="nav-drop-col">
              <span class="nav-drop-label">Schools</span>
              <a href="${PAGES.jobs}?cat=Schools">PGT / TGT / PRT teacher jobs</a>
              <a href="${PAGES.jobs}?cat=Schools">CBSE &amp; ICSE school jobs</a>
              <a href="${PAGES.jobs}?cat=Schools">Principal &amp; coordinator jobs</a>
            </div>
            <div class="nav-drop-col">
              <span class="nav-drop-label">Junior Colleges</span>
              <a href="${PAGES.jobs}?cat=Intermediate">Junior lecturer jobs</a>
              <a href="${PAGES.jobs}?cat=Intermediate">MPC / BiPC / CEC faculty</a>
            </div>
            <div class="nav-drop-col">
              <span class="nav-drop-label">Universities &amp; Colleges</span>
              <a href="${PAGES.jobs}?cat=Higher%20Education">Assistant Professor jobs</a>
              <a href="${PAGES.jobs}?cat=Higher%20Education">Associate / full professor jobs</a>
            </div>
          </div>
        </div>
        <a href="${PAGES.home}#how">How it works</a>
      </div>
      <div class="nav-cta" id="navCta">
        <a class="btn btn-ghost btn-sm" href="${PAGES.login}" style="padding:7px 12px; font-size:12.5px; color:var(--ink-faint); border-color:var(--line); text-decoration:none;">Log in</a>
        <a class="btn btn-primary btn-sm" href="${PAGES.register}" style="text-decoration:none;">Register free</a>
      </div>
      <div class="nav-user" id="navUser" style="display:none;">
        <a href="${PAGES.jobs}" id="navBrowseJobsLink" style="font-size:13.5px; font-weight:600; color:var(--ink-soft); margin-right:4px;">Browse jobs</a>
        <a href="#" id="navDashLink" style="font-size:13.5px; font-weight:600; color:var(--ink-soft); margin-right:4px;">Dashboard</a>
        <button class="nav-bell" onclick="openNotifPanel()">
          ${BELL_SVG}
          <span class="nav-bell-dot" id="navBellDot" style="display:none;"></span>
        </button>
        <button class="nav-avatar-btn" id="navAvatarBtn" onclick="openMiniProfile()">
          <img id="navAvatarImg" src="">
        </button>
      </div>
    </div>
  </nav>
  <div class="nav-spacer" id="navSpacer"></div>`;
  updateNavForLogin();
  syncNavSpacer();
  window.addEventListener('resize', syncNavSpacer);
}
function syncNavSpacer(){
  const nav = document.querySelector('.nav');
  const spacer = document.getElementById('navSpacer');
  if(nav && spacer) spacer.style.height = nav.offsetHeight + 'px';
}

/* ---- Footer + toast + mini profile + notifications ----------------------- */
function mountChrome(opts){
  opts = opts || {};
  const el = document.getElementById('siteChrome');
  if(!el) return;
  el.innerHTML = `
  ${opts.noFooter ? '' : `  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <div class="footer-brand"><div class="brand-mark"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;"><path d="M12 3L1 8.5L12 14L21 9.7V16.5H23V8.5L12 3Z" fill="white"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5L12 15L5 11.5Z" fill="white" fill-opacity="0.85"/></svg></div>Upadyay</div>
          <p>India's faculty recruitment platform — connecting schools, junior colleges and universities with verified teaching talent.</p>
        </div>
        <div class="footer-col">
          <h5>Platform</h5>
          <a href="${PAGES.home}#faculty">For Faculty</a>
          <a href="${PAGES.home}#employers">For Employers</a>
          <a href="${PAGES.home}#categories">Categories</a>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <a href="javascript:void(0)" onclick="showGenericToast('About Upadyay — coming soon')">About</a>
          <a href="javascript:void(0)" onclick="showGenericToast('Contact page — coming soon')">Contact</a>
          <a href="javascript:void(0)" onclick="showGenericToast('Help centre — coming soon')">Help centre</a>
        </div>
        <div class="footer-col">
          <h5>Legal</h5>
          <a href="javascript:void(0)" onclick="showGenericToast('Privacy policy — coming soon')">Privacy policy</a>
          <a href="javascript:void(0)" onclick="showGenericToast('Terms of service — coming soon')">Terms</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 Upadyay. All rights reserved.</div>
        <div style="display:flex; align-items:center; gap:18px;">
          <a href="${PAGES.admin}" style="color:#7E93BE;">Admin</a>
          <span>upadyay.com</span>
        </div>
      </div>
    </div>
  </footer>`}
  <div id="genericToast" style="position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(12px); background:var(--blue-900); color:#fff; font-size:13.5px; font-weight:600; padding:11px 20px; border-radius:5px; box-shadow:var(--shadow-lg); z-index:200; opacity:0; pointer-events:none; transition:opacity .2s ease, transform .2s ease;"></div>
    <div class="mini-scrim" id="miniScrim" onclick="closeMiniProfile()"></div>
  <div class="mini-panel" id="miniPanel">
    <button class="mini-close" onclick="closeMiniProfile()">✕</button>
    <div class="mini-head">
      <img class="mini-avatar" id="miniAvatar" src="">
      <div>
        <h3 id="miniName">Your name</h3>
        <p id="miniDegree">Add your degree</p>
      </div>
    </div>
    <button class="btn btn-light btn-sm" style="width:100%; margin-bottom:4px;" onclick="openFullProfile()">Update profile</button>
    <div class="mini-section">
      <div class="mini-section-head">
        <h4>Your profile performance</h4>
      </div>
      <div class="mini-stats">
        <div><span class="num tabular" id="miniViews">12</span><label>Search appearances</label></div>
        <div><span class="num tabular" id="miniActions">4</span><label>Recruiter actions</label></div>
      </div>
    </div>
    <div class="mini-section">
      <div class="mini-section-head">
        <h4>Your preferences</h4>
      </div>
      <p style="font-size:12px; color:var(--ink-faint); margin:0 0 10px;">Matched roles are based on these.</p>
      <div id="miniPrefTags" style="display:flex; flex-wrap:wrap; gap:6px;"></div>
    </div>
    <div class="mini-links">
      <a href="javascript:void(0)" id="miniBrowseJobsLink" onclick="closeMiniProfile(); openBrowseJobs();">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Browse jobs
      </a>
      <a href="javascript:void(0)" onclick="openFullProfile()">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Career guidance
      </a>
      <a href="javascript:void(0)" onclick="openFullProfile()">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Settings
      </a>
      <a href="javascript:void(0)" onclick="logoutUser()">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Logout
      </a>
    </div>
  </div>
    <div class="notif-panel" id="notifPanel">
    <div class="notif-panel-head">
      <span>Notifications</span>
      <button class="mini-close" style="position:static; width:26px; height:26px;" onclick="closeNotifPanel()">✕</button>
    </div>
    <div class="notif-panel-list" id="notifPanelList"></div>
  </div>`;
  if(typeof refreshMiniProfile === 'function' && isLoggedIn) refreshMiniProfile();
  if(hasUnreadNotif){
    const d = document.getElementById('navBellDot'); if(d) d.style.display = 'block';
  }
}
