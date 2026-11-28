// particles
const p=document.getElementById('particles');
if(p){
  for(let i=0;i<40;i++){
    const s=document.createElement('span');
    s.style.left=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*6+'s';
    s.style.animationDuration=(4+Math.random()*4)+'s';
    p.appendChild(s);
  }
}

// splash hide
const splash=document.getElementById('splash');
if(splash){
  window.addEventListener('load',()=>{
    setTimeout(()=>{splash.classList.add('hide')},3600);
  });
}

function scrollToId(id){const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth'});}
function focusBatches(){const el=document.getElementById('batches'); if(el){ el.scrollIntoView({behavior:'smooth'}); el.classList.add('batch-focus'); setTimeout(()=>el.classList.remove('batch-focus'),4000);} }

// menu
function toggleMenu(){
  document.getElementById('hamburger')?.classList.toggle('open');
  document.getElementById('sideMenu')?.classList.toggle('open');
  document.getElementById('overlay')?.classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger')?.classList.remove('open');
  document.getElementById('sideMenu')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
}
function toggleSub(el){
  el.classList.toggle('open');
  const sub=el.nextElementSibling;
  if(sub) sub.classList.toggle('open');
}

// admission -> direct send (FormSubmit)
function submitAdmission(e){
  if(e) e.preventDefault();
  const name=document.getElementById('sName')?.value.trim()||'';
  const cls=document.getElementById('sClass')?.value||'';
  const school=document.getElementById('sSchool')?.value.trim()||'';
  const fname=document.getElementById('fName')?.value.trim()||'';
  const femail=document.getElementById('fEmail')?.value.trim()||'';
  const mobile=document.getElementById('sMobile')?.value.trim()||'';
  const btn=document.querySelector('#admissionForm button[type="submit"]');
  if(btn){btn.disabled=true;btn.textContent='Sending...';}
  const payload={
    _subject:'New Admission - Digital Pathshala',
    'Student Name':name,
    'Class':cls,
    'School Name':school,
    "Father's Name":fname,
    "Father's Email":femail,
    'Mobile No.':mobile
  };
  fetch('https://formsubmit.co/ajax/rachitshukla555@gmail.com',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(payload)
  }).then(r=>r.json()).then(data=>{
    showToast('Admission details sent successfully!');
    const f=document.getElementById('admissionForm'); if(f) f.reset();
  }).catch(err=>{
    showToast('Failed to send. Please try again.');
  }).finally(()=>{
    if(btn){btn.disabled=false;btn.textContent='Submit';}
  });
}

// pay fee
const UPI_ID='digitalpathshala@upi';
function initPay(){
  const amt=document.getElementById('payAmount')?.value;
  if(!amt || Number(amt)<=0){showToast('Please enter a valid amount');return;}
  document.getElementById('payAmtShow').textContent=amt;
  document.getElementById('upiId').textContent=UPI_ID;
  const link=`upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Digital Pathshala')}&am=${amt}&cu=INR`;
  const upiLink=document.getElementById('upiLink');
  if(upiLink) upiLink.href=link;
  const qrBox=document.getElementById('qrBox');
  if(qrBox){
    qrBox.innerHTML='<img alt="UPI QR" src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='+encodeURIComponent(link)+'" style="width:160px;height:160px;border-radius:6px" onerror="this.style.display=\'none\';this.parentNode.textContent=\'QR not available offline\'" />';
  }
  const po=document.getElementById('payOptions');
  if(po) po.style.display='block';
  showToast('Payment options ready');
}

function showToast(t){
  const el=document.getElementById('toast');
  if(!el) return;
  el.textContent=t;el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2600);
}

// reveal on scroll
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// tap pop effect on clickable cards
document.querySelectorAll('.card,.batch-card').forEach(el=>{
  el.addEventListener('click',()=>{el.classList.remove('tap-pop');void el.offsetWidth;el.classList.add('tap-pop');});
});

