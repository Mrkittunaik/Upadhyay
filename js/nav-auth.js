/* Shared nav switcher. Works with YOUR existing nav:
   add data-show="guest" | "user" | "main" | "branch" on the nav links/buttons.
   Guest sees: Home, For Faculty, For Employers, Browse jobs, How it works, Log in, Register free
   Logged in:  Home, Dashboard, Post a job (+ Branches for main only), Browse jobs, Profile, Log out
   Removed on login: How it works, Log in, Register free, For Faculty */
function getSession(){try{return JSON.parse(localStorage.getItem('upaadhyay_session'))}catch(e){return null}}
function updateNav(){
  var s=getSession();
  document.querySelectorAll('[data-show]').forEach(function(el){
    var w=el.getAttribute('data-show').split(' ');
    var visible=!s ? w.indexOf('guest')>-1
                   : (w.indexOf('user')>-1 || w.indexOf(s.role)>-1);
    el.hidden=!visible;
  });
}
function logout(){try{localStorage.removeItem('upaadhyay_session')}catch(e){} updateNav(); location.href='/';}
document.addEventListener('DOMContentLoaded',updateNav);
/* Example markup for your existing nav:
<nav>
  <a href="/">Home</a>
  <a data-show="guest" href="/faculty">For Faculty</a>
  <a data-show="guest" href="/employers">For Employers</a>
  <a data-show="user" href="/dashboard">Dashboard</a>
  <a data-show="user" href="/post-job">Post a job</a>
  <a data-show="main" href="/branches">Branches</a>
  <a href="/jobs">Browse jobs by type</a>
  <a data-show="guest" href="/how-it-works">How it works</a>
  <a data-show="guest" href="/login">Log in</a>
  <a data-show="guest" href="/register">Register free</a>
  <a data-show="user" href="/profile">Profile</a>
  <button data-show="user" onclick="logout()">Log out</button>
</nav>
*/
