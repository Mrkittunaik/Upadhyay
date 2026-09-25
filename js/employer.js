// ---------- Faculty profile data + slide-in panel ----------
  const facultyProfiles = {
    priya: {
      avatar:'https://i.pravatar.cc/160?img=47', name:'Dr. Priya Menon', role:'Physics · Quantum Optics',
      tags:['PhD','8 yrs experience','Hyderabad'],
      stats:[['14','Publications'],['210','Citations'],['1','Patent']],
      experience:[
        ['Associate Professor, Physics','KL University · 2019 – Present'],
        ['Assistant Professor, Physics','Osmania University · 2015 – 2019']
      ],
      links:[
        ['PhD Certificate — KL University.pdf','doc'],
        ['Resume / CV.pdf','doc'],
        ['Publication list (Google Scholar)','link'],
        ['Patent certificate.pdf','doc']
      ]
    },
    rohit:{
      avatar:'https://i.pravatar.cc/160?img=12', name:'Rohit Sharma', role:'Commerce · Accountancy',
      tags:['PG','5 yrs experience','Chennai'],
      stats:[['5','Yrs experience'],['2','Boards taught'],['120+','Students mentored']],
      experience:[
        ['Senior Lecturer, Commerce','Narayana Junior College · 2021 – Present'],
        ['Lecturer, Commerce','Sri Chaitanya College · 2019 – 2021']
      ],
      links:[
        ['PG Degree Certificate.pdf','doc'],
        ['Resume / CV.pdf','doc'],
        ['Experience letter — Sri Chaitanya.pdf','doc']
      ]
    },
    anjali:{
      avatar:'https://i.pravatar.cc/160?img=32', name:'Dr. Anjali Kulkarni', role:'Computer Science · AI/ML',
      tags:['PhD','11 yrs experience','Vijayawada'],
      stats:[['22','Publications'],['340','Citations'],['3','Patents']],
      experience:[
        ['Professor, Computer Science','KL University · 2017 – Present'],
        ['Assistant Professor, CSE','VIT Vellore · 2012 – 2017']
      ],
      links:[
        ['PhD Certificate — IIT Bombay.pdf','doc'],
        ['Resume / CV.pdf','doc'],
        ['Publication list (Google Scholar)','link'],
        ['Patent certificates (3).pdf','doc'],
        ['Books published — list.pdf','doc']
      ]
    }
  };

  // ---------- Demo institutions + their posted jobs (for admin dashboard) ----------
  const institutionsData = {
    kluniversity:{ name:'KL University', type:'university', city:'Vijayawada, Andhra Pradesh', contact:'Radha Krishna', designation:'HR Head', email:'hr@kluniversity.in', phone:'+91 98480 12345', website:'www.kluniversity.in', joined:'Jan 2024',
      jobs:[
        { title:'Associate Professor — Physics', category:'University faculty', qualification:'PhD', location:'Vijayawada', applicants:14, status:'live', posted:'5 days ago' },
        { title:'Assistant Professor — Computer Science', category:'University faculty', qualification:'PhD', location:'Vijayawada', applicants:22, status:'live', posted:'1 week ago' },
        { title:'Professor — Mechanical Engineering', category:'University faculty', qualification:'PhD', location:'Vijayawada', applicants:9, status:'live', posted:'2 weeks ago' },
        { title:'Assistant Professor — Mathematics', category:'University faculty', qualification:'PhD', location:'Vijayawada', applicants:17, status:'closed', posted:'1 month ago' },
        { title:'Lab Coordinator — Electronics', category:'University faculty', qualification:'PG', location:'Vijayawada', applicants:6, status:'live', posted:'3 days ago' },
        { title:'Associate Professor — Biotechnology', category:'University faculty', qualification:'PhD', location:'Vijayawada', applicants:11, status:'closed', posted:'6 weeks ago' }
      ] },
    osmania:{ name:'Osmania University', type:'university', city:'Hyderabad, Telangana', contact:'Dr. Meena Rao', designation:'Registrar', email:'registrar@osmania.ac.in', phone:'+91 90000 11122', website:'www.osmania.ac.in', joined:'Mar 2024',
      jobs:[
        { title:'Professor — English Literature', category:'University faculty', qualification:'PhD', location:'Hyderabad', applicants:8, status:'live', posted:'4 days ago' },
        { title:'Assistant Professor — History', category:'University faculty', qualification:'PhD', location:'Hyderabad', applicants:12, status:'live', posted:'1 week ago' },
        { title:'Associate Professor — Political Science', category:'University faculty', qualification:'PhD', location:'Hyderabad', applicants:5, status:'closed', posted:'1 month ago' }
      ] },
    narayana:{ name:'Narayana Junior College', type:'college', city:'Chennai, Tamil Nadu', contact:'S. Venkatesh', designation:'Principal', email:'principal@narayanajc.in', phone:'+91 98765 43210', website:'www.narayanagroup.com', joined:'Feb 2024',
      jobs:[
        { title:'Senior Lecturer — Commerce', category:'Junior college', qualification:'PG', location:'Chennai', applicants:19, status:'live', posted:'2 days ago' },
        { title:'Lecturer — Mathematics (MPC)', category:'Junior college', qualification:'PG', location:'Chennai', applicants:27, status:'live', posted:'5 days ago' },
        { title:'Lecturer — Botany (BiPC)', category:'Junior college', qualification:'PG', location:'Chennai', applicants:15, status:'live', posted:'1 week ago' },
        { title:'Lecturer — Physics (MPC)', category:'Junior college', qualification:'PG', location:'Chennai', applicants:10, status:'closed', posted:'3 weeks ago' }
      ] },
    srichaitanya:{ name:'Sri Chaitanya College', type:'college', city:'Vijayawada, Andhra Pradesh', contact:'K. Suresh', designation:'HR Manager', email:'hr@srichaitanya.in', phone:'+91 91234 56789', website:'www.srichaitanya.in', joined:'Apr 2024',
      jobs:[
        { title:'Lecturer — Chemistry (MPC)', category:'Junior college', qualification:'PG', location:'Vijayawada', applicants:13, status:'live', posted:'6 days ago' },
        { title:'Lecturer — Zoology (BiPC)', category:'Junior college', qualification:'PG', location:'Vijayawada', applicants:8, status:'live', posted:'2 weeks ago' }
      ] },
    vitvellore:{ name:'VIT Vellore', type:'university', city:'Vellore, Tamil Nadu', contact:'Dr. Anand Krishnan', designation:'Dean, Faculty Affairs', email:'dean.fa@vit.ac.in', phone:'+91 90876 54321', website:'www.vit.ac.in', joined:'Dec 2023',
      jobs:[
        { title:'Assistant Professor — Cybersecurity', category:'University faculty', qualification:'PhD', location:'Vellore', applicants:24, status:'live', posted:'3 days ago' },
        { title:'Associate Professor — Data Science', category:'University faculty', qualification:'PhD', location:'Vellore', applicants:31, status:'live', posted:'1 week ago' },
        { title:'Professor — VLSI Design', category:'University faculty', qualification:'PhD', location:'Vellore', applicants:7, status:'live', posted:'2 weeks ago' },
        { title:'Assistant Professor — AI/ML', category:'University faculty', qualification:'PhD', location:'Vellore', applicants:29, status:'closed', posted:'5 weeks ago' },
        { title:'Lab Instructor — Robotics', category:'University faculty', qualification:'PG', location:'Vellore', applicants:16, status:'live', posted:'4 days ago' }
      ] },
    dpsHyderabad:{ name:'Delhi Public School', type:'school', city:'Hyderabad, Telangana', contact:'Ritu Sharma', designation:'HR Head', email:'hr@dpshyd.edu.in', phone:'+91 99887 76655', website:'www.dpshyderabad.com', joined:'May 2024',
      jobs:[
        { title:'PGT — Mathematics', category:'School faculty', qualification:'PG', location:'Hyderabad', applicants:21, status:'live', posted:'1 week ago' },
        { title:'TGT — Social Studies', category:'School faculty', qualification:'UG', location:'Hyderabad', applicants:18, status:'live', posted:'2 weeks ago' }
      ] },
    ctraining:{ name:'Computer Training Ltd', type:'college', city:'Rochester, NY, United States', contact:'Peter Smith', designation:'Director', email:'peter@ctrainingltd.com', phone:'585-908-7123', website:'www.ctrainingltd.com', joined:'Jun 2024',
      jobs:[
        { title:'Instructor — Networking Fundamentals', category:'Vocational training', qualification:'PG', location:'Rochester, NY', applicants:6, status:'live', posted:'5 days ago' }
      ] },
    coimbatoreArts:{ name:'Coimbatore Arts College', type:'college', city:'Coimbatore, Tamil Nadu', contact:'Dr. Latha Iyer', designation:'Principal', email:'principal@coimbatoreartscollege.edu.in', phone:'+91 94444 33221', website:'www.coimbatoreartscollege.edu.in', joined:'Jul 2024',
      jobs:[
        { title:'Assistant Professor — Fine Arts', category:'College faculty', qualification:'PG', location:'Coimbatore', applicants:9, status:'live', posted:'1 week ago' }
      ] },
    keralaCentral:{ name:'Kerala Central School', type:'school', city:'Kochi, Kerala', contact:'Thomas Jacob', designation:'HR Head', email:'hr@keralacentral.edu.in', phone:'+91 98470 22110', website:'www.keralacentralschool.in', joined:'Aug 2024',
      jobs:[
        { title:'PGT — English', category:'School faculty', qualification:'PG', location:'Kochi', applicants:12, status:'live', posted:'3 days ago' },
        { title:'PRT — Primary Teacher', category:'School faculty', qualification:'UG', location:'Kochi', applicants:20, status:'live', posted:'6 days ago' },
        { title:'TGT — Science', category:'School faculty', qualification:'PG', location:'Kochi', applicants:14, status:'closed', posted:'1 month ago' }
      ] },
    delhiCommerce:{ name:'Delhi School of Commerce', type:'school', city:'New Delhi, Delhi', contact:'Anjali Bhatia', designation:'Principal', email:'principal@delhicommerce.edu.in', phone:'+91 98100 44556', website:'www.delhicommerce.edu.in', joined:'Sep 2024',
      jobs:[
        { title:'PGT — Commerce', category:'School faculty', qualification:'PG', location:'New Delhi', applicants:16, status:'live', posted:'4 days ago' },
        { title:'TGT — Economics', category:'School faculty', qualification:'PG', location:'New Delhi', applicants:11, status:'live', posted:'1 week ago' }
      ] }
  };

  // ---------- Extra demo candidates (auto-generated, 17 more → 20 total) ----------
  (function(){
    const extra = [
      ['ravikumar','Dr. Ravi Kumar','Mathematics · Applied Statistics','PhD','9 yrs experience','Bengaluru',53],
      ['sneha','Sneha Reddy','English · Literature','PG','4 yrs experience','Hyderabad',44],
      ['arjun','Arjun Nair','Chemistry · Organic Chemistry','PhD','7 yrs experience','Kochi',22],
      ['meera','Meera Iyer','Biology · Zoology','PG','6 yrs experience','Chennai',31],
      ['vikram','Dr. Vikram Rao','Electronics · VLSI Design','PhD','13 yrs experience','Vijayawada',15],
      ['fatima','Fatima Sheikh','History · Indian History','PG','3 yrs experience','Hyderabad',29],
      ['karthik','Karthik Subramanian','Mechanical Engineering · Thermodynamics','PhD','10 yrs experience','Chennai',18],
      ['divya','Divya Prakash','Economics · Macroeconomics','PG','5 yrs experience','Vijayawada',36],
      ['suresh','Suresh Babu','Physical Education · Sports Science','UG','8 yrs experience','Bengaluru',52],
      ['pooja','Pooja Malhotra','Political Science · Public Policy','PG','4 yrs experience','Delhi',25],
      ['imran','Imran Ali','Computer Science · Cybersecurity','PhD','6 yrs experience','Hyderabad',13],
      ['lakshmi','Dr. Lakshmi Narayan','Mathematics · Number Theory','PhD','15 yrs experience','Chennai',49],
      ['rajesh','Rajesh Pillai','Commerce · Taxation','PG','7 yrs experience','Kochi',33],
      ['anitha','Anitha Krishnan','Biology · Botany','PG','5 yrs experience','Coimbatore',41],
      ['zoya','Zoya Khan','English · Linguistics','PhD','8 yrs experience','Hyderabad',24],
      ['manoj','Manoj Tiwari','Physics · Astrophysics','PhD','12 yrs experience','Delhi',11],
      ['harini','Harini Venkatesh','Computer Science · Data Science','PG','3 yrs experience','Bengaluru',45]
    ];
    extra.forEach(([id,name,role,qual,exp,city,imgNum])=>{
      facultyProfiles[id] = {
        avatar:`https://i.pravatar.cc/160?img=${imgNum}`,
        name, role,
        tags:[qual, exp, city],
        stats: qual==='PhD'
          ? [[String(Math.floor(Math.random()*20)+3),'Publications'],[String(Math.floor(Math.random()*300)+40),'Citations'],[String(Math.floor(Math.random()*3)),'Patents']]
          : [[exp.split(' ')[0],'Yrs experience'],[String(Math.floor(Math.random()*3)+1),'Boards taught'],[String(Math.floor(Math.random()*150)+50)+'+','Students mentored']],
        experience:[
          [`${qual==='PhD' ? 'Associate Professor' : 'Lecturer'}, ${role.split(' · ')[0]}`, `${city} Institute of Technology · 2019 – Present`],
          [`${qual==='PhD' ? 'Assistant Professor' : 'Junior Lecturer'}, ${role.split(' · ')[0]}`, `${city} College · 2014 – 2019`]
        ],
        links:[
          [`${qual} Certificate.pdf`,'doc'],
          ['Resume / CV.pdf','doc'],
          ['Publication list (Google Scholar)','link']
        ]
      };
    });
  })();

  function docIcon(type){
    return type==='link'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14L20 4M20 4H13M20 4V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 13V18C18 19.1 17.1 20 16 20H6C4.9 20 4 19.1 4 18V8C4 6.9 4.9 6 6 6H11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  }

  let slideProfileId = null;
  function openProfile(id){
    if(!isLoggedIn){ openAuth('post'); return; }
    const p = facultyProfiles[id];
    if(!p) return;
    slideProfileId = id;
    document.getElementById('spAvatar').style.backgroundImage = `url('${p.avatar}')`;
    document.getElementById('spName').textContent = p.name;
    document.getElementById('spRole').textContent = p.role;
    document.getElementById('spTags').innerHTML = p.tags.map(t=>`<span class="hp-tag">${t}</span>`).join('');
    document.getElementById('spStats').innerHTML = p.stats.map(([num,label])=>`<div class="hp-stat"><span class="num tabular">${num}</span><span class="label">${label}</span></div>`).join('');
    document.getElementById('spExperience').innerHTML = p.experience.map(([t1,t2])=>`<div class="slide-exp-item"><div class="slide-exp-dot"></div><div><div class="t1">${t1}</div><div class="t2">${t2}</div></div></div>`).join('');
    document.getElementById('spLinks').innerHTML = p.links.map(([label,type])=>`<a class="slide-link" href="javascript:void(0)">${docIcon(type)}${label}</a>`).join('');
    let actions = document.getElementById('spActions');
    if(currentRole==='company'){
      if(!actions){
        actions = document.createElement('div');
        actions.id = 'spActions';
        actions.style.cssText = 'display:flex; gap:10px; margin-top:18px;';
        document.getElementById('spLinks').insertAdjacentElement('afterend', actions);
      }
      actions.style.display = 'flex';
      actions.innerHTML = `
        <button class="btn btn-light btn-sm" onclick="messageCandidate('${id}')">Message</button>
        ${candidateStatus[id]==='shortlisted'
          ? `<button class="btn btn-primary btn-sm" disabled>Shortlisted</button>`
          : `<button class="btn btn-primary btn-sm" onclick="inviteCandidate('${id}'); openProfile('${id}');">${candidateStatus[id]==='invited' ? 'Invited ✓' : 'Invite candidate'}</button>`}
        ${candidateStatus[id]==='invited' ? `<button class="btn btn-ghost btn-sm" onclick="shortlistCandidate('${id}'); openProfile('${id}');">Shortlist</button>` : ''}
      `;
    } else if(actions){
      actions.style.display = 'none';
    }
    document.getElementById('slideScrim').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeProfile(){
    document.getElementById('slideScrim').classList.remove('open');
    document.body.style.overflow = '';
  }

  function switchDashTab(which){
    // Only "My profile" exists now — Browse jobs tab was removed. Kept as a no-op
    // so any legacy calls to switchDashTab('profile') don't error.
    const pf = document.getElementById('dashProfileTab');
    if(pf) pf.style.display = 'block';
  }

  function switchEmployerTab(which){
    const $ = id => document.getElementById(id);
    if(!$('dashCompanyTab')) return;               // not on the employer page
    $('dashCompanyTab').style.display = which==='company' ? 'block' : 'none';
    $('dashPostTab').style.display = which==='post' ? 'block' : 'none';
    $('dashCandidatesTab').style.display = which==='candidates' ? 'block' : 'none';
    $('subtabCompany').classList.toggle('active', which==='company');
    $('subtabPost').classList.toggle('active', which==='post');
    $('subtabCandidates').classList.toggle('active', which==='candidates');
    $('candidateListWrap').style.display = which==='candidates' ? 'block' : 'none';
    if(which!=='post') $('apListWrap').style.display = 'none';
    if(which==='candidates') renderCandidates();
    if(which==='post') renderPostedJobs();
  }

  function previewLogo(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){
      currentCompany.logo = ev.target.result;
      saveState();
      refreshDashTopAccount();
      const img = document.getElementById('logoPreview');
      img.src = currentCompany.logo;
      img.style.display = 'block';
      document.getElementById('logoPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // ---------- Company profile ----------
  // currentCompany now lives in store.js (persisted across pages)

  function saveCompany(){
    currentCompany.name = document.getElementById('coName').value || 'Your institution';
    currentCompany.type = document.getElementById('coType').value;
    currentCompany.city = document.getElementById('coCity').value;
    currentCompany.website = document.getElementById('coWebsite').value;
    currentCompany.desc = document.getElementById('coDesc').value;
    currentCompany.contactName = document.getElementById('coContactName').value;
    currentCompany.designation = document.getElementById('coDesignation').value;
    currentCompany.email = document.getElementById('coEmail').value;
    currentCompany.phone = document.getElementById('coPhone').value;
    currentCompany.saved = true;
    saveState();
    document.getElementById('dashName').textContent = currentCompany.name;
    document.getElementById('dashAvatar').textContent = currentCompany.name.slice(0,2).toUpperCase();
    document.getElementById('dashSub').textContent = 'Your poster panel — post jobs, review and invite candidates';
    document.getElementById('employerSetupNote').style.display = 'none';
    document.getElementById('employerTabsBar').style.display = 'flex';
    refreshDashTopAccount();
    switchEmployerTab('post');
    const note = document.getElementById('coSavedNote');
    note.style.display = 'inline';
    setTimeout(()=>{ note.style.display = 'none'; }, 2500);
  }

  function companyInitials(){
    return (currentCompany.name || 'IN').trim().slice(0,2).toUpperCase();
  }
  function companyLogoStyle(){
    return currentCompany.logo
      ? `background-image:url('${currentCompany.logo}'); background-size:cover;`
      : `background:var(--blue-700);`;
  }

  // ---------- Candidate pool + application status ----------
  // status per candidate id: 'applied' | 'invited' | 'shortlisted'
  // candidateStatus now lives in store.js (persisted across pages)

  function statusBadge(id){
    const s = candidateStatus[id];
    if(s==='shortlisted') return '<span class="badge badge-accepted">Shortlisted</span>';
    if(s==='invited') return '<span class="badge badge-pending">Invited</span>';
    return '';
  }

  function inviteCandidate(id, ev){
    if(ev) ev.stopPropagation();
    candidateStatus[id] = 'invited';
    saveState();
    const p = facultyProfiles[id];
    pushNotif(`Invited ${p ? p.name : 'a candidate'} to apply.`);
    renderCandidates();
    if(document.getElementById('applicantsView').style.display !== 'none') renderApplicants(activeJobId);
  }
  function shortlistCandidate(id, ev){
    if(ev) ev.stopPropagation();
    candidateStatus[id] = 'shortlisted';
    saveState();
    const p = facultyProfiles[id];
    pushNotif(`Shortlisted ${p ? p.name : 'a candidate'}.`);
    renderCandidates();
    if(document.getElementById('applicantsView').style.display !== 'none') renderApplicants(activeJobId);
  }
  function messageCandidate(id, ev){
    if(ev) ev.stopPropagation();
    const p = facultyProfiles[id];
    const msg = prompt(`Send a message to ${p ? p.name : 'this candidate'}:`, `Hi, we'd like to talk to you about an opening at ${currentCompany.name || 'our institution'}.`);
    if(msg){ alert('Message sent to ' + (p ? p.name : 'candidate') + '.'); pushNotif(`Message sent to ${p ? p.name : 'a candidate'}.`); }
  }

  function candidateCardHTML(id){
    const p = facultyProfiles[id];
    if(!p) return '';
    return `
      <div class="job-card profile-card" onclick="openProfile('${id}')" style="cursor:pointer;">
        <div class="job-card-top">
          <div class="job-logo" style="background-image:url('${p.avatar}'); background-size:cover;"></div>
          <div><p class="jc-title">${p.name}<span class="verified-tick" title="Verified profile"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span></p><p class="jc-org">${p.role}</p></div>
          ${statusBadge(id) || `<span class="hp-badge">${p.tags[0]}</span>`}
        </div>
        <div class="jc-tags">${p.tags.map(t=>`<span class="hp-tag">${t}</span>`).join('')}</div>
        <div class="jc-foot">
          <span class="jc-posted">Open to opportunities</span>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-light btn-sm" onclick="event.stopPropagation(); messageCandidate('${id}', event)">Message</button>
            ${candidateStatus[id]==='shortlisted'
              ? `<button class="btn btn-primary btn-sm" disabled>Shortlisted</button>`
              : `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); inviteCandidate('${id}', event)">${candidateStatus[id]==='invited' ? 'Invited ✓' : 'Invite'}</button>`}
          </div>
        </div>
      </div>`;
  }

  const CAND_PAGE_SIZE = 8;
  let candVisibleCount = CAND_PAGE_SIZE;

  function renderCandidates(resetPaging){
    if(resetPaging !== false) candVisibleCount = CAND_PAGE_SIZE;
    const q = (document.getElementById('candSearch').value || '').toLowerCase();
    const ids = Object.keys(facultyProfiles).filter(id=>{
      const p = facultyProfiles[id];
      return !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    });
    const visibleIds = ids.slice(0, candVisibleCount);
    document.getElementById('candidateList').innerHTML = visibleIds.map(candidateCardHTML).join('') || `
      <div class="empty-state">
        <div class="empty-state-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 20H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v8a2 2 0 01-2 2z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="14" r="2.5" stroke="currentColor" stroke-width="2"/></svg></div>
        <h4>No profiles found</h4>
        <p>No published profiles match your search and filters yet. Try clearing a filter or broadening your search.</p>
      </div>`;
    document.getElementById('candidateCount').textContent = ids.length + (ids.length===1 ? ' profile found' : ' profiles found');

    const moreWrap = document.getElementById('candidateShowMoreWrap');
    if(moreWrap){
      const remaining = ids.length - visibleIds.length;
      if(remaining > 0){
        moreWrap.style.display = 'flex';
        document.getElementById('candidateShowMoreBtn').textContent = `Show ${Math.min(remaining, CAND_PAGE_SIZE)} more`;
      } else {
        moreWrap.style.display = 'none';
      }
    }
  }
  function showMoreCandidates(){
    candVisibleCount += CAND_PAGE_SIZE;
    renderCandidates(false);
  }

  // ---------- Jobs + applicants ----------
  // job counter now lives in store.js as postedJobCount
  let activeJobId = null;
  const jobsData = postedJobs; // persisted in store.js: id -> {title, category, qualification, location, applicantIds}
  const allCandidateIds = Object.keys(facultyProfiles);

  function addJob(e){
    e.preventDefault();
    const title = document.getElementById('jbTitle').value || 'Untitled role';
    const category = document.getElementById('jbCategory').value;
    const qualification = document.getElementById('jbQualification').value;
    const location = document.getElementById('jbLocation').value;
    postedJobCount++;
    const jobCount = postedJobCount;
    const id = 'job' + jobCount;
    // demo: attach a rotating slice of the candidate pool as applicants
    const applicantIds = allCandidateIds.filter((_,i)=> i % ((jobCount % 3)+1) === 0);
    jobsData[id] = { title, category, qualification, location, applicantIds: applicantIds.length ? applicantIds : allCandidateIds };

    saveState();
    renderPostedJobs();
    pushNotif(`Job posted: ${title}.`);
    document.getElementById('jbTitle').value = '';
    document.getElementById('jbLocation').value = '';
  }

  // Rebuilds the "your posted jobs" list from saved data (so it survives page loads)
  function renderPostedJobs(){
    const list = document.getElementById('jobList');
    if(!list) return;
    list.innerHTML = '';
    Object.keys(jobsData).forEach(id=>{
      const job = jobsData[id];
      const item = document.createElement('div');
      item.className = 'job-list-item';
      item.style.cursor = 'pointer';
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.onclick = ()=> openApplicantsView(id);
      item.innerHTML = `
        <div class="job-logo" style="width:34px; height:34px; border-radius:8px; margin-right:10px; ${companyLogoStyle()}"></div>
        <div style="flex:1;"><div class="jt">${job.title}</div><div class="jm">${[job.category,job.qualification,job.location].filter(Boolean).join(' · ') || 'Posted just now'} · ${job.applicantIds.length} applicants</div></div>
        <span class="badge-live">Live</span>`;
      list.prepend(item);
    });
  }

  function openApplicantsView(jobId){
    activeJobId = jobId;
    document.getElementById('jobPostForm').style.display = 'none';
    document.getElementById('applicantsView').style.display = 'block';
    document.getElementById('apListWrap').style.display = 'block';
    const job = jobsData[jobId];
    document.getElementById('apJobTitle').textContent = job.title;
    document.getElementById('apJobMeta').textContent = [job.category, job.qualification, job.location].filter(Boolean).join(' · ');
    renderApplicants(jobId);
  }
  function closeApplicantsView(){
    document.getElementById('jobPostForm').style.display = 'block';
    document.getElementById('applicantsView').style.display = 'none';
    document.getElementById('apListWrap').style.display = 'none';
    activeJobId = null;
  }
  function renderApplicants(jobId){
    const job = jobsData[jobId];
    if(!job) return;
    document.getElementById('apList').innerHTML = job.applicantIds.map(candidateCardHTML).join('') || `
      <div class="empty-state">
        <div class="empty-state-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg></div>
        <h4>No applicants yet</h4>
        <p>Once faculty or staff apply to this job, they'll show up here.</p>
      </div>`;
    document.getElementById('apCount').textContent = job.applicantIds.length + (job.applicantIds.length===1 ? ' applicant' : ' applicants');
  }
