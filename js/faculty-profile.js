/* Faculty Profile UI — frontend only, dummy data, no backend. */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const OPT={
 title:['Mr.','Ms.','Mrs.','Dr.','Prof.','Other'],gender:['Male','Female','Non-binary','Prefer not to say','Other'],
 desig:['Teacher','Primary Teacher','TGT','PGT','Lecturer','Assistant Professor','Associate Professor','Professor','Head of Department','Principal','Academic Coordinator','Researcher','Visiting Faculty','Guest Faculty','Other'],
 levels:['Pre-Primary','Primary','Middle School','Secondary School','Senior Secondary','Junior College','Undergraduate / UG','Postgraduate / PG','PhD / Research','Professional Courses','Other'],
 subjects:['Mathematics','Physics','Chemistry','Biology','Computer Science','Data Science','English','Commerce','Economics','Management','History','Geography','Political Science','Languages','Physical Education','Fine Arts','Statistics','Electronics','Mechanical Engineering','Civil Engineering','Anatomy','Pharmacology','Other'],
 boards:['CBSE','ICSE','State Board','IB','Cambridge','University / College Curriculum','Other'],
 medium:['English','Hindi','Telugu','Other'],
 jobtype:['Full Time','Part Time','Contract','Visiting Faculty','Guest Faculty'],
 emp:['Full Time','Part Time','Contract','Visiting Faculty','Guest Faculty','Temporary','Internship / Trainee','Other'],
 cities:['Hyderabad','Nagpur','Bengaluru','Mumbai','Pune','Delhi NCR','Chennai','Kolkata','Telangana','Maharashtra','Karnataka','Anywhere in India'],
 high:['10th / SSC','12th / Intermediate','Diploma',"Bachelor's Degree","Master's Degree",'M.Phil','Ph.D.','Postdoctoral','Other'],
 ug:['BA','BSc','BCom','BBA','BCA','BE','BTech','BEd','LLB','MBBS','BPharm','BPEd','Other'],
 pg:['MA','MSc','MCom','MBA','MCA','MTech','ME','MEd','MPharm','MPEd','MS','Other'],
 mode:['Regular','Distance','Online','Part Time'],stream:['Science','Commerce','Arts / Humanities','Vocational','Other'],
 tq:['B.Ed.','M.Ed.','D.El.Ed.','B.P.Ed.','M.P.Ed.','Special Education Qualification','CTET','TET','State TET','NET','SET','SLET','Other'],
 linkt:['LinkedIn','Google Scholar','ORCID','ResearchGate','Personal Website','Portfolio','YouTube / Teaching Channel','Other'],
 pref:['Pre-Primary','Primary','Middle School','Secondary School','Senior Secondary','Junior College','Undergraduate / UG','Postgraduate / PG','PhD / Research'],
 exp:['Fresher','1–2 Years','3–5 Years','6–10 Years','11–15 Years','15+ Years']};
const PIN={'500001':['Telangana','Hyderabad','Hyderabad','Abids'],'440001':['Maharashtra','Nagpur','Nagpur','Sitabuldi'],'560001':['Karnataka','Bengaluru Urban','Bengaluru','MG Road'],'400001':['Maharashtra','Mumbai','Mumbai','Fort'],'110001':['Delhi','New Delhi','New Delhi','Connaught Place'],'411001':['Maharashtra','Pune','Pune','Camp']};
const SEC=['Personal Details','Account & Contact','Professional Profile','Education & Qualifications','Teaching Qualifications','Employment History','Teaching Experience','Documents','Professional Links','Teaching Preferences','Verification','Profile Preview'];
const ICON=['👤','🔐','🎓','📚','📜','💼','⏳','📁','🔗','🎯','✅','👁'];
const TAG={req:['t-req','Required'],rec:['t-rec','Recommended'],opt:['t-opt','Optional']};
const S={open:0,done:{},
 title:'Dr.',first:'Kittu',middle:'',last:'Kumar',dob:'14/03/2000',gender:'Male',headline:'Assistant Professor - Computer Science',
 email:'kittu.kumar@example.com',phone:'+91 98765 43210',phone2:'',pin:'500001',state:'Telangana',district:'Hyderabad',city:'Hyderabad',area:'Abids',addr:'',vis:'Employers Only',
 desig:'Assistant Professor',levels:['Undergraduate / UG','Postgraduate / PG'],subjects:['Computer Science','Data Science'],
 high:"Master's Degree",edu:{ssc:{},hsc:{},ug:{type:'BTech',major:'Computer Science',uni:'JNTU Hyderabad'},pg:{type:'MTech',major:'Computer Science',uni:'IIIT Nagpur'},phd:{},mphil:{},dip:{},oth:{}},
 tq:[],jobs:[{org:'ABC College',desig:'Assistant Professor',dept:'Computer Science',type:'Full Time',level:'Undergraduate / UG',subs:['Computer Science'],start:'2024-01',end:'',cur:true,docs:{}},
       {org:'XYZ School',desig:'PGT Mathematics',dept:'Mathematics',type:'Full Time',level:'Senior Secondary',subs:['Mathematics'],start:'2021-06',end:'2023-12',cur:false,docs:{}}],
 taught:['Undergraduate / UG'],taughtSubs:['Computer Science'],boards:['University / College Curriculum'],medium:['English'],expLevel:'',
 links:[{t:'LinkedIn',u:'https://linkedin.com/in/kittukumar'}],files:{},
 prefLevels:['Undergraduate / UG'],prefSubs:['Computer Science'],prefJob:['Full Time'],prefWork:'On-site',prefLoc:['Hyderabad'],reloc:'Maybe',salary:'',
 ver:{edu:'none',exp:'none',id:'none'}};
