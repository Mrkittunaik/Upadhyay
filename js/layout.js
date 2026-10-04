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
      <a class="brand" href="${PAGES.home}" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;"><img src="/assets/logo/logo-mark.png" alt="Upaadhyay" style="height:34px; width:auto; display:block;">Upaadhyay</a>
      <div class="nav-links">
        <a href="${PAGES.home}"${cls('home')}>Home</a>
        <a href="${PAGES.home}#faculty" id="navForFacultyLink">For Faculty</a>
        <a href="${PAGES.home}#employers" id="navForEmployersLink">For Employers</a>
        <div class="nav-drop" id="navJobsDropWrap" onmouseenter="openNavDrop()" onmouseleave="closeNavDrop()">
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
        <a href="${PAGES.jobs}" id="navBrowseJobsLink">Browse jobs</a>
        <a href="#" id="navPostJobLink" onclick="goTo('employer',{tab:'post'}); return false;" style="display:none;">Post a job</a>
        <a href="#" id="navBrowseCandidatesLink" onclick="goTo('employer',{tab:'candidates'}); return false;" style="display:none;">Browse candidates</a>
        <a href="#" id="navDashLink">Dashboard</a>
      </div>
      <div class="nav-cta" id="navCta">
        <a class="btn btn-ghost btn-sm" href="${PAGES.login}" style="padding:7px 12px; font-size:12.5px; color:var(--ink-faint); border-color:var(--line); text-decoration:none;">Log in</a>
        <a class="btn btn-primary btn-sm" href="${PAGES.register}" style="text-decoration:none;">Register free</a>
      </div>
      <div class="nav-user" id="navUser" style="display:none;">
        <span id="navRoleBadge" style="display:none; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--blue-700); background:var(--blue-50); padding:3px 8px; border-radius:var(--radius); margin-right:8px;"></span>
        <button class="nav-bell" onclick="openNotifPanel()">
          ${BELL_SVG}
          <span class="nav-bell-dot" id="navBellDot" style="display:none;"></span>
        </button>
        <button class="nav-avatar-btn" id="navAvatarBtn" onclick="openMiniProfile()">
          <img id="navAvatarImg" src="">
        </button>
        <button class="btn btn-ghost btn-sm nav-logout" id="navLogoutBtn" onclick="logoutUser()">Log out</button>
      </div>
    </div>
  </nav>
  <div class="nav-spacer" id="navSpacer"></div>`;
  updateNavForLogin();
  syncNavSpacer();
  // Nav height can change after fonts/avatar images load or content reflows —
  // resync a few times shortly after mount, then keep watching for changes.
  window.addEventListener('resize', syncNavSpacer);
  window.addEventListener('load', syncNavSpacer);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(syncNavSpacer);
  setTimeout(syncNavSpacer, 50);
  setTimeout(syncNavSpacer, 300);
  setTimeout(syncNavSpacer, 1000);
  const navEl = document.querySelector('.nav');
  if(navEl && window.ResizeObserver){
    new ResizeObserver(syncNavSpacer).observe(navEl);
  }
}
function syncNavSpacer(){
  const nav = document.querySelector('.nav');
  const spacer = document.getElementById('navSpacer');
  if(nav && spacer){
    const h = nav.offsetHeight;
    spacer.style.height = h + 'px';
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
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
          <div class="footer-brand" style="display:flex; align-items:center; gap:8px;"><span style="background:#fff; border-radius:2px; padding:3px 6px; display:flex; align-items:center;"><img src="/assets/logo/logo-mark.png" alt="Upaadhyay" style="height:26px; width:auto; display:block;"></span>Upaadhyay</div>
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
    <div class="mini-section" id="miniCompanySection" style="display:none">
      <div class="mini-section-head"><h4>Institution details</h4></div>
      <div id="miniCompanyInfo"></div>
    </div>
    <div class="mini-section" id="miniBranchSection" style="display:none">
      <div class="mini-section-head"><h4>Institution details</h4></div>
      <div id="miniBranchInfo"></div>
    </div>
    <div class="mini-section" id="miniStatsSection">
      <div class="mini-section-head">
        <h4 id="miniStatsHeading">Your profile performance</h4>
      </div>
      <div class="mini-stats">
        <div id="miniStat1Box"><span class="num tabular" id="miniStat1Num">12</span><label id="miniStat1Label">Search appearances</label></div>
        <div><span class="num tabular" id="miniStat2Num">4</span><label id="miniStat2Label">Recruiter actions</label></div>
      </div>
    </div>
    <div class="mini-section" id="miniPrefSection">
      <div class="mini-section-head">
        <h4 id="miniPrefHeading">Your preferences</h4>
      </div>
      <p style="font-size:12px; color:var(--ink-faint); margin:0 0 10px;" id="miniPrefSub">Matched roles are based on these.</p>
      <div id="miniPrefTags" style="display:flex; flex-wrap:wrap; gap:6px;"></div>
    </div>
    <div class="mini-links" id="miniLinksFaculty">
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
    <div class="mini-links" id="miniLinksBranch" style="display:none;">
      <a href="javascript:void(0)" onclick="branchGo('profile');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21V4.5L12 2L20 4.5V21" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 21V16H15V21" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
        Institution profile
      </a>
      <a href="javascript:void(0)" onclick="branchGo('post');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Post a job
      </a>
      <a href="javascript:void(0)" onclick="branchGo('jobs');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H20M4 12H20M4 17H14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Posted jobs
      </a>
      <a href="javascript:void(0)" onclick="branchGo('cands');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Browse candidates
      </a>
      <a href="javascript:void(0)" onclick="branchGo('reqs');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5h16v11H8l-4 4z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Requests
      </a>
      <a href="javascript:void(0)" onclick="logoutUser()">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9M16 17L21 12L16 7M21 12H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Logout
      </a>
    </div>
    <div class="mini-links" id="miniLinksCompany" style="display:none;">
      <a href="javascript:void(0)" onclick="closeMiniProfile(); goTo('employer', {tab:'company'});">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21V4.5L12 2L20 4.5V21" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 21V16H15V21" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
        Company profile
      </a>
      <a href="javascript:void(0)" onclick="closeMiniProfile(); goTo('employer');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Post a job
      </a>
      <a href="javascript:void(0)" onclick="closeMiniProfile(); goTo('employer', {tab:'myjobs'});">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 12H20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 17H14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Posted jobs
      </a>
      <a href="javascript:void(0)" onclick="closeMiniProfile(); goTo('network');">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V9M12 9L5 15M12 9L19 15M5 15V21M19 15V21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Branches
      </a>
      <a href="javascript:void(0)" onclick="closeMiniProfile(); goTo('employer', {tab:'candidates'});">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Browse candidates
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
