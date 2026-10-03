/* locations.js — country list (A to Z) and India State > District > City > Area > PIN data.
   Used by the Location step of the institution profile. Only India has detailed lists for now;
   a state, district or city with no data listed here falls back to typing it in by hand.
   Add more data in the INDIA object below, same shape: State -> District -> City -> Area -> 'PIN'. */
(function(){
var COUNTRIES=['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Republic)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];

var INDIA={
 'Telangana':{
  'Hyderabad':{
   'Hyderabad':{'Abids':'500001','Ameerpet':'500016','Banjara Hills':'500034','Begumpet':'500016','Charminar':'500002','Dilsukhnagar':'500060','Gachibowli':'500032','Himayatnagar':'500029','Jubilee Hills':'500033','Kondapur':'500084','Kukatpally':'500072','LB Nagar':'500074','Madhapur':'500081','Miyapur':'500049','Somajiguda':'500082','Uppal':'500039'},
   'Secunderabad':{'Bowenpally':'500011','Secunderabad':'500003','Trimulgherry':'500015'}},
  'Rangareddy':{'Shamshabad':{'Shamshabad':'501218'},'Ibrahimpatnam':{'Ibrahimpatnam':'501506'},'Chevella':{'Chevella':'501503'}},
  'Medchal-Malkajgiri':{'Malkajgiri':{'Malkajgiri':'500047'},'Medchal':{'Medchal':'501401'}},
  'Warangal':{'Warangal':{'Hanamkonda':'506001','Warangal':'506002'}},
  'Karimnagar':{'Karimnagar':{'Karimnagar':'505001'}},
  'Nizamabad':{'Nizamabad':{'Nizamabad':'503001'}},
  'Khammam':{'Khammam':{'Khammam':'507001'}}},
 'Andhra Pradesh':{
  'Visakhapatnam':{'Visakhapatnam':{'Dwaraka Nagar':'530016','Gajuwaka':'530026','Madhurawada':'530048','MVP Colony':'530017'}},
  'Krishna':{'Vijayawada':{'Benz Circle':'520010','Governorpet':'520002'}},
  'Guntur':{'Guntur':{'Brodipet':'522002'}},
  'Tirupati':{'Tirupati':{'Tirupati':'517501'}},
  'Anantapur':{'Anantapur':{'Anantapur':'515001'}},
  'Kurnool':{'Kurnool':{'Kurnool':'518001'}},
  'Nellore':{'Nellore':{'Nellore':'524001'}}},
 'Karnataka':{
  'Bengaluru Urban':{'Bengaluru':{'BTM Layout':'560076','Electronic City':'560100','HSR Layout':'560102','Indiranagar':'560038','Jayanagar':'560011','Koramangala':'560034','Malleshwaram':'560003','MG Road':'560001','Whitefield':'560066'}},
  'Mysuru':{'Mysuru':{'Mysuru':'570001'}},
  'Dakshina Kannada':{'Mangaluru':{'Mangaluru':'575001'}},
  'Dharwad':{'Dharwad':{'Dharwad':'580001'},'Hubballi':{'Hubballi':'580020'}}},
 'Tamil Nadu':{
  'Chennai':{'Chennai':{'Adyar':'600020','Anna Nagar':'600040','Mylapore':'600004','T. Nagar':'600017','Velachery':'600042'}},
  'Chengalpattu':{'Tambaram':{'Tambaram':'600045'}},
  'Coimbatore':{'Coimbatore':{'Gandhipuram':'641012','RS Puram':'641002'}},
  'Madurai':{'Madurai':{'Madurai':'625001'}},
  'Tiruchirappalli':{'Tiruchirappalli':{'Tiruchirappalli':'620001'}}},
 'Maharashtra':{
  'Mumbai City':{'Mumbai':{'Colaba':'400005','Dadar':'400014'}},
  'Mumbai Suburban':{'Mumbai':{'Andheri West':'400058','Bandra West':'400050','Borivali West':'400092','Powai':'400076'}},
  'Pune':{'Pune':{'Hadapsar':'411028','Hinjewadi':'411057','Kothrud':'411038','Shivajinagar':'411005','Viman Nagar':'411014'}},
  'Nagpur':{'Nagpur':{'Dharampeth':'440010','Sitabuldi':'440012'}}},
 'Delhi':{
  'New Delhi':{'New Delhi':{'Connaught Place':'110001','Hauz Khas':'110016','Lajpat Nagar':'110024','Saket':'110017','Vasant Kunj':'110070'}},
  'North Delhi':{'Delhi':{'Karol Bagh':'110005','Rohini':'110085'}},
  'South West Delhi':{'Delhi':{'Dwarka':'110075'}}},
 'Kerala':{
  'Thiruvananthapuram':{'Thiruvananthapuram':{'Thiruvananthapuram':'695001'}},
  'Ernakulam':{'Kochi':{'Ernakulam':'682001','Kakkanad':'682030'}},
  'Kozhikode':{'Kozhikode':{'Kozhikode':'673001'}}},
 'Gujarat':{
  'Ahmedabad':{'Ahmedabad':{'Maninagar':'380008','Navrangpura':'380009','Satellite':'380015'}},
  'Surat':{'Surat':{'Surat':'395003'}},
  'Vadodara':{'Vadodara':{'Vadodara':'390001'}}},
 'Uttar Pradesh':{
  'Lucknow':{'Lucknow':{'Gomti Nagar':'226010','Hazratganj':'226001'}},
  'Gautam Buddha Nagar':{'Noida':{'Sector 18':'201301','Sector 62':'201309'}},
  'Varanasi':{'Varanasi':{'Varanasi':'221001'}},
  'Kanpur Nagar':{'Kanpur':{'Kanpur':'208001'}},
  'Agra':{'Agra':{'Agra':'282001'}}},
 'West Bengal':{
  'Kolkata':{'Kolkata':{'Park Street':'700016','Salt Lake':'700091'}},
  'Howrah':{'Howrah':{'Howrah':'711101'}}},
 'Rajasthan':{
  'Jaipur':{'Jaipur':{'C-Scheme':'302001','Malviya Nagar':'302017','Vaishali Nagar':'302021'}},
  'Jodhpur':{'Jodhpur':{'Jodhpur':'342001'}},
  'Udaipur':{'Udaipur':{'Udaipur':'313001'}}},
 'Punjab':{
  'Ludhiana':{'Ludhiana':{'Ludhiana':'141001'}},
  'Amritsar':{'Amritsar':{'Amritsar':'143001'}}},
 'Chandigarh':{'Chandigarh':{'Chandigarh':{'Sector 17':'160017','Sector 22':'160022'}}},
 'Haryana':{
  'Gurugram':{'Gurugram':{'DLF Phase 1':'122002','Sector 29':'122001'}},
  'Faridabad':{'Faridabad':{'Faridabad':'121001'}}},
 'Madhya Pradesh':{
  'Bhopal':{'Bhopal':{'Arera Colony':'462016','MP Nagar':'462011'}},
  'Indore':{'Indore':{'Palasia':'452001','Vijay Nagar':'452010'}}},
 'Odisha':{'Khordha':{'Bhubaneswar':{'Patia':'751024','Saheed Nagar':'751007'}}},
 'Bihar':{'Patna':{'Patna':{'Boring Road':'800001','Kankarbagh':'800020'}}}
};

/* every other state and union territory is listed so it can be chosen; its lower levels are typed in */
['Andaman and Nicobar Islands','Arunachal Pradesh','Assam','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Goa','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Ladakh','Lakshadweep','Manipur','Meghalaya','Mizoram','Nagaland','Puducherry','Sikkim','Tripura','Uttarakhand'].forEach(function(s){ if(!INDIA[s]) INDIA[s]={}; });

window.UP_LOC={countries:COUNTRIES,india:INDIA};
})();

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
const STEPS=['Institution details','Location','Representative & authority','Verification','Branches / campuses','Review & submit'];
const TYPES=['University','College','School','Institute','Coaching / Training Institute','Company','Organization','Other'];
const DES=['Principal','Vice Principal','Dean','Director','HR Manager','HR Head','Placement Officer','Administration','Registrar','Authorized Representative','Other'];
const DEP=['Administration','HR','Placement / Training & Placement','Management','Academic','Other'];
const DOCS=['Government registration document','University affiliation certificate','Recognition / accreditation certificate','Institution registration certificate','Official authorization document','Other official institutional proof'];
const ROLES=['HR Representative','Recruitment Consultant','Placement Agency','Administrative Representative','Authorized Partner','Other'];
const BTYPES=['Campus','Branch','Extension centre','Study centre','Other'];
const PINS={'500072':['Telangana','Hyderabad','Hyderabad','Kukatpally'],'506002':['Telangana','Warangal','Warangal','Hanamkonda'],'500003':['Telangana','Hyderabad','Secunderabad','Secunderabad'],'560001':['Karnataka','Bengaluru Urban','Bengaluru','MG Road']};
const ACAD=['University','College','School','Institute'];
const LOC=window.UP_LOC||{countries:['India'],india:{}}, COUNTRIES=LOC.countries, INDIA=LOC.india;
const REGR=['HR / Recruitment','Administration','Placement','Authorized Representative','Director / Principal / Owner'];
const ADES=['Dean','Principal','Director','Registrar','Head of Institution','Other Authorized Head'];
const XTYPES=['Registration','Accreditation','Affiliation','Authorization Letter','Institution ID','Other'];
const EIDF={k:'eid',l:'Employee ID',ph:'If available'};
const DOCC=[
 {k:'reg',t:'Institution Registration / Recognition Proof',d:'Government registration, trust or society certificate, or recognition order.',req:1},
 {k:'rep',t:'Representative / Employee Proof',d:'Staff ID card, appointment letter or other proof that you work at the institution.',req:1},
 {k:'auth',t:'Authorization Letter or Institution-issued ID',d:'Letter from the institution head authorizing you, or an ID issued by the institution.',req:1},
 {k:'aprf',t:'Authority / Dean / Principal Official Proof',d:'Appointment letter or official proof of the authority. Required when the authority uses a public email.',req:()=>aPub()}];
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
 {k:'country',l:'Country',req:1,t:'select',o:COUNTRIES,loc:1},
 {k:'state',l:'State',req:1,loc:1},{k:'district',l:'District',req:1,loc:1},{k:'city',l:'City',req:1,loc:1},{k:'area',l:'Area / locality',loc:1},
 {k:'pin',l:'PIN code',req:1,v:'pin',ph:'Auto-filled, or enter 6 digits',pin:1},
 {k:'address',l:'Full address',req:1,t:'textarea',full:1,ph:'Building, street, landmark'}];