// welcome popup (only on first open of home, once per session)
const isHome=/index\.html$/.test(location.pathname)||location.pathname.endsWith('/')||location.pathname==='';
if(isHome && !sessionStorage.getItem('welcomed')){
  sessionStorage.setItem('welcomed','1');
  setTimeout(()=>{
  const pop=document.createElement('div');
  pop.id='welcomePop';
  pop.style.cssText='position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78);backdrop-filter:blur(6px);opacity:0;transition:opacity .4s ease';
  pop.innerHTML=`
    <div style="background:linear-gradient(160deg,#1f0004,#0a0a0a);border:1px solid rgba(37,99,235,.5);border-radius:20px;padding:40px 32px;max-width:460px;text-align:center;box-shadow:0 0 60px rgba(37,99,235,.25),0 20px 60px rgba(0,0,0,.6);transform:scale(.7);opacity:0;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s ease">
      <div style="font-family:Montserrat,sans-serif;font-size:1.6rem;font-weight:900;color:#2563eb;margin-bottom:6px;text-shadow:0 0 24px rgba(37,99,235,.6)">Digital Pathshala</div>
      <div style="width:60px;height:3px;background:#2563eb;margin:10px auto 18px;border-radius:2px;box-shadow:0 0 12px rgba(37,99,235,.6)"></div>
      <p style="color:#f5f5f5;font-size:1.1rem;line-height:1.7;margin-bottom:22px">Mr. Shrestha Tiwari <span style="color:#2563eb;font-weight:700">welcomes you</span>.<br/>Join with us and <span style="color:#2563eb;font-weight:700">make your kids future</span>.</p>
      <button id="popClose" style="background:#2563eb;color:#fff;border:none;padding:11px 30px;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:1rem;transition:transform .2s,box-shadow .2s;box-shadow:0 8px 24px rgba(37,99,235,.4)">OK</button>
    </div>`;
  document.body.appendChild(pop);
  requestAnimationFrame(()=>{pop.style.opacity='1';const box=pop.querySelector('div');box.style.transform='scale(1)';box.style.opacity='1';});
  const close=()=>{pop.style.opacity='0';const box=pop.querySelector('div');box.style.transform='scale(.85)';box.style.opacity='0';setTimeout(()=>{pop.remove();focusBatches();},350);};
  document.getElementById('popClose').onclick=close;
  pop.onclick=(e)=>{if(e.target===pop)close();};
  setTimeout(close,7000);
},4500);
}

// Back to top + floating call button (all pages)
(function(){
  const bt=document.createElement('button');
  bt.id='backTop';bt.innerHTML='↑';bt.title='Back to top';
  bt.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.body.appendChild(bt);
  const fc=document.createElement('a');
  fc.id='floatCall';fc.href='tel:+919134441444';fc.title='Call us';fc.innerHTML='📞';
  document.body.appendChild(fc);
  window.addEventListener('scroll',()=>{
    if(window.scrollY>300) bt.classList.add('show'); else bt.classList.remove('show');
  });
})();

// Newsletter subscribe (FormSubmit)
function subscribeNews(){
  const email=document.getElementById('newsEmail')?.value.trim();
  if(!email){showToast('Please enter email');return;}
  fetch('https://formsubmit.co/ajax/rachitshukla555@gmail.com',{
    method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({_subject:'Newsletter Subscription',Email:email})
  }).then(r=>r.json()).then(()=>{showToast('Subscribed!');document.getElementById('newsEmail').value='';})
  .catch(()=>showToast('Failed. Try again.'));
}

// Animated counters for hero stats
(function(){
  const nums=document.querySelectorAll('.hero-stats .num');
  const animate=()=>{
    nums.forEach(el=>{
      const target=el.textContent;
      const num=parseFloat(target.replace(/[^0-9.]/g,''));
      if(isNaN(num)) return;
      let cur=0;const steps=30;const inc=num/steps;
      const t=setInterval(()=>{cur+=inc;if(cur>=num){cur=num;clearInterval(t);}
        el.textContent=target.replace(/[0-9.]+/,Math.round(cur).toString());
      },40);
    });
  };
  const hero=document.querySelector('.hero-stats');
  if(!hero) return;
  const io=new IntersectionObserver((e)=>{if(e[0].isIntersecting){animate();io.disconnect();}},{threshold:.3});
  io.observe(hero);
})();

// Contact form submit (FormSubmit)
function submitContact(e){
  if(e) e.preventDefault();
  const name=document.getElementById('cName')?.value.trim()||'';
  const email=document.getElementById('cEmail')?.value.trim()||'';
  const msg=document.getElementById('cMsg')?.value.trim()||'';
  fetch('https://formsubmit.co/ajax/rachitshukla555@gmail.com',{
    method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({_subject:'Contact Message - Digital Pathshala',Name:name,Email:email,Message:msg})
  }).then(r=>r.json()).then(()=>{showToast('Message sent!');document.getElementById('contactForm')?.reset();})
  .catch(()=>showToast('Failed. Try again.'));
}


// Fee calculator
function calcFee(){
  const rate=parseFloat(document.getElementById('calcBatch')?.value||'0');
  const months=parseInt(document.getElementById('calcMonths')?.value||'1');
  const total=rate*months;
  const el=document.getElementById('calcResult');
  if(el) el.textContent='Total: Rs.'+total.toLocaleString('en-IN')+' for '+months+' month(s)';
}


// Theme toggle (light/dark)
function toggleTheme(){
  document.body.classList.toggle('light-theme');
  showToast(document.body.classList.contains('light-theme')?'Light theme':'Dark theme');
}

// Site search
function doSearch(){
  const q=(document.getElementById('siteSearch')?.value||'').toLowerCase();
  const res=document.getElementById('searchResults');
  if(!res) return;
  if(!q){res.innerHTML='';return;}
  const pages=['Home','Batches','Admission','Pay Fee','About Coaching','About Website','Achievements','Toppers','FAQ','Contact'];
  const matches=pages.filter(x=>x.toLowerCase().includes(q));
  res.innerHTML=matches.length? 'Found: '+matches.join(', '):'No results';
}
