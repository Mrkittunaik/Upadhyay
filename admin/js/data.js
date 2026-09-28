// admin/js/data.js — demo dataset for the admin panel (standalone, no dependency on the public site)
  const facultyProfiles = {
    priya: {
      avatar:'https://i.pravatar.cc/160?img=47', name:'Dr. Priya Menon', role:'Physics · Quantum Optics',
      tags:['PhD','8 yrs experience','Hyderabad'], college:'IIT Bombay',
      about:'Quantum optics researcher and educator with 8 years of university teaching experience. Focused on making advanced physics accessible through lab-first, project-based instruction. Open to full-time faculty and visiting research positions.',
      skills:['Quantum Optics','Photonics','Research Supervision','Curriculum Design','MATLAB','LaTeX'],
      education:[
        ['PhD, Physics','IIT Bombay · 2011 – 2015'],
        ['MSc, Physics','University of Hyderabad · 2009 – 2011']
      ],
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
      ],
      interests:{
        departments:['Physics','Applied Sciences'],
        designations:['Associate Professor','Professor'],
        subjects:['Quantum Mechanics','Photonics','Electrodynamics'],
        orgType:'University / Higher Education',
        location:'Hyderabad, Vijayawada',
        employmentType:'Full-time'
      },
      salary:{ presentCtc:1200000, expectedCtc:1600000, minAcceptable:1400000 }
    },
    rohit:{
      avatar:'https://i.pravatar.cc/160?img=12', name:'Rohit Sharma', role:'Commerce · Accountancy',
      tags:['PG','5 yrs experience','Chennai'], college:'Loyola College',
      about:'Commerce lecturer specializing in accountancy for junior college boards. 5 years of classroom experience with a strong track record of board-exam results and student mentorship.',
      skills:['Financial Accounting','Taxation Basics','Board Exam Prep','Mentoring','Tally','MS Excel'],
      education:[
        ['PG, Commerce','Loyola College · 2018 – 2020'],
        ['BCom','Madras Christian College · 2015 – 2018']
      ],
      stats:[['5','Yrs experience'],['2','Boards taught'],['120+','Students mentored']],
      experience:[
        ['Senior Lecturer, Commerce','Narayana Junior College · 2021 – Present'],
        ['Lecturer, Commerce','Sri Chaitanya College · 2019 – 2021']
      ],
      links:[
        ['PG Degree Certificate.pdf','doc'],
        ['Resume / CV.pdf','doc'],
        ['Experience letter — Sri Chaitanya.pdf','doc']
      ],
      interests:{
        departments:['Commerce','Management'],
        designations:['Senior Lecturer','HOD'],
        subjects:['Financial Accounting','Taxation','Business Studies'],
        orgType:'Junior College',
        location:'Chennai',
        employmentType:'Full-time'
      },
      salary:{ presentCtc:480000, expectedCtc:600000, minAcceptable:550000 }
    },
    anjali:{
      avatar:'https://i.pravatar.cc/160?img=32', name:'Dr. Anjali Kulkarni', role:'Computer Science · AI/ML',
      tags:['PhD','11 yrs experience','Vijayawada'], college:'IIT Bombay',
      about:'AI/ML researcher and professor with 11 years of experience across academia and applied research, including 3 patents and multiple funded projects. Passionate about mentoring students into research careers.',
      skills:['Machine Learning','Deep Learning','Python','TensorFlow','Research Mentorship','Grant Writing'],
      education:[
        ['PhD, Computer Science','IIT Bombay · 2010 – 2014'],
        ['MTech, Computer Science','VIT Vellore · 2008 – 2010']
      ],
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
      ],
      interests:{
        departments:['Computer Science','Artificial Intelligence'],
        designations:['Professor','HOD'],
        subjects:['Machine Learning','Deep Learning','Data Structures'],
        orgType:'University / Higher Education',
        location:'Vijayawada, Hyderabad',
        employmentType:'Full-time'
      },
      salary:{ presentCtc:1800000, expectedCtc:2400000, minAcceptable:2100000 }
    }
  };

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

// ---- READ-ONLY bridge to jobs posted by employers on the public site ----
// Demo-only: both apps are same-origin so they share localStorage. Admin never writes
// to the public store and never reads its login/session fields. When a real backend
// exists, replace this with an API call like GET /api/admin/jobs.
const PUBLIC_STORE_KEY = "upadyay_state_v1";
function readPostedJobs(){
  try { return JSON.parse(localStorage.getItem(PUBLIC_STORE_KEY) || "{}").postedJobs || {}; }
  catch(e){ return {}; }
}
