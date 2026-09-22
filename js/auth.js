// ---------- Demo jobs/profiles tabs ----------
  function switchDemo(which, btn){
    document.getElementById('demoJobs').style.display = which==='jobs' ? 'grid' : 'none';
    document.getElementById('demoProfiles').style.display = which==='profiles' ? 'grid' : 'none';
    document.querySelectorAll('.demo-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
  }

  // ---------- Auth modal ----------
  let authMode = 'login';
  let authMethod = 'email';
  let authOtpSent = false;
  let intendedPanel = 'search';
  let selectedRole = null;
  // isLoggedIn, currentRole, currentUser now live in store.js (persisted across pages)

  let popupMode = 'register';

  // Old behaviour opened a modal. Now these navigate to the real login / register pages.
  function openAuth(panel){
    goTo('login', { role: panel==='post' ? 'company' : 'seeker' });
  }
  function openAuthRegister(panel){
    goTo('register', { role: panel==='post' ? 'company' : 'seeker' });
  }
  function closeAuth(){ goTo('home'); }

  // Called once by login.html / register.html on load.
  //   mode = 'login' | 'register'   (fixed by which page it is)
  //   role comes from ?role=seeker|company
  function initAuthPage(mode){
    if(isLoggedIn){ goTo(dashboardPageForRole()); return; }   // already signed in
    const role = getParam('role') === 'company' ? 'company' : 'seeker';
    selectedRole = role;
    intendedPanel = role==='company' ? 'post' : 'search';
    authMethod = 'email';
    authOtpSent = false;
    updateAuthLeftPanel(intendedPanel);
    setAuthMethod('email');
    setAuthTab(mode);
    document.getElementById('authOverlay').classList.add('open');
  }

  function updateAuthLeftPanel(panel){
    const isCompany = panel === 'post';
    document.getElementById('apPageTag').textContent = isCompany ? 'Employer account' : 'Faculty account';
    document.getElementById('apLeftHeading').textContent = isCompany
      ? 'Hire verified faculty for your institution'
      : "India's dedicated faculty recruitment platform";
    document.getElementById('apLeftSub').textContent = isCompany
      ? 'Post roles and reach qualified teachers across schools, junior colleges and universities — free while you get started.'
      : 'Built only for teaching roles — schools, junior colleges and universities hiring verified faculty, with no middlemen.';
    document.getElementById('apFeatureList').innerHTML = isCompany ? `
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21V4.5L12 2L20 4.5V21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 21V16H15V21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
        <div><div class="ft">Post roles in minutes</div><div class="fs">Create an institution profile once, then post as many teaching roles as you need.</div></div>
      </div>
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 8.5L12 14L23 8.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <div><div class="ft">Verified faculty profiles</div><div class="fs">Every candidate profile includes qualification, subject and experience up front.</div></div>
      </div>
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/></svg></span>
        <div><div class="ft">Free for 2 years</div><div class="fs">No platform fee for institutions while Upadyay grows across India.</div></div>
      </div>` : `
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 8.5L12 14L23 8.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <div><div class="ft">One profile, every opportunity</div><div class="fs">Build your faculty profile once and apply across schools, colleges and universities.</div></div>
      </div>
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/></svg></span>
        <div><div class="ft">Verified institutions only</div><div class="fs">Every employer on Upadyay is a genuine school, junior college or university.</div></div>
      </div>
      <div class="ap-feature">
        <span class="fi"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
        <div><div class="ft">Category-first search</div><div class="fs">Filter by Schools, Intermediate or Higher Education to find the right fit fast.</div></div>
      </div>`;
  }

  function setAuthMethod(method){
    authMethod = method;
    authOtpSent = false;
    document.getElementById('methodEmail').classList.toggle('active', method==='email');
    document.getElementById('methodPhone').classList.toggle('active', method==='phone');
    document.getElementById('authEmailFields').style.display = method==='email' ? 'block' : 'none';
    document.getElementById('authPhoneFields').style.display = method==='phone' ? 'block' : 'none';
    document.getElementById('authOtpField').style.display = 'none';
    document.getElementById('authSendOtpBtn').textContent = 'Send OTP';
    document.getElementById('authError').style.display = 'none';
  }
  function sendAuthOtp(){
    const phone = document.getElementById('authPhoneInput').value.trim();
    const errEl = document.getElementById('authError');
    if(phone.length < 10){
      errEl.textContent = 'Enter a valid 10-digit mobile number.';
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';
    authOtpSent = true;
    document.getElementById('authOtpField').style.display = 'block';
    document.getElementById('authSendOtpBtn').textContent = 'Resend OTP';
    showGenericToast('OTP sent to +91 ' + phone + ' (demo)');
  }

  function setAuthTab(mode){
    authMode = mode;
    document.getElementById('backToLoginLink').style.display = 'block';
    document.getElementById('backToLoginLink').innerHTML = mode==='register'
      ? '<a href="javascript:void(0)" onclick="goTo(\'login\',{role:selectedRole})" style="font-size:13px; font-weight:600; color:var(--blue-700); display:inline-flex; align-items:center; gap:5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Already have an account? Log in</a>'
      : '<a href="javascript:void(0)" onclick="goTo(\'register\',{role:selectedRole})" style="font-size:13px; font-weight:600; color:var(--blue-700);">New here? Create an account</a>';
    const isCompany = selectedRole === 'company';
    document.getElementById('fieldName').style.display = (mode==='register' && !isCompany) ? 'flex' : 'none';
    document.getElementById('fieldCompanyName').style.display = (mode==='register' && isCompany) ? 'flex' : 'none';
    document.getElementById('fieldContactPerson').style.display = (mode==='register' && isCompany) ? 'flex' : 'none';
    document.querySelector('#authOverlay form').style.display = 'block';
    document.getElementById('authTitle').textContent = mode==='register'
      ? (isCompany ? 'Create your institution account' : 'Create your faculty account')
      : (isCompany ? 'Welcome back' : 'Welcome back');
    document.getElementById('authSub').textContent = mode==='register' ? 'Register free to continue' : 'Log in to continue';
    document.getElementById('authSubmitBtn').textContent = mode==='register' ? 'Register free' : 'Log in';
    document.getElementById('authError').style.display = 'none';
  }

  function openRolePopup(mode){
    popupMode = mode || 'register';
    const isLogin = popupMode === 'login';
    document.getElementById('rolePopupTitle').textContent = isLogin ? 'Log in as' : 'Join Upadyay as';
    document.getElementById('rolePopupSub').textContent = isLogin ? 'Choose your account type to continue' : 'Choose how you want to use Upadyay';
    document.getElementById('popupRoleSeekerDesc').textContent = isLogin ? 'Faculty account' : 'Find faculty roles';
    document.getElementById('popupRoleCompanyDesc').textContent = isLogin ? 'Institution account' : 'Hire faculty';
    document.getElementById('rolePopupOverlay').classList.add('open');
  }
  function closeRolePopup(){
    document.getElementById('rolePopupOverlay').classList.remove('open');
  }
  function pickRoleFromPopup(role){
    closeRolePopup();
    goTo(popupMode === 'login' ? 'login' : 'register', { role });
  }

  function submitAuth(e){
    e.preventDefault();
    const errEl = document.getElementById('authError');
    errEl.style.display = 'none';
    const wasRegister = authMode === 'register';
    const isCompanyRole = selectedRole === 'company';
    const nameInput = document.getElementById('authNameInput');
    const companyNameInput = document.getElementById('authCompanyNameInput');
    const contactPersonInput = document.getElementById('authContactPersonInput');
    let name = '';
    let companyName = '';
    let emailVal = '';
    let phoneVal = '';

    if(wasRegister && isCompanyRole){
      companyName = companyNameInput.value.trim();
      const contactName = contactPersonInput.value.trim();
      if(!companyName || !contactName){
        errEl.textContent = 'Enter your institution name and contact person.';
        errEl.style.display = 'block';
        return false;
      }
      name = contactName;
    }

    if(authMethod === 'email'){
      emailVal = document.getElementById('authEmailInput').value.trim();
      const pass = document.getElementById('authPasswordInput').value;
      if(!emailVal || !pass){
        errEl.textContent = 'Enter your email and password.';
        errEl.style.display = 'block';
        return false;
      }
      if(!name) name = (wasRegister && nameInput.value.trim()) ? nameInput.value.trim() : (emailVal.split('@')[0] || 'User');
    } else {
      phoneVal = document.getElementById('authPhoneInput').value.trim();
      const otp = document.getElementById('authOtpInput').value.trim();
      if(phoneVal.length < 10){
        errEl.textContent = 'Enter a valid 10-digit mobile number.';
        errEl.style.display = 'block';
        return false;
      }
      if(!authOtpSent){
        errEl.textContent = 'Send and enter the OTP first.';
        errEl.style.display = 'block';
        return false;
      }
      if(otp.length < 6){
        errEl.textContent = 'Enter the 6-digit OTP.';
        errEl.style.display = 'block';
        return false;
      }
      if(!name) name = (wasRegister && nameInput.value.trim()) ? nameInput.value.trim() : ('User ' + phoneVal.slice(-4));
    }

    isLoggedIn = true;
    currentRole = intendedPanel==='post' ? 'company' : 'seeker';
    currentUser.name = name;
    if(companyName) currentUser.companyName = companyName;
    currentUser.loginMethod = authMethod;
    if(emailVal) currentUser.email = emailVal;
    if(phoneVal) currentUser.phone = phoneVal;
    const idKey = (emailVal || phoneVal || '').toLowerCase();

    // A brand-new account lands on the profile section once, permanently.
    const seenKey = 'upadyay_profile_seen_' + idKey;
    const isFirstEverLogin = wasRegister && !localStorage.getItem(seenKey);
    if(isFirstEverLogin) localStorage.setItem(seenKey, '1');

    // Employers: carry the registration details into the company profile form.
    if(currentRole === 'company' && wasRegister){
      if(companyName) currentCompany.name = companyName;
      if(name) currentCompany.contactName = name;
      if(emailVal) currentCompany.email = emailVal;
      if(phoneVal) currentCompany.phone = phoneVal;
    }
    saveState();

    // Real navigation to the dashboard page (state is already saved above).
    goTo(dashboardPageForRole(), isFirstEverLogin ? { welcome: '1' } : null);
    return false;
  }

  function updateNavForLogin(){
    const cta = document.getElementById('navCta'); if(cta) cta.style.display = isLoggedIn ? 'none' : 'flex';
    const usr = document.getElementById('navUser'); if(usr) usr.style.display = isLoggedIn ? 'flex' : 'none';
    if(isLoggedIn){
      const av = document.getElementById('navAvatarImg'); if(av) av.src = currentUser.avatar;
      if(document.getElementById('miniPanel')) refreshMiniProfile();
    }
    const isSeeker = isLoggedIn && currentRole !== 'company';
    const bjLink = document.getElementById('navBrowseJobsLink');
    if(bjLink) bjLink.style.display = isSeeker ? 'inline' : 'none';
    const dashLink = document.getElementById('navDashLink');
    if(dashLink){ dashLink.href = PAGES[dashboardPageForRole()]; dashLink.style.display = isLoggedIn ? 'inline' : 'none'; }
    const miniLink = document.getElementById('miniBrowseJobsLink');
    if(miniLink) miniLink.style.display = isSeeker ? 'flex' : 'none';
  }

  function logoutUser(){
    clearSession();
    goTo('home');
  }

  function showGenericToast(msg){
    const t = document.getElementById('genericToast');
    if(!t) return;
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(window._genericToastTimer);
    window._genericToastTimer = setTimeout(()=>{
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(12px)';
    }, 1800);
  }

  function openNavDrop(){
    const m1 = document.getElementById('navDropMenu'); if(m1) m1.classList.add('open');
    const m2 = document.getElementById('navDropMenuBj'); if(m2) m2.classList.add('open');
  }
  function closeNavDrop(){
    const m1 = document.getElementById('navDropMenu'); if(m1) m1.classList.remove('open');
    const m2 = document.getElementById('navDropMenuBj'); if(m2) m2.classList.remove('open');
  }
  function quickBrowse(category){
    goTo('jobs', { cat: category });
  }

  function renderNotifPanelList(){
    const list = document.getElementById('notifPanelList');
    list.innerHTML = dashNotifs.length
      ? dashNotifs.map(n=>`<div class="notif-panel-item">${n.text}</div>`).join('')
      : `<div class="notif-panel-empty">No notifications yet.</div>`;
  }
  function openNotifPanel(){
    closeMiniProfile();
    renderNotifPanelList();
    document.getElementById('notifPanel').classList.add('open');
    const navDot = document.getElementById('navBellDot'); if(navDot) navDot.style.display = 'none';
    const bjDot = document.getElementById('bjBellDot'); if(bjDot) bjDot.style.display = 'none';
    hasUnreadNotif = false; saveState();
  }
  function closeNotifPanel(){
    document.getElementById('notifPanel').classList.remove('open');
  }
  document.addEventListener('click', function(e){
    const panel = document.getElementById('notifPanel');
    if(!panel || !panel.classList.contains('open')) return;
    if(panel.contains(e.target)) return;
    if(e.target.closest('.nav-bell')) return;
    closeNotifPanel();
  });

  function openMiniProfile(){
    closeNotifPanel();
    refreshMiniProfile();
    document.getElementById('miniScrim').classList.add('open');
    document.getElementById('miniPanel').classList.add('open');
  }
  function closeMiniProfile(){
    document.getElementById('miniScrim').classList.remove('open');
    document.getElementById('miniPanel').classList.remove('open');
  }
  function refreshMiniProfile(){
    document.getElementById('miniAvatar').src = currentUser.avatar;
    document.getElementById('miniName').textContent = currentUser.name || 'Your name';
    document.getElementById('miniDegree').textContent = currentUser.qualification
      ? `${currentUser.qualification}${currentUser.college ? ' · '+currentUser.college : ''}`
      : (currentRole==='company' ? 'Company account' : 'Add your qualification');
    const tagsWrap = document.getElementById('miniPrefTags');
    if(tagsWrap){
      const tags = [currentUser.category, currentUser.subject, currentUser.location].filter(Boolean);
      tagsWrap.innerHTML = tags.length
        ? tags.map(t=>`<span class="bj-pref-tag">${t}</span>`).join('')
        : `<span style="font-size:12px; color:var(--ink-faint);">Add preferences on your profile to see matches.</span>`;
    }
  }

  function computeCompleteness(){
    const fields = [currentUser.subject, currentUser.qualification, currentUser.category, currentUser.experience, currentUser.location, currentUser.email];
    const filled = fields.filter(v=>v && v.trim()).length;
    return Math.round((filled/fields.length)*100) || 15;
  }

  // The full profile is its own page now (profile.html).
  function openFullProfile(){ goTo('profile'); }
  function closeFullProfile(){ goTo(dashboardPageForRole()); }

  // Called once by profile.html on load: fills the page from saved state.
  function initFullProfilePage(){
    document.getElementById('fpAvatar').src = currentUser.avatar;
    document.getElementById('fpName').textContent = currentUser.name || 'Your name';
    document.getElementById('fpDegree').textContent = currentUser.qualification
      ? `${currentUser.qualification}${currentUser.subject ? ' · '+currentUser.subject : ''}`
      : 'Add your degree and specialisation';
    document.getElementById('fpLocation').textContent = currentUser.location || 'Add location';
    document.getElementById('fpEmail').textContent = currentUser.email || 'Add email';
    document.getElementById('fpCategory').value = currentUser.category || '';
    document.getElementById('fpQualification').value = currentUser.qualification || '';
    document.getElementById('fpExperience').textContent = currentUser.experience || 'Not set';
    document.getElementById('fpSubject').textContent = currentUser.subject || 'Not set';
    document.getElementById('fpEduLine').textContent = currentUser.college || 'Not set';
    const links = currentUser.links || {};
    document.getElementById('fpResume').value = links.resume || '';
    document.getElementById('fpDegreeCertLink').value = links.degreeCert || '';
    document.getElementById('fpPublicationsLink').value = links.publications || '';
    document.getElementById('fpPatentLink').value = links.patent || '';
    document.getElementById('fpPct').textContent = computeCompleteness() + '%';
  }
