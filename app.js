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
    setTimeout(()=>{splash.classList.add('hide')},2200);
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

// welcome popup (after intro animation)
setTimeout(()=>{
  const pop=document.createElement('div');
  pop.id='welcomePop';
  pop.style.cssText='position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78);backdrop-filter:blur(6px);opacity:0;transition:opacity .4s ease';
  pop.innerHTML=`
    <div style="background:linear-gradient(160deg,#1f0004,#0a0a0a);border:1px solid rgba(229,9,20,.5);border-radius:20px;padding:40px 32px;max-width:460px;text-align:center;box-shadow:0 0 60px rgba(229,9,20,.25),0 20px 60px rgba(0,0,0,.6);transform:scale(.7);opacity:0;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s ease">
      <div style="font-family:Orbitron,sans-serif;font-size:1.6rem;font-weight:900;color:#e50914;margin-bottom:6px;text-shadow:0 0 24px rgba(229,9,20,.6)">Digital Pathshala</div>
      <div style="width:60px;height:3px;background:#e50914;margin:10px auto 18px;border-radius:2px;box-shadow:0 0 12px rgba(229,9,20,.6)"></div>
      <p style="color:#f5f5f5;font-size:1.1rem;line-height:1.7;margin-bottom:22px">Mr. Shrestha Tiwari <span style="color:#e50914;font-weight:700">welcomes you</span>.<br/>Join with us and <span style="color:#e50914;font-weight:700">make your kids future</span>.</p>
      <button id="popClose" style="background:#e50914;color:#fff;border:none;padding:11px 30px;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:1rem;transition:transform .2s,box-shadow .2s;box-shadow:0 8px 24px rgba(229,9,20,.4)">OK</button>
    </div>`;
  document.body.appendChild(pop);
  requestAnimationFrame(()=>{pop.style.opacity='1';const box=pop.querySelector('div');box.style.transform='scale(1)';box.style.opacity='1';});
  const close=()=>{pop.style.opacity='0';const box=pop.querySelector('div');box.style.transform='scale(.85)';box.style.opacity='0';setTimeout(()=>{pop.remove();focusBatches();},350);};
  document.getElementById('popClose').onclick=close;
  pop.onclick=(e)=>{if(e.target===pop)close();};
  setTimeout(close,7000);
},3200);
document.querySelectorAll('.card,.batch-card').forEach(el=>{
  el.addEventListener('click',()=>{el.classList.remove('tap-pop');void el.offsetWidth;el.classList.add('tap-pop');});
});