const get=(p,o=S)=>p.split('.').reduce((a,k)=>a==null?a:a[k],o);
const set=(p,v)=>{const k=p.split('.'),l=k.pop();let o=S;k.forEach(x=>{if(o[x]==null)o[x]={};o=o[x]});o[l]=v};
const tag=(t,txt)=>{const x=TAG[t]||['t-some',t];return `<span class="fp-tag ${x[0]}">${esc(txt||x[1])}</span>`};
const F=(label,t,inner,o={})=>`<div class="fp-f ${o.full?'full':''}"><label>${label}${t?tag(t,o.tt):''}</label>${inner}${o.hint?`<div class="fp-hint">${o.hint}</div>`:''}<div class="fp-err" data-e></div></div>`;
const I=(p,o={})=>`<input class="fp-in" data-k="${p}" ${o.v?`data-v="${o.v}"`:''} value="${esc(get(p))}" placeholder="${esc(o.ph||'')}" ${o.type?`type="${o.type}"`:''} ${o.dis?'disabled':''}>`;
const SEL=(p,opts,o={})=>`<select class="fp-in" data-k="${p}" ${o.v?`data-v="${o.v}"`:''} ${o.re?`data-re="${o.re}"`:''}><option value="">${o.ph||'Select…'}</option>${opts.map(x=>`<option ${get(p)===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`;
const RAD=(p,opts)=>`<div class="fp-radio">${opts.map(x=>`<label><input type="radio" name="${p}" data-k="${p}" value="${esc(x)}" ${get(p)===x?'checked':''}>${esc(x)}</label>`).join('')}</div>`;
const MS=(p,opts,ph)=>{const v=get(p)||[];return `<div class="fp-ms" data-ms="${p}" data-opts="${opts}"><div class="box">${v.map(x=>`<span class="fp-chip">${esc(x)}<u data-rm="${esc(x)}">×</u></span>`).join('')}<input placeholder="${v.length?'':esc(ph||'Search & select…')}"></div></div>`};
const UP=(p,label,t)=>{const f=get(p,S.files)||S.files[p];return `<div class="fp-f"><label>${label}${t?tag(t):''}</label><div class="fp-up ${f?'has':''}" data-up="${p}">${UPin(p)}</div><div class="fp-hint">Accepted: PDF, JPG, JPEG, PNG · Max 5 MB</div></div>`};
const UPin=p=>{const f=S.files[p];return f?`<span class="nm">✓ ${esc(f.name)}<br><small>${f.size} MB</small></span><button class="fp-btn sm" data-pick="${p}">Replace</button><button class="fp-btn sm dng" data-del="${p}">Remove</button>`:`<span class="nm"><small>No file uploaded</small></span><button class="fp-btn sm" data-pick="${p}">Upload</button>`};
/* ---------- computed ---------- */
function age(d){const m=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d||'');if(!m)return null;const D=+m[1],M=+m[2],Y=+m[3],dt=new Date(Y,M-1,D);if(dt.getMonth()!==M-1||dt.getDate()!==D||dt>new Date()||Y<1930)return null;const n=new Date();let a=n.getFullYear()-Y;if(n<new Date(n.getFullYear(),M-1,D))a--;return a}
function months(){let t=0;const n=new Date();S.jobs.forEach(j=>{if(!j.start)return;const [y,m]=j.start.split('-').map(Number);let e=n;if(!j.cur){if(!j.end)return;const q=j.end.split('-').map(Number);e=new Date(q[0],q[1]-1)}t+=Math.max(0,(e.getFullYear()-y)*12+e.getMonth()-(m-1))});return t}
const expLabel=m=>{const y=m/12;return m<1?'Fresher':y<3?'1–2 Years':y<6?'3–5 Years':y<11?'6–10 Years':y<16?'11–15 Years':'15+ Years'};
const school=()=>S.levels.some(l=>['Pre-Primary','Primary','Middle School','Secondary School','Senior Secondary'].includes(l));
const ug=()=>S.levels.some(l=>['Undergraduate / UG','Junior College'].includes(l)), pg=()=>S.levels.some(l=>['Postgraduate / PG','PhD / Research'].includes(l));
const EDU={'10th / SSC':['ssc'],'12th / Intermediate':['ssc','hsc'],'Diploma':['ssc','dip'],"Bachelor's Degree":['ssc','hsc','ug'],"Master's Degree":['ssc','hsc','ug','pg'],'M.Phil':['ssc','hsc','ug','pg','mphil'],'Ph.D.':['ssc','hsc','ug','pg','phd'],'Postdoctoral':['ssc','hsc','ug','pg','phd'],'Other':['ssc','hsc','oth']};
function completion(){const req=[['Personal details',S.first&&S.last&&age(S.dob)!==null],['Contact information',S.email&&S.phone],['Highest qualification',S.high],['Current designation',S.desig],['Subject specialization',S.subjects.length]];
 const rec=[['Add resume',S.files.resume,8],['Add employment history',S.jobs.length,5],['Add professional links',S.links.length,8],['Add certificates',Object.keys(S.files).some(k=>k!=='resume'&&k!=='photo'),3]];
 const p=req.filter(x=>x[1]).length*16+rec.filter(x=>x[1]).length*5;return{req,rec,p}}
/* ---------- sections ---------- */
const R={
0:()=>`<h3>Personal Details</h3><p class="fp-sub">Basic professional identity shown to institutions.</p><div class="fp-grid g3">
 ${F('Title','opt',SEL('title',OPT.title))}${F('First name','req',I('first',{v:'req'}))}${F('Middle name','opt',I('middle'))}${F('Last name','req',I('last',{v:'req'}))}
 ${F('Date of birth','req',I('dob',{v:'dob',ph:'DD / MM / YYYY'})+`<span class="fp-age" id="fpAge"></span>`,{hint:'Age is calculated automatically.'})}${F('Gender','opt',SEL('gender',OPT.gender))}</div>
 <div class="fp-grid" style="margin-top:14px">${F('Profile photo','opt',`<div class="fp-up ${S.files.photo?'has':''}" data-up="photo">${UPin('photo')}</div>`,{hint:'JPG/PNG, max 5 MB'})}
 ${F('Professional headline','rec',I('headline',{ph:'e.g. Assistant Professor - Computer Science'}))}
 ${F('Email','req',I('email',{v:'email'}))}${F('Phone number','req',I('phone',{v:'phone'}))}${F('Alternative phone','opt',I('phone2'))}</div>
 <div class="fp-card" style="margin-top:14px"><h4>Location ${tag('req')}</h4><div class="fp-grid g3">
 ${F('PIN code','req',I('pin',{v:'pin',ph:'6-digit PIN'}),{hint:'Try 500001, 440001, 560001, 400001, 110001, 411001'})}${F('State','req',I('state'))}${F('District','opt',I('district'))}${F('City','req',I('city'))}${F('Area','opt',I('area'))}
 ${F('Full address','opt',`<textarea class="fp-in" data-k="addr" rows="2">${esc(S.addr)}</textarea>`,{full:1})}</div><div class="fp-hint" id="fpPinMsg"></div></div>`,
1:()=>`<h3>Account & Contact</h3><p class="fp-sub">Contact and privacy controls.</p><div class="fp-card"><h4>Account details</h4>
 <div class="fp-row"><span>Email: <b>${esc(S.email)}</b></span><span class="fp-pill p-ok">✓ Verified</span></div><div class="fp-row"><span>Phone: <b>${esc(S.phone)}</b></span><span class="fp-pill p-ok">✓ Verified</span></div>
 <div class="fp-row"><span>Login email: <b>${esc(S.email)}</b></span><span class="fp-hint">Change from account settings</span></div></div>
 <div class="fp-card"><h4>Profile visibility ${tag('req')}</h4>${RAD('vis',['Public','Employers Only','Private'])}<div class="fp-hint" style="margin-top:8px">Employers Only: visible to registered institutions. Private: only visible to institutions you apply to.</div></div>
 <div class="fp-note">🔒 We never collect Aadhaar, PAN, bank details, passwords, OTPs or financial information in your faculty profile.</div>`,
2:()=>`<h3>Professional Profile</h3><p class="fp-sub">Helps institutions match you with the right roles.</p><div class="fp-grid">
 ${F('Current designation','req',SEL('desig',OPT.desig,{v:'req'}))}${F('Teaching / target level','req',MS('levels','levels'),{hint:'Drives which qualification fields are shown.'})}
 ${F('Subjects / specialization','req',MS('subjects','subjects','Search subjects…'),{full:1})}</div>`,
3:()=>{const need=EDU[S.high]||[];return `<h3>Education & Qualifications</h3><p class="fp-sub">Choose your highest qualification — only the relevant sections appear.</p>
 ${F('Highest qualification','req',SEL('high',OPT.high,{v:'req',re:'edu'}))}
 <div style="margin-top:14px" id="fpEdu">${need.length?need.map(eduBlock).join(''):`<div class="fp-empty">Select your highest qualification to continue.</div>`}</div>`},
4:()=>{const rows=[];if(school())rows.push(['B.Ed. / D.El.Ed. / relevant teaching qualification','Required for some school-teaching roles','some'],['TET / CTET','Role dependent','some']);if(ug())rows.push(["Bachelor's & Master's degree",'Required for UG roles','some'],['Professional qualification','Where applicable','opt']);if(pg())rows.push(["Master's degree",'Required for university faculty applications','some'],['NET / SET / SLET','Required for some higher-education roles','some'],['Ph.D. & research information','Recommended for research roles','rec']);
 return `<h3>Teaching Qualifications</h3><p class="fp-sub">Eligibility varies by post and institution (e.g. UGC norms for higher education). Nothing here is mandatory for every faculty member.</p>
 <div class="fp-note"><b>Based on your target levels (${esc(S.levels.join(', ')||'none selected')}):</b><ul>${rows.map(r=>`<li>${r[0]} ${tag(r[2]=='some'?r[1]:r[2],r[1])}</li>`).join('')||'<li>Select teaching levels in Professional Profile.</li>'}</ul></div>
 <div id="fpTq">${S.tq.length?S.tq.map(tqCard).join(''):`<div class="fp-empty">No teaching qualifications added yet.</div>`}</div>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><select class="fp-in" id="fpTqSel" style="max-width:280px"><option value="">Choose qualification…</option>${OPT.tq.map(x=>`<option>${x}</option>`).join('')}</select><button class="fp-btn pri" data-act="addtq">+ Add qualification</button></div>`},
5:()=>`<h3>Employment History</h3><p class="fp-sub">Add current and past teaching roles. Documents are optional unless a job requires them.</p><div id="fpJobs">${jobsHTML()}</div><button class="fp-btn pri" data-act="addjob">+ Add Employment</button>`,
6:()=>{const m=months();return `<h3>Teaching Experience</h3><p class="fp-sub">Calculated from your employment history where possible.</p>
 <div class="fp-card"><h4>Total teaching experience ${tag('rec')}</h4><b style="font-size:20px" id="fpTotal">${Math.floor(m/12)} years ${m%12} months</b><div class="fp-hint">Auto-calculated from employment history (current roles counted to today).</div></div>
 <div class="fp-grid">${F('Experience level','req',SEL('expLevel',OPT.exp),{hint:'Suggested: '+expLabel(m)})}${F('Medium of instruction','rec',MS('medium','medium'))}
 ${F('Classes / levels taught','rec',MS('taught','levels'))}${F('Subjects taught','rec',MS('taughtSubs','subjects'))}${F('Boards / curricula','opt',MS('boards','boards'),{full:1})}</div>`},
7:()=>{const items=docList();return `<h3>Documents</h3><p class="fp-sub">Everything you have uploaded. Add documents from the relevant sections.</p>
 ${items.length?items.map(d=>`<div class="fp-row"><span>📄 <b>${esc(d[1].name)}</b> <small>${d[1].size} MB · ${esc(d[0])}</small></span><span class="fp-pill p-pend">Pending review</span></div>`).join(''):`<div class="fp-empty">No documents uploaded yet.</div>`}
 <div class="fp-note" style="margin-top:14px">Identity documents are not needed for a normal profile. If an institution requires them, you'll be asked in a separate step.</div>`},
8:()=>`<h3>Professional Links</h3><p class="fp-sub">Optional — Google Scholar / ORCID are recommended for research roles.</p><div id="fpLinks">${linksHTML()}</div>
 <div class="fp-card"><h4>Add another link</h4><div class="fp-grid"><div class="fp-f"><select class="fp-in" id="fpLt">${OPT.linkt.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="fp-f"><input class="fp-in" id="fpLu" placeholder="https://…"><div class="fp-err" data-e></div></div></div><button class="fp-btn pri" style="margin-top:10px" data-act="addlink">Add link</button></div>
 <div class="fp-card"><h4>CV / Resume ${tag('rec')}</h4><div class="fp-up ${S.files.resume?'has':''}" data-up="resume">${UPin('resume')}</div><div class="fp-hint">Accepted: PDF, JPG, JPEG, PNG · Max 5 MB</div></div>`,
9:()=>`<h3>Teaching Preferences</h3><p class="fp-sub">What you're looking for next. All optional.</p><div class="fp-grid">
 ${F('Preferred teaching level','opt',MS('prefLevels','pref'))}${F('Preferred subjects','opt',MS('prefSubs','subjects'))}${F('Preferred job type','opt',MS('prefJob','jobtype'))}
 ${F('Work location','opt',RAD('prefWork',['On-site','Remote','Hybrid']))}${F('Preferred locations','opt',MS('prefLoc','cities','Add cities / states'))}${F('Willing to relocate','opt',RAD('reloc',['Yes','No','Maybe']))}
 ${F('Expected salary','opt',I('salary',{ph:'e.g. ₹ per month'}),{hint:'Never required for profile completion.'})}</div>`,
10:()=>{const V=(k,l,ready,up)=>{const s=k==='email'||k==='phone'?'ok':S.ver[k];const P={ok:['p-ok','✓ Verified'],pend:['p-pend','Pending'],upd:['p-upd','Needs Update'],none:['p-no',k==='id'?'○ Not Submitted':'○ Not Verified']}[s];
 return `<div class="fp-card"><div class="fp-row" style="border:0;padding:0"><b>${l}</b><span class="fp-pill ${P[0]}">${P[1]}</span></div>${up?`<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button class="fp-btn sm" data-act="ver:${k}">${up}</button>${s!=='none'?`<select class="fp-in" style="width:auto;padding:5px" data-vs="${k}"><option value="pend" ${s==='pend'?'selected':''}>Demo: Pending</option><option value="ok" ${s==='ok'?'selected':''}>Demo: Verified</option><option value="upd" ${s==='upd'?'selected':''}>Demo: Needs Update</option></select>`:''}</div>`:''}</div>`};
 return `<h3>Profile Verification</h3><p class="fp-sub">Status shown to institutions. UI states only — no real verification runs.</p>${V('email','Email')}${V('phone','Phone')}${V('edu','Education',0,'Upload Education Certificate')}${V('exp','Experience',0,'Upload Experience Certificate')}${V('id','Identity',0,'')}
 <div class="fp-note">Identity verification is not required to create a faculty profile. If a specific institution or job needs it, it will appear as a separate process.</div>`},
11:()=>{const a=age(S.dob),m=months(),ed=(EDU[S.high]||[]).filter(x=>['ug','pg','phd','mphil','dip'].includes(x)).reverse();
 const lab={ug:"Bachelor's",pg:"Master's",phd:'Ph.D.',mphil:'M.Phil',dip:'Diploma'},ch=l=>l&&l.length?l.map(x=>`<span class="fp-chip">${esc(x)}</span>`).join(''):'<span class="fp-hint">Not added</span>';
 const jobs=S.jobs.filter(j=>j.org).map(j=>`<div class="fp-tl"><i class="${j.cur?'cur':''}"></i><div><b>${esc(j.desig)}</b>${j.cur?' <span class="fp-pill p-ok">✓ Current</span>':''}<div>${esc(j.org)}${j.dept?' · '+esc(j.dept):''}</div><small>${fmt(j.start)} – ${j.cur?'Present':fmt(j.end)} · ${esc(j.type||'')}</small></div></div>`).join('');
 const eds=ed.map(k=>{const e=S.edu[k]||{};return `<div class="fp-tl"><i></i><div><b>${esc((e.type?e.type+' ':'')+(e.major||lab[k]))}</b><div>${esc(e.uni||'')}</div><small>${esc(lab[k])}${e.end?' · '+esc(e.end):''}</small></div></div>`}).join('');
 return `<div class="fp-pv"><div class="fp-pv-ban"></div><div class="fp-pv-head"><div class="fp-av lg">${esc((S.first[0]||'')+(S.last[0]||''))}</div><div style="flex:1;min-width:200px"><h2>${esc([S.title,S.first,S.middle,S.last].filter(Boolean).join(' '))}</h2><div class="fp-pv-role">${esc(S.headline||S.desig||'')}</div><div class="fp-meta"><span>📍 ${esc([S.city,S.state].filter(Boolean).join(', ')||'Location not set')}</span><span>⏱ ${m>=12?Math.floor(m/12)+'+ years':m+' months'} experience</span>${a!==null?`<span>🎂 ${a} yrs</span>`:''}</div></div><button class="fp-btn pri" data-go="0">Edit Profile</button></div>
 <div class="fp-pv-badges"><span class="fp-pill p-ok">✓ Email verified</span><span class="fp-pill p-ok">✓ Phone verified</span>${S.ver.edu==='ok'?'<span class="fp-pill p-ok">✓ Education verified</span>':'<span class="fp-pill p-no">○ Education not verified</span>'}</div>
 <div class="fp-pv-grid"><div><h5>Teaching levels</h5><div class="fp-chips">${ch(S.levels)}</div><h5>Subjects</h5><div class="fp-chips">${ch(S.subjects)}</div><h5>Links</h5>${S.links.length?S.links.map(l=>`<div class="fp-hint">🔗 ${esc(l.t)}</div>`).join(''):'<span class="fp-hint">Not added</span>'}</div>
 <div><h5>Experience</h5>${jobs||'<span class="fp-hint">Fresher / not added</span>'}<h5>Education</h5>${eds||`<span class="fp-hint">${esc(S.high||'Not added')}</span>`}</div></div></div>`}};