const F2=[
 {k:'rname',l:'Full name',req:1},{k:'rdes',l:'Designation',req:1,t:'select',o:DES},
 {k:'rdep',l:'Department',req:1,t:'select',o:DEP},{k:'remail',l:'Official work email',req:1,v:'email',ph:'name@example.edu'},
 {k:'rphone',l:'Work contact number',req:1,v:'phone',ph:'10-digit number'}];
const F2A=[
 {k:'aname',l:'Authority name',req:1},{k:'adesig',l:'Designation',req:1,t:'select',o:ADES},
 {k:'aemail',l:'Official institution email',req:1,v:'email',ph:'name@example.edu'},{k:'aphone',l:'Phone',v:'phone',ph:'10-digit number'}];
const FB=[
 {k:'name',l:'Branch / campus name',req:1,ph:'e.g. Warangal Campus'},{k:'type',l:'Branch type',req:1,t:'select',o:BTYPES},
 {k:'code',l:'Branch code',ph:'e.g. WGL-01'},{k:'desc',l:'Branch description',full:1,t:'textarea'},
 {k:'cname',l:'Branch contact person'},{k:'cdes',l:'Designation'},
 {k:'email',l:'Official branch email',v:'email'},{k:'phone',l:'Branch contact number',v:'phone'},
 {k:'country',l:'Country',req:1,t:'select',o:COUNTRIES,loc:1},{k:'state',l:'State',req:1,loc:1},
 {k:'district',l:'District',loc:1},{k:'city',l:'City',req:1,loc:1},{k:'area',l:'Area',loc:1},
 {k:'pin',l:'Branch PIN code',req:1,v:'pin',ph:'Auto-filled, or enter 6 digits',pin:1},{k:'address',l:'Full address',req:1,t:'textarea',full:1}];
const WEBF={k:'website',l:'Website',req:1,v:'url',ph:'https://example.edu'};
const EMAILF={k:'email',l:'Official institution email',req:1,v:'email',ph:'example@college.edu'};
const ALLF=F0.concat(F1,F2,F2A,FB);
const RX={email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,url:/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i,pin:/^\d{6}$/,year:/^\d{4}$/};
const MSG={email:'Enter a valid email address, e.g. name@example.edu',url:'Enter a valid website, e.g. https://example.edu',pin:'PIN code must be 6 digits',year:'Enter a 4-digit year',phone:'Enter a 10-digit number'};

