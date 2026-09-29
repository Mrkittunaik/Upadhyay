/* institution.js — UI-only institution profile, verification and campus flow.
   No backend, no real OTP or document checks. State is kept in localStorage (upadyay_inst_v1). */
(function(){
'use strict';
const KEY='upadyay_inst_v1', $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ck=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:-2px"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const PIN_IC='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const CLK='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const BANG='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 6v8M12 18v.5"/></svg>';
const STEPS=['Institution details','Location','Representative details','Verification','Branches / campuses','Review & submit'];
const TYPES=['University','College','School','Institute','Coaching / Training Institute','Company','Organization','Other'];
const DES=['Principal','Vice Principal','Dean','Director','HR Manager','HR Head','Placement Officer','Administration','Registrar','Authorized Representative','Other'];
const DEP=['Administration','HR','Placement / Training & Placement','Management','Academic','Other'];
const DOCS=['Government registration document','University affiliation certificate','Recognition / accreditation certificate','Institution registration certificate','Official authorization document','Other official institutional proof'];
const ROLES=['HR Representative','Recruitment Consultant','Placement Agency','Administrative Representative','Authorized Partner','Other'];
const BTYPES=['Campus','Branch','Extension centre','Study centre','Other'];
const PINS={'500072':['Telangana','Hyderabad','Hyderabad','Kukatpally'],'506002':['Telangana','Warangal','Warangal','Hanamkonda'],'500003':['Telangana','Hyderabad','Secunderabad','Secunderabad'],'560001':['Karnataka','Bengaluru Urban','Bengaluru','MG Road']};
const ACAD=['University','College','School','Institute'];
const F0=[
 {k:'name',l:'Institution / college name',req:1,full:1,ph:'Full official name'},
 {k:'type',l:'Institution type',req:1,t:'select',o:TYPES},
 {k:'short',l:'Short / display name',ph:'e.g. Upaadhyay Univ.'},
 {k:'website',l:'Official website',req:1,v:'url',ph:'https://example.edu'},
 {k:'email',l:'Official institution email',req:1,v:'email',ph:'admissions@example.edu'},
 {k:'phone',l:'Official contact number',req:1,v:'phone',ph:'10-digit number'},
 {k:'year',l:'Year established',v:'year',ph:'e.g. 1998'},
 {k:'reg',l:'Registration / affiliation number',ph:'If applicable',sh:d=>ACAD.includes(d.type)},
 {k:'affil',l:'Affiliated university / board',ph:'e.g. JNTU Hyderabad, CBSE',sh:d=>ACAD.includes(d.type)},
 {k:'accred',l:'Accreditation / recognition',ph:'e.g. NAAC A, UGC, AICTE',sh:d=>ACAD.includes(d.type)},
 {k:'about1',l:'Short description',full:1,ph:'One line candidates see in search results'},
 {k:'about2',l:'Full description',t:'textarea',full:1,ph:'Departments, culture and what makes the institution a good place to work'}];
const F1=[
 {k:'country',l:'Country',req:1,t:'select',o:['India','Other']},
 {k:'pin',l:'PIN code',req:1,v:'pin',ph:'Enter 6-digit PIN code',pin:1},
 {k:'state',l:'State',req:1},{k:'district',l:'District',req:1},{k:'city',l:'City',req:1},{k:'area',l:'Area / locality'},
 {k:'address',l:'Full address',req:1,t:'textarea',full:1,ph:'Building, street, landmark'}];
const F2=[
 {k:'rname',l:'Full name',req:1},{k:'rdes',l:'Designation',req:1,t:'select',o:DES},
 {k:'rdep',l:'Department',req:1,t:'select',o:DEP},{k:'remail',l:'Official work email',req:1,v:'email',ph:'name@example.edu'},
 {k:'rphone',l:'Work contact number',req:1,v:'phone',ph:'10-digit number'}];
const FB=[
 {k:'name',l:'Branch / campus name',req:1,ph:'e.g. Warangal Campus'},{k:'type',l:'Branch type',req:1,t:'select',o:BTYPES},
 {k:'code',l:'Branch code',ph:'e.g. WGL-01'},{k:'desc',l:'Branch description',full:1,t:'textarea'},
 {k:'cname',l:'Branch contact person'},{k:'cdes',l:'Designation'},
 {k:'email',l:'Official branch email',v:'email'},{k:'phone',l:'Branch contact number',v:'phone'},
 {k:'pin',l:'Branch PIN code',req:1,v:'pin',ph:'Enter 6-digit PIN code',pin:1},{k:'state',l:'State',req:1},
 {k:'district',l:'District'},{k:'city',l:'City',req:1},{k:'area',l:'Area'},{k:'address',l:'Full address',req:1,t:'textarea',full:1}];
const WEBF={k:'website',l:'Website',req:1,v:'url',ph:'https://example.edu'};
const EMAILF={k:'email',l:'Official institution email',req:1,v:'email',ph:'example@college.edu'};
const ALLF=F0.concat(F1,F2,FB);
const RX={email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,url:/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i,pin:/^\d{6}$/,year:/^\d{4}$/};
const MSG={email:'Enter a valid email address, e.g. name@example.edu',url:'Enter a valid website, e.g. https://example.edu',pin:'PIN code must be 6 digits',year:'Enter a 4-digit year',phone:'Enter a 10-digit number'};

let I=load(), BR={}, BRi=-1, welcome=!I.sub&&(I.step>0||!!I.d.name);
function load(){
  let r=null; try{ r=JSON.parse(localStorage.getItem(KEY)); }catch(e){}
  r=Object.assign({step:0,max:0,view:'wizard',vs:'pending',d:{country:'India'},branches:[],em:'idle',web:false,doc:null,docType:'',auth:'',role:'',c1:false,c2:false,sec:'profile',sub:false},r||{});
  try{
    if(!r.d.name&&typeof currentCompany!=='undefined'&&currentCompany.name){
      const c=currentCompany; Object.assign(r.d,{name:c.name,website:c.website,about2:c.desc,city:c.city,rname:c.contactName,remail:c.email,rphone:c.phone,logo:c.logo});
      if(TYPES.includes(c.type)) r.d.type=c.type; if(DES.includes(c.designation)) r.d.rdes=c.designation;
    }
  }catch(e){}
  return r;
}
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(I)); }catch(e){ toast('Progress saved, but the image is too large to keep. Try a smaller file.'); } }
function toast(m){ const t=document.createElement('div'); t.className='in-toast'; t.setAttribute('role','status'); t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }
function top(){ const r=$('instRoot'); if(r) r.scrollIntoView(); }