function eduBlock(k){const hi=(EDU[S.high]||[]).slice(-1)[0]===k,rq=hi?'req':(k==='ssc'||k==='hsc'?'rec':'some');const T=(t)=>tag(rq==='some'?'Required for some jobs':rq,rq==='some'?t:undefined);
 const e=`edu.${k}.`,names={ssc:'10th / SSC',hsc:'12th / Intermediate',ug:"Bachelor's Degree",pg:"Master's Degree",phd:'Ph.D. / Doctoral Details',mphil:'M.Phil',dip:'Diploma',oth:'Other qualification'};
 const yrs=I(e+'end',{ph:'YYYY'}),pc=I(e+'score',{ph:'e.g. 8.2 CGPA / 78%'}),v=hi?'req':'';
 let body;
 if(k==='ssc'||k==='hsc')body=`<div class="fp-grid g3">${F('Qualification',0,I(e+'q',{ph:names[k]}))}${F('Board',rq,I(e+'board',{v}))}${F('School / College name',rq,I(e+'uni',{v}))}${k==='hsc'?F('Stream','rec',SEL(e+'stream',OPT.stream)):''}${F('Year of passing',rq,I(e+'end',{ph:'YYYY'}))}${F('Percentage / CGPA','rec',pc)}</div>`;
 else if(k==='phd')body=`<div class="fp-grid">${F('University / Institution','req',I(e+'uni',{v:'req'}))}${F('Research area','req',I(e+'area',{v:'req'}))}${F('Specialization','rec',I(e+'major'))}${F('Year of award','req',I(e+'end',{ph:'YYYY',v:'req'}))}${F('Thesis / research title','rec',I(e+'thesis'),{full:1})}${UP('phdcert','Ph.D. certificate','rec')}</div>
 <div class="fp-card" style="margin-top:12px"><h4>Research links ${tag('rec','Recommended for research-oriented roles')}</h4><div class="fp-grid">${F('Research profile URL','opt',I(e+'url',{v:'url',ph:'https://'}))}${F('ORCID','opt',I(e+'orcid',{v:'url',ph:'https://orcid.org/…'}))}${F('Google Scholar','opt',I(e+'scholar',{v:'url',ph:'https://scholar.google.com/…'}))}${F('ResearchGate','opt',I(e+'rg',{v:'url',ph:'https://researchgate.net/…'}))}</div></div>`;
 else body=`<div class="fp-grid">${F('Degree type',rq,SEL(e+'type',k==='pg'?OPT.pg:OPT.ug,{v}))}${F('Specialization / major',rq,I(e+'major',{v}))}${F('University / institution',rq,I(e+'uni',{v}))}${F('College name','opt',I(e+'college'))}${F('Study mode','opt',SEL(e+'mode',OPT.mode))}${F('Percentage / CGPA','rec',pc)}${F('Start year','opt',I(e+'start',{ph:'YYYY'}))}${F('End year',rq,I(e+'end',{ph:'YYYY',v}))}${UP(k+'cert','Degree certificate','rec')}</div>`;
 return `<div class="fp-card"><h4>${names[k]} ${k==='ssc'||k==='hsc'?tag(rq):tag(rq==='some'?'Required for some jobs':rq)}</h4>${body}</div>`}