let I=load(), BR={}, BRi=-1, welcome=!I.sub&&(I.step>0||!!I.d.name);
function load(){
  let r=null; try{ r=JSON.parse(localStorage.getItem(KEY)); }catch(e){}
  r=Object.assign({step:0,max:0,view:'wizard',vs:'pending',d:{country:'India'},branches:[],em:'idle',aem:'idle',web:false,doc:null,docType:'',docs:{},extra:[],regRole:'',auth:'',role:'',c1:false,c2:false,sec:'profile',sub:false},r||{});
  r.docs=r.docs||{}; r.extra=r.extra||[]; if(r.doc&&!r.docs.reg) r.docs.reg=r.doc; r.doc=null;
  Object.keys(r.docs).forEach(k=>{ if(!r.docs[k]||r.docs[k].st!=='ok') delete r.docs[k]; }); r.extra=r.extra.filter(x=>x&&x.st==='ok');
  if(r.aem==='sending') r.aem='idle';
  if(r.docs.idp){ if(!r.docs.auth) r.docs.auth=r.docs.idp; delete r.docs.idp; }
  if(r.docs.aff){ r.extra.push(Object.assign({id:'x'+Date.now(),type:'Affiliation'},r.docs.aff)); delete r.docs.aff; }
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
function top(){ /* page stays where it is when a step or option is clicked */ }

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
/* ---------- cascading location: Country > State > District > City > Area, PIN follows the area ---------- */
const LORD=['country','state','district','city','area'], LPAR={state:'country',district:'state',city:'district',area:'city'};
const cmpA=(a,b)=>String(a).localeCompare(String(b));
function locOpts(S,k){
  if(k==='country') return COUNTRIES.slice().sort(cmpA);
  if((S.country||'India')!=='India') return null;
  if(k==='state') return Object.keys(INDIA).sort(cmpA);
  const st=INDIA[S.state]; if(k==='district') return st?Object.keys(st).sort(cmpA):null;
  const di=st&&st[S.district]; if(k==='city') return di?Object.keys(di).sort(cmpA):null;
  const ci=di&&di[S.city]; return ci?Object.keys(ci).sort(cmpA):null;
}
function lookupPin(S){ try{ return INDIA[S.state][S.district][S.city][S.area]||''; }catch(e){ return ''; } }
let PINIDX=null;
function pinIdx(){ if(PINIDX) return PINIDX; PINIDX={};
  Object.keys(INDIA).forEach(st=>Object.keys(INDIA[st]).forEach(di=>Object.keys(INDIA[st][di]).forEach(ci=>Object.keys(INDIA[st][di][ci]).forEach(ar=>{ const p=INDIA[st][di][ci][ar]; if(!PINIDX[p]) PINIDX[p]=[st,di,ci,ar]; }))));
  return PINIDX; }
function locField(o,sc){
  const S=sc==='d'?I.d:BR; if(!S.country) S.country='India';
  const k=o.k, lst=locOpts(S,k), par=LPAR[k], nm=o.l.replace(' / locality','').toLowerCase();
  const ev=`onblur="IN.blur('${sc}','${k}')"`;
  let inp, extra='';
  if(lst&&lst.length){
    const cur=S[k]||'', all=cur&&!lst.includes(cur)?lst.concat(cur):lst, dis=par&&!S[par];
    inp=`<select ${dis?'disabled ':''}onchange="IN.loc('${sc}','${k}',this.value)" ${ev}><option value="">${dis?'Select '+par+' first':'Select '+nm}</option>${all.map(x=>`<option${cur===x?' selected':''}>${esc(x)}</option>`).join('')}</select>`;
  } else if(par&&(S.country||'India')==='India'&&!S[par]){
    inp=`<select disabled><option value="">Select ${par} first</option></select>`;
  } else {
    inp=`<input type="text" value="${esc(S[k]||'')}" placeholder="Type the ${nm}" oninput="IN.set('${sc}','${k}',this.value)" ${ev}>`;
  }
  if(k==='country'&&S.country!=='India') extra='<div class="sub2" style="margin:4px 0 0;font-size:11.5px">Detailed lists are available for India right now. Type your state, district, city and area yourself.</div>';
  return `<div class="in-f" id="f-${sc}-${k}"><label>${o.l}<i>${o.req?'Required':'Optional'}</i></label>${inp}<div class="in-err" role="alert"></div>${extra}</div>`;
}
function locRefresh(sc,from){
  const L=sc==='b'?FB:F1;
  LORD.slice(from).forEach(x=>{ const el=$('f-'+sc+'-'+x), o=L.find(f=>f.k===x); if(el&&o) el.outerHTML=locField(o,sc); });
  const pe=$('f-'+sc+'-pin'), po=L.find(f=>f.k==='pin'); if(pe&&po){ const box=$('pin-'+sc), keep=box?box.innerHTML:''; pe.outerHTML=fld(po,sc); const nb=$('pin-'+sc); if(nb) nb.innerHTML=keep; }
}
function mapRefresh(sc){ if(sc!=='d') return; const m=document.querySelector('#locMap span'); if(m) m.innerHTML=I.d.city?PIN_IC+' '+esc(locStr(I.d)):'Map preview appears once you add a location'; }

function fld(o,sc){
  if(o.sh&&!o.sh(I.d)) return '';
  if(o.loc) return locField(o,sc);
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
    const r=pinIdx()[val]||PINS[val], S=sc==='d'?I.d:BR;
    if(!r){ box.innerHTML=note('We couldn\'t find this PIN code in our list. Pick the state, district, city and area from the lists, or type them in yourself.','in-warn'); return; }
    S.country='India'; ['state','district','city','area'].forEach((k,i)=>{ S[k]=r[i]; const f=$('f-'+sc+'-'+k); if(f) f.classList.remove('err'); });
    locRefresh(sc,0); mapRefresh(sc);
    box.innerHTML=note(`<b>${ck(13)} Location found</b><br>State: ${r[0]}<br>District: ${r[1]}<br>City: ${r[2]}<br>Area: ${r[3]}<br>You can still change these.`,'in-ok'); save();
  },450);
}

