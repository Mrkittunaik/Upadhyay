/* site-pages.js — shared data + helpers for For Faculty / For Employers / How It Works / job pages */
const SP_CATS = {
 'professor':['Professor','Senior academic positions at universities and degree colleges.'],
 'associate-professor':['Associate Professor','Mid-career academic roles with research and teaching responsibilities.'],
 'assistant-professor':['Assistant Professor','Entry-level academic positions at colleges and universities.'],
 'lecturer':['Lecturer','Teaching positions across colleges and junior colleges.'],
 'research':['Research Professor','Research-led faculty roles in funded labs and institutes.'],
 'research-associate':['Research Associate','Project-based research positions with leading institutes.'],
 'postdoctoral':['Postdoctoral','Postdoctoral fellowships and research appointments.'],
 'non-teaching':['Non-Teaching','Academic support and administrative roles.'],
 'academic-coordinator':['Academic Coordinator','Coordinate curriculum, schedules and academic operations.'],
 'lab-staff':['Lab Staff','Lab technicians, instructors and instrumentation staff.'],
 'administration':['Administration','Administrative and office roles in education institutions.']
};
const SP_INST=['Kakatiya Institute of Technology','Deccan Public School','National Research Institute','Osmania Degree College','Greenfield University','Sri Vidya Junior College'];
const SP_CITY=['Hyderabad','Warangal','Bengaluru','Chennai','Pune','Delhi'];
const SP_JOBS = (function(){
  const subj=['Computer Science','Physics','Commerce','Chemistry','Mathematics','Biotechnology'];
  const out=[]; let id=1;
  Object.keys(SP_CATS).forEach(function(c,ci){
    for(let k=0;k<3;k++){
      out.push({id:id++,cat:c,title:SP_CATS[c][0]+' — '+subj[(ci+k)%6],inst:SP_INST[(ci+k)%6],loc:SP_CITY[(ci*2+k)%6],
        subj:subj[(ci+k)%6],qual:/professor|research|postdoc/.test(c)?'Ph.D.':(c==='lecturer'?'M.Sc / M.Tech + NET':'Graduate / Post-graduate'),
        exp:(k+1)*2+ci%3,type:k===2?'Contract':'Full-time',sal:'₹'+(30+ci*4+k*6)+'k – ₹'+(45+ci*5+k*8)+'k / month'});
    }
  }); return out;
})();
function spBoot(active){ mountNav(active); mountChrome(); }
function spJobCard(j){
  return '<a class="sp-card sp-job" href="'+PAGES.jobView+'?id='+j.id+'"><h3>'+j.title+'</h3><p>'+j.inst+'</p><div class="sp-meta"><span>'+j.loc+'</span><span>'+j.type+'</span><span>'+j.exp+'+ yrs</span><span>'+j.qual+'</span></div><div class="sp-meta"><b style="color:var(--ok)">'+j.sal+'</b></div></a>';
}
function spHead(title,t,d){document.title=title+' — Upadyay';}