function tqCard(q,i){const n=q.name,t=['B.Ed.','D.El.Ed.','CTET','TET','State TET','B.P.Ed.'].includes(n)?'Required for some school-teaching roles':['NET','SET','SLET'].includes(n)?'Required for some higher-education roles':'Optional';const p=`tq.${i}.`;
 return `<div class="fp-card"><h4>${esc(n)} ${tag(t==='Optional'?'opt':t)}<button class="fp-btn sm dng" style="margin-left:auto" data-act="rmtq:${i}">Remove</button></h4><div class="fp-grid">${F('Specialization','opt',I(p+'spec'))}${F('Issuing authority','rec',I(p+'auth'))}${F('Year','rec',I(p+'year',{ph:'YYYY'}))}${UP('tq'+i,'Certificate / scorecard','opt')}</div></div>`}
function jobsHTML(){return S.jobs.length?S.jobs.map(jobCard).join(''):`<div class="fp-empty">No employment added yet. Freshers can skip this section.</div>`}
function fmt(m){if(!m)return'';const[y,mo]=m.split('-');return['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][mo-1]+' '+y}
function jobCard(j,i){const p=`jobs.${i}.`;return `<div class="fp-card"><div class="fp-job"><div><b>${esc(j.org||'New employment')}</b><div class="fp-hint">${esc(j.desig||'')} ${j.start?'· '+(j.start.slice(0,4))+' – '+(j.cur?'Present':(j.end||'').slice(0,4)):''}</div>${j.cur?'<span class="fp-pill p-ok">✓ Current</span>':''}</div><button class="fp-btn sm dng" data-act="rmjob:${i}">Remove</button></div>
 <div class="fp-grid" style="margin-top:12px">${F('Organization / institution','req',I(p+'org',{v:'req'}))}${F('Designation','req',I(p+'desig',{v:'req'}))}${F('Department','opt',I(p+'dept'))}${F('Employment type','opt',SEL(p+'type',OPT.emp))}${F('Teaching level','opt',SEL(p+'level',OPT.levels))}${F('Subjects taught','opt',MS(p+'subs','subjects'))}
 ${F('Start date','req',I(p+'start',{type:'month',v:'req'}))}${j.cur?'':F('End date','req',I(p+'end',{type:'month',v:'req'}))}
 <div class="fp-f full"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-k="${p}cur" data-re="jobs" ${j.cur?'checked':''}> I currently work here</label></div></div>
 ${j.cur?`<div class="fp-cur"><b>✓ Current Employment</b><br>Current Position: ${esc(j.desig)} · Institution: ${esc(j.org)} · Department: ${esc(j.dept||'—')}<br>Currently working since: <b>${fmt(j.start)||'—'} – Present</b></div>`:''}
 <div class="fp-grid g3" style="margin-top:12px">${UP('j'+i+'exp','Experience certificate','opt')}${UP('j'+i+'app','Appointment letter','opt')}${UP('j'+i+'rel','Relieving letter','opt')}</div></div>`}
function linksHTML(){return S.links.length?S.links.map((l,i)=>`<div class="fp-row"><span><b>${esc(l.t)}</b><br><a href="${esc(l.u)}" target="_blank" rel="noopener">${esc(l.u)}</a></span><span><button class="fp-btn sm" data-act="editlink:${i}">Edit</button> <button class="fp-btn sm dng" data-act="rmlink:${i}">Remove</button></span></div>`).join(''):`<div class="fp-empty">No links added yet.</div>`}
function docList(){const nm={photo:'Profile photo',resume:'Resume',phdcert:'Ph.D. certificate',ugcert:"Bachelor's certificate",pgcert:"Master's certificate",mphilcert:'M.Phil certificate',dipcert:'Diploma certificate',othcert:'Certificate'};return Object.entries(S.files).map(([k,f])=>[nm[k]||(/^tq/.test(k)?'Teaching qualification':/^j\d/.test(k)?'Employment document':'Document'),f])}
/* ---------- shell ---------- */
function heroHTML(){const c=completion(),m=months(),nx=c.rec.find(x=>!x[1]),miss=c.req.find(x=>!x[1]);
 return `<div class="fp-hero"><div class="fp-hero-l"><div class="fp-av lg">${esc((S.first[0]||'')+(S.last[0]||'')||'?')}</div><div><h2>${esc([S.title,S.first,S.last].filter(Boolean).join(' ')||'Your name')}</h2><p>${esc(S.headline||S.desig||'Add a professional headline')}</p><div class="fp-meta"><span>📍 ${esc(S.city||'Add location')}</span><span>🎓 ${esc(S.high||'Add qualification')}</span><span>⏱ ${m>=12?Math.floor(m/12)+'+ yrs':m+' mo'}</span></div></div></div>
 <div class="fp-hero-r"><div class="fp-ring" style="--p:${c.p}"><span>${c.p}%</span></div><div><b>Profile strength</b><small>${miss?'Complete: '+miss[0]:nx?'Next: '+nx[0]:'Looking great!'}</small></div></div>
 <div class="fp-steps">${c.req.map(x=>`<span class="st ${x[1]?'ok':'no'}">${x[1]?'✓':'○'} ${x[0]}</span>`).join('')}${c.rec.map(x=>`<span class="st rec ${x[1]?'ok':''}" ${x[1]?'':`data-go="${x[2]}"`}>${x[1]?'✓ '+x[0].replace(/^Add /,''):'＋ '+x[0]}</span>`).join('')}</div></div>`}
function shell(){
 $('#fpRoot').innerHTML=`<div id="fpHero"></div><div class="fp-wrap"><nav class="fp-nav" id="fpNav">${SEC.map((s,i)=>`<button data-go="${i}"><span class="n">${ICON[i]}</span>${s}<em>✓</em></button>`).join('')}</nav><div>${SEC.map((s,i)=>`<section class="fp-sec" data-i="${i}"><header data-go="${i}" data-tog="1">${ICON[i]} ${s}</header><div class="fp-body"></div></section>`).join('')}</div></div>`;
 SEC.forEach((_,i)=>renderSec(i));paint()}
function renderSec(i){const b=$(`.fp-sec[data-i="${i}"] .fp-body`);if(!b)return;b.innerHTML=R[i]()+(i<11?`<div class="fp-actions"><button class="fp-btn" data-back>Back</button><div><button class="fp-btn" data-act="draft">Save Draft</button><button class="fp-btn" data-next>Next</button><button class="fp-btn pri" data-act="save">Save & Continue</button></div></div>`:'');if(i===0)ageUpd()}
function paint(){$$('.fp-sec').forEach(s=>s.classList.toggle('open',+s.dataset.i===S.open));$$('#fpNav button').forEach((b,i)=>{b.classList.toggle('on',i===S.open);b.classList.toggle('done',!!S.done[i]&&i!==S.open)});$('#fpHero').innerHTML=heroHTML()}
function go(i){S.open=Math.max(0,Math.min(11,i));renderSec(S.open);paint();const el=$(`.fp-sec[data-i="${S.open}"]`);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}
function ageUpd(){const e=$('#fpAge');if(!e)return;const a=age(S.dob);e.style.display=a===null?'none':'inline-block';e.textContent='Age: '+a+' years'}
function toast(t){const d=document.createElement('div');d.className='fp-toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2000)}
/* validation */
function check(el){const r=el.dataset.v,v=el.value.trim();let m='';
 if(r==='req'&&!v)m='This field is required.';
 else if(r==='dob'){if(!v)m='This field is required.';else if(age(v)===null)m='Please enter a valid date of birth.'}
 else if(r==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m=v?'Please enter a valid email address.':'This field is required.';
 else if(r==='phone'&&!/^[+\d][\d\s-]{8,}$/.test(v))m=v?'Please enter a valid phone number.':'This field is required.';
 else if(r==='pin'&&!/^\d{6}$/.test(v))m=v?'Enter a valid 6-digit PIN code.':'This field is required.';
 else if(r==='url'&&v&&!/^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v))m='Please enter a valid website URL.';
 el.classList.toggle('bad',!!m);const e=el.closest('.fp-f')&&el.closest('.fp-f').querySelector('[data-e]');if(e)e.textContent=m;return!m}
function checkSec(){let ok=true,first=null;$$(`.fp-sec.open [data-v]`).forEach(e=>{if(e.disabled)return;if(!check(e)){ok=false;first=first||e}});if(first)first.focus();return ok}
/* events */
document.addEventListener('input',e=>{const t=e.target;if(!t.closest||!t.closest('#fpRoot'))return;
 if(t.matches('.fp-ms input')){msOpen(t.closest('.fp-ms'),t.value);return}
 const k=t.dataset.k;if(!k||t.type==='radio'||t.type==='checkbox')return;set(k,t.value);
 if(k==='dob'){ageUpd();if(t.value.length===2||t.value.length===5){}}
 if(k==='pin'&&/^\d{6}$/.test(t.value)){const p=PIN[t.value];if(p){['state','district','city','area'].forEach((f,i)=>set(f,p[i]));$$('[data-k="state"],[data-k="district"],[data-k="city"],[data-k="area"]').forEach((x,i)=>{x.value=p[i]});$('#fpPinMsg').textContent='✓ Location auto-filled — you can edit any value.'}else $('#fpPinMsg').textContent='PIN not in demo list — please enter location manually.'}
 clearTimeout(window._fh);window._fh=setTimeout(()=>{$('#fpHero').innerHTML=heroHTML()},250)});
document.addEventListener('focusout',e=>{const t=e.target;if(t.dataset&&t.dataset.v&&t.closest('#fpRoot'))check(t)});
document.addEventListener('change',e=>{const t=e.target;if(!t.closest||!t.closest('#fpRoot'))return;
 if(t.dataset.vs){S.ver[t.dataset.vs]=t.value;renderSec(10);paint();return}
 if(t.type==='file'){upload(t);return}
 const k=t.dataset.k;if(!k)return;set(k,t.type==='checkbox'?t.checked:t.value);
 if(t.type==='checkbox'&&/\.cur$/.test(k)){const i=+k.split('.')[1];if(t.checked)S.jobs[i].end='';}
 if(t.dataset.re==='edu'){$('#fpEdu').innerHTML=(EDU[S.high]||[]).map(eduBlock).join('');}
 if(t.dataset.re==='jobs'){$('#fpJobs').innerHTML=jobsHTML()}
 paint()});
function upload(inp){const p=inp.dataset.p,f=inp.files[0];const box=$(`.fp-up[data-up="${p}"]`);if(!f)return;
 const ok=/\.(pdf|jpe?g|png)$/i.test(f.name),mb=f.size/1048576;let m='';
 if(!ok)m='Unsupported file type. Please upload PDF, JPG, JPEG or PNG.';else if(mb>5)m='File exceeds the 5 MB limit.';
 if(m){box.classList.add('bad');box.classList.remove('has');box.innerHTML=`<span class="nm" style="color:#B42318">${m}</span><button class="fp-btn sm" data-pick="${p}">Try again</button>`;return}
 S.files[p]={name:f.name,size:mb.toFixed(1)};box.classList.remove('bad');box.classList.add('has');box.innerHTML=UPin(p);paint()}
function msOpen(box,q){let dd=$('.fp-dd',box);if(!dd){dd=document.createElement('div');dd.className='fp-dd';box.appendChild(dd)}
 const p=box.dataset.ms,sel=get(p)||[],all=OPT[box.dataset.opts];q=(q||'').toLowerCase();const l=all.filter(x=>x.toLowerCase().includes(q));
 dd.innerHTML=l.length?l.map(x=>`<div data-opt="${esc(x)}" class="${sel.includes(x)?'sel':''}">${sel.includes(x)?'✓ ':''}${esc(x)}</div>`).join(''):`<em>No match</em>`}
function msRefresh(box){const p=box.dataset.ms;const n=document.createElement('div');n.innerHTML=MS(p,box.dataset.opts);box.replaceWith(n.firstChild);}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;const root=t.closest('#fpRoot');
 if(!root){$$('.fp-dd').forEach(d=>d.remove());return}
 const box=t.closest('.fp-ms');
 if(t.dataset.opt!==undefined&&box){const p=box.dataset.ms,a=get(p)||[],v=t.dataset.opt;set(p,a.includes(v)?a.filter(x=>x!==v):[...a,v]);msRefresh(box);const nb=$(`.fp-ms[data-ms="${p}"]`);if(p==='levels'){renderSec(4);}paint();$('input',nb).focus();return}
 if(t.dataset.rm!==undefined&&box){const p=box.dataset.ms;set(p,(get(p)||[]).filter(x=>x!==t.dataset.rm));msRefresh(box);if(p==='levels')renderSec(4);paint();return}
 if(box){$('input',box).focus();msOpen(box,'');return}
 $$('.fp-dd').forEach(d=>d.remove());
 const b=t.closest('[data-go]');if(b){if(b.dataset.tog&&+b.dataset.go===S.open){S.open=-1;paint()}else go(+b.dataset.go);return}
 if(t.matches('[data-next]')){go(S.open+1);return}if(t.matches('[data-back]')){go(S.open-1);return}
 if(t.dataset.pick){const i=document.createElement('input');i.type='file';i.accept='.pdf,.jpg,.jpeg,.png';i.dataset.p=t.dataset.pick;i.style.display='none';root.appendChild(i);i.onchange=()=>{upload(i);i.remove()};i.click();return}
 if(t.dataset.del){delete S.files[t.dataset.del];const bx=$(`.fp-up[data-up="${t.dataset.del}"]`);bx.classList.remove('has');bx.innerHTML=UPin(t.dataset.del);paint();return}
 const a=t.dataset.act;if(!a)return;const [x,y]=a.split(':');
 if(x==='draft'){toast('Draft saved');return}
 if(x==='save'){if(!checkSec()){toast('Please fix the highlighted fields');return}S.done[S.open]=1;toast('Section saved ✓');go(S.open+1);return}
 if(x==='addjob'){S.jobs.push({org:'',desig:'',dept:'',type:'',level:'',subs:[],start:'',end:'',cur:false,docs:{}});$('#fpJobs').innerHTML=jobsHTML();return}
 if(x==='rmjob'){S.jobs.splice(+y,1);$('#fpJobs').innerHTML=jobsHTML();paint();return}
 if(x==='addtq'){const v=$('#fpTqSel').value;if(!v)return;S.tq.push({name:v});$('#fpTq').innerHTML=S.tq.map(tqCard).join('');return}
 if(x==='rmtq'){S.tq.splice(+y,1);renderSec(4);return}
 if(x==='addlink'){const u=$('#fpLu');u.dataset.v='url';const bad=!u.value.trim()?(u.classList.add('bad'),u.nextElementSibling.textContent='This field is required.',1):!check(u);if(bad)return;S.links.push({t:$('#fpLt').value,u:u.value.trim()});$('#fpLinks').innerHTML=linksHTML();u.value='';paint();toast('Link added ✓');return}
 if(x==='rmlink'){S.links.splice(+y,1);$('#fpLinks').innerHTML=linksHTML();paint();return}
 if(x==='editlink'){const l=S.links.splice(+y,1)[0];$('#fpLinks').innerHTML=linksHTML();$('#fpLt').value=l.t;$('#fpLu').value=l.u;$('#fpLu').focus();paint();return}
 if(x==='ver'){S.ver[y]='pend';renderSec(10);paint();toast('Submitted — status: Pending')}
});
window.fpMount=function(){if($('#fpRoot')&&!$('#fpRoot').dataset.m){$('#fpRoot').dataset.m=1;shell()}};
fpMount();
})();
