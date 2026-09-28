// ---------- Browse jobs page ----------
  // >>> MODIFIED START: job data now has salary, type, location, skills, deadline, logo <<<
  // logo: put a real image URL here (e.g. '../img/logos/kluniversity.png'). Empty = initials tile.
  const bjJobs = [
    { title:'Assistant Professor — CSE', org:'KL University', city:'Vijayawada', cat:'Higher Education', tags:['PhD required','Full-time'], skills:['Data Structures','Machine Learning','Research'], salary:'₹60K – 90K/Month', type:'Full Time', mode:'In Office', posted:2, daysLeft:14, applicants:34, color:'var(--blue-700)', initials:'KL', logo:'', minExp:2 },
    { title:'PGT Physics', org:'Delhi Public School', city:'Hyderabad', cat:'Schools', tags:['PG required','CBSE'], skills:['Physics','CBSE Curriculum','Lab Handling'], salary:'₹35K – 50K/Month', type:'Full Time', mode:'In Office', posted:5, daysLeft:9, applicants:61, color:'var(--green)', initials:'DP', logo:'', minExp:0 },
    { title:'Senior Lecturer — Commerce', org:'Narayana Junior College', city:'Chennai', cat:'Intermediate', tags:['PG required','MPC/CEC'], skills:['Accountancy','Economics','Exam Prep'], salary:'₹40K – 55K/Month', type:'Full Time', mode:'In Office', posted:6, daysLeft:11, applicants:22, color:'var(--blue-500)', initials:'NR', logo:'', minExp:3 },
    { title:'TGT Mathematics', org:'Ryan International School', city:'Bengaluru', cat:'Schools', tags:['B.Ed required','CBSE'], skills:['Algebra','Geometry','Classroom Mgmt'], salary:'₹30K – 42K/Month', type:'Full Time', mode:'In Office', posted:1, daysLeft:20, applicants:18, color:'var(--blue-900)', initials:'RI', logo:'', minExp:1 },
    { title:'Assistant Professor — English', org:'Osmania University', city:'Hyderabad', cat:'Higher Education', tags:['PhD required','NET/SET'], skills:['Literature','Linguistics','Research'], salary:'₹57K – 85K/Month', type:'Full Time', mode:'In Office', posted:9, daysLeft:6, applicants:47, color:'var(--blue-700)', initials:'OU', logo:'', minExp:4 },
    { title:'Junior Lecturer — Botany', org:'Sri Chaitanya Junior College', city:'Vijayawada', cat:'Intermediate', tags:['PG required','MPC/BiPC'], skills:['Botany','NEET Prep','Practicals'], salary:'₹30K – 45K/Month', type:'Full Time', mode:'In Office', posted:3, daysLeft:15, applicants:15, color:'var(--blue-500)', initials:'SC', logo:'', minExp:0 },
    { title:'PRT Primary Teacher', org:'DAV Public School', city:'Delhi', cat:'Schools', tags:['UG required','CBSE'], skills:['Primary Teaching','EVS','Child Psychology'], salary:'₹25K – 35K/Month', type:'Full Time', mode:'In Office', posted:1, daysLeft:18, applicants:29, color:'var(--green)', initials:'DA', logo:'', minExp:0 },
    { title:'Associate Professor — Management', org:'IIM Ranchi', city:'Ranchi', cat:'Higher Education', tags:['PhD required','UGC-NET'], skills:['Strategy','Case Teaching','Publications'], salary:'₹1.2L – 1.8L/Month', type:'Full Time', mode:'In Office', posted:14, daysLeft:4, applicants:53, color:'var(--blue-900)', initials:'IR', logo:'', minExp:6 },
  ];

  // >>> MODIFIED END <<<

  // Old behaviour opened an overlay. Now it navigates to jobs.html.
  function openBrowseJobs(){ goTo('jobs'); }
  function closeBrowseJobs(){ goTo(isLoggedIn ? dashboardPageForRole() : 'home'); }

  // Called once by jobs.html on load. Works for logged-in seekers AND visitors.
  // >>> MODIFIED START: profile column and sidebar removed <<<
  function initBrowseJobsPage(){
    // Category from the URL (?cat=Schools) wins; otherwise pre-check the seeker's own category.
    const catParam = getParam('cat');
    const preselect = catParam || (isLoggedIn && currentRole !== 'company' ? currentUser.category : '');
    if(preselect){
      document.querySelectorAll('.bj-cat-check').forEach(cb=>{ cb.checked = (cb.value === preselect); });
    }
    if(isLoggedIn){
      const bjTopImg = document.getElementById('bjTopAvatarImg');
      if(bjTopImg && currentUser.avatar) bjTopImg.src = currentUser.avatar;
    }
    renderBrowseJobs();
  }
  // >>> MODIFIED START: SVG icon set (replaces emoji) <<<
  const BJ_ICONS = {
    briefcase:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    clock:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    rupee:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><circle cx="12" cy="12" r="9"/><path d="M8.5 8h7M8.5 11h7M10 8c3.5 0 4.5 4-1 4l4.5 4"/></svg>',
    hourglass:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/></svg>',
    users:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.8c1.9.7 3 2.5 3 5.2"/></svg>',
    calendar:'<svg class="bj-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0;vertical-align:-3px;"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>'
  };
  // >>> MODIFIED END <<<
  function bjLogoHtml(item, size){
    const s = size || 56;
    if(item.logo) return `<img src="${pfEsc(item.logo)}" alt="${pfEsc(item.name || item.org)}" style="width:${s}px;height:${s}px;object-fit:contain;">`;
    return `<span style="width:${s}px;height:${s}px;border-radius:12px;background:${item.color};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(s*0.32)}px;letter-spacing:.5px;">${pfEsc(item.initials)}</span>`;
  }
  // >>> MODIFIED END <<<
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
    // >>> MODIFIED START: square job cards (title, company, exp/type/location, skills, salary, dates) <<<
    list.innerHTML = filtered.map(j=>{
      const exp = j.minExp === 0 ? 'No prior experience required' : `${j.minExp}+ years`;
      const safeTitle = j.title.replace(/'/g,"\\'");
      return `
      <div class="bj-card">
        <div class="bj-card-top">
          <div class="bj-card-main">
            <p class="bj-card-title">${pfEsc(j.title)}</p>
            <p class="bj-card-org">${pfEsc(j.org)}</p>
          </div>
          <div class="bj-card-logo">${bjLogoHtml({logo:j.logo, name:j.org, color:j.color, initials:j.initials}, 56)}</div>
        </div>
        <div class="bj-card-meta">
          <span>${BJ_ICONS.briefcase}${exp}</span><i></i><span>${BJ_ICONS.clock}${pfEsc(j.type)}</span><i></i><span>${BJ_ICONS.pin}${pfEsc(j.mode)} | ${pfEsc(j.city)}</span>
        </div>
        <div class="bj-card-skills">${j.skills.map(s=>`<span>${pfEsc(s)}</span>`).join('<b>•</b>')}</div>
        <div class="bj-card-chips">
          <span class="bj-chip">${j.cat === 'Higher Education' ? 'Higher Ed' : pfEsc(j.cat)}</span>
          ${j.tags.map(t=>`<span class="bj-chip">${pfEsc(t)}</span>`).join('')}
        </div>
        <span class="bj-salary">${BJ_ICONS.rupee}${pfEsc(j.salary)}</span>
        <div class="bj-card-foot">
          <div class="bj-card-dates">
            <span>${BJ_ICONS.calendar}Posted ${j.posted} day${j.posted===1?'':'s'} ago</span>
            <span>${BJ_ICONS.hourglass}${j.daysLeft} days left</span>
            <span>${BJ_ICONS.users}${j.applicants} applicants</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="applyToJob('${safeTitle}')">Apply</button>
        </div>
      </div>`;
    }).join('');
    // >>> MODIFIED END <<<
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
  // =====================================================================
  // >>> MODIFIED START: FILE UPLOAD VALIDATION + FormData UPLOAD LAYER <<<
  // Replaces the old base64/FileReader avatar handler.
  // Nothing in this block writes file contents to localStorage / currentUser.
  // Only server-returned URLs are ever stored.
  // =====================================================================

  // ---- Config (edit here) ----
  const UPLOAD_API = {
    // Backend endpoint that accepts multipart/form-data and returns JSON: { url: "https://..." }
    endpoint: '/api/faculty/upload',
    // Add auth header here if your API needs it, e.g. () => ({ Authorization: 'Bearer ' + token })
    headers: () => ({})
  };
  const UPLOAD_RULES = {
    image: {
      label: 'Profile image',
      exts: ['jpg','jpeg','png','webp'],
      mimes: ['image/jpeg','image/png','image/webp'],
      maxBytes: 2 * 1024 * 1024,           // 2 MB
      typeMsg: 'JPG, JPEG, PNG or WEBP',
      // resize/compress target
      maxDim: 800, quality: 0.82
    },
    resume: {
      label: 'Resume',
      exts: ['pdf','doc','docx'],
      mimes: ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      maxBytes: 5 * 1024 * 1024,           // 5 MB
      typeMsg: 'PDF, DOC or DOCX'
    },
    document: {
      label: 'Document',
      // Other profile docs: PDF/DOC/DOCX + JPG/PNG/WEBP scans, 5 MB
      exts: ['pdf','doc','docx','jpg','jpeg','png','webp'],
      mimes: ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png','image/webp'],
      maxBytes: 5 * 1024 * 1024,           // 5 MB
      typeMsg: 'PDF, DOC, DOCX, JPG, PNG or WEBP'
    }
  };

  function fmtBytes(b){
    return b >= 1024*1024 ? (b/(1024*1024)).toFixed(1).replace(/\.0$/,'') + ' MB' : Math.round(b/1024) + ' KB';
  }

  // Returns { ok:true } or { ok:false, message }
  function validateUploadFile(file, kind){
    const rule = UPLOAD_RULES[kind];
    if(!file) return { ok:false, message:'No file selected.' };
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if(!rule.exts.includes(ext)){
      return { ok:false, message:`${rule.label}: unsupported file type ".${ext}". Allowed: ${rule.typeMsg}.` };
    }
    // Browsers sometimes report an empty MIME for .doc/.docx; extension check above still applies,
    // but a NON-empty MIME must match the allowed list.
    if(file.type && !rule.mimes.includes(file.type)){
      return { ok:false, message:`${rule.label}: invalid file format (${file.type}). Allowed: ${rule.typeMsg}.` };
    }
    if(!file.type && kind === 'image'){
      return { ok:false, message:`${rule.label}: could not verify file type. Allowed: ${rule.typeMsg}.` };
    }
    if(file.size > rule.maxBytes){
      return { ok:false, message:`${rule.label} is too large (${fmtBytes(file.size)}). Maximum allowed size is ${fmtBytes(rule.maxBytes)}.` };
    }
    if(file.size === 0){
      return { ok:false, message:`${rule.label} is empty.` };
    }
    return { ok:true };
  }

  // Uses the existing toast; falls back to alert if it isn't on this page.
  function showUploadError(message){
    if(typeof showGenericToast === 'function') showGenericToast(message);
    else alert(message);
  }

  // Resize (keep aspect ratio) + compress to JPEG/WEBP/PNG Blob. Result is re-checked against the 2 MB cap.
  function compressImage(file, rule){
    return new Promise((resolve, reject)=>{
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function(){
        URL.revokeObjectURL(url);
        let w = img.naturalWidth, h = img.naturalHeight;
        const scale = Math.min(1, rule.maxDim / Math.max(w, h));
        w = Math.round(w * scale); h = Math.round(h * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        // PNG stays PNG only if it has to (transparency); everything else -> JPEG for size.
        const outType = file.type === 'image/png' ? 'image/png' : (file.type === 'image/webp' ? 'image/webp' : 'image/jpeg');
        let q = rule.quality;
        const attempt = ()=> canvas.toBlob(blob=>{
          if(!blob) return reject(new Error('Image compression failed.'));
          if(blob.size > rule.maxBytes && q > 0.4 && outType !== 'image/png'){ q -= 0.1; return attempt(); }
          if(blob.size > rule.maxBytes) return reject(new Error('Image is still larger than ' + fmtBytes(rule.maxBytes) + ' after compression. Please choose a smaller image.'));
          resolve(blob);
        }, outType, q);
        attempt();
      };
      img.onerror = function(){
        URL.revokeObjectURL(url);
        reject(new Error('This file is not a valid image or is corrupted.'));
      };
      img.src = url;
    });
  }

  // POST a file to the backend as multipart/form-data. Resolves to the uploaded file's URL.
  async function uploadFileToServer(fileOrBlob, kind, fileName){
    const fd = new FormData();
    fd.append('file', fileOrBlob, fileName || fileOrBlob.name || 'upload');
    fd.append('kind', kind);                                   // 'image' | 'resume' | 'document'
    if(currentUser && currentUser.candidateId) fd.append('candidateId', currentUser.candidateId);
    const res = await fetch(UPLOAD_API.endpoint, {
      method: 'POST',
      headers: UPLOAD_API.headers(),                            // do NOT set Content-Type; browser sets the boundary
      body: fd
    });
    if(!res.ok) throw new Error('Upload failed (' + res.status + '). Please try again.');
    const data = await res.json();
    if(!data || !data.url) throw new Error('Upload failed: server did not return a file URL.');
    return data.url;
  }

  // ---- Profile image (keeps existing UI: #fpAvatar, updateNavForLogin) ----
  async function fpUploadAvatar(e){
    const input = e.target;
    const file = input.files && input.files[0];
    if(!file) return;
    const rule = UPLOAD_RULES.image;

    // 1. Validate type + size BEFORE doing anything else
    const v = validateUploadFile(file, 'image');
    if(!v.ok){ showUploadError(v.message); input.value = ''; return; }

    try {
      // 2. Resize / compress
      const blob = await compressImage(file, rule);
      // 3. Instant local preview only (object URL, never persisted)
      const previewUrl = URL.createObjectURL(blob);
      const avatarEl = document.getElementById('fpAvatar');
      const prevSrc = avatarEl ? avatarEl.src : '';
      if(avatarEl) avatarEl.src = previewUrl;
      // 4. Upload via FormData; store only the returned URL
      try {
        const url = await uploadFileToServer(blob, 'image', file.name);
        currentUser.avatar = url;
        if(avatarEl) avatarEl.src = url;
        saveState();
        updateNavForLogin();
      } catch(err){
        if(avatarEl) avatarEl.src = prevSrc;                    // roll back preview; nothing saved
        showUploadError(err.message);
      } finally {
        URL.revokeObjectURL(previewUrl);
      }
    } catch(err){
      showUploadError(err.message);
    }
    input.value = '';
  }

  // ---- Resume / degree cert / publications / patent / passport photo / other docs ----
  // Wire-up (no markup change required beyond an <input type="file">):
  //   <input type="file" data-pf-upload="resume"   data-pf-target="pfResume">
  //   <input type="file" data-pf-upload="document" data-pf-target="pfDegreeCert">
  //   <input type="file" data-pf-upload="image"    data-pf-target="pfPassportPhoto">
  // data-pf-upload = rule kind; data-pf-target = id of the existing text field that stores the URL.
  // For otherDocuments rows use pfUploadOtherDocument(i, inputEl).
  // >>> MODIFIED (v2): widget-aware handler: shows status, preview, remove <<<
  function pfWidgetEl(input){ return input.closest('.pf-upload'); }
  function pfSetUploadStatus(w, text, kind){
    const s = w && w.querySelector('.pf-up-status');
    if(!s) return;
    s.textContent = text || '';
    s.style.color = kind === 'error' ? '#c0392b' : (kind === 'ok' ? 'var(--green, #1e8e5a)' : 'var(--ink-faint)');
  }
  function pfRenderUploadPreview(w, url, name){
    const box = w && w.querySelector('.pf-up-preview');
    if(!box) return;
    if(!url){ box.style.display = 'none'; box.innerHTML = ''; return; }
    const isImg = /\.(jpe?g|png|webp)(\?|#|$)/i.test(url) || url.startsWith('blob:') && w.dataset.pfKind === 'image';
    const label = name || decodeURIComponent((url.split('?')[0].split('/').pop()) || 'file');
    box.style.display = 'flex';
    box.innerHTML = (isImg
      ? `<img src="${pfEsc(url)}" alt="Preview" style="width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid var(--line);">`
      : `<span style="width:40px;height:40px;border-radius:8px;border:1px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--ink-soft);">${pfEsc((label.split('.').pop() || 'FILE').slice(0,4).toUpperCase())}</span>`)
      + `<span style="flex:1;min-width:0;font-size:12.5px;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${pfEsc(label)}</span>`
      + `<a href="${pfEsc(url)}" target="_blank" rel="noopener" style="font-size:12.5px;">View</a>`
      + `<button type="button" class="btn btn-ghost btn-sm" onclick="pfClearUpload(this)">Remove</button>`;
  }
  function pfClearUpload(btn){
    const w = btn.closest('.pf-upload');
    if(!w) return;
    const target = document.getElementById(w.dataset.pfTarget);
    if(target){ target.value = ''; pfOnInputProgress(); }
    pfRenderUploadPreview(w, '');
    pfSetUploadStatus(w, '');
  }
  // Show preview for a URL already saved in the text field (called on page load + on manual edit)
  function pfRefreshUploadPreviews(){
    document.querySelectorAll('.pf-upload').forEach(w=>{
      const t = document.getElementById(w.dataset.pfTarget);
      pfRenderUploadPreview(w, t && t.value.trim() ? t.value.trim() : '');
    });
  }

  async function pfHandleFileInput(input){
    const kind = input.dataset.pfUpload;
    const targetId = input.dataset.pfTarget;
    const file = input.files && input.files[0];
    const w = pfWidgetEl(input);
    if(!file || !UPLOAD_RULES[kind]) return;

    const v = validateUploadFile(file, kind);
    if(!v.ok){
      pfSetUploadStatus(w, v.message, 'error');      // clear inline message
      showUploadError(v.message);
      input.value = '';                               // invalid file is never stored
      return;
    }

    const btn = w && w.querySelector('.pf-up-btn');
    const oldLabel = btn ? btn.textContent : '';
    try {
      if(btn){ btn.disabled = true; btn.textContent = 'Uploading…'; }
      pfSetUploadStatus(w, 'Uploading ' + file.name + ' (' + fmtBytes(file.size) + ')…');
      let payload = file;
      if(kind === 'image') payload = await compressImage(file, UPLOAD_RULES.image);
      // instant preview for images while the request is in flight (object URL, never persisted)
      let tmp = null;
      if(kind === 'image'){ tmp = URL.createObjectURL(payload); pfRenderUploadPreview(w, tmp, file.name); }
      try {
        const url = await uploadFileToServer(payload, kind, file.name);
        const target = targetId && document.getElementById(targetId);
        if(target){ target.value = url; pfOnInputProgress(); }
        pfRenderUploadPreview(w, url, file.name);
        pfSetUploadStatus(w, 'Uploaded ✓ · ' + fmtBytes(payload.size), 'ok');
      } catch(err){
        pfRenderUploadPreview(w, (document.getElementById(targetId)||{}).value || '');
        throw err;
      } finally { if(tmp) URL.revokeObjectURL(tmp); }
    } catch(err){
      pfSetUploadStatus(w, err.message, 'error');
      showUploadError(err.message);
    } finally {
      if(btn){ btn.disabled = false; btn.textContent = oldLabel; }
      input.value = '';
    }
  }

  async function pfUploadOtherDocument(i, input){
    const file = input.files && input.files[0];
    if(!file) return;
    const v = validateUploadFile(file, 'document');
    if(!v.ok){ showUploadError(v.message); input.value = ''; return; }
    try {
      const url = await uploadFileToServer(file, 'document', file.name);
      pfUpdateArrItem('otherDocuments', i, 'link', url);
      renderPfOtherDocs();
      pfOnInputProgress();
      showGenericToast('Document uploaded.');
    } catch(err){
      showUploadError(err.message);
    }
    input.value = '';
  }

  // Delegated listener so file inputs work without editing HTML or re-binding after re-renders.
  document.addEventListener('change', function(ev){
    const t = ev.target;
    if(t && t.matches && t.matches('input[type=file][data-pf-upload]')) pfHandleFileInput(t);
  });

  // =====================================================================
  // >>> MODIFIED END <<<
  // =====================================================================

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
          <div class="pf-field"><label>Link</label><input type="text" placeholder="https://..." value="${pfEsc(d.link)}" oninput="pfUpdateArrItem('otherDocuments',${i},'link',this.value)">
            <!-- >>> MODIFIED START: upload button + limits + preview (validated, FormData) -->
            <div style="margin-top:6px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <label class="btn btn-ghost btn-sm" style="cursor:pointer; margin:0;">Upload file
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" style="display:none;" onchange="pfUploadOtherDocument(${i}, this)">
              </label>
              <span style="font-size:11.5px; color:var(--ink-faint);">PDF, DOC, DOCX, JPG, PNG, WEBP · Max 5 MB</span>
            </div>
            ${d.link ? `<div style="margin-top:6px; font-size:12.5px;"><a href="${pfEsc(d.link)}" target="_blank" rel="noopener">Preview / view file</a></div>` : ''}
            <!-- >>> MODIFIED END -->
          </div>
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
  // Swaps the leading icon in the "Registration type" dropdown to match the selected role.
  const PF_REG_TYPE_ICONS = {
    'Faculty / Professor': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 8.5L12 14L23 8.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'Teacher': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5C4 18.1 5.1 17 6.5 17H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6.5 3H20V21H6.5C5.1 21 4 19.9 4 18.5V5.5C4 4.1 5.1 3 6.5 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    'Researcher': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    'Academic Administrator': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" stroke="currentColor" stroke-width="1.6"/></svg>',
    'Industry Professional': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21V4.5L12 2L20 4.5V21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 21V16H15V21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    'Other': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };
  const PF_REG_TYPE_DEFAULT_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 8.5L12 14L23 8.5L12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 11.5V16.5C5 16.5 5 20 12 20C19 20 19 16.5 19 16.5V11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function pfUpdateRegTypeIcon(value){
    const ico = document.getElementById('pfRegTypeIco');
    if(ico) ico.innerHTML = PF_REG_TYPE_ICONS[value] || PF_REG_TYPE_DEFAULT_ICON;
  }

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
      setVal('pfProfilePhoto', U.profilePhoto);
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
      pfUpdateRegTypeIcon(U.registrationType);

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
      pfInitAccordion();
      pfRefreshUploadPreviews();   // >>> MODIFIED: show preview for already-saved file links <<<
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
    document.querySelectorAll('#dashProfileTab .pf-section[data-section-index]').forEach(pfRefreshSectionCheck);
  }

  // Turns each numbered "1. Basic personal details" etc. block inside the
  // profile tab into a collapsible section with a tick that fills in once
  // the section has at least one field filled, plus a "Save & Close" button.
  function pfInitAccordion(){
    const sections = document.querySelectorAll('#dashProfileTab .pf-section');
    if(!sections.length) return;
    sections.forEach((sec, idx)=>{
      if(sec.dataset.accordionReady){ pfRefreshSectionCheck(sec); return; }
      sec.dataset.accordionReady = '1';
      const head = sec.querySelector('.pf-section-head');
      if(!head) return;

      // Move every element after the head into a body wrapper we can collapse.
      const body = document.createElement('div');
      body.className = 'pf-section-body';
      let next = head.nextElementSibling;
      while(next){
        const toMove = next;
        next = next.nextElementSibling;
        body.appendChild(toMove);
      }

      // Save & Close bar at the bottom of the section.
      const saveBar = document.createElement('div');
      saveBar.className = 'pf-section-savebar';
      saveBar.innerHTML = `<button type="button" class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); pfCollapseSection(${idx})">Close</button>
        <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); pfSaveAndCloseSection(${idx})">Save &amp; close</button>`;
      body.appendChild(saveBar);
      sec.appendChild(body);
      sec.dataset.sectionIndex = idx;

      // "+ Add" / "Edit" pill + chevron in the header.
      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.className = 'pf-section-add-btn';
      actionBtn.textContent = '+ Add';
      actionBtn.addEventListener('click', (e)=>{ e.stopPropagation(); pfToggleSection(idx); });
      const check = document.createElement('span');
      check.className = 'pf-section-check';
      check.textContent = '✓';
      const chevron = document.createElement('span');
      chevron.className = 'pf-section-chevron';
      chevron.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      head.appendChild(actionBtn);
      head.appendChild(check);
      head.appendChild(chevron);
      head.addEventListener('click', ()=> pfToggleSection(idx));

      // Every section starts closed.
      pfRefreshSectionCheck(sec);
    });
  }

  function pfSectionEl(idx){
    return document.querySelector(`#dashProfileTab .pf-section[data-section-index="${idx}"]`);
  }

  function pfToggleSection(idx){
    const sec = pfSectionEl(idx);
    if(sec) sec.classList.toggle('open');
  }

  function pfCollapseSection(idx){
    const sec = pfSectionEl(idx);
    if(sec) sec.classList.remove('open');
  }

  function pfRefreshSectionCheck(sec){
    const filled = Array.from(sec.querySelectorAll('input, select, textarea')).some(el=>{
      if(el.type === 'checkbox' || el.type === 'radio') return el.checked;
      return (el.value || '').trim();
    });
    sec.classList.toggle('complete', filled);
    const btn = sec.querySelector('.pf-section-add-btn');
    if(btn) btn.textContent = filled ? 'Edit' : '+ Add';
  }

  function pfSaveAndCloseSection(idx){
    const sec = pfSectionEl(idx);
    if(!sec) return;
    saveProfile({ silent: true });
    pfRefreshSectionCheck(sec);
    sec.classList.remove('open');
  }

  function saveProfile(opts){
    const U = currentUser;
    const val = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const checked = id => { const el = document.getElementById(id); return el ? el.checked : false; };

    // 1. Basic personal details
    U.name = val('pfName') || U.name || 'User';
    U.gender = val('pfGender');
    U.profilePhoto = val('pfProfilePhoto');
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
    if(opts && opts.silent){
      pfOnInputProgress();
      return;
    }
    pushNotif('Profile saved — you can now browse and apply to jobs.');
    goTo('jobs');
  }
