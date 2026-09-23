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
  // (Implementation appears below, after the repeatable-group helpers it depends on.)
  // "Back to site" from a dashboard
  function closeDash(){ goTo('home'); }

  // ---------- Repeatable profile entry groups ----------
  // Each renderer draws currentUser.<arrayKey> into <listElId> as small cards
  // with a remove button; edits write straight back into the array on input.

  function pfAddQualification(){
    currentUser.additionalQualifications = currentUser.additionalQualifications || [];
    currentUser.additionalQualifications.push({ qualification:'', specialization:'', college:'', year:'', pct:'', certLink:'' });
    renderPfQualifications();
    pfOnInputProgress();
  }
  function pfRemoveQualification(i){
    currentUser.additionalQualifications.splice(i,1);
    renderPfQualifications();
    pfOnInputProgress();
  }
  function renderPfQualifications(){
    const list = document.getElementById('pfAddQualList');
    if(!list) return;
    const items = currentUser.additionalQualifications || [];
    list.innerHTML = items.map((q,i)=>`
      <div class="pf-repeat-item">
        <button type="button" class="pf-repeat-remove" onclick="pfRemoveQualification(${i})">✕</button>
        <div class="dash-form-row">
          <div class="pf-field"><label>Qualification</label><input type="text" value="${pfEsc(q.qualification)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'qualification',this.value)"></div>
          <div class="pf-field"><label>Specialization</label><input type="text" value="${pfEsc(q.specialization)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'specialization',this.value)"></div>
        </div>
        <div class="dash-form-row">
          <div class="pf-field"><label>University / institution</label><input type="text" value="${pfEsc(q.college)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'college',this.value)"></div>
          <div class="pf-field"><label>Year</label><input type="text" value="${pfEsc(q.year)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'year',this.value)"></div>
        </div>
        <div class="dash-form-row">
          <div class="pf-field"><label>Percentage / CGPA</label><input type="text" value="${pfEsc(q.pct)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'pct',this.value)"></div>
          <div class="pf-field"><label>Certificate link</label><input type="text" value="${pfEsc(q.certLink)}" oninput="pfUpdateArrItem('additionalQualifications',${i},'certLink',this.value)"></div>
        </div>
      </div>`).join('');
  }

  function pfAddEmployment(){
    currentUser.employmentHistory = currentUser.employmentHistory || [];
    currentUser.employmentHistory.push({ org:'', designation:'', department:'', location:'', empType:'', from:'', to:'', currentlyWorking:false, ctc:'', reasonForLeaving:'', certLink:'' });
    renderPfEmployment();
    pfOnInputProgress();
  }
  function pfRemoveEmployment(i){
    currentUser.employmentHistory.splice(i,1);
    renderPfEmployment();
    pfOnInputProgress();
  }
  function renderPfEmployment(){
    const list = document.getElementById('pfEmploymentList');
    if(!list) return;
    const items = currentUser.employmentHistory || [];
    list.innerHTML = items.map((e,i)=>`
      <div class="pf-repeat-item">
        <button type="button" class="pf-repeat-remove" onclick="pfRemoveEmployment(${i})">✕</button>
        <div class="dash-form-row">
          <div class="pf-field"><label>Organization name</label><input type="text" value="${pfEsc(e.org)}" oninput="pfUpdateArrItem('employmentHistory',${i},'org',this.value)"></div>
          <div class="pf-field"><label>Designation</label><input type="text" value="${pfEsc(e.designation)}" oninput="pfUpdateArrItem('employmentHistory',${i},'designation',this.value)"></div>
        </div>
        <div class="dash-form-row">
          <div class="pf-field"><label>Department</label><input type="text" value="${pfEsc(e.department)}" oninput="pfUpdateArrItem('employmentHistory',${i},'department',this.value)"></div>
          <div class="pf-field"><label>Location</label><input type="text" value="${pfEsc(e.location)}" oninput="pfUpdateArrItem('employmentHistory',${i},'location',this.value)"></div>
        </div>
        <div class="dash-form-row">
          <div class="pf-field"><label>Employment type</label>
            <select onchange="pfUpdateArrItem('employmentHistory',${i},'empType',this.value)">
              <option value="" ${!e.empType?'selected':''}>Select</option>
              <option ${e.empType==='Full Time'?'selected':''}>Full Time</option>
              <option ${e.empType==='Part Time'?'selected':''}>Part Time</option>
              <option ${e.empType==='Visiting'?'selected':''}>Visiting</option>
              <option ${e.empType==='Contract'?'selected':''}>Contract</option>
              <option ${e.empType==='Consultant'?'selected':''}>Consultant</option>
            </select>
          </div>
          <div class="pf-field"><label>Salary / CTC</label><input type="text" value="${pfEsc(e.ctc)}" oninput="pfUpdateArrItem('employmentHistory',${i},'ctc',this.value)"></div>
        </div>
        <div class="dash-form-row">
          <div class="pf-field"><label>From date</label><input type="date" value="${pfEsc(e.from)}" oninput="pfUpdateArrItem('employmentHistory',${i},'from',this.value)"></div>
          <div class="pf-field"><label>To date</label><input type="date" value="${pfEsc(e.to)}" ${e.currentlyWorking?'disabled':''} oninput="pfUpdateArrItem('employmentHistory',${i},'to',this.value)"></div>
        </div>
        <label class="pf-checkbox-row" style="margin-top:0;"><input type="checkbox" ${e.currentlyWorking?'checked':''} onchange="pfUpdateArrItem('employmentHistory',${i},'currentlyWorking',this.checked); renderPfEmployment();">Currently working here</label>
        <div class="dash-form-row" style="margin-top:10px;">
          <div class="pf-field"><label>Reason for leaving</label><input type="text" value="${pfEsc(e.reasonForLeaving)}" oninput="pfUpdateArrItem('employmentHistory',${i},'reasonForLeaving',this.value)"></div>
          <div class="pf-field"><label>Experience certificate link</label><input type="text" value="${pfEsc(e.certLink)}" oninput="pfUpdateArrItem('employmentHistory',${i},'certLink',this.value)"></div>
        </div>
      </div>`).join('');
  }

  function pfAddAdminRole(){
    currentUser.adminRoles = currentUser.adminRoles || [];
    currentUser.adminRoles.push({ role:'', org:'', duration:'' });
    renderPfAdminRoles();
    pfOnInputProgress();
  }
  function pfRemoveAdminRole(i){
    currentUser.adminRoles.splice(i,1);
    renderPfAdminRoles();
    pfOnInputProgress();
  }
  function renderPfAdminRoles(){
    const list = document.getElementById('pfAdminRolesList');
    if(!list) return;
    const items = currentUser.adminRoles || [];
    const roleOptions = ['HOD','Dean','Principal','Director','IQAC','NAAC','NBA','Accreditation','Examination Administration','Academic Administration','Other'];
    list.innerHTML = items.map((r,i)=>`
      <div class="pf-repeat-item">
        <button type="button" class="pf-repeat-remove" onclick="pfRemoveAdminRole(${i})">✕</button>
        <div class="dash-form-row">
          <div class="pf-field"><label>Position</label>
            <select onchange="pfUpdateArrItem('adminRoles',${i},'role',this.value)">
              <option value="">Select</option>
              ${roleOptions.map(o=>`<option ${r.role===o?'selected':''}>${o}</option>`).join('')}
            </select>
          </div>
          <div class="pf-field"><label>Organization</label><input type="text" value="${pfEsc(r.org)}" oninput="pfUpdateArrItem('adminRoles',${i},'org',this.value)"></div>
        </div>
        <div class="pf-field"><label>Duration</label><input type="text" placeholder="e.g. 2021–2023" value="${pfEsc(r.duration)}" oninput="pfUpdateArrItem('adminRoles',${i},'duration',this.value)"></div>
      </div>`).join('');
  }

  function pfAddOtherDocument(){
    currentUser.otherDocuments = currentUser.otherDocuments || [];
    currentUser.otherDocuments.push({ label:'', link:'' });
    renderPfOtherDocs();
    pfOnInputProgress();
  }
  function pfRemoveOtherDocument(i){
    currentUser.otherDocuments.splice(i,1);
    renderPfOtherDocs();
    pfOnInputProgress();
  }
  function renderPfOtherDocs(){
    const list = document.getElementById('pfOtherDocsList');
    if(!list) return;
    const items = currentUser.otherDocuments || [];
    list.innerHTML = items.map((d,i)=>`
      <div class="pf-repeat-item">
        <button type="button" class="pf-repeat-remove" onclick="pfRemoveOtherDocument(${i})">✕</button>
        <div class="dash-form-row" style="margin-bottom:0;">
          <div class="pf-field"><label>Document name</label><input type="text" placeholder="e.g. Project completion certificate" value="${pfEsc(d.label)}" oninput="pfUpdateArrItem('otherDocuments',${i},'label',this.value)"></div>
          <div class="pf-field"><label>Link</label><input type="text" placeholder="https://..." value="${pfEsc(d.link)}" oninput="pfUpdateArrItem('otherDocuments',${i},'link',this.value)"></div>
        </div>
      </div>`).join('');
  }

  // Simple single-line repeatable groups (memberships, certifications, FDPs, workshops, MOOCs)
  const PF_SIMPLE_LIST_KEYS = {
    professionalMemberships:'pfMembershipsList', certifications:'pfCertificationsList',
    fdpsAttended:'pfFdpsAttendedList', fdpsConducted:'pfFdpsConductedList',
    workshopsAttended:'pfWorkshopsAttendedList', workshopsConducted:'pfWorkshopsConductedList',
    moocs:'pfMoocsList'
  };
  function pfAddSimpleEntry(arrKey, listElId, placeholderLabel){
    currentUser[arrKey] = currentUser[arrKey] || [];
    currentUser[arrKey].push('');
    renderPfSimpleList(arrKey, listElId, placeholderLabel);
    pfOnInputProgress();
  }
  function pfRemoveSimpleEntry(arrKey, listElId, placeholderLabel, i){
    currentUser[arrKey].splice(i,1);
    renderPfSimpleList(arrKey, listElId, placeholderLabel);
    pfOnInputProgress();
  }
  function pfUpdateSimpleEntry(arrKey, i, value){
    currentUser[arrKey][i] = value;
  }
  function renderPfSimpleList(arrKey, listElId, placeholderLabel){
    const list = document.getElementById(listElId);
    if(!list) return;
    const items = currentUser[arrKey] || [];
    list.innerHTML = items.map((v,i)=>`
      <div class="pf-repeat-item" style="padding:10px 12px; display:flex; align-items:center; gap:10px;">
        <input type="text" style="flex:1; border:1px solid var(--line); border-radius:8px; padding:9px 11px; font-size:13.5px;" placeholder="${placeholderLabel} details" value="${pfEsc(v)}" oninput="pfUpdateSimpleEntry('${arrKey}',${i},this.value)">
        <button type="button" class="pf-repeat-remove" style="position:static; flex-shrink:0;" onclick="pfRemoveSimpleEntry('${arrKey}','${listElId}','${placeholderLabel}',${i})">✕</button>
      </div>`).join('');
  }
  function renderAllPfSimpleLists(){
    Object.keys(PF_SIMPLE_LIST_KEYS).forEach(key=>{
      renderPfSimpleList(key, PF_SIMPLE_LIST_KEYS[key], key);
    });
  }

  function pfUpdateArrItem(arrKey, i, field, value){
    if(!currentUser[arrKey] || !currentUser[arrKey][i]) return;
    currentUser[arrKey][i][field] = value;
  }
  function pfEsc(v){
    return (v==null ? '' : String(v)).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Demo OTP-style verify — matches the pattern used elsewhere in the app (no real backend).
  function pfVerifyField(kind){
    if(kind === 'mobile'){
      currentUser.mobileVerified = true;
      document.getElementById('pfMobileVerifyBtn').style.display = 'none';
      document.getElementById('pfMobileVerifiedTag').style.display = 'inline';
    } else {
      currentUser.emailVerified = true;
      document.getElementById('pfEmailVerifyBtn').style.display = 'none';
      document.getElementById('pfEmailVerifiedTag').style.display = 'inline';
    }
    showGenericToast((kind==='mobile' ? 'Mobile number' : 'Email') + ' verified.');
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
      ensureCandidateId();
      const _cidLabel = document.getElementById('pfCandidateIdLabel');
      if(_cidLabel) _cidLabel.textContent = 'Candidate ID: ' + currentUser.candidateId;
      const U = currentUser;
      const setVal = (id, val)=>{ const el = document.getElementById(id); if(el) el.value = val || ''; };
      const setChecked = (id, val)=>{ const el = document.getElementById(id); if(el) el.checked = !!val; };

      // 1. Basic personal details
      setVal('pfName', U.name || name);
      setVal('pfGender', U.gender);
      setVal('pfDob', U.dob);
      setVal('pfAge', U.age);
      setVal('pfNationality', U.nationality);
      setVal('pfLocation', U.location);
      setVal('pfState', U.state);
      setVal('pfCountry', U.country);
      setVal('pfPreferredWorkLocation', U.preferredWorkLocation);
      setVal('pfWillingToRelocate', U.willingToRelocate);

      // 2. Contact details
      setVal('pfPhone', U.phone);
      setVal('pfAltPhone', U.altPhone);
      setVal('pfEmail', U.email);
      setVal('pfAltEmail', U.altEmail);
      setVal('pfWhatsapp', U.whatsapp);
      setVal('pfLinkedin', U.linkedin);
      setVal('pfGoogleScholar', U.googleScholar);
      setVal('pfOrcid', U.orcid);
      setVal('pfWebsite', U.website);
      const note = document.getElementById('pfContactNote');
      if(!U.email && U.phone){
        note.textContent = 'You signed up with your phone number — add your email so institutions can reach you both ways.';
        note.style.display = 'block';
      } else if(!U.phone && U.email){
        note.textContent = 'You signed up with email — add your mobile number so institutions and Upadyay can reach you faster.';
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
      document.getElementById('pfMobileVerifyBtn').style.display = U.mobileVerified ? 'none' : 'inline-flex';
      document.getElementById('pfMobileVerifiedTag').style.display = U.mobileVerified ? 'inline' : 'none';
      document.getElementById('pfEmailVerifyBtn').style.display = U.emailVerified ? 'none' : 'inline-flex';
      document.getElementById('pfEmailVerifiedTag').style.display = U.emailVerified ? 'inline' : 'none';

      // 3. Account details
      setVal('pfReferralCode', U.referralCode);
      setVal('pfRegistrationType', U.registrationType);

      // 4. Educational qualifications
      setVal('pfQualification', U.qualification);
      setVal('pfSubject', U.subject);
      setVal('pfCollege', U.college);
      setVal('pfHighestQualCountry', U.highestQualCountry);
      setVal('pfHighestQualYear', U.highestQualYear);
      setVal('pfHighestQualPct', U.highestQualPct);
      setVal('pfHighestQualCertLink', U.highestQualCertLink);
      renderPfQualifications();

      // 5. Professional experience
      setVal('pfAcademicExperience', U.academicExperience);
      setVal('pfIndustryExperience', U.industryExperience);
      setVal('pfResearchExperience', U.researchExperience);
      setVal('pfAdminExperienceYears', U.adminExperienceYears);
      setVal('pfExperience', U.experience);
      renderPfEmployment();

      // 6. Current employment
      setVal('pfCurrentlyWorking', U.currentlyWorking);
      setVal('pfCurrentOrg', U.currentOrg);
      setVal('pfCurrentDesignation', U.currentDesignation);
      setVal('pfCurrentDept', U.currentDept);
      setVal('pfJoiningDate', U.joiningDate);
      setVal('pfCurrentLocation', U.currentLocation);
      setVal('pfPresentCtc', U.presentCtc);
      setVal('pfNoticePeriod', U.noticePeriod);
      setVal('pfExpectedCtc', U.expectedCtc);
      setVal('pfAvailableFrom', U.availableFrom);
      setVal('pfLookingForChange', U.lookingForChange);

      // 7. Teaching & academic details
      setVal('pfTeachingExperience', U.teachingExperience);
      setVal('pfSubjectsTaught', U.subjectsTaught);
      setVal('pfUgSubjects', U.ugSubjects);
      setVal('pfPgSubjects', U.pgSubjects);
      setVal('pfPreferredTeachingSubjects', U.preferredTeachingSubjects);
      setVal('pfPreferredDepartments', U.preferredDepartments);
      setVal('pfPreferredDesignations', U.preferredDesignations);
      setVal('pfCategory', U.category);

      // 8. Research profile
      setVal('pfResearchArea', U.researchArea);
      setVal('pfSpecialization', U.specialization);
      setVal('pfResearchMethodology', U.researchMethodology);
      setVal('pfJournalPublications', U.journalPublications);
      setVal('pfScopusPublications', U.scopusPublications);
      setVal('pfSciPublications', U.sciPublications);
      setVal('pfEsciPublications', U.esciPublications);
      setVal('pfWosPublications', U.wosPublications);
      setVal('pfUgcPublications', U.ugcPublications);
      setVal('pfInternationalJournals', U.internationalJournals);
      setVal('pfNationalJournals', U.nationalJournals);
      setVal('pfInternationalConferences', U.internationalConferences);
      setVal('pfNationalConferences', U.nationalConferences);
      setVal('pfSeminarsWorkshops', U.seminarsWorkshops);
      setVal('pfTotalPatents', U.totalPatents);
      setVal('pfPublishedPatents', U.publishedPatents);
      setVal('pfGrantedPatents', U.grantedPatents);
      setVal('pfNationalPatents', U.nationalPatents);
      setVal('pfInternationalPatents', U.internationalPatents);
      setVal('pfNumProjects', U.numProjects);
      setVal('pfOngoingProjects', U.ongoingProjects);
      setVal('pfCompletedProjects', U.completedProjects);
      setVal('pfFundingAgency', U.fundingAgency);
      setVal('pfProjectValue', U.projectValue);
      setVal('pfBooksAuthored', U.booksAuthored);
      setVal('pfBookChapters', U.bookChapters);
      setVal('pfEditedBooks', U.editedBooks);
      setVal('pfPublisherDetails', U.publisherDetails);

      // 9. Memberships & certifications
      renderAllPfSimpleLists();

      // 10. Skills
      setVal('pfProgrammingLanguages', U.programmingLanguages);
      setVal('pfSoftwareTools', U.softwareTools);
      setVal('pfAiMlSkills', U.aiMlSkills);
      setVal('pfDataScienceSkills', U.dataScienceSkills);
      setVal('pfCloudSkills', U.cloudSkills);
      setVal('pfRoboticsSkills', U.roboticsSkills);
      setVal('pfSimulationTools', U.simulationTools);
      setVal('pfOtherTechnicalSkills', U.otherTechnicalSkills);
      document.querySelectorAll('#pfAcademicSkillsGrid input[type=checkbox]').forEach(cb=>{
        cb.checked = (U.academicSkills || []).includes(cb.value);
      });

      // 11. Administrative experience
      renderPfAdminRoles();

      // 12. Salary & job preferences
      setVal('pfSalaryPresentCtc', U.presentCtc);
      setVal('pfSalaryExpectedCtc', U.expectedCtc);
      setVal('pfMinAcceptableSalary', U.minAcceptableSalary);
      setVal('pfPreferredDesignation', U.preferredDesignation);
      setVal('pfPreferredOrgType', U.preferredOrgType);
      setVal('pfPreferredLocation', U.preferredLocation);
      setVal('pfPreferredCountry', U.preferredCountry);
      setVal('pfPreferredEmploymentType', U.preferredEmploymentType);
      setVal('pfSalaryNoticePeriod', U.noticePeriod);
      setVal('pfSalaryWillingToRelocate', U.willingToRelocate);
      setVal('pfWillingToTravel', U.willingToTravel);

      // 13. Resume & documents
      setVal('pfResume', (U.links && U.links.resume) || '');
      setVal('pfPassportPhoto', U.passportPhoto);
      setVal('pfDegreeCert', (U.links && U.links.degreeCert) || '');
      setVal('pfPublications', (U.links && U.links.publications) || '');
      setVal('pfPatent', (U.links && U.links.patent) || '');
      renderPfOtherDocs();

      // 14. Profile visibility & recruitment preferences
      setVal('pfProfileVisibility', U.profileVisibility);
      setChecked('pfNotifyEmail', U.notifyEmail !== false);
      setChecked('pfNotifyWhatsapp', U.notifyWhatsapp);
      setChecked('pfNotifySms', U.notifySms);

      // 15. Declaration
      setChecked('pfDeclarationAccepted', U.declarationAccepted);

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

  function pfOnInputProgress(){
    // Weight completeness across the whole 15-section form using a representative
    // sample of key fields from each section, rather than every single input.
    const sections = [
      ['pfName','pfGender','pfDob','pfNationality','pfLocation','pfState','pfCountry'],
      ['pfPhone','pfEmail','pfLinkedin'],
      ['pfRegistrationType'],
      ['pfQualification','pfSubject','pfCollege','pfHighestQualYear'],
      ['pfAcademicExperience','pfExperience'],
      ['pfCurrentlyWorking','pfCurrentOrg','pfCurrentDesignation'],
      ['pfTeachingExperience','pfSubjectsTaught','pfCategory'],
      ['pfResearchArea','pfSpecialization'],
      ['pfProgrammingLanguages','pfSoftwareTools'],
      ['pfPreferredDesignation','pfPreferredLocation'],
      ['pfResume','pfPassportPhoto'],
      ['pfProfileVisibility']
    ];
    let filled = 0, total = 0;
    sections.forEach(ids=>{
      ids.forEach(id=>{
        const el = document.getElementById(id);
        if(!el) return;
        total++;
        if((el.value || '').trim()) filled++;
      });
    });
    const docsFilled = ['pfResume','pfDegreeCert'].map(id=>{
      const el = document.getElementById(id); return el && el.value.trim();
    }).filter(Boolean).length;

    const pct = total ? Math.max(15, Math.min(100, Math.round((filled/total)*100))) : 15;
    const fill = document.getElementById('pfSideProgressFill');
    const label = document.getElementById('pfSideProgressLabel');
    if(fill){ fill.style.width = pct + '%'; }
    if(label){ label.textContent = pct + '% complete'; }
    const basicsFilled = ['pfName','pfGender','pfDob','pfNationality','pfLocation','pfState','pfCountry']
      .map(id=>{ const el = document.getElementById(id); return el && el.value.trim(); }).filter(Boolean).length;
    const stepBasics = document.getElementById('pfStepBasics');
    const stepDocs = document.getElementById('pfStepDocs');
    if(stepBasics){ stepBasics.classList.toggle('done', basicsFilled >= 4); if(basicsFilled>=4) stepBasics.querySelector('.dot').textContent = '✓'; }
    if(stepDocs){ stepDocs.classList.toggle('done', docsFilled >= 1); if(docsFilled>=1) stepDocs.querySelector('.dot').textContent = '✓'; }
  }

  function saveProfile(){
    const U = currentUser;
    const val = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const checked = id => { const el = document.getElementById(id); return el ? el.checked : false; };

    // 1. Basic personal details
    U.name = val('pfName') || U.name || 'User';
    U.gender = val('pfGender');
    U.dob = val('pfDob');
    U.age = val('pfAge');
    U.nationality = val('pfNationality');
    U.location = val('pfLocation');
    U.state = val('pfState');
    U.country = val('pfCountry');
    U.preferredWorkLocation = val('pfPreferredWorkLocation');
    U.willingToRelocate = val('pfWillingToRelocate');

    // 2. Contact details
    U.phone = val('pfPhone') || U.phone;
    U.altPhone = val('pfAltPhone');
    U.email = val('pfEmail') || U.email;
    U.altEmail = val('pfAltEmail');
    U.whatsapp = val('pfWhatsapp');
    U.linkedin = val('pfLinkedin');
    U.googleScholar = val('pfGoogleScholar');
    U.orcid = val('pfOrcid');
    U.website = val('pfWebsite');

    // 3. Account details
    U.referralCode = val('pfReferralCode');
    U.registrationType = val('pfRegistrationType');

    // 4. Educational qualifications
    U.qualification = val('pfQualification');
    U.subject = val('pfSubject');
    U.college = val('pfCollege');
    U.highestQualCountry = val('pfHighestQualCountry');
    U.highestQualYear = val('pfHighestQualYear');
    U.highestQualPct = val('pfHighestQualPct');
    U.highestQualCertLink = val('pfHighestQualCertLink');
    // additionalQualifications already kept in sync live via pfUpdateArrItem

    // 5. Professional experience
    U.academicExperience = val('pfAcademicExperience');
    U.industryExperience = val('pfIndustryExperience');
    U.researchExperience = val('pfResearchExperience');
    U.adminExperienceYears = val('pfAdminExperienceYears');
    U.experience = val('pfExperience');

    // 6. Current employment
    U.currentlyWorking = val('pfCurrentlyWorking');
    U.currentOrg = val('pfCurrentOrg');
    U.currentDesignation = val('pfCurrentDesignation');
    U.currentDept = val('pfCurrentDept');
    U.joiningDate = val('pfJoiningDate');
    U.currentLocation = val('pfCurrentLocation');
    U.presentCtc = val('pfPresentCtc') || val('pfSalaryPresentCtc');
    U.noticePeriod = val('pfNoticePeriod') || val('pfSalaryNoticePeriod');
    U.expectedCtc = val('pfExpectedCtc') || val('pfSalaryExpectedCtc');
    U.availableFrom = val('pfAvailableFrom');
    U.lookingForChange = val('pfLookingForChange');

    // 7. Teaching & academic details
    U.teachingExperience = val('pfTeachingExperience');
    U.subjectsTaught = val('pfSubjectsTaught');
    U.ugSubjects = val('pfUgSubjects');
    U.pgSubjects = val('pfPgSubjects');
    U.preferredTeachingSubjects = val('pfPreferredTeachingSubjects');
    U.preferredDepartments = val('pfPreferredDepartments');
    U.preferredDesignations = val('pfPreferredDesignations');
    U.category = val('pfCategory');

    // 8. Research profile
    U.researchArea = val('pfResearchArea');
    U.specialization = val('pfSpecialization');
    U.researchMethodology = val('pfResearchMethodology');
    U.journalPublications = val('pfJournalPublications');
    U.scopusPublications = val('pfScopusPublications');
    U.sciPublications = val('pfSciPublications');
    U.esciPublications = val('pfEsciPublications');
    U.wosPublications = val('pfWosPublications');
    U.ugcPublications = val('pfUgcPublications');
    U.internationalJournals = val('pfInternationalJournals');
    U.nationalJournals = val('pfNationalJournals');
    U.internationalConferences = val('pfInternationalConferences');
    U.nationalConferences = val('pfNationalConferences');
    U.seminarsWorkshops = val('pfSeminarsWorkshops');
    U.totalPatents = val('pfTotalPatents');
    U.publishedPatents = val('pfPublishedPatents');
    U.grantedPatents = val('pfGrantedPatents');
    U.nationalPatents = val('pfNationalPatents');
    U.internationalPatents = val('pfInternationalPatents');
    U.numProjects = val('pfNumProjects');
    U.ongoingProjects = val('pfOngoingProjects');
    U.completedProjects = val('pfCompletedProjects');
    U.fundingAgency = val('pfFundingAgency');
    U.projectValue = val('pfProjectValue');
    U.booksAuthored = val('pfBooksAuthored');
    U.bookChapters = val('pfBookChapters');
    U.editedBooks = val('pfEditedBooks');
    U.publisherDetails = val('pfPublisherDetails');
    // professionalMemberships / certifications / fdps / workshops / moocs kept in sync live

    // 10. Skills
    U.programmingLanguages = val('pfProgrammingLanguages');
    U.softwareTools = val('pfSoftwareTools');
    U.aiMlSkills = val('pfAiMlSkills');
    U.dataScienceSkills = val('pfDataScienceSkills');
    U.cloudSkills = val('pfCloudSkills');
    U.roboticsSkills = val('pfRoboticsSkills');
    U.simulationTools = val('pfSimulationTools');
    U.otherTechnicalSkills = val('pfOtherTechnicalSkills');
    U.academicSkills = Array.from(document.querySelectorAll('#pfAcademicSkillsGrid input[type=checkbox]:checked')).map(cb=>cb.value);

    // 11. adminRoles kept in sync live

    // 12. Salary & job preferences
    U.minAcceptableSalary = val('pfMinAcceptableSalary');
    U.preferredDesignation = val('pfPreferredDesignation');
    U.preferredOrgType = val('pfPreferredOrgType');
    U.preferredLocation = val('pfPreferredLocation');
    U.preferredCountry = val('pfPreferredCountry');
    U.preferredEmploymentType = val('pfPreferredEmploymentType');
    U.willingToTravel = val('pfWillingToTravel');

    // 13. Resume & documents
    U.passportPhoto = val('pfPassportPhoto');
    U.links = {
      resume: val('pfResume'),
      degreeCert: val('pfDegreeCert'),
      publications: val('pfPublications'),
      patent: val('pfPatent')
    };
    // otherDocuments kept in sync live

    // 14. Profile visibility & recruitment preferences
    U.profileVisibility = val('pfProfileVisibility');
    U.notifyEmail = checked('pfNotifyEmail');
    U.notifyWhatsapp = checked('pfNotifyWhatsapp');
    U.notifySms = checked('pfNotifySms');

    // 15. Declaration
    U.declarationAccepted = checked('pfDeclarationAccepted');

    ensureCandidateId();
    saveState();
    pushNotif('Profile saved — you can now browse and apply to jobs.');
    goTo('jobs');
  }