/* ---------- validation ---------- */
function chk(o,v){
  v=(v||'').trim(); if(!v) return o.req?'This field is required':'';
  if(o.v==='phone') return /^\d{10}$/.test(v.replace(/[\s+-]|^91/g,''))?'':MSG.phone;
  if(o.v==='year'){ const y=+v; return RX.year.test(v)&&y>=1800&&y<=new Date().getFullYear()?'':MSG.year; }
  if(o.v) return RX[o.v].test(v)?'':MSG[o.v];
  return '';
}
function mark(sc,o,m){ const f=$('f-'+sc+'-'+o.k); if(!f) return; f.classList.toggle('err',!!m); f.querySelector('.in-err').textContent=m||''; }
function valid(list,sc){
  const S=sc==='d'?I.d:BR; let first=null;
  list.filter(f=>!f.sh||f.sh(I.d)).forEach(f=>{ const m=chk(f,S[f.k]); mark(sc,f,m); if(m&&!first) first=f; });
  if(first){ const el=document.querySelector('#f-'+sc+'-'+first.k+' input, #f-'+sc+'-'+first.k+' select, #f-'+sc+'-'+first.k+' textarea'); if(el) el.focus(); return false; }
  return true;
}

/* ---------- field renderer ---------- */
function fld(o,sc){
  if(o.sh&&!o.sh(I.d)) return '';
  const S=sc==='d'?I.d:BR, v=esc(S[o.k]||''), h=`oninput="IN.set('${sc}','${o.k}',this.value)" onblur="IN.blur('${sc}','${o.k}')"`;
  let inp;
  if(o.t==='select') inp=`<select onchange="IN.set('${sc}','${o.k}',this.value,1)" onblur="IN.blur('${sc}','${o.k}')"><option value="">Select</option>${o.o.map(x=>`<option${S[o.k]===x?' selected':''}>${esc(x)}</option>`).join('')}</select>`;
  else if(o.t==='textarea') inp=`<textarea placeholder="${esc(o.ph||'')}" ${h}>${v}</textarea>`;
  else inp=`<input type="text" value="${v}" placeholder="${esc(o.ph||'')}" ${h}${o.pin?' maxlength="6" inputmode="numeric" autocomplete="postal-code"':''}>`;
  return `<div class="in-f${o.full?' in-full':''}" id="f-${sc}-${o.k}"><label>${o.l}<i>${o.req?'Required':'Optional'}</i></label>${inp}<div class="in-err" role="alert"></div>${o.pin?`<div id="pin-${sc}" class="in-full"></div>`:''}</div>`;
}
const grid=(l,sc)=>`<div class="in-grid">${l.map(f=>fld(f,sc)).join('')}</div>`;
const card=(t,s,b)=>`<div class="in-card"><h4>${t}</h4><p class="sub2">${s||''}</p>${b}</div>`;
const note=(t,c)=>`<div class="in-note ${c||''}">${t}</div>`;

function pinLook(sc,val){
  const box=$('pin-'+sc); if(!box) return;
  if(val.length!==6){ box.innerHTML=''; return; }
  box.innerHTML=note('<span class="in-load"></span>Looking up PIN code…');
  setTimeout(()=>{
    const r=PINS[val], S=sc==='d'?I.d:BR;
    if(!r){ box.innerHTML=note('We couldn\'t find this PIN code. Enter the location details below yourself. Demo PIN codes: 500072, 506002, 500003, 560001.','in-warn'); return; }
    ['state','district','city','area'].forEach((k,i)=>{ S[k]=r[i]; const el=document.querySelector('#f-'+sc+'-'+k+' input'); if(el){ el.value=r[i]; mark(sc,{k:k},''); } });
    box.innerHTML=note(`<b>${ck(13)} Location found</b><br>State: ${r[0]}<br>District: ${r[1]}<br>City: ${r[2]}<br>Area: ${r[3]}<br>You can still edit these fields.`,'in-ok'); save();
  },450);
}

/* ---------- completion + badges ---------- */
function pct(){
  const d=I.d, ks=F0.concat(F1,F2).filter(f=>!f.sh||f.sh(d)).map(f=>f.k);
  const n=ks.filter(k=>d[k]).length+(d.logo?1:0)+(I.em==='ok'?1:0)+(I.doc&&I.doc.st==='ok'?1:0)+(I.branches.length?1:0);
  return Math.min(100,Math.round(n/(ks.length+4)*100));
}
function vBadge(){
  if(I.vs==='verified') return `<span class="in-vbadge">${ck(12)} Verified Institution</span>`;
  if(I.vs==='changes') return '<span class="in-vbadge r">Changes required</span>';
  return '<span class="in-vbadge p">Verification pending</span>';
}
const locStr=o=>[o.city,o.state].filter(Boolean).join(', ');
const thumb=(o,n)=>`<div class="in-thumb" style="width:52px;height:52px;overflow:hidden">${o.img?`<img src="${o.img}" alt="${esc(o.name)}" style="width:100%;height:100%;object-fit:cover">`:esc((o.name||n||'').slice(0,2).toUpperCase())}</div>`;
const logoBox=(s)=>`<div class="in-logo-box" style="width:${s}px;height:${s}px">${I.d.logo?`<img src="${I.d.logo}" alt="Institution logo">`:esc((I.d.short||I.d.name||'IN').slice(0,2).toUpperCase())}</div>`;