/* ---------- verification helpers (documents, role, status) ---------- */
const PUB=/@(gmail|googlemail|yahoo|ymail|rocketmail|outlook|hotmail|live|msn|rediffmail|icloud|aol|proton|protonmail|gmx)\.[a-z.]+$/i;
const isPub=e=>PUB.test((e||'').trim());
const sm=(s,n)=>s.replace('width="24" height="24"','width="'+n+'" height="'+n+'" style="vertical-align:-2px"');
const CLKs=sm(CLK,13), BANGs=sm(BANG,13), CLKd=sm(CLK,11), BANGd=sm(BANG,11);
const FILES={}; let ERR={}, XOPEN=false, XT='Registration';
const fsz=n=>n<1048576?Math.max(1,Math.round(n/1024))+' KB':(n/1048576).toFixed(1)+' MB';
const DOCR=()=>DOCC.filter(c=>!c.sh||c.sh(I.d));
const okDoc=k=>I.docs[k]&&I.docs[k].st==='ok';
const isReq=c=>typeof c.req==='function'?c.req():!!c.req;
const anyDoc=()=>Object.keys(I.docs).some(okDoc)||I.extra.some(x=>x.st==='ok');
const missing=()=>DOCR().filter(c=>isReq(c)&&!okDoc(c.k));
const pubMail=()=>isPub(I.d.email);
const instOk=()=>F0.concat(F1).filter(f=>f.req).every(f=>(I.d[f.k]||'').trim());
const repOk=()=>F2.filter(f=>f.req).every(f=>(I.d[f.k]||'').trim())&&!!I.regRole;
const dot=(c,i)=>`<span class="in-dot${c?' '+c:''}">${i||''}</span>`;
const rowIc=c=>c==='ok'?ck(11):c==='warn'?BANGd:c==='wait'?CLKd:'';
const kvs=l=>`<div class="inv-kv">${l.map(x=>`<div${x[2]?' class="inv-full"':''}><span>${x[0]}</span><b>${x[1]||'<em>Not added</em>'}</b></div>`).join('')}</div>`;
const lnk=u=>{ u=(u||'').trim(); if(!u) return ''; const h=/^https?:\/\//i.test(u)?u:'https://'+u; return `<a href="${esc(h)}" target="_blank" rel="noopener" class="inv-link">${esc(u)}</a>`; };
const remH=()=>I.d.remail?esc(I.d.remail)+(isPub(I.d.remail)?' <span class="in-tag y">Public email</span>':''):'';
function docsLine(){
  const n=DOCC.filter(c=>okDoc(c.k)).length+I.extra.filter(x=>x.st==='ok').length, m=missing();
  return n?ck(12)+' '+n+(n===1?' document':' documents')+' uploaded'+(m.length?' · missing: '+m.map(c=>esc(c.t)).join(', '):''):'No documents uploaded';
}

/* ---------- document upload ---------- */
function upload(k,f){
  delete ERR[k];
  if(!/\.(pdf|jpe?g|png)$/i.test(f.name)){ ERR[k]='Unsupported file. Upload a PDF, JPG or PNG.'; render(); return; }
  if(!f.size){ ERR[k]='This file is empty. Choose another file.'; render(); return; }
  if(f.size>5*1048576){ ERR[k]='File is larger than 5 MB. Upload a smaller file.'; render(); return; }
  let id=k, rec={name:f.name,size:fsz(f.size),st:'up'};
  if(k==='new'){ id='x'+Date.now(); rec.id=id; rec.type=XT; I.extra.push(rec); XOPEN=false; } else I.docs[k]=rec;
  if(FILES[id]) URL.revokeObjectURL(FILES[id].u);
  FILES[id]={u:URL.createObjectURL(f),t:f.type||''};
  render();
  setTimeout(()=>{ rec.st='ok'; save(); render(); },700);
}
function preview(k){
  const u=FILES[k], n=k[0]==='x'?I.extra.find(x=>x.id===k):I.docs[k];
  if(!u||!n){ toast('Preview is only available for files uploaded in this session. Replace the file to preview it.'); return; }
  const img=/^image\//.test(u.t);
  modal(`<h4 style="margin:0 0 12px;font-size:16px;overflow-wrap:anywhere">${esc(n.name)}</h4>${img?`<img src="${u.u}" alt="Preview of ${esc(n.name)}" style="max-width:100%;display:block;margin:0 auto">`:`<iframe src="${u.u}" title="Preview of ${esc(n.name)}" style="width:100%;height:60vh;border:1px solid var(--line)"></iframe>`}<div class="in-actions" style="margin-top:12px"><span></span><div class="r"><button class="btn btn-primary btn-sm" onclick="IN.closeM()">Close</button></div></div>`);
}
const dz=k=>`<label class="inv-drop" for="inF-${k}" ondragover="event.preventDefault();this.classList.add('on')" ondragleave="this.classList.remove('on')" ondrop="event.preventDefault();this.classList.remove('on');IN.drop('${k}',event)"><input type="file" id="inF-${k}" accept=".pdf,.jpg,.jpeg,.png" onchange="IN.pick('${k}',event)"><span><b>Drag &amp; drop</b> a file here or <u>Browse files</u></span><small>PDF, JPG or PNG · up to 5 MB</small></label>`;
const frow=(k,f,lbl)=>`<div class="inv-file">${f.st==='up'?`<span class="inv-fn"><span class="in-load"></span>Uploading…<small>${esc(f.name)}</small></span>`:`<span class="inv-fn"><span class="inv-up">${ck(12)} Uploaded</span>${lbl?' · '+esc(lbl):''}<b>${esc(f.name)}</b><small>${esc(f.size)}</small></span><span class="inv-fa"><button class="btn btn-ghost btn-sm" onclick="IN.prev('${k}')">Preview</button><button class="btn btn-ghost btn-sm" onclick="document.getElementById('inF-${k}').click()">Replace</button><button class="btn btn-ghost btn-sm" onclick="IN.rm('${k}')">Remove</button><input type="file" id="inF-${k}" accept=".pdf,.jpg,.jpeg,.png" style="display:none" onchange="IN.pick('${k}',event)"></span>`}</div>`;
const errH=k=>ERR[k]?`<div class="in-err" role="alert" style="display:block">${esc(ERR[k])}</div>`:'';
function upCard(c){
  const f=I.docs[c.k], ok=okDoc(c.k);
  return `<div class="inv-doc${ok?' ok':''}${ERR[c.k]?' bad':''}"><div class="inv-doc-h"><b>${c.t}</b>${ok?`<span class="in-tag g">${ck(10)} Uploaded</span>`:isReq(c)?'<span class="in-tag y">Required</span>':'<span class="in-tag">Where applicable</span>'}</div><p class="sub2">${c.d}</p>${f?frow(c.k,f):dz(c.k)}${errH(c.k)}</div>`;
}
function extraBlock(){
  return (I.extra.length?`<div class="inv-extra">${I.extra.map(x=>frow(x.id,x,x.type)).join('')}</div>`:'')
   +(XOPEN?`<div class="inv-add"><div class="in-f"><label>Document type<i>Required</i></label><select onchange="IN.xt(this.value)">${XTYPES.map(t=>`<option${XT===t?' selected':''}>${t}</option>`).join('')}</select></div>${dz('new')}${errH('new')}<div><button class="btn btn-ghost btn-sm" onclick="IN.xopen(0)">Cancel</button></div></div>`:`<div style="margin-top:10px"><button class="btn btn-ghost btn-sm" onclick="IN.xopen(1)">+ Add another document</button></div>`);
}

/* ---------- step 4 sections: two-level verification ---------- */
const aPub=()=>isPub(I.d.aemail);
const repVerified=()=>repOk()&&okDoc('rep')&&(pubMail()?okDoc('reg'):I.em==='ok');
const authEmailOk=()=>!!I.d.aemail&&(aPub()?okDoc('aprf'):I.aem==='ok');
const authVerified=()=>authEmailOk()&&okDoc('auth');
const vList=l=>`<ul class="in-list">${l.map(x=>`<li>${dot(x[0],rowIc(x[0]))}${x[1]}</li>`).join('')}</ul>`;
const pill=v=>`<span class="in-vbadge${v?'':' p'}">${v?ck(12)+' Verified':CLKs+' Pending'}</span>`;
const PUBMSG=`<b>${BANGs} Public email detected.</b> Additional official document verification is required.`;
function roleSel(){
  return `<div class="in-f in-full" id="f-d-role" style="margin-top:10px"><label>Registration role<i>Required</i></label><div class="inv-roles" role="radiogroup" aria-label="Registration role">${REGR.map(r=>`<button type="button" class="inv-role${I.regRole===r?' on':''}" role="radio" aria-checked="${I.regRole===r}" data-v="${esc(r)}" onclick="IN.regRole(this.dataset.v)">${I.regRole===r?ck(12)+' ':''}${r}</button>`).join('')}</div><div class="in-err" id="roleErr" role="alert">Select your registration role.</div></div>`;
}
function repVCard(){
  const v=repVerified(), p=pubMail();
  return `<div class="in-card"><div class="inv-stat-h"><h4>Representative Verification</h4>${pill(v)}</div><p class="sub2">Verify the person registering.</p>`
   +(p?note(PUBMSG,'in-warn'):'')
   +vList([
     p?[okDoc('reg')?'ok':'warn',okDoc('reg')?'Public email accepted: official document uploaded':'Official email not available: upload registration proof']:I.em==='ok'?['ok','Official email verified']:['wait','Official email not verified yet'],
     [repOk()?'ok':'wait',repOk()?'Representative details submitted':'Representative details incomplete'],
     [okDoc('rep')?'ok':'wait',okDoc('rep')?'Institution / employee proof uploaded':'Institution / employee proof not uploaded']])
   +`<a href="#" class="inv-link" onclick="IN.go(2);return false">Edit representative details</a></div>`;
}
function authMail(){
  const e=I.aem, d=I.d;
  if(e==='ok') return note(`<b>${ck(13)} Authority email verified</b><br>${esc(d.aemail)}`,'in-ok');
  if(e==='sent') return note(`<b>Check the authority inbox</b><br>We sent a verification code to ${esc(d.aemail)}`)
   +`<div class="in-otp" id="aotp">${[0,1,2,3,4,5].map(i=>`<input maxlength="1" inputmode="numeric" aria-label="Digit ${i+1}" oninput="IN.otp(this,${i})" onkeydown="IN.otpKey(event,${i})">`).join('')}</div><div class="in-err" id="aotpErr" style="display:none"></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px"><button class="btn btn-ghost btn-sm" onclick="IN.aresend()">Resend code</button><button class="btn btn-primary btn-sm" onclick="IN.averify()">Verify email</button><span class="in-demo" style="margin:0">Demo: any 6 digits will work.</span></div>`;
  return `<p style="font-size:13px;color:var(--ink-soft);margin:0 0 8px">Verify the authority using their official institutional email.</p>`
   +(e==='sending'?'<button class="btn btn-primary btn-sm" disabled><span class="in-load" style="border-top-color:#fff"></span>Sending code…</button>':'<button class="btn btn-primary btn-sm" onclick="IN.asend()">Send Verification Code</button>');
}
function authVCard(){
  const d=I.d, p=aPub(), has=!!d.aemail, v=authVerified(), eo=authEmailOk(), dk=okDoc('auth');
  return `<div class="in-card"><div class="inv-stat-h"><h4>Institution Authority Verification</h4>${pill(v)}</div><p class="sub2">Verify the institution authority.</p>`
   +(has?kvs([['Authority',esc(d.aname)],['Designation',esc(d.adesig)],['Official institution email',esc(d.aemail)+(p?' <span class="in-tag y">Public email</span>':'')],['Phone',esc(d.aphone)]]):'')
   +(!has?note('Add the authority details in step 3 to start authority verification.','in-warn'):p?note(PUBMSG,'in-warn'):authMail())
   +vList([
     p?[eo?'ok':'warn',eo?'Authority official proof uploaded':'Authority email: official proof required']:[eo?'ok':'wait',eo?'Authority email verified':'Authority email not verified'],
     [dk?'ok':'wait',dk?'Authorization / official document uploaded':'Authorization / official document not uploaded'],
     [v?'ok':'wait',v?'Authority confirmed':'Authority confirmation pending']])
   +`<a href="#" class="inv-link" onclick="IN.go(2);return false">Edit authority details</a></div>`;
}
function docsCard(){
  return card('Verification documents','Upload clear PDF, JPG or PNG files, up to 5 MB each. You can submit now and upload any missing document later.',
   ((pubMail()||aPub())?note('<b>Stronger verification needed</b><br>A public email is in use, so all required documents must be uploaded.','in-warn'):'')
   +`<div class="inv-docs">${DOCR().map(upCard).join('')}</div>${extraBlock()}`);
}

/* ---------- verification status ---------- */
function vState(){ if(I.vs==='verified'&&repVerified()&&authVerified()) return 'verified'; if(I.vs==='changes'||missing().length) return 'info'; return 'pending'; }
function vRows(){
  const m=!missing().length, r=repVerified(), a=authVerified();
  return [
   [instOk()?'ok':'','Institution details'],
   [r?'ok':'wait',r?'Representative verified':'Representative verification pending'],
   [a?'ok':'wait',a?'Institution authority verified':'Institution authority verification pending'],
   [m?'ok':'warn',m?'Documents uploaded':'Documents missing']];
}
function missPanel(){
  const m=missing(); if(!m.length) return '';
  return note(`<b>Missing ${m.length===1?'document':'documents'}</b><br>Upload ${m.length===1?'it':'them'} here. You do not need to restart registration.`,'in-warn')
   +m.map(c=>`<div class="inv-miss"><span>${BANGd.replace('<svg','<svg class="inv-warn-ic"')} ${c.t}</span><span><input type="file" id="inM-${c.k}" accept=".pdf,.jpg,.jpeg,.png" style="display:none" onchange="IN.pick('${c.k}',event)"><button class="btn btn-ghost btn-sm" onclick="document.getElementById('inM-${c.k}').click()">Upload</button></span></div>${errH(c.k)}`).join('');
}
function vCard(){
  const s=vState(), L=s==='verified'?['ok',ck(11),'Verified Institution']:s==='info'?['warn',BANGd,'Additional information required']:['wait',CLKd,'Institution verification pending'];
  return `<div class="in-card"><div class="inv-stat-h"><h4>Institution Verification</h4>${vBadge()}</div>${vList(vRows())}<ul class="in-list"><li>${dot(L[0],L[1])}<b>${L[2]}</b></li></ul>${missPanel()}</div>`;
}
function vBanner(){
  const v=vState()==='verified', m=missing().length, ch=I.vs==='changes';
  const sub=v?'This institution has been reviewed and verified.':ch?'Additional information required. Open the Verification tab to update your documents.':m?`Additional information required: ${m} ${m===1?'document is':'documents are'} missing.`:!authVerified()?'Institution authority verification is pending.':!repVerified()?'Representative verification is pending.':'Your institution is awaiting admin review.';
  return `<div class="inv-ban ${v?'ok':'wait'}">${v?ck(16):CLKs}<div><b>${v?'Verified Institution':'Verification Pending'}</b><span>${sub}</span></div>${!v?'<button class="btn btn-ghost btn-sm" onclick="IN.sec(\'verify\')">Add information</button>':''}</div>`;
}
function authDashCard(){
  const d=I.d;
  return card('Institution Authority','Dean, Principal, Director, Registrar or other authorized head who can confirm this institution.',kvs([['Authority name',esc(d.aname)],['Designation',esc(d.adesig)],['Official institution email',d.aemail?esc(d.aemail)+(aPub()?' <span class="in-tag y">Public email</span>':I.aem==='ok'?' <span class="in-tag g">Verified</span>':''):''],['Phone',esc(d.aphone)]])+'<button class="btn btn-ghost btn-sm" onclick="IN.edit(2)">Edit</button>');
}

/* ---------- company profile (dashboard) ---------- */
function profileBody(){
  const d=I.d, pub=isPub(d.email);
  const addr=[d.address,d.area,d.city,d.state,d.pin].filter(Boolean).map(esc).join(', ');
  const ems=d.email?esc(d.email)+(I.em==='ok'?(pub?' <span class="in-tag y">Public email</span>':' <span class="in-tag g">Verified</span>'):''):'';
  const web=d.website?lnk(d.website)+(I.web?' <span class="in-tag g">Confirmed</span>':''):'';
  const ed=n=>`<button class="btn btn-ghost btn-sm" onclick="IN.edit(${n})">Edit</button>`;
  const camps=[{name:d.name||'Main campus',img:d.logo,loc:locStr(d),t:'Main campus'}].concat(I.branches.map(b=>({name:b.name,img:b.img,loc:locStr(b),t:b.type}))).map(b=>`<div class="in-camp"><div class="lft">${thumb(b)}<div><b>${esc(b.name)}</b><span>${esc(b.loc)||'Location not added'}${b.t?' · '+esc(b.t):''}</span></div></div></div>`).join('');
  const about=(d.about1||d.about2)?(d.about1?`<p style="margin:0 0 6px;font-weight:600;font-size:13.5px">${esc(d.about1)}</p>`:'')+(d.about2?`<p style="margin:0;font-size:13px;color:var(--ink-soft);line-height:1.6">${esc(d.about2)}</p>`:''):'<p style="margin:0;font-size:13px;color:var(--ink-faint)">No description added yet.</p>';
  return card('Institution details','',kvs([['Institution name',esc(d.name)],['Institution type',esc(d.type)],['Year established',esc(d.year)],['Official website',web],['Official email',ems],['Phone',esc(d.phone)],['University / board affiliation',esc(d.affil)],['Registration / recognition no.',esc(d.reg)],['Accreditation',esc(d.accred)],['Full address',addr,1]])+ed(0))
   +card('About institution','',about+'<div style="margin-top:10px">'+ed(0)+'</div>')
   +card('Person Registering / Institution Representative','This is the person creating and managing the institution account.',kvs([['Name',esc(d.rname)],['Designation',esc(d.rdes)],['Registration role',esc(I.regRole)],['Department',esc(d.rdep)],['Official email',remH()],['Phone',esc(d.rphone)],['Employee ID',esc(d.eid)]])+ed(2))
   +authDashCard()
   +card('Branches / campuses','',camps+`<button class="btn btn-ghost btn-sm" onclick="IN.sec('branches')">Manage campuses</button>`);
}

/* ---------- completion + badges ---------- */
function pct(){
  const d=I.d, ks=F0.concat(F1,F2).filter(f=>!f.sh||f.sh(d)).map(f=>f.k);
  const n=ks.filter(k=>d[k]).length+(d.logo?1:0)+(I.em==='ok'?1:0)+(anyDoc()?1:0)+(I.branches.length?1:0);
  return Math.min(100,Math.round(n/(ks.length+4)*100));
}
function vBadge(){
  if(vState()==='verified') return `<span class="in-vbadge">${ck(12)} Verified Institution</span>`;
  if(I.vs==='changes') return '<span class="in-vbadge r">Changes required</span>';
  return `<span class="in-vbadge p">${CLKs} Verification Pending</span>`;
}
const locStr=o=>[o.city,o.state].filter(Boolean).join(', ');
const thumb=(o,n)=>`<div class="in-thumb" style="width:52px;height:52px;overflow:hidden">${o.img?`<img src="${o.img}" alt="${esc(o.name)}" style="width:100%;height:100%;object-fit:cover">`:esc((o.name||n||'').slice(0,2).toUpperCase())}</div>`;
const logoBox=(s)=>`<div class="in-logo-box" style="width:${s}px;height:${s}px">${I.d.logo?`<img src="${I.d.logo}" alt="Institution logo">`:esc((I.d.short||I.d.name||'IN').slice(0,2).toUpperCase())}</div>`;

/* ---------- wizard ---------- */
function wiz(){
  const s=I.step;
  const steps=STEPS.map((t,i)=>`<button class="in-step${i===s?' on':i<=I.max?' done':''}" role="tab" aria-selected="${i===s}" onclick="IN.jump(${i})"><span class="in-step-n">${i+1}</span><span class="in-step-t">${t}</span></button>`).join('');
  const last=s===STEPS.length-1;
  return `<div class="in-wrap"><div class="in-head"><h3>${I.sub?'Edit your institution profile':'Create your institution profile'}</h3><p>Add your official institution details so candidates can identify and trust your organization.</p></div>
  <div class="in-layout">
    <aside class="in-side"><div class="in-steps" role="tablist" aria-orientation="vertical">${steps}</div>
      <div class="in-side-foot"><div class="in-bar"><div style="width:${pct()}%"></div></div><span>${pct()}% complete</span>
      <button class="btn btn-ghost btn-sm" onclick="IN.later()">Save and continue later</button></div></aside>
    <div class="in-main">
      ${welcome?note('<b>Welcome back.</b> Your saved progress is loaded. Carry on from where you stopped.','in-ok'):''}
      ${[s0,s1,s2,s3,s4,s5][s]()}
      <div class="in-actions"><span class="in-stepof">Step ${s+1} of ${STEPS.length}</span>
      <div class="r">${s>0?'<button class="btn btn-ghost btn-sm" onclick="IN.back()">Back</button>':''}<button class="btn btn-primary btn-sm" id="nextBtn" onclick="IN.next()">${last?(I.sub?'Save changes and resubmit':'Submit institution profile'):'Next'}</button></div></div>
      <div class="in-demo">Demo helper: <button onclick="IN.sample()">Fill with sample data</button><button onclick="IN.reset()">Start over</button></div>
    </div>
  </div></div>`;
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
   `<div class="in-map" id="locMap">${I.d.city?`<span>${PIN_IC} ${esc(locStr(I.d))}</span>`:'<span>Map preview appears once you add a location</span>'}<button class="btn btn-ghost btn-sm" onclick="IN.focusPin()">Change location</button></div>`);
}
function s2(){
  return card('Person Registering / Institution Representative','Your details as the person registering this institution.',grid(F2.concat(EIDF),'d')+roleSel()+note('This is the person creating and managing the institution account.'))
  + card('Institution Authority','Provide the details of the Dean, Principal, Director, Registrar, or other authorized head who can confirm this institution and your authority to represent it.',grid(F2A,'d')+note('Use an official email on the institution domain where possible.'))
  + card('Email verification','Verify the official institution email you entered in step 1.',emailInner());
}
function emailInner(){
  const e=I.em, d=I.d;
  if(e==='ok') return isPub(d.email)?note(`<b>${BANGs} Public email detected — additional verification required</b><br>${esc(d.email)}<br>This email is accepted. Upload the documents below to complete verification.`,'in-warn'):note(`<b>${ck(13)} Official email verified</b><br>${esc(d.email)}`,'in-ok');
  if(e==='sent') return note(`<b>Check your email</b><br>We sent a verification code to ${esc(d.email)}`)+
   `<div class="in-otp">${[0,1,2,3,4,5].map(i=>`<input maxlength="1" inputmode="numeric" aria-label="Digit ${i+1}" oninput="IN.otp(this,${i})" onkeydown="IN.otpKey(event,${i})">`).join('')}</div>
   <div class="in-err" id="otpErr" style="display:none"></div>
   <div class="in-actions"><span class="in-demo">Demo: any 6 digits will work.</span><div class="r"><button class="btn btn-ghost btn-sm" onclick="IN.resend()">Resend code</button><button class="btn btn-primary btn-sm" onclick="IN.verify()">Verify email</button></div></div>`;
  return `<div class="in-grid">${fld(EMAILF,'d')}</div>
   ${e==='sending'?'<button class="btn btn-primary btn-sm" disabled><span class="in-load" style="border-top-color:#fff"></span>Sending code…</button>':'<button class="btn btn-primary btn-sm" onclick="IN.send()">Send verification code</button>'}
   <p style="font-size:13px;color:var(--ink-soft);margin:12px 0 0">Don't have an official institution email? <a href="#" onclick="IN.go(3);return false" style="color:var(--blue-700);font-weight:600">Choose another verification method</a></p>`;
}
function s3(){
  return card('Verify your institution','Provide official information that helps us confirm that this institution exists and that you are authorized to represent it.',`<div class="in-methods">
  <div class="in-method rec"><h5>Official institution email <span class="in-tag g">Recommended</span>${I.em==='ok'?(isPub(I.d.email)?'<span class="in-tag y">Public email</span>':'<span class="in-tag g">Verified</span>'):''}</h5><p class="sub2">Verify using your institution's official email address.</p>${emailInner()}</div>
  <div class="in-method"><h5>Official website${I.web?'<span class="in-tag g">Confirmed</span>':''}</h5><p class="sub2">Confirm the institution's official website.</p><div class="in-grid">${fld(WEBF,'d')}</div>
   ${note('Your website should clearly represent the same institution name.')}<button class="btn btn-ghost btn-sm" onclick="IN.web()">Confirm website</button></div>
</div>`)
  + repVCard() + authVCard() + docsCard() + vCard()
  + card('Your connection with this institution','Are you authorized to create and manage this institution profile?',`
   <label class="in-radio"><input type="radio" name="auth"${I.auth==='self'?' checked':''} onchange="IN.auth('self')"> Yes, I am authorized to represent this institution</label>
   <label class="in-radio"><input type="radio" name="auth"${I.auth==='behalf'?' checked':''} onchange="IN.auth('behalf')"> I am creating this profile on behalf of the institution</label>
   ${I.auth==='behalf'?`<div class="in-grid"><div class="in-f"><label>Relationship / role<i>Required</i></label><select onchange="IN.role(this.value)"><option value="">Select</option>${ROLES.map(x=>`<option${I.role===x?' selected':''}>${x}</option>`).join('')}</select></div></div>`:''}
   ${note('Only create a profile for an institution you are authorized to represent.','in-warn')}
   <label class="in-check"><input type="checkbox"${I.c1?' checked':''} onchange="IN.c1(this.checked)"> I confirm that the information provided is accurate and that I am authorized to represent this institution.</label>
   <div class="in-note in-bad" id="vErr" style="display:none"></div>`);
}
function s4(){ return branchMgr(); }
function s5(){
  const d=I.d, r=(l,v)=>`${l}: ${esc(v)||'—'}<br>`;
  const S=[
   ['Institution details',0,`<b>${esc(d.name)}</b><br>${r('Type',d.type)}${r('Website',d.website)}${r('Email',d.email)}${r('Phone',d.phone)}`],
   ['Location',1,`${esc(locStr(d))}<br>${r('PIN code',d.pin)}${r('Area',d.area)}${r('Address',d.address)}`],
   ['Representative details',2,`<b>${esc(d.rname)}</b><br>${esc(d.rdes)}${d.rdep?', '+esc(d.rdep):''}<br>${esc(d.remail)}<br>${r('Registration role',I.regRole)}${I.em==='ok'?ck(12)+' Email verified':'Email not verified yet'}`],
   ['Institution authority',2,`<b>${esc(d.aname)||'—'}</b><br>${esc(d.adesig)}<br>${esc(d.aemail)}`],
   ['Verification',3,`${I.em==='ok'?ck(12)+' Official email verified':'Official email not verified'}<br>${I.aem==='ok'?ck(12)+' Authority email verified':aPub()?'Authority uses a public email, official document required':'Authority email not verified'}<br>${docsLine()}<br>Review pending after submission`],
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
  const d=I.d, ok=anyDoc();
  if(vState()==='verified') return `<div class="in-status"><div class="big" style="background:var(--green)">${ck(26)}</div><h3 style="margin:0 0 4px">Verified institution</h3><p style="font-size:18px;font-weight:700;color:var(--blue-900);margin:0 0 6px">${esc((d.name||'').toUpperCase())}</p>${vBadge()}</div>
   <ul class="in-list">${vRows().map(x=>`<li>${dot(x[0],rowIc(x[0]))}${x[1]}</li>`).join('')}</ul>`;
  if(I.vs==='changes') return `<div class="in-status"><div class="big" style="background:#B3261E">${BANG}</div><h3 style="margin:0 0 6px">Additional information required</h3><p style="color:var(--ink-soft);margin:0">We need some additional information before we can complete your institution verification.</p></div>
   ${note('<b>Reason</b><br>The uploaded document does not clearly match the institution name.','in-bad')}
   ${missPanel()}
   <div class="in-actions" style="justify-content:flex-start"><button class="btn btn-primary btn-sm" onclick="IN.edit(0)">Update information</button><button class="btn btn-ghost btn-sm" onclick="IN.edit(3)">Replace document</button></div>
   <p class="sub2" style="margin-top:12px">Your profile information has not been deleted. You can update the required details and resubmit.</p>`;
  const m=missing().length;
  return `<div class="in-status"><div class="big" style="background:${m?'#B3261E':'#C77700'}">${m?BANG:CLK}</div><h3 style="margin:0 0 6px">${m?'Additional information required':'Verification pending'}</h3><p style="color:var(--ink-soft);margin:0">${m?'Your institution profile has been submitted. Upload the missing documents below to continue the review.':'Your institution profile has been submitted for review.'}</p></div>
   <ul class="in-list">${vRows().map(x=>`<li>${dot(x[0],rowIc(x[0]))}${x[1]}</li>`).join('')}<li>${dot('wait',CLKd)}Admin review pending</li></ul>
   ${missPanel()}${m?'':note('We\'ll show your institution as verified after the submitted information has been reviewed.')}`;
}
const demoBar=()=>`<div class="in-demo">Demo: preview a state <button onclick="IN.vs('pending')">Pending</button><button onclick="IN.vs('verified')">Verified</button><button onclick="IN.vs('changes')">Changes required</button></div>`;
function statusPage(){
  return `<div class="in-wrap"><div class="in-head"><h3>Institution verification</h3></div><div class="in-card">${statusBody()}<div class="in-actions" style="justify-content:flex-end"><button class="btn btn-primary btn-sm" onclick="IN.dash()">Go to dashboard</button></div></div>${demoBar()}</div>`;
}
const rows=p=>`<div class="in-grid">${p.map(x=>`<div class="in-f"><label>${x[0]}</label><div style="font-size:14px">${esc(x[1])||'—'}</div></div>`).join('')}</div>`;
function dash(){
  const d=I.d, p=pct(), sc=I.sec;
  const nav=[['profile','Institution profile'],['branches','Branches & campuses'],['verify','Verification'],['rep','Representative & authority'],['jobs','Posted jobs']].map(x=>`<button class="${sc===x[0]?'on':''}" onclick="IN.sec('${x[0]}')">${x[1]}</button>`).join('');
  let body='';
  if(sc==='profile') body=profileBody();
  if(sc==='branches') body=branchMgr();
  if(sc==='verify') body=`<div class="in-card">${statusBody()}</div>${repVCard()}${authVCard()}${docsCard()}${demoBar()}`;
  if(sc==='rep') body=card('Person Registering / Institution Representative','The person responsible for managing this institution profile.',rows([['Name',d.rname],['Designation',d.rdes],['Registration role',I.regRole],['Department',d.rdep],['Employee ID',d.eid],['Work email',d.remail+(I.em==='ok'?' (verified)':'')],['Work phone',d.rphone],['Connection',I.auth==='behalf'?'On behalf: '+I.role:'Authorized to represent']])+`<button class="btn btn-ghost btn-sm" onclick="IN.edit(2)">Edit details</button>`)+authDashCard();
  if(sc==='jobs'){ const n=typeof postedJobs!=='undefined'?Object.keys(postedJobs).length:0;
    body=card('Posted jobs',n?`${n} ${n===1?'job':'jobs'} posted from this institution.`:'',n?'<button class="btn btn-primary btn-sm" onclick="IN.tab(\'myjobs\')">View posted jobs</button> <button class="btn btn-ghost btn-sm" onclick="IN.tab(\'post\')">Post another job</button>':'<div class="empty-state"><h4>No jobs posted yet</h4><p>Post your first faculty opening and choose which campus it belongs to.</p></div><button class="btn btn-primary btn-sm" onclick="IN.tab(\'post\')">Post a job</button>'); }
  return `<div class="in-wrap">${vBanner()}<div class="in-card"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">${logoBox(64)}<div style="flex:1;min-width:200px"><h3 style="margin:0;font-size:20px;color:var(--blue-900)">${esc((d.name||'').toUpperCase())}</h3><div style="margin:5px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center">${vBadge()}${d.type?`<span class="in-tag">${esc(d.type)}</span>`:''}</div><span style="font-size:13px;color:var(--ink-soft)">${PIN_IC} ${esc(locStr(d))}</span></div></div>
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
  try{ if(typeof updateNavForLogin==='function') updateNavForLogin(); if(document.getElementById('miniPanel')&&typeof refreshMiniProfile==='function') refreshMiniProfile(); }catch(e){}
}
window.instHeader=instHeader;
function render(){ const r=$('instRoot'); if(!r) return; const y=window.scrollY; r.style.minHeight=r.offsetHeight+'px'; r.innerHTML=I.view==='wizard'?wiz():I.view==='status'?statusPage():dash(); instHeader(); window.scrollTo(0,y); r.style.minHeight=''; }
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
  loc(sc,k,v){ const S=sc==='d'?I.d:BR, i=LORD.indexOf(k); S[k]=v; LORD.slice(i+1).forEach(x=>{ S[x]=''; });
    if(k==='area'){ const p=lookupPin(S); if(p) S.pin=p; } else S.pin='';
    const f=$('f-'+sc+'-'+k); if(f) f.classList.remove('err');
    save(); locRefresh(sc,k==='country'?0:i+1); mapRefresh(sc); const b=$('pin-'+sc); if(b) b.innerHTML=''; },
  set(sc,k,v,re){ (sc==='d'?I.d:BR)[k]=v; if(sc==='d'&&k==='aemail'&&I.aem!=='idle') I.aem='idle'; const f=$('f-'+sc+'-'+k); if(f) f.classList.remove('err'); if(k==='pin') pinLook(sc,v.trim()); if(re&&sc==='d'&&k==='type'){ save(); render(); } else if(sc==='d') save(); },
  blur(sc,k){ const o=ALLF.find(f=>f.k===k&&(sc==='b'?FB.includes(f):!FB.includes(f))); if(o) mark(sc,o,chk(o,(sc==='d'?I.d:BR)[k])); },
  jump(i){ if(i<=I.max||i<I.step){ I.step=i; welcome=false; save(); render(); top(); } },
  go(i){ I.step=i; I.max=Math.max(I.max,i); welcome=false; I.view='wizard'; save(); render(); top(); },
  back(){ I.step=Math.max(0,I.step-1); welcome=false; save(); render(); top(); },
  edit(i){ I.view='wizard'; I.step=i; I.max=5; welcome=false; save(); render(); top(); },
  later(){ save(); toast('Progress saved. You can continue later.'); },
  focusPin(){ const el=document.querySelector('#f-d-pin input'); if(el){ el.focus(); el.select(); } },
  next(){
    const s=I.step; let ok=true;
    if(s===0) ok=valid(F0,'d'); else if(s===1) ok=valid(F1,'d'); else if(s===2){ ok=valid(F2.concat(F2A),'d'); if(ok&&!I.regRole){ const e=$('roleErr'); e.style.display='block'; e.scrollIntoView({block:'center'}); ok=false; } }
    else if(s===3){
      const e=$('vErr'); let m='';
      if(!I.regRole) m='Select who is registering this institution.';
      else if(I.em!=='ok'&&!anyDoc()) m='Complete at least one verification method: verify your official email or upload an official document.';
      else if((pubMail()||aPub())&&missing().length) m='Public email detected: upload '+missing().map(c=>c.t).join(', ')+' to continue.';
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
    er.textContent=''; const inp=e.target;
    if(window.LogoCrop){ LogoCrop.open(f,url=>{ I.d.logo=url; save(); render(); toast('Logo updated'); }); }
    else { const r=new FileReader(); r.onload=x=>{ I.d.logo=x.target.result; save(); render(); toast('Logo updated'); }; r.readAsDataURL(f); }
    inp.value=''; },
  setLogo(url){ I.d.logo=url||''; save(); render(); },
  rmLogo(){ I.d.logo=''; save(); render(); },
  send(){ const m=chk(EMAILF,I.d.email); mark('d',EMAILF,m); if(m) return; I.em='sending'; render(); setTimeout(()=>{ I.em='sent'; save(); render(); },900); },
  resend(){ toast('A new code was sent to '+I.d.email); },
  otp(el,i){ el.value=el.value.replace(/\D/g,''); if(el.value&&el.nextElementSibling) el.nextElementSibling.focus(); },
  otpKey(ev,i){ if(ev.key==='Backspace'&&!ev.target.value&&ev.target.previousElementSibling) ev.target.previousElementSibling.focus(); },
  verify(){ const c=[...document.querySelectorAll('.in-otp input')].map(x=>x.value).join(''), e=$('otpErr');
    if(!/^\d{6}$/.test(c)){ e.textContent='Enter the 6-digit code we sent to your email.'; e.style.display='block'; return; }
    I.em='ok'; save(); render(); toast('Official email verified'); },
  web(){ const m=chk(WEBF,I.d.website); mark('d',WEBF,m); if(m) return; I.web=true; save(); render(); toast('Website confirmed'); },
  regRole(v){ I.regRole=v; save(); render(); },
  pick(k,e){ const f=e.target.files[0]; e.target.value=''; if(f) upload(k,f); },
  drop(k,e){ const f=e.dataTransfer&&e.dataTransfer.files[0]; if(f) upload(k,f); },
  prev(k){ preview(k); },
  rm(k){ if(k[0]==='x') I.extra=I.extra.filter(x=>x.id!==k); else delete I.docs[k]; delete FILES[k]; delete ERR[k]; save(); render(); },
  xopen(v){ XOPEN=!!v; delete ERR['new']; render(); },
  xt(v){ XT=v; },
  asend(){ const m=chk({req:1,v:'email'},I.d.aemail); if(m){ toast(m); return; } I.aem='sending'; render(); setTimeout(()=>{ I.aem='sent'; save(); render(); },900); },
  aresend(){ toast('A new code was sent to '+I.d.aemail); },
  averify(){ const c=[...document.querySelectorAll('#aotp input')].map(x=>x.value).join(''), e=$('aotpErr');
    if(!/^\d{6}$/.test(c)){ e.textContent='Enter the 6-digit code sent to the authority email.'; e.style.display='block'; return; }
    I.aem='ok'; save(); render(); toast('Authority email verified'); },
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
    I.em='ok'; I.web=true; I.d.eid='UU-2041'; I.regRole='Placement'; Object.assign(I.d,{aname:'Dr R Krishna Rao',adesig:'Principal',aemail:'principal@upaadhyay.edu.in',aphone:'9876500001'}); I.aem='ok'; I.docs={reg:{name:'registration-certificate.pdf',size:'1.2 MB',st:'ok'},rep:{name:'staff-id-card.png',size:'480 KB',st:'ok'},auth:{name:'authorization-letter.pdf',size:'320 KB',st:'ok'},aprf:{name:'principal-appointment.pdf',size:'610 KB',st:'ok'}}; I.auth='self'; I.c1=true; I.max=5; save(); render(); toast('Sample data loaded'); },
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
  const v=I.sub&&vState()==='verified';
  const c=j.campus?`<span style="font-size:12.5px;color:var(--ink-soft)">${PIN_IC} ${esc(j.campus)}${j.campusLoc?', '+esc(j.campusLoc):''}</span>`:'';
  return (v||c)?`<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px">${v?`<span class="in-vbadge">${ck(12)} Verified Institution</span>`:''}${c}</div>`:'';
};
window.instJobHeader=function(j){
  const n=(I.d.name||(typeof currentCompany!=='undefined'&&currentCompany.name)||'').toUpperCase();
  return `<div style="font-weight:700;color:var(--blue-900);letter-spacing:.02em">${esc(n)}</div>${instJobMeta(j)}${j.campus==='All Campuses'?'<p style="font-size:12.5px;color:var(--ink-soft);margin:4px 0 0">This job is available across all listed campuses.</p>':''}`;
};
document.addEventListener('DOMContentLoaded',function(){ if(I.d.name||I.d.logo) instHeader(); });
})();
