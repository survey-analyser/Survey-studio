/* Login + per-report payment layer. Statistics code in index.html is untouched. */
const CFG={SB_URL:'https://sgthddcqbqokyukombrb.supabase.co',SB_KEY:'sb_publishable_Df0w1jPzqZu57XZ0NTpFRQ_xaBVFX7e',RZP_KEY:'rzp_test_U3AZJgx0HovwTm',ADMIN:'nithish2577@gmail.com'};
(()=>{const sb=supabase.createClient(CFG.SB_URL,CFG.SB_KEY),$=i=>document.getElementById(i);
let U=null,BAL=0,ADM=false,started=false,mode='in';
const st=document.createElement('style');st.textContent='#gb{position:fixed;top:12px;left:12px;z-index:60;display:flex;gap:8px;align-items:center;background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:6px 12px;font-size:13px}#gm{position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px}#gm>div{background:var(--card);color:var(--tx);border-radius:16px;padding:22px;max-width:380px;width:100%}#gm input{width:100%;padding:11px;margin:6px 0;border:1px solid var(--bd);border-radius:10px;background:var(--inp);color:var(--tx);font-size:16px;box-sizing:border-box}#gm .btn{width:100%;justify-content:center;margin-top:8px}';document.head.appendChild(st);
const bar=document.createElement('div');bar.id='gb';document.body.appendChild(bar);
const mod=h=>{let m=$('gm');if(!m){m=document.createElement('div');m.id='gm';document.body.appendChild(m)}m.innerHTML='<div>'+h+'</div>'},close=()=>{const m=$('gm');if(m)m.remove()};
window.__gc=close;
const can=()=>!!U&&(ADM||BAL>0);
async function refresh(){const{data:{session}}=await sb.auth.getSession();U=session?session.user:null;ADM=!!U&&(U.email||'').toLowerCase()==CFG.ADMIN&&!!U.email_confirmed_at;BAL=0;if(U&&!ADM){const{data}=await sb.from('credits').select('balance').eq('user_id',U.id).maybeSingle();BAL=data?data.balance:0}
bar.innerHTML=U?`<span>${U.email}</span><b>${ADM?'Admin · unlimited':'Reports paid: '+BAL}</b><button class="lk" id="lo">Log out</button>`:'<button class="lk" id="li">Log in</button>';
if($('lo'))$('lo').onclick=async()=>{await sb.auth.signOut();location.reload()};if($('li'))$('li').onclick=auth}
function auth(){mod(`<h2>${mode=='in'?'Log in':'Create account'}</h2><input id="ge" type="email" placeholder="Email" autocomplete="email"><input id="gp" type="password" placeholder="Password (min 6 characters)" autocomplete="${mode=='in'?'current-password':'new-password'}"><button class="btn" id="gs">${mode=='in'?'Log in':'Register'}</button><button class="lk" id="gt" style="margin-top:10px">${mode=='in'?'New here? Create an account':'Have an account? Log in'}</button>${mode=='in'?'<br><button class="lk" id="gf">Forgot password?</button>':''}<br><button class="lk" id="gx">Close</button>`);
$('gx').onclick=close;$('gt').onclick=()=>{mode=mode=='in'?'up':'in';auth()};
if($('gf'))$('gf').onclick=async()=>{const e=$('ge').value.trim();if(!e)return toast('Enter your email first');const{error}=await sb.auth.resetPasswordForEmail(e,{redirectTo:location.href.split('#')[0]});toast(error?error.message:'Reset link sent. Check your email.')};
$('gs').onclick=async()=>{const e=$('ge').value.trim(),p=$('gp').value;if(!e||p.length<6)return toast('Enter email and a password of 6+ characters');
if(mode=='in'){const{error}=await sb.auth.signInWithPassword({email:e,password:p});if(error)return toast(error.message);close();await refresh();toast('Logged in')}
else{const{error}=await sb.auth.signUp({email:e,password:p,options:{emailRedirectTo:location.href.split('#')[0]}});if(error)return toast(error.message);mod('<h2>Check your email</h2><p class="n">We sent a confirmation link. Confirm, then log in.</p><button class="btn" id="gx">OK</button>');$('gx').onclick=()=>{mode='in';close()}}}}
sb.auth.onAuthStateChange(async(ev)=>{if(ev=='PASSWORD_RECOVERY'){mod('<h2>Set a new password</h2><input id="np" type="password" placeholder="New password (min 6)"><button class="btn" id="ns">Save password</button>');$('ns').onclick=async()=>{const p=$('np').value;if(p.length<6)return toast('Use 6+ characters');const{error}=await sb.auth.updateUser({password:p});if(error)return toast(error.message);close();toast('Password updated');refresh()}}});
function payM(){mod(`<h2>₹50 per report</h2><p class="n">Pay once, choose your Excel file, build and download your report. After the download the session ends. Changing the file later needs a new payment.</p><button class="btn" id="gpay">Pay ₹50</button><button class="lk" id="gx" style="margin-top:10px">Close</button>`);$('gx').onclick=close;
$('gpay').onclick=async()=>{const{data,error}=await sb.functions.invoke('payments',{body:{action:'create'}});if(error||!data||!data.order_id)return toast('Could not start payment. Try again.');
new Razorpay({key:CFG.RZP_KEY,order_id:data.order_id,amount:data.amount,currency:'INR',name:'Survey Graphs Studio',description:'1 report download',prefill:{email:U.email},theme:{color:'#1a8a55'},
handler:async r=>{const{data:v,error:e}=await sb.functions.invoke('payments',{body:Object.assign({action:'verify'},r)});if(e||!v||!v.ok)return mod('<h2>Payment not verified</h2><p class="n">If money was deducted, contact support with payment id '+r.razorpay_payment_id+'.</p><button class="btn" id="gx">OK</button>'),$('gx').onclick=close;
await refresh();close();toast('Payment successful. Choose your Excel file.')}}).open()}}
const gate=()=>{if(!U)auth();else payM()};
const bz=$('bz');
bz.addEventListener('click',e=>{if(!can()){e.preventDefault();e.stopImmediatePropagation();gate()}},true);
bz.addEventListener('drop',e=>{if(!can()){e.preventDefault();e.stopImmediatePropagation();gate()}},true);
$('bf').addEventListener('change',async()=>{if(ADM)return;const{data,error}=await sb.rpc('use_credit');if(error||!data){alert('No paid report available. Please pay again.');location.reload();return}started=true;BAL=Math.max(0,BAL-1);refresh()},true);
$('bfx').addEventListener('click',e=>{if(ADM||!started)return;e.stopImmediatePropagation();if(confirm('Removing or changing the file ends this session. You will have to pay ₹50 again. Continue?'))location.reload()},true);
const _s=window.saveFile;window.saveFile=async function(n,b){await _s(n,b);if(!ADM&&started)mod('<h2>Report downloaded</h2><p class="n">This session has ended. To make another report, pay again.</p><button class="btn" id="gx">Start again</button>'),$('gx').onclick=()=>location.reload()};
refresh()})();
