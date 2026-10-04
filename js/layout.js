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

/* ---- Footer config: edit these links / brand names ---------------------- */
const FOOTER_SOCIAL = {
  facebook:  '#',   // e.g. https://facebook.com/yourpage
  instagram: '#',   // e.g. https://instagram.com/youraccount
  x:         '#',   // e.g. https://x.com/youraccount
  linkedin:  '#'    // e.g. https://linkedin.com/company/yourpage
};
const FOOTER_COLLAB = [
  {name:"Google", path:"M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"},
  {name:"Meta", path:"M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"},
  {name:"Spotify", path:"M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"},
  {name:"Airbnb", path:"M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z"},
  {name:"Notion", path:"M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"},
  {name:"GitHub", path:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},
  {name:"Figma", path:"M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"},
  {name:"Shopify", path:"M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"},
  {name:"Stripe", path:"M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"},
  {name:"PayPal", path:"M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z"},
  {name:"NVIDIA", path:"M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"},
  {name:"Netflix", path:"m5.398 0 8.348 23.602c2.346.059 4.856.398 4.856.398L10.113 0H5.398zm8.489 0v9.172l4.715 13.33V0h-4.715zM5.398 1.5V24c1.873-.225 2.81-.312 4.715-.398V14.83L5.398 1.5z"}
];   // demo brands (Simple Icons, free SVG, no background). Replace with your real partners.
const SOC_ICONS = {
  facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  x:         '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8S14 14.8 14 16v5h-4z"/></svg>'
};
const footerSocialHtml = () => Object.keys(FOOTER_SOCIAL).map(k =>
  `<a class="footer-soc" href="${FOOTER_SOCIAL[k]}" target="_blank" rel="noopener" aria-label="${k}">${SOC_ICONS[k]}</a>`).join('');
const footerCollabHtml = () => {
  const item = b => `<span class="footer-collab-item"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${b.path}"/></svg>${b.name}</span>`;
  const row = FOOTER_COLLAB.map(item).join('');
  return `<div class="footer-marquee"><div class="footer-marquee-track">${row}${row}</div></div>`;
};

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
          <div class="footer-brand" style="display:flex; align-items:center; gap:8px;"><img src="data:image/png;base64,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" alt="Upaadhyay" style="height:40px; width:auto; display:block;">Upaadhyay</div>
          <p>India's faculty recruitment platform — connecting schools, junior colleges and universities with verified teaching talent.</p>
          <div class="footer-connect"><h5>Connect with us</h5><div class="footer-socials">${footerSocialHtml()}</div></div>
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
        <div class="footer-app">
          <h5>Apply on the go</h5>
          <p>Get real-time job updates on our app</p>
          <div class="footer-stores">
            <button type="button" class="footer-store" onclick="showGenericToast('Mobile app — coming soon')"><small>GET IT ON</small><b>Google Play</b></button>
            <button type="button" class="footer-store" onclick="showGenericToast('Mobile app — coming soon')"><small>Download on the</small><b>App Store</b></button>
          </div>
        </div>
      </div>
      <div class="footer-collab"><span class="footer-collab-label">Our collaborations</span>${footerCollabHtml()}</div>
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