/* ---------- wizard ---------- */
function wiz(){
  const s=I.step;
  const steps=STEPS.map((t,i)=>`<button class="in-step${i===s?' on':i<=I.max?' done':''}" onclick="IN.jump(${i})">${i+1}. ${t}</button>`).join('');
  return `<div class="in-wrap"><div class="in-head"><h3>${I.sub?'Edit your institution profile':'Create your institution profile'}</h3><p>Add your official institution details so candidates can identify and trust your organization.</p></div>
  <div class="in-steps" role="tablist">${steps}</div>
  ${welcome?note('<b>Welcome back.</b> Your saved progress is loaded. Carry on from where you stopped.','in-ok'):''}
  ${[s0,s1,s2,s3,s4,s5][s]()}
  <div class="in-actions"><button class="btn btn-ghost btn-sm" onclick="IN.later()">Save and continue later</button>
  <div class="r">${s>0?'<button class="btn btn-ghost btn-sm" onclick="IN.back()">Back</button>':''}<button class="btn btn-primary btn-sm" id="nextBtn" onclick="IN.next()">${s===5?(I.sub?'Save changes and resubmit':'Submit institution profile'):'Continue'}</button></div></div>
  <div class="in-demo">Demo helper: <button onclick="IN.sample()">Fill with sample data</button><button onclick="IN.reset()">Start over</button></div></div>`;
}
function s0(){
  return card('Institution logo','Candidates see this next to your name.',`<div class="in-logo">${logoBox(84)}<div>
   <input type="file" id="inLogo" accept="image/png,image/jpeg" style="display:none" onchange="IN.logo(event)">
   <button class="btn btn-ghost btn-sm" onclick="document.getElementById('inLogo').click()">${I.d.logo?'Change logo':'Upload logo'}</button>
   ${I.d.logo?'<button class="btn btn-ghost btn-sm" onclick="IN.rmLogo()">Remove</button>':''}
   <p class="sub2" style="margin:8px 0 0">Recommended: square PNG or JPG, at least 400 × 400 px, under 2 MB.</p><div class="in-err" id="logoErr" style="display:block"></div></div></div>`)
  + card('Institution details','',grid(F0,'d')+note('Use the official name of your institution as it appears on your official documents.'));
}
function s1(){
  return card('Institution location','Where is your main campus?',grid(F1,'d')+note('Use the location of your institution\'s main campus.')+
   `<div class="in-map">${I.d.city?`<span>${PIN_IC} ${esc(locStr(I.d))}</span>`:'<span>Map preview appears once you add a location</span>'}<button class="btn btn-ghost btn-sm" onclick="IN.focusPin()">Change location</button></div>`);
}
function s2(){
  return card('Your details','Tell us who is creating this institution profile. This helps us understand who is authorized to represent the institution.',grid(F2,'d')+note('Your details are used to identify the person responsible for managing this institution profile.'))
  + card('Email verification','Verify the official institution email you entered in step 1.',emailInner());
}
function emailInner(){
  const e=I.em, d=I.d;
  if(e==='ok') return note(`<b>${ck(13)} Official email verified</b><br>${esc(d.email)}`,'in-ok');
  if(e==='sent') return note(`<b>Check your email</b><br>We sent a verification code to ${esc(d.email)}`)+
   `<div class="in-otp">${[0,1,2,3,4,5].map(i=>`<input maxlength="1" inputmode="numeric" aria-label="Digit ${i+1}" oninput="IN.otp(this,${i})" onkeydown="IN.otpKey(event,${i})">`).join('')}</div>
   <div class="in-err" id="otpErr" style="display:none"></div>
   <div class="in-actions"><span class="in-demo">Demo: any 6 digits will work.</span><div class="r"><button class="btn btn-ghost btn-sm" onclick="IN.resend()">Resend code</button><button class="btn btn-primary btn-sm" onclick="IN.verify()">Verify email</button></div></div>`;
  return `<div class="in-grid">${fld(EMAILF,'d')}</div>
   ${e==='sending'?'<button class="btn btn-primary btn-sm" disabled><span class="in-load" style="border-top-color:#fff"></span>Sending code…</button>':'<button class="btn btn-primary btn-sm" onclick="IN.send()">Send verification code</button>'}
   <p style="font-size:13px;color:var(--ink-soft);margin:12px 0 0">Don't have an official institution email? <a href="#" onclick="IN.go(3);return false" style="color:var(--blue-700);font-weight:600">Choose another verification method</a></p>`;
}
function s3(){
  const dc=I.doc;
  return card('Verify your institution','Provide official information that helps us confirm that this institution exists and that you are authorized to represent it.',`<div class="in-methods">
  <div class="in-method rec"><h5>Official institution email <span class="in-tag g">Recommended</span>${I.em==='ok'?'<span class="in-tag g">Verified</span>':''}</h5><p class="sub2">Verify using your institution's official email address.</p>${emailInner()}</div>
  <div class="in-method"><h5>Official website${I.web?'<span class="in-tag g">Confirmed</span>':''}</h5><p class="sub2">Confirm the institution's official website.</p><div class="in-grid">${fld(WEBF,'d')}</div>
   ${note('Your website should clearly represent the same institution name.')}<button class="btn btn-ghost btn-sm" onclick="IN.web()">Confirm website</button></div>
  <div class="in-method"><h5>Official institution document${dc&&dc.st==='ok'?'<span class="in-tag g">Uploaded</span>':''}</h5><p class="sub2">Upload an official document that identifies the institution.</p>
   <div class="in-f"><label>Document type<i>Optional</i></label><select onchange="IN.docType(this.value)"><option value="">Select</option>${DOCS.map(x=>`<option${I.docType===x?' selected':''}>${x}</option>`).join('')}</select></div>
   <input type="file" id="inDoc" accept=".pdf,.jpg,.jpeg,.png" style="display:none" onchange="IN.doc(event)">
   ${dc?`<div class="in-file"><span>${dc.st==='up'?'<span class="in-load"></span>Uploading…':ck(13)} ${esc(dc.name)}<br><small style="color:var(--ink-faint)">${dc.size}</small></span><span><button class="btn btn-ghost btn-sm" onclick="document.getElementById('inDoc').click()">Replace</button> <button class="btn btn-ghost btn-sm" onclick="IN.rmDoc()">Remove</button></span></div>`:'<div style="margin-top:10px"><button class="btn btn-ghost btn-sm" onclick="document.getElementById(\'inDoc\').click()">Upload document</button></div>'}
   <div class="in-err" id="docErr" style="display:block"></div><p class="sub2" style="margin:8px 0 0">Accepted: PDF, JPG, JPEG, PNG. Up to 5 MB.</p>${note('Your document will be reviewed before the institution is marked as verified.')}</div></div>
   <div class="in-note in-bad" id="vErr" style="display:none"></div>`)
  + card('Your connection with this institution','Are you authorized to create and manage this institution profile?',`
   <label class="in-radio"><input type="radio" name="auth"${I.auth==='self'?' checked':''} onchange="IN.auth('self')"> Yes, I am authorized to represent this institution</label>
   <label class="in-radio"><input type="radio" name="auth"${I.auth==='behalf'?' checked':''} onchange="IN.auth('behalf')"> I am creating this profile on behalf of the institution</label>
   ${I.auth==='behalf'?`<div class="in-grid"><div class="in-f"><label>Relationship / role<i>Required</i></label><select onchange="IN.role(this.value)"><option value="">Select</option>${ROLES.map(x=>`<option${I.role===x?' selected':''}>${x}</option>`).join('')}</select></div></div>`:''}
   ${note('Only create a profile for an institution you are authorized to represent.','in-warn')}
   <label class="in-check"><input type="checkbox"${I.c1?' checked':''} onchange="IN.c1(this.checked)"> I confirm that the information provided is accurate and that I am authorized to represent this institution.</label>`);
}
function s4(){ return branchMgr(); }
function s5(){
  const d=I.d, r=(l,v)=>`${l}: ${esc(v)||'—'}<br>`;
  const S=[
   ['Institution details',0,`<b>${esc(d.name)}</b><br>${r('Type',d.type)}${r('Website',d.website)}${r('Email',d.email)}${r('Phone',d.phone)}`],
   ['Location',1,`${esc(locStr(d))}<br>${r('PIN code',d.pin)}${r('Area',d.area)}${r('Address',d.address)}`],
   ['Representative details',2,`<b>${esc(d.rname)}</b><br>${esc(d.rdes)}${d.rdep?', '+esc(d.rdep):''}<br>${esc(d.remail)}<br>${I.em==='ok'?ck(12)+' Email verified':'Email not verified yet'}`],
   ['Verification',3,`${I.em==='ok'?ck(12)+' Official email verified':'Official email not verified'}<br>${I.doc?ck(12)+' Document uploaded ('+esc(I.doc.name)+')':'No document uploaded'}<br>Review pending after submission`],
   ['Branches / campuses',4,`${I.branches.length+1} ${I.branches.length?'campuses':'campus'}<br>Main: ${esc(d.name)}<br>${I.branches.map(b=>(b.img?`<img class="in-mini" src="${b.img}" alt="">`:'')+esc(b.name)).join('<br>')}`]];
  return card('Review your institution profile','Check everything before you submit.',S.map((x,i)=>`<div class="in-acc${i===0?' open':''}"><button onclick="this.parentNode.classList.toggle('open')"><span>${x[0]}</span><span><a href="#" onclick="event.stopPropagation();IN.edit(${x[1]});return false" style="color:var(--blue-700);font-size:13px">Edit</a></span></button><div class="body">${x[2]}</div></div>`).join('')
   +`<label class="in-check"><input type="checkbox" id="finalChk"${I.c2?' checked':''} onchange="IN.c2(this.checked)"> I confirm that the information provided is accurate.</label><div class="in-err" id="finalErr" style="display:none;margin-bottom:8px">Confirm that the information is accurate before submitting.</div>`);
}

