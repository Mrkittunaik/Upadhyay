// ---------- Browse jobs page ----------
  const bjJobs = [
    { title:'Assistant Professor — CSE', org:'KL University · Vijayawada', cat:'Higher Education', tags:['PhD required','Full-time'], posted:2, applicants:34, color:'var(--blue-700)', initials:'KL', minExp:2 },
    { title:'PGT Physics', org:'Delhi Public School · Hyderabad', cat:'Schools', tags:['PG required','CBSE'], posted:5, applicants:61, color:'var(--green)', initials:'DP', minExp:0 },
    { title:'Senior Lecturer — Commerce', org:'Narayana Junior College · Chennai', cat:'Intermediate', tags:['PG required','MPC/CEC'], posted:6, applicants:22, color:'var(--blue-500)', initials:'NR', minExp:3 },
    { title:'TGT Mathematics', org:'Ryan International School · Bengaluru', cat:'Schools', tags:['B.Ed required','CBSE'], posted:1, applicants:18, color:'var(--blue-900)', initials:'RI', minExp:1 },
    { title:'Assistant Professor — English', org:'Osmania University · Hyderabad', cat:'Higher Education', tags:['PhD required','NET/SET'], posted:9, applicants:47, color:'var(--blue-700)', initials:'OU', minExp:4 },
    { title:'Junior Lecturer — Botany', org:'Sri Chaitanya Junior College · Vijayawada', cat:'Intermediate', tags:['PG required','MPC/BiPC'], posted:3, applicants:15, color:'var(--blue-500)', initials:'SC', minExp:0 },
    { title:'PRT Primary Teacher', org:'DAV Public School · Delhi', cat:'Schools', tags:['UG required','CBSE'], posted:1, applicants:29, color:'var(--green)', initials:'DA', minExp:0 },
    { title:'Associate Professor — Management', org:'IIM Ranchi', cat:'Higher Education', tags:['PhD required','UGC-NET'], posted:14, applicants:53, color:'var(--blue-900)', initials:'IR', minExp:6 },
  ];

  // Old behaviour opened an overlay. Now it navigates to jobs.html.
  function openBrowseJobs(){ goTo('jobs'); }
  function closeBrowseJobs(){ goTo(isLoggedIn ? dashboardPageForRole() : 'home'); }

  // Called once by jobs.html on load. Works for logged-in seekers AND visitors.
  function initBrowseJobsPage(){
    const side = document.querySelector('.bj-side');
    if(isLoggedIn && currentRole !== 'company'){
      document.getElementById('bjAvatar').src = currentUser.avatar;
      const bjTopImg = document.getElementById('bjTopAvatarImg'); if(bjTopImg) bjTopImg.src = currentUser.avatar;
      document.getElementById('bjName').textContent = currentUser.name || 'Your name';
      document.getElementById('bjRole').textContent = currentUser.qualification
        ? `${currentUser.qualification}${currentUser.subject ? ' · '+currentUser.subject : ''}`
        : 'Add your degree and specialisation';
      const tagsWrap = document.getElementById('bjPrefTags');
      const tags = [currentUser.category, currentUser.qualification, currentUser.subject].filter(Boolean);
      tagsWrap.innerHTML = tags.length
        ? tags.map(t=>`<span class="bj-pref-tag">${t}</span>`).join('')
        : `<span style="font-size:12.5px; color:var(--ink-faint);">Add preferences on your profile to see matches.</span>`;
    } else if(side){
      side.style.display = 'none';   // visitors / employers have no seeker profile card
    }
    // Category from the URL (?cat=Schools) wins; otherwise pre-check the seeker's own category.
    const catParam = getParam('cat');
    const preselect = catParam || (isLoggedIn && currentRole !== 'company' ? currentUser.category : '');
    if(preselect){
      document.querySelectorAll('.bj-cat-check').forEach(cb=>{ cb.checked = (cb.value === preselect); });
    }
    renderBrowseJobs();
  }
  function applyToJob(title){
    if(!isLoggedIn || currentRole === 'company'){
      goTo('register', { role: 'seeker' });
      return;
    }
    pushNotif('Application sent for ' + title);
    showGenericToast('Application sent for ' + title);
  }

  function clearBrowseFilters(){
    document.querySelectorAll('.bj-cat-check').forEach(cb=> cb.checked = false);
    document.getElementById('bjExpRange').value = 20;
    document.getElementById('bjExpVal').textContent = '20';
    document.querySelector('input[name=bjDate][value=all]').checked = true;
    document.querySelector('input[name=bjDist][value=all]').checked = true;
    document.getElementById('bjKeyword').value = '';
    document.getElementById('bjLocation').value = '';
    renderBrowseJobs();
  }
  function renderBrowseJobs(){
    const keyword = (document.getElementById('bjKeyword').value || '').toLowerCase().trim();
    const checkedCats = Array.from(document.querySelectorAll('.bj-cat-check:checked')).map(cb=>cb.value);
    const maxExp = parseInt(document.getElementById('bjExpRange').value, 10);
    const dateFilter = document.querySelector('input[name=bjDate]:checked').value;

    const filtered = bjJobs.filter(j=>{
      if(keyword && !(`${j.title} ${j.org}`.toLowerCase().includes(keyword))) return false;
      if(checkedCats.length && !checkedCats.includes(j.cat)) return false;
      if(j.minExp > maxExp) return false;
      if(dateFilter !== 'all' && j.posted > parseInt(dateFilter,10)) return false;
      return true;
    });

    document.getElementById('bjResultsCount').textContent = `${filtered.length} result${filtered.length===1?'':'s'}`;
    const list = document.getElementById('bjJobList');
    if(!filtered.length){
      list.innerHTML = `<div class="bj-empty">No jobs match your filters right now. Try clearing a filter or broadening your search.</div>`;
      return;
    }
    list.innerHTML = filtered.map(j=>`
      <div class="job-card">
        <div class="job-card-top">
          <div class="job-logo" style="background:${j.color};">${j.initials}</div>
          <div><p class="jc-title">${j.title}</p><p class="jc-org">${j.org}</p></div>
          <span class="jc-cat">${j.cat === 'Higher Education' ? 'Higher Ed' : j.cat}</span>
        </div>
        <div class="jc-tags">${j.tags.map(t=>`<span class="hp-tag">${t}</span>`).join('')}</div>
        <div class="jc-foot">
          <span class="jc-posted">Posted ${j.posted} day${j.posted===1?'':'s'} ago · ${j.applicants} applicants</span>
          <button class="btn btn-primary btn-sm" onclick="applyToJob('${j.title.replace(/'/g,"\\'")}')">Apply</button>
        </div>
      </div>
    `).join('');
  }

  // Inline-edit handlers for the View Profile page (image-5 style: edit in place, no separate form)
  function showFpSaveToast(){
    const t = document.getElementById('fpSaveToast');
    if(!t) return;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(window._fpToastTimer);
    window._fpToastTimer = setTimeout(()=>{
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(-8px)';
    }, 1400);
  }
  function fpSaveField(key, value){
    currentUser[key] = (value || '').trim();

    // keep header/derived text in sync without a full re-render
    document.getElementById('fpDegree').textContent = currentUser.qualification
      ? `${currentUser.qualification}${currentUser.subject ? ' · '+currentUser.subject : ''}`
      : 'Add your degree and specialisation';
    if(key === 'college'){
      document.getElementById('fpEduLine').textContent = currentUser.college || 'Add your education';
    }
    document.getElementById('fpPct').textContent = computeCompleteness() + '%';
    const _dn = document.getElementById('dashName'); if(_dn) _dn.textContent = currentUser.name || 'User';
    saveState();
    updateNavForLogin();
    showFpSaveToast();
  }
  function fpSaveLinkField(key, value){
    currentUser.links = currentUser.links || {};
    currentUser.links[key] = value;
    saveState();
    showFpSaveToast();
  }
  function fpUploadAvatar(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){
      currentUser.avatar = ev.target.result;
      document.getElementById('fpAvatar').src = currentUser.avatar;
      saveState();
      updateNavForLogin();
    };
    reader.readAsDataURL(file);
  }

  // ---------- Dashboard top account + notifications ----------
  // dashNotifs now lives in store.js (persisted across pages)
  function pushNotif(text){
    dashNotifs.unshift({ text, time: 'Just now' });
    if(dashNotifs.length > 20) dashNotifs.pop();
    hasUnreadNotif = true;
    saveState();
    const dashDot = document.getElementById('dashBellDot'); if(dashDot) dashDot.style.display = 'block';
    const navDot = document.getElementById('navBellDot'); if(navDot) navDot.style.display = 'block';
    const bjDot = document.getElementById('bjBellDot'); if(bjDot) bjDot.style.display = 'block';
  }
  function refreshDashTopAccount(){
    const isCompany = currentRole==='company';
    const label = isCompany ? (currentCompany.name || 'Institution') : (currentUser.name || 'User');
    const img = document.getElementById('dashTopAvatarImg');
    const init = document.getElementById('dashTopAvatarInit');
    const src = isCompany ? currentCompany.logo : currentUser.avatar;
    if(src){ img.src = src; img.style.display = 'block'; init.style.display = 'none'; }
    else { img.style.display = 'none'; init.style.display = 'flex'; init.textContent = label.slice(0,2).toUpperCase(); }
    document.getElementById('dashMenuName').textContent = label;
    document.getElementById('dashMenuMeta').textContent = isCompany
      ? (currentCompany.email || 'Institution account')
      : (currentUser.email || 'Candidate account');
  }
  function toggleDashAccountMenu(){
    document.getElementById('dashNotifMenu').style.display = 'none';
    const menu = document.getElementById('dashAccountMenu');
    menu.style.display = menu.style.display==='block' ? 'none' : 'block';
  }
  function closeDashAccountMenu(){ document.getElementById('dashAccountMenu').style.display = 'none'; }
  function toggleDashNotifs(){
    document.getElementById('dashAccountMenu').style.display = 'none';
    const menu = document.getElementById('dashNotifMenu');
    const opening = menu.style.display !== 'block';
    menu.style.display = opening ? 'block' : 'none';
    if(opening){
      document.getElementById('dashBellDot').style.display = 'none';
      document.getElementById('dashNotifList').innerHTML = dashNotifs.length
        ? dashNotifs.map(n=>`<div style="padding:10px 14px; border-bottom:1px solid var(--line); font-size:13px; color:var(--ink-soft);">${n.text}</div>`).join('')
        : `<div style="padding:14px; font-size:13px; color:var(--ink-faint);">No notifications yet.</div>`;
    }
  }
  // Called once by faculty-dashboard.html (panel='search') and employer-dashboard.html (panel='post').
  function openDash(name, panel){
    const _dn2 = document.getElementById('dashName'); if(_dn2) _dn2.textContent = name;
    const _da = document.getElementById('dashAvatar'); if(_da) _da.textContent = name.slice(0,2).toUpperCase();
    const _ds = document.getElementById('dashSub');
    if(_ds) _ds.textContent = panel==='post'
      ? (currentCompany.saved ? 'Your poster panel — post jobs, review and invite candidates' : 'Create your institution account to get started')
      : 'Manage your profile and browse jobs';
    const _ps = document.getElementById('panelSearch'); if(_ps) _ps.style.display = panel==='search' ? 'block' : 'none';
    const _pp = document.getElementById('panelPost');   if(_pp) _pp.style.display = panel==='post' ? 'block' : 'none';
    refreshDashTopAccount();
    if(panel==='search'){
      switchDashTab('profile');
      document.getElementById('pfName').value = currentUser.name || name;
      document.getElementById('pfSubject').value = currentUser.subject || '';
      document.getElementById('pfQualification').value = currentUser.qualification || '';
      document.getElementById('pfCategory').value = currentUser.category || '';
      document.getElementById('pfCollege').value = currentUser.college || '';
      document.getElementById('pfExperience').value = currentUser.experience || '';
      document.getElementById('pfLocation').value = currentUser.location || '';
      document.getElementById('pfEmail').value = currentUser.email || '';
      document.getElementById('pfPhone').value = currentUser.phone || '';
      const note = document.getElementById('pfContactNote');
      if(!currentUser.email && currentUser.phone){
        note.textContent = 'You signed up with your phone number — add your email so institutions can reach you both ways.';
        note.style.display = 'block';
      } else if(!currentUser.phone && currentUser.email){
        note.textContent = 'You signed up with email — add your mobile number so institutions and Upadyay can reach you faster.';
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
      document.getElementById('pfResume').value = (currentUser.links && currentUser.links.resume) || '';
      document.getElementById('pfDegreeCert').value = (currentUser.links && currentUser.links.degreeCert) || '';
      pfOnInputProgress();
    }
    if(panel==='post'){
      document.getElementById('employerTabsBar').style.display = currentCompany.saved ? 'flex' : 'none';
      document.getElementById('employerSetupNote').style.display = currentCompany.saved ? 'none' : 'block';
      switchEmployerTab(currentCompany.saved ? 'post' : 'company');
      document.getElementById('coName').value = currentCompany.name || '';
      document.getElementById('coType').value = currentCompany.type || '';
      document.getElementById('coCity').value = currentCompany.city || '';
      document.getElementById('coWebsite').value = currentCompany.website || '';
      document.getElementById('coDesc').value = currentCompany.desc || '';
      document.getElementById('coContactName').value = currentCompany.contactName || '';
      document.getElementById('coDesignation').value = currentCompany.designation || '';
      document.getElementById('coEmail').value = currentCompany.email || '';
      document.getElementById('coPhone').value = currentCompany.phone || '';
      if(currentCompany.logo){
        document.getElementById('logoPreview').src = currentCompany.logo;
        document.getElementById('logoPreview').style.display = 'block';
        document.getElementById('logoPlaceholder').style.display = 'none';
      }
      renderCandidates();
    }
  }
  // "Back to site" from a dashboard
  function closeDash(){ goTo('home'); }

  function pfOnInputProgress(){
    const basics = ['pfName','pfSubject','pfQualification','pfCategory','pfCollege','pfExperience','pfLocation','pfEmail','pfPhone']
      .map(id=>document.getElementById(id).value.trim()).filter(Boolean).length;
    const docs = ['pfResume','pfDegreeCert'].map(id=>document.getElementById(id).value.trim()).filter(Boolean).length;
    const total = 9 + 2;
    const pct = Math.min(100, Math.round(((basics + docs) / total) * 100)) || 15;
    const fill = document.getElementById('pfSideProgressFill');
    const label = document.getElementById('pfSideProgressLabel');
    if(fill){ fill.style.width = pct + '%'; }
    if(label){ label.textContent = pct + '% complete'; }
    const stepBasics = document.getElementById('pfStepBasics');
    const stepDocs = document.getElementById('pfStepDocs');
    if(stepBasics){ stepBasics.classList.toggle('done', basics >= 4); if(basics>=4) stepBasics.querySelector('.dot').textContent = '✓'; }
    if(stepDocs){ stepDocs.classList.toggle('done', docs >= 1); if(docs>=1) stepDocs.querySelector('.dot').textContent = '✓'; }
  }

  function saveProfile(){
    currentUser.name = document.getElementById('pfName').value || currentUser.name || 'User';
    currentUser.subject = document.getElementById('pfSubject').value;
    currentUser.qualification = document.getElementById('pfQualification').value;
    currentUser.category = document.getElementById('pfCategory').value;
    currentUser.college = document.getElementById('pfCollege').value;
    currentUser.experience = document.getElementById('pfExperience').value;
    currentUser.location = document.getElementById('pfLocation').value;
    currentUser.email = document.getElementById('pfEmail').value || currentUser.email;
    currentUser.phone = document.getElementById('pfPhone').value || currentUser.phone;
    currentUser.links = {
      resume: document.getElementById('pfResume').value,
      degreeCert: document.getElementById('pfDegreeCert').value,
      publications: document.getElementById('pfPublications').value,
      patent: document.getElementById('pfPatent').value
    };
    saveState();
    pushNotif('Profile saved — you can now browse and apply to jobs.');
    goTo('jobs');
  }
