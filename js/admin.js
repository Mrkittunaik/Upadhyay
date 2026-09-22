  // ---------- Admin dashboard (demo) ----------
  function institutionTypeLabel(t){
    return t==='school' ? 'School' : t==='college' ? 'Junior College' : 'University';
  }
  function institutionInitials(name){
    return (name||'IN').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
  }
  function allInstitutionJobs(){
    // flattened list: [{...job, instId, instName}]
    const out = [];
    Object.keys(institutionsData).forEach(id=>{
      const inst = institutionsData[id];
      (inst.jobs||[]).forEach(j=> out.push(Object.assign({}, j, { instId:id, instName:inst.name })));
    });
    return out;
  }
  // Old behaviour opened an overlay. Now admin is its own page.
  function openAdmin(){ goTo('admin'); }
  function closeAdmin(){ goTo('home'); }

  // Called once by admin.html on load. Optional ?tab=faculty|institutions|jobs
  function initAdminPage(){
    document.getElementById('adminFooterYear').textContent = new Date().getFullYear();
    const tab = getParam('tab');
    switchAdminTab(['overview','faculty','institutions','jobs'].includes(tab) ? tab : 'overview');
  }

  function switchAdminTab(tab){
    const panels = ['overview','faculty','institutions','institutionProfile','jobs'];
    panels.forEach(t=>{
      const el = document.getElementById('adminPanel'+t.charAt(0).toUpperCase()+t.slice(1));
      if(el) el.style.display = t===tab ? (t==='overview'?'block':'block') : 'none';
    });
    ['overview','faculty','institutions','jobs'].forEach(t=>{
      const nav = document.getElementById('adminNav'+t.charAt(0).toUpperCase()+t.slice(1));
      if(nav) nav.classList.toggle('active', t===tab);
    });
    const titles = { overview:'Overview', faculty:'Faculty', institutions:'Institutions', institutionProfile:'Institution profile', jobs:'Job Applications' };
    document.getElementById('adminTopTitle').textContent = titles[tab] || 'Overview';
    document.getElementById('adminBackBtn').style.display = tab==='institutionProfile' ? 'flex' : 'none';
    if(tab==='overview') renderAdminOverview();
    if(tab==='faculty') renderAdminFaculty();
    if(tab==='institutions') renderAdminInstitutions();
    if(tab==='jobs') renderAdminJobs();
  }

  function totalDemoApplicants(){
    return allInstitutionJobs().reduce((sum,j)=> sum + (j.applicants||0), 0) + totalApplicantsCount();
  }
  function totalApplicantsCount(){
    return Object.values(jobsData).reduce((sum,j)=> sum + (j.applicantIds ? j.applicantIds.length : 0), 0);
  }

  function renderAdminOverview(){
    const facultyIds = Object.keys(facultyProfiles);
    const instIds = Object.keys(institutionsData);
    const demoJobs = allInstitutionJobs();
    const liveDemoJobs = demoJobs.filter(j=>j.status==='live');
    const totalJobsCount = demoJobs.length + Object.keys(jobsData).length;

    document.getElementById('adminStatJobs').textContent = totalJobsCount;
    document.getElementById('adminStatFaculty').textContent = facultyIds.length;
    document.getElementById('adminStatInstitutions').textContent = instIds.length;
    document.getElementById('adminStatApplications').textContent = totalDemoApplicants();

    document.getElementById('adminMiniLive').textContent = liveDemoJobs.length;
    const cityCounts = {};
    facultyIds.forEach(id=>{ const c = facultyProfiles[id].tags[2]; cityCounts[c] = (cityCounts[c]||0)+1; });
    const topCity = Object.keys(cityCounts).sort((a,b)=>cityCounts[b]-cityCounts[a])[0];
    document.getElementById('adminMiniLocation').textContent = topCity || '—';
    const avgApplicants = demoJobs.length ? Math.round(demoJobs.reduce((s,j)=>s+j.applicants,0)/demoJobs.length) : 0;
    document.getElementById('adminMiniAvg').textContent = avgApplicants;
    const phdCount = facultyIds.filter(id=>facultyProfiles[id].tags[0]==='PhD').length;
    document.getElementById('adminMiniPhd').innerHTML = phdCount + ' <small>/ '+facultyIds.length+'</small>';

    document.getElementById('adminOverviewInstitutionsBody').innerHTML = instIds.slice(0,5).map(id=>{
      const inst = institutionsData[id];
      return `<tr class="clickable" onclick="openInstitutionProfile('${id}')">
        <td class="admin-row-name">${inst.name}</td>
        <td><span class="admin-pill ${inst.type}">${institutionTypeLabel(inst.type)}</span></td>
        <td>${inst.city.split(',')[0]}</td>
        <td>${(inst.jobs||[]).length}</td>
        <td><button class="admin-viewbtn" onclick="event.stopPropagation(); openInstitutionProfile('${id}')">View</button></td>
      </tr>`;
    }).join('');

    document.getElementById('adminOverviewFacultyBody').innerHTML = facultyIds.slice(0,5).map(id=>{
      const p = facultyProfiles[id];
      return `<tr class="clickable" onclick="openFacultyDetail('${id}')">
        <td class="admin-row-name"><img class="admin-row-avatar" src="${p.avatar}">${p.name}</td>
        <td>${p.role}</td>
        <td>${p.tags[0]}</td>
        <td>${p.tags[2]}</td>
        <td><span class="admin-pill open">Open to opportunities</span></td>
      </tr>`;
    }).join('');

    const activity = [];
    instIds.slice(0,3).forEach(id=>{
      const inst = institutionsData[id];
      (inst.jobs||[]).slice(0,1).forEach(j=> activity.push({ text:`${inst.name} posted "${j.title}"`, time:j.posted }));
    });
    facultyIds.slice(0,2).forEach(id=>{
      activity.push({ text:`${facultyProfiles[id].name} joined as new faculty`, time:'this week' });
    });
    document.getElementById('adminActivityFeed').innerHTML = activity.map(a=>`
      <div style="padding:10px 0; border-bottom:1px solid var(--line); font-size:13px;">
        <div style="color:var(--ink);">${a.text}</div>
        <div style="color:var(--ink-faint); font-size:11.5px; margin-top:2px;">${a.time}</div>
      </div>`).join('') || '<p class="sub" style="margin:0;">No recent activity.</p>';
  }

  function populateAdminFacultyLocationFilter(){
    const sel = document.getElementById('adminFacultyLocationFilter');
    if(!sel || sel.options.length > 1) return;
    const cities = [...new Set(Object.values(facultyProfiles).map(p=>p.tags[2]))].sort();
    cities.forEach(city=>{
      const opt = document.createElement('option');
      opt.value = city; opt.textContent = city;
      sel.appendChild(opt);
    });
  }

  function renderAdminFaculty(){
    populateAdminFacultyLocationFilter();
    const q = (document.getElementById('adminFacultySearch').value || '').toLowerCase();
    const qualFilter = document.getElementById('adminFacultyQualFilter').value;
    const locationFilter = document.getElementById('adminFacultyLocationFilter').value;
    const expFilter = document.getElementById('adminFacultyExpFilter').value;
    const ids = Object.keys(facultyProfiles).filter(id=>{
      const p = facultyProfiles[id];
      const collegeText = (p.experience||[]).map(e=>e[1]).join(' ').toLowerCase();
      const expYrs = parseInt(p.tags[1], 10) || 0;
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || collegeText.includes(q);
      const matchesQual = !qualFilter || p.tags[0]===qualFilter;
      const matchesLocation = !locationFilter || p.tags[2]===locationFilter;
      let matchesExp = true;
      if(expFilter){
        const [lo,hi] = expFilter.split('-').map(Number);
        matchesExp = expYrs >= lo && expYrs <= hi;
      }
      return matchesQ && matchesQual && matchesLocation && matchesExp;
    });
    document.getElementById('adminFacultyCount').textContent = ids.length + (ids.length===1 ? ' faculty' : ' faculty members');
    document.getElementById('adminFacultyBody').innerHTML = ids.map(id=>{
      const p = facultyProfiles[id];
      return `<tr class="clickable" onclick="openFacultyDetail('${id}')">
        <td class="admin-row-name"><img class="admin-row-avatar" src="${p.avatar}">${p.name}</td>
        <td>${p.role}</td>
        <td>${p.tags[0]}</td>
        <td>${p.tags[2]}</td>
        <td><span class="admin-pill open">Open to opportunities</span></td>
      </tr>`;
    }).join('') || `<tr><td colspan="5" style="text-align:center; color:var(--ink-faint); padding:22px;">No faculty match your filters.</td></tr>`;
  }

  function normalizeCity(raw){
    return (raw || '').split(',')[0].trim();
  }
  function populateAdminInstitutionsLocationFilter(){
    const sel = document.getElementById('adminInstitutionsLocationFilter');
    if(!sel || sel.options.length > 1) return;
    const cities = [...new Set(Object.values(institutionsData).map(inst=>normalizeCity(inst.city)).filter(Boolean))].sort();
    cities.forEach(city=>{
      const opt = document.createElement('option');
      opt.value = city; opt.textContent = city;
      sel.appendChild(opt);
    });
  }

  function renderAdminInstitutions(){
    populateAdminInstitutionsLocationFilter();
    const q = (document.getElementById('adminInstitutionsSearch').value || '').toLowerCase();
    const typeFilter = document.getElementById('adminInstitutionsTypeFilter').value;
    const locationFilter = document.getElementById('adminInstitutionsLocationFilter').value;
    const ids = Object.keys(institutionsData).filter(id=>{
      const inst = institutionsData[id];
      const matchesQ = !q || inst.name.toLowerCase().includes(q) || inst.city.toLowerCase().includes(q);
      const matchesType = !typeFilter || inst.type===typeFilter;
      const matchesLocation = !locationFilter || normalizeCity(inst.city)===locationFilter;
      return matchesQ && matchesType && matchesLocation;
    });
    document.getElementById('adminInstitutionsCount').textContent = ids.length + (ids.length===1 ? ' institution' : ' institutions');
    document.getElementById('adminInstitutionsBody').innerHTML = ids.map(id=>{
      const inst = institutionsData[id];
      return `<tr class="clickable" onclick="openInstitutionProfile('${id}')">
        <td class="admin-row-name">${inst.name}</td>
        <td><span class="admin-pill ${inst.type}">${institutionTypeLabel(inst.type)}</span></td>
        <td>${inst.contact}</td>
        <td>${inst.city}</td>
        <td>${inst.phone}</td>
        <td>${inst.website}</td>
        <td>${(inst.jobs||[]).length}</td>
        <td><button class="admin-viewbtn" onclick="event.stopPropagation(); openInstitutionProfile('${id}')">View</button></td>
      </tr>`;
    }).join('') || `<tr><td colspan="8" style="text-align:center; color:var(--ink-faint); padding:22px;">No institutions match your filters.</td></tr>`;
  }

  function renderAdminJobs(){
    const categoryFilter = document.getElementById('adminJobsCategoryFilter').value;
    const statusFilter = document.getElementById('adminJobsStatusFilter').value;
    const demoJobs = allInstitutionJobs().filter(j=>{
      const matchesCat = !categoryFilter || j.category===categoryFilter;
      const matchesStatus = !statusFilter || j.status===statusFilter;
      return matchesCat && matchesStatus;
    });
    document.getElementById('adminJobsCount').textContent = demoJobs.length + (demoJobs.length===1 ? ' job' : ' jobs');
    document.getElementById('adminJobsBody').innerHTML = demoJobs.map(j=>`
      <tr class="clickable" onclick="openInstitutionProfile('${j.instId}')">
        <td class="admin-row-name">${j.title}</td>
        <td>${j.instName}</td>
        <td>${j.category}</td>
        <td>${j.location}</td>
        <td><span class="admin-pill ${j.status}">${j.status==='live' ? 'Live' : 'Closed'}</span></td>
        <td>${j.applicants}</td>
      </tr>`).join('') || `<tr><td colspan="6" style="text-align:center; color:var(--ink-faint); padding:22px;">No jobs match this filter.</td></tr>`;
  }

  function openFacultyDetail(id){
    const p = facultyProfiles[id];
    if(!p) return;
    document.getElementById('adminDetailAvatarWrap').innerHTML = `<img src="${p.avatar}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0;">`;
    document.getElementById('adminDetailName').textContent = p.name;
    document.getElementById('adminDetailSub').textContent = p.role;
    const statsRows = (p.stats||[]).map(([v,l])=>`<div class="admin-detail-row"><span class="k">${l}</span><span class="v">${v}</span></div>`).join('');
    const expRows = (p.experience||[]).map(([title,meta])=>`<div class="admin-detail-row"><span class="k">${title}</span><span class="v">${meta}</span></div>`).join('');
    const tagsRow = `<div class="admin-detail-row"><span class="k">Qualification / Location</span><span class="v">${(p.tags||[]).join(' · ')}</span></div>`;
    document.getElementById('adminDetailBody').innerHTML = `
      ${tagsRow}
      ${statsRows}
      ${expRows ? `<h4 style="margin:16px 0 6px; font-size:13px; color:var(--ink-faint);">Experience</h4>${expRows}` : ''}
    `;
    document.getElementById('adminDetailOverlay').classList.add('open');
  }
  function closeAdminDetail(){
    document.getElementById('adminDetailOverlay').classList.remove('open');
  }

  let currentAdminInstitutionId = null;

  function openInstitutionProfile(id){
    const inst = institutionsData[id];
    if(!inst) return;
    currentAdminInstitutionId = id;
    switchAdminTab('institutionProfile');
    document.getElementById('adminProfileAvatar').textContent = institutionInitials(inst.name);
    document.getElementById('adminProfileName').textContent = inst.name;
    document.getElementById('adminProfileMeta').textContent = institutionTypeLabel(inst.type) + ' · ' + inst.city;
    const jobs = inst.jobs || [];
    const liveCount = jobs.filter(j=>j.status==='live').length;
    const totalApplicants = jobs.reduce((s,j)=>s+j.applicants,0);
    document.getElementById('adminProfileJobsCount').textContent = jobs.length;
    document.getElementById('adminProfileLiveCount').textContent = liveCount;
    document.getElementById('adminProfileApplicantsCount').textContent = totalApplicants;
    document.getElementById('adminProfileJoined').textContent = inst.joined;
    document.getElementById('adminProfileContact').textContent = `${inst.contact} (${inst.designation})`;
    document.getElementById('adminProfileEmail').textContent = inst.email;
    document.getElementById('adminProfilePhone').textContent = inst.phone;
    document.getElementById('adminProfileWebsite').textContent = inst.website;

    document.getElementById('adminProfileJobsGrid').innerHTML = jobs.map(j=>`
      <div class="admin-jobcard">
        <div class="admin-jobcard-top">
          <div>
            <div class="admin-jobcard-title">${j.title}</div>
            <div class="admin-jobcard-meta">${j.category} · ${j.qualification} · ${j.location}</div>
          </div>
          <span class="admin-pill ${j.status}">${j.status==='live' ? 'Live' : 'Closed'}</span>
        </div>
        <div class="admin-jobcard-foot">
          <div class="admin-jobcard-applicants">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 20c1-3.6 4.2-6 7.5-6s6.5 2.4 7.5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            ${j.applicants} applicants
          </div>
          <span style="font-size:11.5px; color:var(--ink-faint);">${j.posted}</span>
        </div>
      </div>`).join('') || `<p class="sub" style="grid-column:1/-1;">No jobs posted yet.</p>`;
  }

  // ---------- CSV export helpers ----------
  function csvEscape(val){
    const s = String(val==null ? '' : val);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
  }
  function downloadCSV(filename, rows){
    const csv = rows.map(row=> row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadInstitutionsCSV(){
    const rows = [['Institution','Type','Contact Person','Designation','Email','Phone','Website','Location','Jobs Posted','Joined']];
    Object.values(institutionsData).forEach(inst=>{
      rows.push([inst.name, institutionTypeLabel(inst.type), inst.contact, inst.designation, inst.email, inst.phone, inst.website, inst.city, (inst.jobs||[]).length, inst.joined]);
    });
    downloadCSV('upadyay-institutions.csv', rows);
  }

  function downloadFacultyCSV(){
    const rows = [['Name','Subject / Role','Qualification','Experience','Location','Status']];
    Object.values(facultyProfiles).forEach(p=>{
      rows.push([p.name, p.role, p.tags[0], p.tags[1]||'', p.tags[2], 'Open to opportunities']);
    });
    downloadCSV('upadyay-faculty.csv', rows);
  }

  function downloadJobsCSV(){
    const rows = [['Job Title','Institution','Category','Qualification','Location','Status','Applicants','Posted']];
    allInstitutionJobs().forEach(j=>{
      rows.push([j.title, j.instName, j.category, j.qualification, j.location, j.status==='live'?'Live':'Closed', j.applicants, j.posted]);
    });
    downloadCSV('upadyay-job-applications.csv', rows);
  }

  // Deterministic pseudo-random applicant list per job, drawn from the faculty pool
  function applicantsForJob(j, instId, jobIndex){
    const pool = Object.values(facultyProfiles);
    const out = [];
    const seedBase = (instId.length + jobIndex*7);
    for(let i=0;i<j.applicants;i++){
      const p = pool[(seedBase + i*3) % pool.length];
      out.push(p);
    }
    return out;
  }

  function downloadInstitutionApplicantsCSV(){
    const inst = institutionsData[currentAdminInstitutionId];
    if(!inst) return;
    const rows = [['Job Title','Category','Qualification Required','Job Status','Applicant Name','Applicant Subject / Role','Applicant Qualification','Applicant Location']];
    (inst.jobs||[]).forEach((j,idx)=>{
      const applicants = applicantsForJob(j, currentAdminInstitutionId, idx);
      applicants.forEach(p=>{
        rows.push([j.title, j.category, j.qualification, j.status==='live'?'Live':'Closed', p.name, p.role, p.tags[0], p.tags[2]]);
      });
    });
    downloadCSV(`upadyay-${inst.name.replace(/\s+/g,'-').toLowerCase()}-applicants.csv`, rows);
  }