/* ---------- branches ---------- */
function branchMgr(){
  const d=I.d, n=I.branches.length+1;
  return card('Branches &amp; campuses','Add campuses or branches belonging to this institution.',
   `<p style="font-size:13px;font-weight:600;color:var(--ink-soft);margin:0 0 10px">${n} ${n===1?'campus':'campuses'}</p>
   <div class="in-camp"><div class="lft"><div class="in-thumb" style="width:52px;height:52px;overflow:hidden">${d.logo?`<img src="${d.logo}" alt="Main campus logo" style="width:100%;height:100%;object-fit:cover">`:esc((d.name||'IN').slice(0,2).toUpperCase())}</div><div><b>${esc(d.name||'Your institution')}</b><span>Main campus: ${esc(locStr(d)||'location not added yet')}</span></div></div><span class="in-vbadge">${ck(12)} Main campus</span></div>
   ${I.branches.length?I.branches.map((b,i)=>`<div class="in-camp"><div class="lft">${thumb(b)}<div><b>${esc(b.name)}</b><span>${esc(locStr(b))}${b.type?' · '+esc(b.type):''}</span></div></div><div style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" onclick="IN.bView(${i})">View</button><button class="btn btn-ghost btn-sm" onclick="IN.bEdit(${i})">Edit</button></div></div>`).join(''):'<div class="empty-state"><h4>No other campuses yet</h4><p>Add a campus if this institution runs from more than one location. You can skip this step.</p></div>'}
   <button class="btn btn-primary btn-sm" onclick="IN.bEdit(-1)">+ Add branch / campus</button>`);
}
function modal(h){ closeM(); const m=document.createElement('div'); m.className='in-modal'; m.id='inModal'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.innerHTML='<div>'+h+'</div>'; m.addEventListener('click',e=>{ if(e.target===m) closeM(); }); document.body.appendChild(m); }
function closeM(){ const m=$('inModal'); if(m) m.remove(); }
function bForm(){
  return `<h4 style="margin:0 0 14px;font-size:18px">${BRi<0?'Add branch / campus':'Edit branch / campus'}</h4>${grid(FB,'b')}
  <div class="in-f"><label>Branch logo / campus photo<i>Optional</i></label><input type="file" id="inBimg" accept="image/png,image/jpeg" style="display:none" onchange="IN.bImg(event)">
  <div class="in-logo">${BR.img?`<div class="in-logo-box" style="width:120px"><img src="${BR.img}" alt="Campus"></div>`:''}<button class="btn btn-ghost btn-sm" onclick="document.getElementById('inBimg').click()">${BR.img?'Change photo':'Upload photo'}</button></div></div>
  <div class="in-map" style="margin-top:12px">${BR.city?`<span>${PIN_IC} ${esc(locStr(BR))}</span>`:'<span>Location preview appears once you add a PIN code</span>'}</div>
  <div class="in-actions" style="margin-top:14px"><span></span><div class="r"><button class="btn btn-ghost btn-sm" onclick="IN.closeM()">Cancel</button><button class="btn btn-primary btn-sm" onclick="IN.bSave()">Save branch</button></div></div>`;
}

/* ---------- status + dashboard ---------- */
function statusBody(){
  const d=I.d, ok=I.doc&&I.doc.st==='ok';
  if(I.vs==='verified') return `<div class="in-status"><div class="big" style="background:var(--green)">${ck(26)}</div><h3 style="margin:0 0 4px">Verified institution</h3><p style="font-size:18px;font-weight:700;color:var(--blue-900);margin:0 0 6px">${esc((d.name||'').toUpperCase())}</p>${vBadge()}</div>
   <ul class="in-list">${[['Official email',I.em==='ok'?'Verified':'Not provided'],['Institution information','Confirmed'],['Institution document',ok?'Reviewed':'Not provided'],['Representative','Confirmed']].map(x=>`<li><span class="in-dot ${x[1]==='Not provided'?'':'ok'}">${x[1]==='Not provided'?'':ck(11)}</span><b>${x[0]}</b> ${x[1]}</li>`).join('')}</ul>`;
  if(I.vs==='changes') return `<div class="in-status"><div class="big" style="background:#B3261E">${BANG}</div><h3 style="margin:0 0 6px">Additional information required</h3><p style="color:var(--ink-soft);margin:0">We need some additional information before we can complete your institution verification.</p></div>
   ${note('<b>Reason</b><br>The uploaded document does not clearly match the institution name.','in-bad')}
   <div class="in-actions" style="justify-content:flex-start"><button class="btn btn-primary btn-sm" onclick="IN.edit(0)">Update information</button><button class="btn btn-ghost btn-sm" onclick="IN.edit(3)">Replace document</button></div>
   <p class="sub2" style="margin-top:12px">Your profile information has not been deleted. You can update the required details and resubmit.</p>`;
  const L=[['Institution details submitted',1],[I.em==='ok'?'Official email verified':'Official email not verified',I.em==='ok'],['Institution location added',!!d.city],['Representative details added',!!d.rname],[ok?'Verification document uploaded':'No verification document uploaded',ok]];
  return `<div class="in-status"><div class="big" style="background:#C77700">${CLK}</div><h3 style="margin:0 0 6px">Verification pending</h3><p style="color:var(--ink-soft);margin:0">Your institution profile has been submitted for review.</p></div>
   <ul class="in-list">${L.map(x=>`<li><span class="in-dot${x[1]?' ok':''}">${x[1]?ck(11):''}</span>${x[0]}</li>`).join('')}<li><span class="in-dot wait">${CLK.replace('width="24" height="24"','width="12" height="12"')}</span>Institution review pending</li></ul>
   ${note('We\'ll show your institution as verified after the submitted information has been reviewed.')}`;
}
const demoBar=()=>`<div class="in-demo">Demo: preview a state <button onclick="IN.vs('pending')">Pending</button><button onclick="IN.vs('verified')">Verified</button><button onclick="IN.vs('changes')">Changes required</button></div>`;
function statusPage(){
  return `<div class="in-wrap"><div class="in-head"><h3>Institution verification</h3></div><div class="in-card">${statusBody()}<div class="in-actions" style="justify-content:flex-end"><button class="btn btn-primary btn-sm" onclick="IN.dash()">Go to dashboard</button></div></div>${demoBar()}</div>`;
}
const rows=p=>`<div class="in-grid">${p.map(x=>`<div class="in-f"><label>${x[0]}</label><div style="font-size:14px">${esc(x[1])||'—'}</div></div>`).join('')}</div>`;
function dash(){
  const d=I.d, p=pct(), sc=I.sec;
  const nav=[['profile','Institution profile'],['branches','Branches & campuses'],['verify','Verification'],['rep','Representative'],['jobs','Posted jobs']].map(x=>`<button class="${sc===x[0]?'on':''}" onclick="IN.sec('${x[0]}')">${x[1]}</button>`).join('');
  let body='';
  if(sc==='profile') body=card('Institution profile','',rows([['Name',d.name],['Type',d.type],['Website',d.website],['Email',d.email],['Phone',d.phone],['Established',d.year],['Affiliation',d.affil],['Accreditation',d.accred],['Location',locStr(d)],['Address',d.address]])+`<button class="btn btn-ghost btn-sm" onclick="IN.edit(0)">Edit profile</button>`);
  if(sc==='branches') body=branchMgr();
  if(sc==='verify') body=`<div class="in-card">${statusBody()}</div>${demoBar()}`;
  if(sc==='rep') body=card('Representative','The person responsible for managing this institution profile.',rows([['Name',d.rname],['Designation',d.rdes],['Department',d.rdep],['Work email',d.remail+(I.em==='ok'?' (verified)':'')],['Work phone',d.rphone],['Connection',I.auth==='behalf'?'On behalf: '+I.role:'Authorized to represent']])+`<button class="btn btn-ghost btn-sm" onclick="IN.edit(2)">Edit details</button>`);
  if(sc==='jobs'){ const n=typeof postedJobs!=='undefined'?Object.keys(postedJobs).length:0;
    body=card('Posted jobs',n?`${n} ${n===1?'job':'jobs'} posted from this institution.`:'',n?'<button class="btn btn-primary btn-sm" onclick="IN.tab(\'myjobs\')">View posted jobs</button> <button class="btn btn-ghost btn-sm" onclick="IN.tab(\'post\')">Post another job</button>':'<div class="empty-state"><h4>No jobs posted yet</h4><p>Post your first faculty opening and choose which campus it belongs to.</p></div><button class="btn btn-primary btn-sm" onclick="IN.tab(\'post\')">Post a job</button>'); }
  return `<div class="in-wrap"><div class="in-card"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">${logoBox(64)}<div style="flex:1;min-width:200px"><h3 style="margin:0;font-size:20px;color:var(--blue-900)">${esc((d.name||'').toUpperCase())}</h3><div style="margin:5px 0">${vBadge()}</div><span style="font-size:13px;color:var(--ink-soft)">${PIN_IC} ${esc(locStr(d))}</span></div></div>
  <div style="margin-top:16px"><b style="font-size:13.5px">Profile completion: ${p}%</b><div class="in-bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div style="width:${p}%"></div></div>
  <p style="font-size:13px;color:var(--ink-soft);margin:0 0 10px">Complete your profile to improve your institution's visibility.</p><button class="btn btn-primary btn-sm" onclick="IN.edit(0)">Complete profile</button></div></div>
  <div class="in-nav">${nav}</div>${body}</div>`;
}
function instHeader(){
  const av=$('dashAvatar'), nm=$('dashName'); if(!av) return;
  const d=I.d, name=d.name||'';
  if(name&&nm) nm.textContent=name;
  if(d.logo){
    av.textContent=''; av.style.backgroundImage="url('"+d.logo+"')"; av.style.backgroundSize='contain'; av.style.backgroundRepeat='no-repeat'; av.style.backgroundPosition='center'; av.style.backgroundColor='#fff'; av.style.border='1px solid var(--line)';
  } else {
    av.style.backgroundImage=''; av.style.backgroundColor=''; av.style.border=''; if(name) av.textContent=name.slice(0,2).toUpperCase();
  }
  try{ currentCompany.logo=d.logo||''; if(name) currentCompany.name=name; saveState(); refreshDashTopAccount(); }catch(e){}
}
window.instHeader=instHeader;
function render(){ const r=$('instRoot'); if(!r) return; r.innerHTML=I.view==='wizard'?wiz():I.view==='status'?statusPage():dash(); instHeader(); }
function setHeader(){
  try{
    const d=I.d; Object.assign(currentCompany,{name:d.name,type:d.type,city:d.city||locStr(d),website:d.website,desc:d.about2||d.about1||'',contactName:d.rname,designation:d.rdes,email:d.remail||d.email,phone:d.rphone||d.phone,logo:d.logo||'',saved:true}); saveState();
    if($('dashName')) $('dashName').textContent=d.name; if($('dashAvatar')) $('dashAvatar').textContent=d.name.slice(0,2).toUpperCase();
    if($('dashSub')) $('dashSub').textContent='Your poster panel: post jobs, review and invite candidates';
    if($('employerSetupNote')) $('employerSetupNote').style.display='none'; if($('employerTabsBar')) $('employerTabsBar').style.display='flex';
    refreshDashTopAccount(); instHeader();
  }catch(e){}
}

/* ---------- actions (called from inline handlers) ---------- */
window.IN={
  set(sc,k,v,re){ (sc==='d'?I.d:BR)[k]=v; const f=$('f-'+sc+'-'+k); if(f) f.classList.remove('err'); if(k==='pin') pinLook(sc,v.trim()); if(re&&sc==='d'&&k==='type'){ save(); render(); } else if(sc==='d') save(); },
  blur(sc,k){ const o=ALLF.find(f=>f.k===k&&(sc==='b'?FB.includes(f):!FB.includes(f))); if(o) mark(sc,o,chk(o,(sc==='d'?I.d:BR)[k])); },
  jump(i){ if(i<=I.max||i<I.step){ I.step=i; welcome=false; save(); render(); top(); } },
  go(i){ I.step=i; I.max=Math.max(I.max,i); welcome=false; I.view='wizard'; save(); render(); top(); },
  back(){ I.step=Math.max(0,I.step-1); welcome=false; save(); render(); top(); },
  edit(i){ I.view='wizard'; I.step=i; I.max=5; welcome=false; save(); render(); top(); },
  later(){ save(); toast('Progress saved. You can continue later.'); },
  focusPin(){ const el=document.querySelector('#f-d-pin input'); if(el){ el.focus(); el.select(); } },
  next(){
    const s=I.step; let ok=true;
    if(s===0) ok=valid(F0,'d'); else if(s===1) ok=valid(F1,'d'); else if(s===2) ok=valid(F2,'d');
    else if(s===3){
      const e=$('vErr'); let m='';
      if(I.em!=='ok'&&!(I.doc&&I.doc.st==='ok')) m='Complete at least one verification method: verify your official email or upload an official document.';
      else if(!I.auth) m='Tell us whether you are authorized to represent this institution.';
      else if(I.auth==='behalf'&&!I.role) m='Select your relationship to the institution.';
      else if(!I.c1) m='Confirm the statement at the bottom of this step to continue.';
      if(m){ e.textContent=m; e.style.display='block'; e.scrollIntoView({block:'center'}); ok=false; }
    } else if(s===5&&!I.c2){ $('finalErr').style.display='block'; ok=false; }
    if(!ok) return;
    if(s===5){
      const b=$('nextBtn'); b.disabled=true; b.innerHTML='<span class="in-load" style="border-top-color:#fff"></span>Submitting…';
      setTimeout(()=>{ I.sub=true; I.view='status'; I.vs='pending'; setHeader(); save(); render(); top(); toast('Institution profile submitted'); },1000); return;
    }
    I.step=s+1; I.max=Math.max(I.max,I.step); welcome=false; save(); render(); top();
  },
  logo(e){ const f=e.target.files[0]; if(!f) return; const er=$('logoErr');
    if(!/^image\/(png|jpeg)$/.test(f.type)){ er.textContent='Use a PNG or JPG image.'; return; }
    if(f.size>2*1048576){ er.textContent='Logo must be under 2 MB.'; return; }
    const r=new FileReader(); r.onload=x=>{ I.d.logo=x.target.result; save(); render(); toast('Logo updated'); }; r.readAsDataURL(f); },
  rmLogo(){ I.d.logo=''; save(); render(); },
  send(){ const m=chk(EMAILF,I.d.email); mark('d',EMAILF,m); if(m) return; I.em='sending'; render(); setTimeout(()=>{ I.em='sent'; save(); render(); },900); },
  resend(){ toast('A new code was sent to '+I.d.email); },
  otp(el,i){ el.value=el.value.replace(/\D/g,''); if(el.value&&el.nextElementSibling) el.nextElementSibling.focus(); },
  otpKey(ev,i){ if(ev.key==='Backspace'&&!ev.target.value&&ev.target.previousElementSibling) ev.target.previousElementSibling.focus(); },
  verify(){ const c=[...document.querySelectorAll('.in-otp input')].map(x=>x.value).join(''), e=$('otpErr');
    if(!/^\d{6}$/.test(c)){ e.textContent='Enter the 6-digit code we sent to your email.'; e.style.display='block'; return; }
    I.em='ok'; save(); render(); toast('Official email verified'); },
  web(){ const m=chk(WEBF,I.d.website); mark('d',WEBF,m); if(m) return; I.web=true; save(); render(); toast('Website confirmed'); },
  docType(v){ I.docType=v; save(); },
  doc(e){ const f=e.target.files[0]; if(!f) return; const er=$('docErr');
    if(!/\.(pdf|jpe?g|png)$/i.test(f.name)){ er.textContent='Unsupported file. Upload a PDF, JPG, JPEG or PNG.'; return; }
    if(f.size>5*1048576){ er.textContent='File is larger than 5 MB. Upload a smaller file.'; return; }
    I.doc={name:f.name,size:(f.size/1048576).toFixed(1)+' MB',st:'up'}; render();
    setTimeout(()=>{ I.doc.st='ok'; save(); render(); },800); },
  rmDoc(){ I.doc=null; save(); render(); },
  auth(v){ I.auth=v; save(); render(); }, role(v){ I.role=v; save(); }, c1(v){ I.c1=v; save(); }, c2(v){ I.c2=v; save(); },
  vs(v){ I.vs=v; save(); render(); },
  dash(){ I.view='dash'; save(); render(); top(); },
  sec(k){ I.sec=k; render(); },
  tab(w){ switchEmployerTab(w); },
  closeM,
  bEdit(i){ BRi=i; BR=i<0?{}:Object.assign({},I.branches[i]); closeM(); modal(bForm()); },
  bImg(e){ const f=e.target.files[0]; if(!f) return; if(f.size>2*1048576){ toast('Image must be under 2 MB'); return; } const r=new FileReader(); r.onload=x=>{ BR.img=x.target.result; modal(bForm()); }; r.readAsDataURL(f); },
  bSave(){ if(!valid(FB,'b')) return; if(BRi<0) I.branches.push(BR); else I.branches[BRi]=BR; save(); closeM(); render(); toast('Branch saved'); },
  bView(i){ const b=I.branches[i];
    modal(`<div style="display:flex;gap:14px;align-items:center;margin-bottom:14px">${thumb(b)}<div><h4 style="margin:0;font-size:18px">${esc(b.name)}</h4><span style="font-size:13px;color:var(--ink-soft)">${esc(locStr(b))}</span></div></div>${b.img?`<img src="${b.img}" alt="Campus" style="width:100%;max-height:180px;object-fit:cover;margin-bottom:12px">`:''}${rows([['Type',b.type],['Code',b.code],['Contact person',b.cname],['Designation',b.cdes],['Email',b.email],['Phone',b.phone],['Location',locStr(b)],['Address',b.address]])}<p style="font-size:13.5px;color:var(--ink-soft)">${esc(b.desc)}</p>
    <div class="in-actions"><button class="btn btn-ghost btn-sm" style="color:#B3261E;border-color:#B3261E" onclick="IN.bDel(${i})">Remove</button><div class="r"><button class="btn btn-ghost btn-sm" onclick="IN.closeM()">Close</button><button class="btn btn-primary btn-sm" onclick="IN.bEdit(${i})">Edit</button></div></div>`); },
  bDel(i){ modal(`<h4 style="margin:0 0 8px;font-size:18px">Remove ${esc(I.branches[i].name)}?</h4><p style="color:var(--ink-soft);font-size:14px">This campus will be removed from your institution profile. Jobs already posted to it stay live.</p>
    <div class="in-actions"><span></span><div class="r"><button class="btn btn-ghost btn-sm" onclick="IN.closeM()">Cancel</button><button class="btn btn-primary btn-sm" style="background:#B3261E" onclick="IN.bDelOk(${i})">Remove campus</button></div></div>`); },
  bDelOk(i){ const n=I.branches[i].name; I.branches.splice(i,1); save(); closeM(); render(); toast(n+' removed'); },
  sample(){
    Object.assign(I.d,{name:'Upaadhyay University',type:'University',short:'Upaadhyay Univ.',website:'https://www.upaadhyay.edu.in',email:'placement@upaadhyay.edu.in',phone:'9876543210',year:'1998',reg:'TS/UNI/1998/0142',affil:'UGC recognised',accred:'NAAC A, AICTE approved',about1:'A multidisciplinary university in Hyderabad.',about2:'Upaadhyay University offers undergraduate, postgraduate and doctoral programmes across engineering, sciences and management.',country:'India',pin:'500072',state:'Telangana',district:'Hyderabad',city:'Hyderabad',area:'Kukatpally',address:'Plot 12, University Road, Kukatpally',rname:'K Kittu',rdes:'Placement Officer',rdep:'Placement / Training & Placement',remail:'placement@upaadhyay.edu.in',rphone:'9876543210'});
    I.branches=[{name:'Warangal Campus',type:'Campus',code:'WGL-01',pin:'506002',state:'Telangana',district:'Warangal',city:'Warangal',area:'Hanamkonda',address:'NH 163, Hanamkonda',cname:'S Rao',cdes:'Campus Director',email:'warangal@upaadhyay.edu.in',phone:'9123456780',desc:'Engineering and sciences campus.'},{name:'Secunderabad Campus',type:'Campus',code:'SEC-01',pin:'500003',state:'Telangana',district:'Hyderabad',city:'Secunderabad',area:'Secunderabad',address:'Sardar Patel Road',cname:'A Devi',cdes:'Dean',email:'sec@upaadhyay.edu.in',phone:'9123456781',desc:'Management and commerce campus.'}];
    I.em='ok'; I.web=true; I.doc={name:'affiliation-certificate.pdf',size:'2.4 MB',st:'ok'}; I.docType=DOCS[1]; I.auth='self'; I.c1=true; I.max=5; save(); render(); toast('Sample data loaded'); },
  reset(){ if(!confirm('Clear everything in this institution profile form?')) return; localStorage.removeItem(KEY); I=load(); I.d={country:'India'}; welcome=false; render(); }
};

/* ---------- hooks used by the dashboard page and job posting ---------- */
window.instRender=render;
window.instCampusOptions=function(){
  const d=I.d, loc=locStr(d)||(typeof currentCompany!=='undefined'?currentCompany.city:''), c=[{v:'main',l:'Main Campus'+(d.city?' ('+d.city+')':''),n:'Main Campus',loc:loc}];
  I.branches.forEach((b,i)=>c.push({v:'b'+i,l:b.name,n:b.name,loc:locStr(b)}));
  c.push({v:'all',l:'All Campuses',n:'All Campuses',loc:''}); return c;
};
window.instFillCampuses=function(){
  const s=$('jbCampus'); if(!s) return; const cur=s.value;
  s.innerHTML='<option value="">Select campus</option>'+instCampusOptions().map(o=>`<option value="${o.v}">${esc(o.l)}</option>`).join(''); s.value=cur;
  const n=$('jbInst'); if(n) n.textContent=(I.d.name||(typeof currentCompany!=='undefined'&&currentCompany.name)||'Your institution').toUpperCase();
  instCampusChange();
};
window.instCampusChange=function(){ const s=$('jbCampus'), n=$('jbCampusNote'); if(s&&n) n.style.display=s.value==='all'?'block':'none'; };
window.instJobMeta=function(j){
  const v=I.sub&&I.vs==='verified';
  const c=j.campus?`<span style="font-size:12.5px;color:var(--ink-soft)">${PIN_IC} ${esc(j.campus)}${j.campusLoc?', '+esc(j.campusLoc):''}</span>`:'';
  return (v||c)?`<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px">${v?`<span class="in-vbadge">${ck(12)} Verified Institution</span>`:''}${c}</div>`:'';
};
window.instJobHeader=function(j){
  const n=(I.d.name||(typeof currentCompany!=='undefined'&&currentCompany.name)||'').toUpperCase();
  return `<div style="font-weight:700;color:var(--blue-900);letter-spacing:.02em">${esc(n)}</div>${instJobMeta(j)}${j.campus==='All Campuses'?'<p style="font-size:12.5px;color:var(--ink-soft);margin:4px 0 0">This job is available across all listed campuses.</p>':''}`;
};
document.addEventListener('DOMContentLoaded',function(){ if(I.d.name||I.d.logo) instHeader(); });
})();
