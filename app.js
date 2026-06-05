/* ================================================================
   ABO TRIBE — Multi-Role Showcase · app.js
   6 roles × 10 screens each = 60 screens total
   Roles: manual switch only. Screens: auto-advance every 5s.
   ================================================================ */

/* ─── ROLE CONFIG ─────────────────────────────────── */
const ROLE_META = {
  owner:   { color:'#F5A623', navCls:'gold',   label:'Owner Dashboard',     glowBg:'rgba(245,166,35,.1)'  },
  dj:      { color:'#9B59B6', navCls:'purple',  label:'DJ Console',          glowBg:'rgba(155,89,182,.1)'  },
  event:   { color:'#FF8C42', navCls:'orange',  label:'Eventier',            glowBg:'rgba(255,140,66,.1)'  },
  bouncer: { color:'#FF3B30', navCls:'red',     label:'Entry / Bouncer',     glowBg:'rgba(255,59,48,.09)'  },
  waiter:  { color:'#2196F3', navCls:'blue',    label:'Waiter',              glowBg:'rgba(33,150,243,.09)' },
  valet:   { color:'#34C759', navCls:'green',   label:'Valet Driver',        glowBg:'rgba(52,199,89,.09)'  },
};
const ROLE_ORDER = ['owner','dj','event','bouncer','waiter','valet'];

let currentRole  = 'owner';
let currentIdx   = 0;
let autoTimer    = null;
const SCREEN_DUR = 5000;

/* ─── SCREEN CONTENT (10 per role) ──────────────────── */
const SCREENS = {

/* ══════════════════ OWNER ══════════════════ */
owner: [
  // 1 — Dashboard Overview
  { label:'Dashboard', callouts:[
      {id:'lc1',tag:'CHECK-INS',val:'247',title:'Guests Today',sub:'Auto QR scanning active',hi:true},
      {id:'lc2',tag:'REVENUE',  val:'₹24K',title:'Tonight',sub:'Tickets + table + bar'},
      {id:'rc1',tag:'EVENTS',   val:'3',   title:'Live Events',sub:'Salsa Night trending 🔥',hi:true},
      {id:'rc2',tag:'OFFERS',   val:'5',   title:'Promos Active',sub:'HAPPY50 · 342 views'},
    ],
    html: `
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">🪙 112,902</span></div>
      <div class="shero" style="background:linear-gradient(135deg,#1A0E00,#0C0C0C)">
        <div class="sh-lbl">OWNER DASHBOARD</div>
        <div class="sh-title">Good Evening, Owner 👋</div>
        <div class="sh-sub">Tuesday · 3 June 2025 · ABO Bar CBE</div>
      </div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox hi"><div class="sn gold" id="d-ci">0</div><div class="sl2">Check-ins</div></div>
          <div class="sbox"  ><div class="sn"      id="d-ev">0</div><div class="sl2">Live Events</div></div>
          <div class="sbox"  ><div class="sn"      id="d-of">0</div><div class="sl2">Offers Live</div></div>
        </div>
        <div class="slbl">LIVE ACTIVITY</div>
        <div id="o-feed" style="display:flex;flex-direction:column;gap:3px;flex:1;overflow:hidden;"></div>
      </div>
      <div class="snav gold">
        <div class="ni on">🏠<span>Home</span></div>
        <div class="ni">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div>
        <div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ countUp('d-ci',247,2200); delay(200,()=>countUp('d-ev',3,1400)); delay(400,()=>countUp('d-of',5,1400));
      const f=el('o-feed'); if(!f)return; f.innerHTML='';
      const msgs=[['👤','Arun K. checked in · Table 4'],['❤','Couple arrived · Walk-in'],['👥','Group of 4 · Event booking'],['♀','Sneha R. · VIP entry']];
      msgs.forEach((m,i)=>delay(600+i*500,()=>appendFeed(f,m[0],m[1],'var(--gold)')));
      delay(1200,()=>toast('✨','Dashboard Live','247 guests in tonight · All systems running')); }
  },

  // 2 — Check-In Management
  { label:'Check-In', callouts:[
      {id:'lc1',tag:'AUTO MODE',   val:'ON',  title:'QR Scanning',   sub:'No manual entry needed',hi:true},
      {id:'lc2',tag:'FEMALE',      val:'89',  title:'Female Guests', sub:'36% of tonight\'s crowd'},
      {id:'rc1',tag:'MALE',        val:'134', title:'Male Guests',   sub:'54% of tonight\'s crowd',hi:true},
      {id:'rc2',tag:'COUPLES',     val:'18',  title:'Couple Pairs',  sub:'Arrived together'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">🪙 112,902</span></div>
      <div class="sbody">
        <div class="slbl">CURRENT STATUS</div>
        <div class="card gold-b">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
            <span style="font-size:8px;font-weight:700;color:#fff;display:flex;align-items:center;gap:4px;"><span style="background:rgba(245,166,35,.15);padding:2px;border-radius:4px">👤</span> Today's Check-In</span>
            <div style="display:flex;align-items:center;gap:3px;">
              <span style="font-size:6px;color:var(--grey)">Manual</span>
              <div class="tgl on" id="ci-tgl"><div class="tgl-k"></div></div>
              <span style="font-size:6px;color:var(--gold);font-weight:700">Auto</span>
            </div>
          </div>
          <div class="big-n" id="ci-n" style="color:#fff">0</div>
          <div style="font-size:6.5px;color:var(--grey);margin-bottom:4px;">Total Check-ins Today</div>
          <div style="font-size:6.5px;color:var(--gold);background:rgba(245,166,35,.08);border-radius:9px;padding:3px 8px;text-align:center;">Tap to view full list →</div>
        </div>
        <div class="slbl">DEMOGRAPHICS</div>
        <div style="display:flex;gap:3px;">
          <div style="flex:1;background:rgba(233,30,99,.15);border:1px solid rgba(233,30,99,.3);border-radius:8px;padding:5px;text-align:center;font-size:7px;color:#fff">♀<br><b style="font-size:13px;display:block" id="pf">0</b><small style="font-size:5.5px;color:var(--grey)">Female</small></div>
          <div style="flex:1;background:rgba(33,150,243,.15);border:1px solid rgba(33,150,243,.3);border-radius:8px;padding:5px;text-align:center;font-size:7px;color:#fff">♂<br><b style="font-size:13px;display:block" id="pm">0</b><small style="font-size:5.5px;color:var(--grey)">Male</small></div>
          <div style="flex:1;background:rgba(229,57,53,.15);border:1px solid rgba(229,57,53,.3);border-radius:8px;padding:5px;text-align:center;font-size:7px;color:#fff">❤<br><b style="font-size:13px;display:block" id="pc">0</b><small style="font-size:5.5px;color:var(--grey)">Couples</small></div>
          <div style="flex:1;background:rgba(52,199,89,.12);border:1px solid rgba(52,199,89,.3);border-radius:8px;padding:5px;text-align:center;font-size:7px;color:#fff">👥<br><b style="font-size:13px;display:block" id="pg">0</b><small style="font-size:5.5px;color:var(--grey)">Groups</small></div>
        </div>
        <div style="display:flex;gap:4px;">
          <div class="card" style="flex:1"><div style="font-size:11px">🪑</div><div style="font-size:7px;font-weight:700;color:#fff">Table Booking</div><div style="font-size:18px;font-weight:900;color:#fff" id="tb">0</div></div>
          <div class="card" style="flex:1"><div style="font-size:11px">📅</div><div style="font-size:7px;font-weight:700;color:#fff">Event Booking</div><div style="font-size:18px;font-weight:900;color:var(--gold)" id="eb">16</div></div>
        </div>
      </div>
      <div class="snav gold">
        <div class="ni on">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ delay(500,()=>el('ci-tgl')?.classList.add('on'));
      countUp('ci-n',247,2200); delay(300,()=>countUp('pf',89,1500)); delay(450,()=>countUp('pm',134,1500));
      delay(600,()=>countUp('pc',18,1000)); delay(750,()=>countUp('pg',6,800));
      delay(900,()=>countUp('tb',12,1200)); delay(1200,()=>toast('🟢','Auto Check-In ON','Guests scanning QR entry')); }
  },

  // 3 — Offer Management
  { label:'Offers', callouts:[
      {id:'lc1',tag:'LIVE OFFER',   val:'5',    title:'Active Promos',  sub:'Running across all categories',hi:true},
      {id:'lc2',tag:'VIEWS',        val:'342',  title:'HAPPY50 Reach',  sub:'Promo code views today'},
      {id:'rc1',tag:'REDEMPTIONS',  val:'128',  title:'Times Used',     sub:'Happy Hour offer redeemed',hi:true},
      {id:'rc2',tag:'EXPIRED',      val:'12',   title:'Past Offers',    sub:'View offer history'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">ABO BAR - CBE</span></div>
      <div style="display:flex;background:#1A1A1A;margin:4px 8px;border-radius:9px;padding:3px;">
        <div style="flex:1;background:var(--gold);color:#000;font-size:7.5px;font-weight:700;text-align:center;padding:5px;border-radius:7px;">🏷 Ongoing</div>
        <div style="flex:1;color:var(--grey);font-size:7.5px;font-weight:700;text-align:center;padding:5px;">⏰ Expired</div>
      </div>
      <div class="sbody">
        <div class="off-card">
          <div class="off-live"><span class="ld"></span>LIVE NOW · 342 views</div>
          <div class="off-title">Happy Hour — 50% Off 🎉</div>
          <div class="off-code">Code: <b>HAPPY50</b> &nbsp;·&nbsp; Valid 5–8 PM</div>
        </div>
        <div class="off-card" style="border-color:rgba(52,199,89,.5)">
          <div class="off-live" style="color:var(--green)"><span class="ld"></span>LIVE NOW · 89 views</div>
          <div class="off-title">Welcome Drink — Free Mocktail</div>
          <div class="off-code">Code: <b>WELCOME1</b> &nbsp;·&nbsp; First visit</div>
        </div>
        <div class="off-card" style="border-color:rgba(155,89,182,.5)">
          <div class="off-live" style="color:#C39BD3"><span class="ld"></span>LIVE NOW · 211 views</div>
          <div class="off-title">VIP Night — Table of 2 Deal</div>
          <div class="off-code">Code: <b>VIP2NIGHT</b> &nbsp;·&nbsp; Sat only</div>
        </div>
      </div>
      <div style="position:absolute;bottom:50px;right:12px;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-d));color:#000;font-size:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(245,166,35,.5);cursor:pointer;animation:fabP 2.5s ease-in-out infinite;">+</div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni on">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ delay(800,()=>toast('🎁','3 Offers Live!','HAPPY50 has 342 views tonight')); }
  },

  // 4 — Event Management
  { label:'Events', callouts:[
      {id:'lc1',tag:'TONIGHT',  val:'Salsa 🎺', title:'Live Event',   sub:'June 3 · 6 PM · 28 guests in',hi:true},
      {id:'lc2',tag:'BOOKINGS', val:'42',  title:'Total Booked', sub:'28 confirmed · 14 pending'},
      {id:'rc1',tag:'CAPACITY', val:'85%', title:'Hall Filling',  sub:'62 of 72 seats taken',hi:true},
      {id:'rc2',tag:'PENDING',  val:'1',   title:'Awaiting Approval', sub:'DJ Night — review required'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">ABO BAR - CBE</span></div>
      <div style="display:flex;background:#1A1A1A;margin:4px 8px;border-radius:9px;padding:3px;">
        <div style="flex:1;background:var(--gold);color:#000;font-size:7.5px;font-weight:700;text-align:center;padding:5px;border-radius:7px;">🔴 Live</div>
        <div style="flex:1;color:var(--grey);font-size:7.5px;text-align:center;padding:5px;">Draft</div>
      </div>
      <div class="sbody">
        <div class="ev-banner"><div class="evb-big">ABO</div><div class="evb-sub">ALL · BAR · ONE</div></div>
        <div class="card gold-b">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="background:#222;border-radius:7px;padding:3px 7px;text-align:center"><div style="font-size:5.5px;color:var(--grey)">JUN</div><div style="font-size:15px;font-weight:900">3</div></div>
            <div style="font-size:7.5px;color:var(--grey-l)">👥 <span id="ev-bk">0</span> Bookings · <span id="ev-gs">0</span> Guests</div>
          </div>
          <div style="font-size:11px;font-weight:800;color:#fff;margin:6px 0 2px">Salsa Night 🎺</div>
          <div style="font-size:6.5px;color:var(--grey)">⏰ 6 PM &nbsp;·&nbsp; 📍 CBE &nbsp;·&nbsp; 🎧 RJ DJ RRR</div>
          <div class="btn-row" style="margin-top:8px;">
            <div class="btn gold" id="ev-promo">📣 Promote</div>
            <div class="btn grn"  id="ev-notify">🔔 Notify</div>
            <div class="btn red">✕ Cancel</div>
          </div>
        </div>
      </div>
      <div style="position:absolute;bottom:50px;right:12px;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-d));color:#000;font-size:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(245,166,35,.5);">+</div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni on">🎉<span>Events</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ countUp('ev-bk',12,1500); delay(200,()=>countUp('ev-gs',28,1500));
      delay(3000,()=>{ const b=el('ev-promo'); if(b){b.style.background='var(--gold)';b.style.color='#000';b.textContent='✅ Promoted!'; toast('📣','Event Promoted!','Sent to 3,200 followers'); }});
      delay(4500,()=>{ const b=el('ev-notify'); if(b){b.style.background='var(--green)';b.style.color='#000';b.textContent='✅ Notified!'; toast('🔔','Guests Notified!','All booked guests alerted'); }}); }
  },

  // 5 — User Management
  { label:'Users', callouts:[
      {id:'lc1',tag:'TEAM SIZE', val:'49',   title:'Staff Members',   sub:'6 role types managed',hi:true},
      {id:'lc2',tag:'ACTIVE',    val:'43',   title:'Currently Active',sub:'6 inactive / off-shift'},
      {id:'rc1',tag:'NEW HIRE',  val:'🪙500',title:'DJ Arjun Added',  sub:'Hired via ABO Network',hi:true},
      {id:'rc2',tag:'ROLES',     val:'6',    title:'Role Types',      sub:'Owner·DJ·Event·Entry·Waiter·Valet'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">ABO BAR - CBE</span></div>
      <div class="sbody">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div><div style="font-size:15px;font-weight:900;color:#fff">Users</div><div style="font-size:7px;color:var(--grey)">ABO BAR - CBE</div></div>
          <div style="background:linear-gradient(135deg,var(--gold),var(--gold-d));color:#000;font-size:7px;font-weight:800;padding:4px 9px;border-radius:12px;">🔍 Find</div>
        </div>
        <div class="srow">
          <div class="sbox"><div class="sn" id="u-t">0</div><div class="sl2">Total</div></div>
          <div class="sbox g"><div class="sn grn" id="u-a">0</div><div class="sl2">Active</div></div>
          <div class="sbox r"><div class="sn red" id="u-i">0</div><div class="sl2">Inactive</div></div>
        </div>
        <div style="display:flex;gap:4px;overflow-x:auto;padding:2px 0;">
          <div style="font-size:7px;font-weight:700;padding:4px 8px;border-radius:12px;background:var(--gold);color:#000;white-space:nowrap">All 49</div>
          <div style="font-size:7px;padding:4px 8px;border-radius:12px;background:var(--d3);color:var(--grey);white-space:nowrap">Owner</div>
          <div style="font-size:7px;padding:4px 8px;border-radius:12px;background:var(--d3);color:var(--grey);white-space:nowrap">DJ</div>
          <div style="font-size:7px;padding:4px 8px;border-radius:12px;background:var(--d3);color:var(--grey);white-space:nowrap">Valet</div>
        </div>
        <div id="u-list" style="display:flex;flex-direction:column;gap:2px;"></div>
        <div style="background:linear-gradient(135deg,var(--gold),var(--gold-d));color:#000;font-size:7.5px;font-weight:800;padding:7px;border-radius:13px;text-align:center;">👤+ Add New User</div>
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni on">👥<span>Users</span></div>
      </div>`,
    anim(){
      countUp('u-t',49,1400); delay(200,()=>countUp('u-a',43,1200)); delay(400,()=>countUp('u-i',6,800));
      const users=[{i:'AO',n:'ABO Owner',r:'Owner',c:'#F5A623',on:true},{i:'T',n:'thalaiva',r:'Owner',c:'#C47E0A',on:true},{i:'AA',n:'abo admin',r:'DJ',c:'#9B59B6',on:false},{i:'VO',n:'valet owner',r:'Valet',c:'#34C759',on:true}];
      const f=el('u-list'); if(!f)return;
      users.forEach((u,i)=>delay(500+i*120,()=>{
        const d=document.createElement('div'); d.className='li';
        d.innerHTML=`<div class="li-av" style="background:${u.c};color:#000">${u.i}</div>
          <div class="li-txt"><div class="li-name">${u.n}</div><div class="li-sub">${u.r}</div></div>
          <div class="tgl ${u.on?'on':'off'}"><div class="tgl-k"></div></div>`;
        f.appendChild(d);
        gsap.from(d,{x:15,opacity:0,duration:.4,ease:'back.out(1.3)'});
      }));
      delay(2800,()=>toast('🪙','DJ Arjun Hired!','500 coins spent · Added to team'));
    }
  },

  // 6 — Table Reservations
  { label:'Tables', callouts:[
      {id:'lc1',tag:'OCCUPIED',val:'8 of 12',title:'Tables Active',sub:'4 tables still available',hi:true},
      {id:'lc2',tag:'ARRIVED', val:'32',     title:'Table Guests',sub:'Seated and ordering'},
      {id:'rc1',tag:'UPCOMING',val:'3',       title:'Reservations',sub:'Next: 8 PM · Table 6',hi:true},
      {id:'rc2',tag:'WAITING', val:'6',       title:'Waiting List',sub:'~15 min estimated wait'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">Table Bookings</span></div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox hi"><div class="sn gold">8</div><div class="sl2">Occupied</div></div>
          <div class="sbox g"><div class="sn grn">4</div><div class="sl2">Available</div></div>
          <div class="sbox"><div class="sn">3</div><div class="sl2">Reserved</div></div>
        </div>
        <div class="slbl">TABLE MAP</div>
        <div class="tbl-grid">
          ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>{
            const s=n<=8?(n%3===0?'busy':'active'):'';
            return `<div class="tbl-cell ${s}"><span class="tn">${n}</span>Tbl</div>`;
          }).join('')}
        </div>
        <div class="slbl">UPCOMING RESERVATIONS</div>
        ${[['Table 6','Rajesh & Family','8:00 PM','4 guests'],['Table 9','VIP Corporate','9:30 PM','6 guests'],['Table 2','Birthday Group','10:00 PM','8 guests']].map(r=>`
          <div class="li">
            <div class="li-av" style="background:rgba(245,166,35,.15);color:var(--gold)">${r[0].split(' ')[1]}</div>
            <div class="li-txt"><div class="li-name">${r[1]}</div><div class="li-sub">${r[2]} · ${r[3]}</div></div>
            <div class="tag y">Confirmed</div>
          </div>`).join('')}
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni on">🪑<span>Tables</span></div>
      </div>`,
    anim(){ delay(800,()=>toast('🪑','Table 5 Ready!','Guests approaching — floor team alert')); }
  },

  // 7 — Analytics
  { label:'Analytics', callouts:[
      {id:'lc1',tag:'BEST DAY', val:'Sat',  title:'Saturday Highest',sub:'Peak: 420 check-ins',hi:true},
      {id:'lc2',tag:'AVG/NIGHT',val:'247',  title:'Daily Check-ins', sub:'Up 18% from last week'},
      {id:'rc1',tag:'TOP OFFER',val:'🎉',   title:'HAPPY50 Best ROI', sub:'₹8.2K revenue generated',hi:true},
      {id:'rc2',tag:'PEAK TIME',val:'9 PM', title:'Busiest Hour',    sub:'Average 64 entries/hour'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">Analytics</span></div>
      <div class="sbody">
        <div class="slbl">WEEKLY CHECK-INS</div>
        <div class="card">
          ${[['Mon',140],['Tue',180],['Wed',165],['Thu',200],['Fri',310],['Sat',420],['Sun',247]].map(([d,v])=>`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
              <div style="width:22px;font-size:6.5px;color:var(--grey)">${d}</div>
              <div class="spbar" style="flex:1"><div class="spbar-f" style="width:${Math.round(v/420*100)}%;background:${v===420?'var(--gold)':'rgba(245,166,35,.5)'}"></div></div>
              <div style="font-size:7px;font-weight:700;color:${v===420?'var(--gold)':'var(--grey-l)'};">${v}</div>
            </div>`).join('')}
        </div>
        <div class="srow">
          <div class="sbox hi"><div class="sn gold">₹24K</div><div class="sl2">Tonight</div></div>
          <div class="sbox"><div class="sn">₹1.2L</div><div class="sl2">This Week</div></div>
        </div>
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">📊<span>Reports</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ delay(600,()=>toast('📈','Revenue Up 18%!','Best week since last month')); }
  },

  // 8 — Reviews
  { label:'Reviews', callouts:[
      {id:'lc1',tag:'RATING',  val:'4.7⭐',title:'Overall Score',  sub:'Based on 328 reviews',hi:true},
      {id:'lc2',tag:'NEW',     val:'+12',   title:'Reviews Today',  sub:'11 positive · 1 flagged'},
      {id:'rc1',tag:'SERVICE', val:'4.8',   title:'Service Rating', sub:'Staff rated excellent',hi:true},
      {id:'rc2',tag:'AMBIENCE',val:'4.6',   title:'Ambience Score', sub:'Music and decor praised'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">Reviews</span></div>
      <div class="sbody">
        <div class="card gold-b" style="text-align:center">
          <div style="font-size:30px;font-weight:900;color:var(--gold)">4.7 ⭐</div>
          <div style="font-size:7px;color:var(--grey)">Based on 328 reviews</div>
          <div class="spbar" style="margin-top:8px"><div class="spbar-f" style="width:94%;background:var(--gold)"></div></div>
        </div>
        ${[['Sneha R.','Amazing vibe! The Salsa Night was incredible. Will come again ❤️','⭐⭐⭐⭐⭐'],
           ['Arjun K.','Great cocktails and DJ was on fire tonight. Staff was super helpful.','⭐⭐⭐⭐⭐'],
           ['Priya M.','Good place but got a bit crowded. Music was excellent though.','⭐⭐⭐⭐']].map(([n,t,s])=>`
          <div class="card">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <div style="font-size:8px;font-weight:700;color:#fff">${n}</div>
              <div style="font-size:8px">${s}</div>
            </div>
            <div style="font-size:7px;color:var(--grey-l);line-height:1.5">${t}</div>
          </div>`).join('')}
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">⭐<span>Reviews</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ delay(1000,()=>toast('⭐','New 5-Star Review!','"Amazing vibe! Best bar in CBE"')); }
  },

  // 9 — Bar Profile / Edit Details
  { label:'Bar Profile', callouts:[
      {id:'lc1',tag:'PROFILE', val:'✅',     title:'Verified Bar',   sub:'ABO Tribe certified',hi:true},
      {id:'lc2',tag:'PHOTOS',  val:'24',     title:'Gallery Images', sub:'Tap to add more photos'},
      {id:'rc1',tag:'TIMING',  val:'6PM–2AM',title:'Open Hours',     sub:'Tue–Sun operational',hi:true},
      {id:'rc2',tag:'CAPACITY',val:'120',    title:'Max Capacity',   sub:'Current: 85% full'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">Bar Profile</span></div>
      <div class="sbody">
        <div style="background:linear-gradient(135deg,#1E0800,#4A1C00);border-radius:11px;height:70px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-bottom:2px;">
          <div style="font-size:22px;font-weight:900;color:var(--gold);letter-spacing:4px;position:relative;z-index:1">ABO BAR</div>
          <div style="font-size:6.5px;color:var(--gold-l);letter-spacing:2px;position:relative;z-index:1">COIMBATORE · VERIFIED ✅</div>
        </div>
        ${[['📍','Location','SF Road, Coimbatore 641011'],['⏰','Hours','6:00 PM – 2:00 AM (Tue–Sun)'],['📞','Contact','+91 98765 43210'],['🎵','Music','Live DJ + Bollywood + EDM'],['🍹','Speciality','Craft Cocktails & Premium Spirits']].map(([ico,lbl,val])=>`
          <div class="li">
            <div style="font-size:14px;flex-shrink:0">${ico}</div>
            <div class="li-txt"><div style="font-size:7px;color:var(--grey)">${lbl}</div><div class="li-name" style="font-size:8px">${val}</div></div>
            <div style="font-size:9px;color:var(--grey)">✏️</div>
          </div>`).join('')}
        <div style="background:linear-gradient(135deg,var(--gold),var(--gold-d));color:#000;font-size:7.5px;font-weight:800;padding:7px;border-radius:11px;text-align:center;">💾 Save Changes</div>
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni on">⚙️<span>Profile</span></div><div class="ni">👥<span>Users</span></div>
      </div>`,
    anim(){ delay(800,()=>toast('✅','Profile Verified','ABO Tribe certified bar status active')); }
  },

  // 10 — Notifications & Alerts
  { label:'Notifications', callouts:[
      {id:'lc1',tag:'ALERTS',   val:'3',  title:'Action Required', sub:'Review pending items',hi:true},
      {id:'lc2',tag:'UNREAD',   val:'12', title:'Notifications',   sub:'Since last login'},
      {id:'rc1',tag:'PUSH SENT',val:'89', title:'Guests Notified', sub:'Salsa Night reminder',hi:true},
      {id:'rc2',tag:'UPCOMING', val:'2',  title:'Scheduled Alerts',sub:'7 PM & 9 PM reminders'},
    ],
    html:`
      <div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc gold">Notifications</span></div>
      <div class="sbody">
        <div class="slbl">ACTION REQUIRED</div>
        ${[['⚠️','Pending Event Approval','DJ Night — review & approve',  'tag r','Action'],
           ['🪙','Low Coin Balance Alert', '< 1,000 coins remaining',       'tag y','Top Up'],
           ['📋','Event Report Ready',    'Salsa Night full report done',   'tag g','View']].map(([ico,t,s,tc,btn])=>`
          <div class="card" style="display:flex;align-items:center;gap:7px">
            <div style="font-size:18px">${ico}</div>
            <div style="flex:1"><div style="font-size:8px;font-weight:700;color:#fff">${t}</div><div style="font-size:7px;color:var(--grey)">${s}</div></div>
            <div class="${tc}">${btn}</div>
          </div>`).join('')}
        <div class="slbl">RECENT</div>
        ${[['🔔','Check-in spike','34 guests in last 10 mins','9:41 PM'],['🎁','Offer redeemed','HAPPY50 used 128 times','8:30 PM'],['👥','New user added','DJ Arjun joined your team','7:15 PM'],['⭐','New 5-star review','Sneha R. rated ABO Bar','6:55 PM']].map(([ico,t,s,time])=>`
          <div class="li">
            <div class="li-av" style="background:rgba(245,166,35,.15);color:var(--gold);font-size:10px">${ico}</div>
            <div class="li-txt">
              <div class="li-name">${t}</div>
              <div class="li-sub">${s}</div>
            </div>
            <div style="font-size:6.5px;color:var(--grey)">${time}</div>
          </div>`).join('')}
      </div>
      <div class="snav gold">
        <div class="ni">🏠<span>Home</span></div><div class="ni">🏷<span>Offers</span></div>
        <div class="ni">🎉<span>Events</span></div><div class="ni on">🔔<span>Alerts</span></div>
      </div>`,
    anim(){ delay(800,()=>toast('🔔','12 Alerts Active','Review check-in spikes and event bookings')); }
  },
],

/* ══════════════════ DJ ══════════════════ */
dj: [
  // 1 — Tonight's Set
  { label:'Tonight\'s Set', callouts:[{id:'lc1',tag:'EVENT',val:'Salsa 🎺',title:'Tonight',sub:'8 PM · ABO Bar CBE',hi:true},{id:'lc2',tag:'CROWD',val:'92%',title:'Floor Full',sub:'Dance floor packed'},{id:'rc1',tag:'DURATION',val:'4hrs',title:'Set Length',sub:'8 PM – 12 AM',hi:true},{id:'rc2',tag:'PAYMENT',val:'₹8,000',title:'Tonight\'s Fee',sub:'Via ABO Network'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">🎧 DJ Mode</span></div>
      <div class="shero" style="background:linear-gradient(135deg,#1A0030,#0C0C0C)">
        <div class="sh-lbl" style="color:#C39BD3">TONIGHT'S GIG</div>
        <div class="sh-title">Salsa Night 🎺</div>
        <div class="sh-sub">8:00 PM – 12:00 AM · ABO Bar CBE</div>
      </div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox" style="border:1px solid rgba(155,89,182,.3)"><div class="sn" style="color:#C39BD3">92%</div><div class="sl2">Crowd</div></div>
          <div class="sbox"><div class="sn">4hr</div><div class="sl2">Set Time</div></div>
          <div class="sbox"><div class="sn" style="color:var(--gold)">₹8K</div><div class="sl2">Payment</div></div>
        </div>
        <div class="slbl">SET TIMELINE</div>
        <div id="dj-timeline" style="display:flex;flex-direction:column;gap:3px;flex:1;overflow:hidden">
          <div class="card" style="display:flex;justify-content:space-between;padding:6px;margin-bottom:2px;">
            <span style="font-size:7px;color:#C39BD3">8:00 PM</span>
            <span style="font-size:8px;font-weight:700;color:#fff">Warm-up Bollywood Mix</span>
            <span style="font-size:7px;color:var(--green)">Done ✓</span>
          </div>
          <div class="card purple-b" style="display:flex;justify-content:space-between;padding:6px;margin-bottom:2px;">
            <span style="font-size:7px;color:#C39BD3">9:00 PM</span>
            <span style="font-size:8px;font-weight:700;color:#fff">Peak Hour EDM</span>
            <span style="font-size:7px;color:var(--red);display:flex;align-items:center;gap:3px;"><span class="ld"></span>Live</span>
          </div>
          <div class="card" style="display:flex;justify-content:space-between;padding:6px;margin-bottom:2px;">
            <span style="font-size:7px;color:var(--grey)">10:30 PM</span>
            <span style="font-size:8px;color:var(--grey-l)">Salsa Special</span>
            <span style="font-size:7px;color:var(--grey)">Next</span>
          </div>
        </div>
      </div>
      <div class="snav purple"><div class="ni on">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('🎧','Salsa Night Live','92% crowd on floor · Play Salsa Special at 10:30 PM')); }
  },

  // 2 — Now Playing
  { label:'Now Playing', callouts:[{id:'lc1',tag:'NOW PLAYING',val:'Danza Kuduro 🎵',title:'Don Omar',sub:'Playing next: Gasolina',hi:true},{id:'lc2',tag:'TEMPO',val:'128 BPM',title:'Energy Level',sub:'High-tempo Latin Beat'},{id:'rc1',tag:'VOTES',val:'42 👍',title:'Crowd Upvotes',sub:'Top requested song tonight',hi:true},{id:'rc2',tag:'DURATION',val:'3:12',title:'Time Left',sub:'Elapsed: 1:04'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">🎵 Now Playing</span></div>
      <div class="sbody" style="align-items:center;justify-content:center;gap:12px;">
        <div style="width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,#000 20%,#1A1A1A 21%,#111 40%,#333 41%,#111 60%,#444 61%,#000 100%);border:2px solid #9B59B6;display:flex;align-items:center;justify-content:center;position:relative;animation:spin 12s linear infinite;" id="dj-vinyl">
          <div style="width:26px;height:26px;border-radius:50%;background:#9B59B6;display:flex;align-items:center;justify-content:center;color:#000;font-size:10px;font-weight:900;">ABO</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:12px;font-weight:900;color:#fff;">Danza Kuduro</div>
          <div style="font-size:8px;color:#C39BD3;margin-top:2px;">Don Omar ft. Lucenzo</div>
        </div>
        <div style="width:100%;background:rgba(255,255,255,0.04);height:3px;border-radius:2px;position:relative;margin-top:4px;">
          <div style="background:#9B59B6;height:100%;width:35%;border-radius:2px;" id="dj-song-progress"></div>
        </div>
        <div class="btn-row" style="width:100%;justify-content:center;gap:8px;">
          <div class="btn purple">⏮</div>
          <div class="btn purple fill" style="background:#9B59B6;color:#000;border-color:#9B59B6">⏸</div>
          <div class="btn purple">⏭</div>
        </div>
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni on">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni">👤<span>Profile</span></div></div>`,
    anim(){
      const bar = el('dj-song-progress');
      if (bar) gsap.fromTo(bar, { width: '35%' }, { width: '40%', duration: 5, ease: 'linear' });
    }
  },

  // 3 — Song Requests
  { label:'Song Requests', callouts:[{id:'lc1',tag:'PENDING',val:'8 Songs',title:'Request Queue',sub:'Live requests from guests',hi:true},{id:'lc2',tag:'APPROVED',val:'12',title:'Songs Played',sub:'83% guest satisfaction rating'},{id:'rc1',tag:'LATEST',val:'Despacito',title:'Luis Fonsi',sub:'Requested by Rahul · VIP Tbl 4',hi:true},{id:'rc2',tag:'TIP OFFERED',val:'₹500',title:'Guest Tip',sub:'Offered via ABO Pay'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">📋 Requests</span></div>
      <div class="sbody">
        <div class="slbl">LIVE REQUEST QUEUE</div>
        <div class="card purple-b" style="padding:8px;margin-bottom:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:7px;color:#C39BD3;font-weight:700;background:rgba(155,89,182,0.15);padding:2px 4px;border-radius:4px;">NEW REQUEST</span>
            <span style="font-size:8px;font-weight:900;color:var(--gold)">₹500 Tip 💎</span>
          </div>
          <div style="font-size:10px;font-weight:800;color:#fff;">Despacito</div>
          <div style="font-size:7.5px;color:var(--grey-l);margin-top:1px;">Luis Fonsi ft. Daddy Yankee</div>
          <div style="font-size:6.5px;color:var(--grey);margin-top:3px;font-style:italic;">"Play Despacito next for VIP table 4! Thanks!" - Rahul</div>
          <div class="btn-row" style="margin-top:8px;">
            <div class="btn grn fill" style="background:var(--green);color:#000;border-color:var(--green)">✓ Accept & Queue</div>
            <div class="btn red">✕ Decline</div>
          </div>
        </div>
        ${[['Gasolina','Daddy Yankee','Requested by Priya · Table 9','Approved ✓'],['Mi Gente','J Balvin','Requested by Amit · Bar Area','Approved ✓']].map(r=>`
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;margin-bottom:4px;">
            <div>
              <div style="font-size:9px;font-weight:900;color:#fff;">${r[0]}</div>
              <div style="font-size:7px;color:var(--grey);margin-top:1px;">${r[1]} · ${r[2]}</div>
            </div>
            <div style="font-size:7.5px;color:var(--green);font-weight:700;">${r[3]}</div>
          </div>
        `).join('')}
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni on">📋<span>Req</span></div><div class="ni">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('💎','Request with Tip!','Rahul offered ₹500 tip for Despacito')); }
  },

  // 4 — Crowd Energy
  { label:'Crowd Energy', callouts:[{id:'lc1',tag:'ENERGY INDEX',val:'96%',title:'Crowd Hyped 🔥',sub:'Dance floor at max capacity',hi:true},{id:'lc2',tag:'GENRE',val:'EDM / Latin',title:'Best Genre Tonight',sub:'Keeping crowd energy high'},{id:'rc1',tag:'FEEDBACK',val:'4.9 / 5.0',title:'Crowd Rating',sub:'From live app reviews',hi:true},{id:'rc2',tag:'PEAK HOUR',val:'10:15 PM',title:'Peak Energy',sub:'Expected to hold until 12 AM'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">📊 Crowd Energy</span></div>
      <div class="sbody">
        <div class="card purple-b" style="padding:10px;text-align:center;">
          <div style="font-size:8px;color:#C39BD3;margin-bottom:4px;letter-spacing:1px;font-weight:700;">LIVE ENERGY MONITOR</div>
          <div style="font-size:32px;font-weight:900;color:#fff;" id="dj-energy-val">96%</div>
          <div class="spbar" style="margin:10px 0 5px;"><div class="spbar-f" style="width:96%;background:#9B59B6;" id="dj-energy-bar"></div></div>
          <div style="font-size:6px;color:var(--grey);">Peak energy achieved during 'Danza Kuduro'</div>
        </div>
        <div class="slbl">ENERGY HISTORY (LAST 3 HOURS)</div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;height:45px;padding:5px 10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:10px;margin-top:4px;">
          ${[40,65,55,80,96,90,96].map((h,idx)=>`
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:4px;">
              <div style="width:8px;height:${h*0.35}px;background:linear-gradient(to top,#9B59B6,${idx===4||idx===6?'var(--gold)':'#C39BD3'});border-radius:2px;transition:height 1s;"></div>
              <div style="font-size:5px;color:var(--grey);">${['8:00','8:30','9:00','9:30','10:00','10:30','Now'][idx]}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni on">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni">👤<span>Profile</span></div></div>`,
    anim(){
      countUp('dj-energy-val',96,2000);
      const bar = el('dj-energy-bar');
      if (bar) gsap.fromTo(bar, { width: '0%' }, { width: '96%', duration: 2, ease: 'power2.out' });
    }
  },

  // 5 — Setlist
  { label:'Setlist', callouts:[{id:'lc1',tag:'SETLIST',val:'42 Songs',title:'Tonight\'s Setlist',sub:'EDM, Latin & Bollywood mix',hi:true},{id:'lc2',tag:'PLAYED',val:'18 Songs',title:'Completed Tracks',sub:'42% of plan completed'},{id:'rc1',tag:'UP NEXT',val:'Gasolina',title:'Daddy Yankee',sub:'Starts in 2 min 15 sec',hi:true},{id:'rc2',tag:'QUEUED',val:'8 Tracks',title:'User Requested',sub:'Ready to play next'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">🎵 Setlist</span></div>
      <div class="sbody">
        <div class="slbl">PLAYING QUEUE</div>
        <div class="card purple-b" style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;margin-bottom:6px;">
          <div>
            <div style="font-size:7px;color:#C39BD3;font-weight:700;letter-spacing:1px;">UP NEXT</div>
            <div style="font-size:10px;font-weight:800;color:#fff;margin-top:2px;">Gasolina</div>
            <div style="font-size:7px;color:var(--grey-l);">Daddy Yankee · Queued by Priya</div>
          </div>
          <div style="font-size:8px;color:#9B59B6;font-weight:800;">2:15 remaining</div>
        </div>
        ${[['Waka Waka','Shakira','Queued by Amit · Table 12','Coming Up'],['Mi Gente','J Balvin','Queued by Rohit · Bar','Coming Up'],['Despacito','Luis Fonsi','Queued by Rahul · VIP Tbl 4','Coming Up']].map((s,i)=>`
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;margin-bottom:4px;">
            <div>
              <div style="font-size:9px;font-weight:900;color:#fff;">${s[0]}</div>
              <div style="font-size:7px;color:var(--grey);margin-top:1px;">${s[1]} · ${s[2]}</div>
            </div>
            <div style="font-size:7.5px;color:#C39BD3;font-weight:700;">#${i+2}</div>
          </div>
        `).join('')}
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni on">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('🎵','Next Track Queued','Gasolina is loaded and ready')); }
  },

  // 6 — Earnings
  { label:'Earnings', callouts:[{id:'lc1',tag:'TOTAL REVENUE',val:'₹11,500',title:'Tonight\'s Earnings',sub:'Base fee + guest song tips',hi:true},{id:'lc2',tag:'BASE FEE',val:'₹8,000',title:'Contract Fee',sub:'Guaranteed payout'},{id:'rc1',tag:'GUEST TIPS',val:'₹3,500',title:'Live Song Tips',sub:'Earned from guest requests',hi:true},{id:'rc2',tag:'SETTLEMENT',val:'Instant',title:'ABO Network Pay',sub:'Direct bank transfer in 10 min'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">⚖️ Earnings</span></div>
      <div class="sbody">
        <div class="card purple-b" style="text-align:center;padding:12px;">
          <div style="font-size:7.5px;color:#C39BD3;font-weight:700;letter-spacing:1px;margin-bottom:4px;">TOTAL EARNINGS TONIGHT</div>
          <div style="font-size:28px;font-weight:900;color:#fff;" id="dj-earn-val">₹0</div>
          <div style="font-size:7px;color:var(--grey-l);margin-top:2px;">Base Payout: ₹8,000 &nbsp;·&nbsp; Tips: ₹3,500</div>
        </div>
        <div class="slbl">RECENT SONG TIPS</div>
        ${[['Despacito','Rahul · VIP Table 4','₹500 💎'],['Gasolina','Priya · Table 9','₹300 💎'],['Danza Kuduro','Vikram · Table 1','₹1,000 👑'],['Mi Gente','Amit · Bar Area','₹200 💎']].map(t=>`
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;margin-bottom:4px;">
            <div>
              <div style="font-size:9px;font-weight:900;color:#fff;">${t[0]}</div>
              <div style="font-size:7px;color:var(--grey);margin-top:1px;">From ${t[1]}</div>
            </div>
            <div style="font-size:9px;font-weight:900;color:var(--gold);">${t[2]}</div>
          </div>
        `).join('')}
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni on">💰<span>Earnings</span></div></div>`,
    anim(){ countUp('dj-earn-val',11500,2000); delay(1200,()=>toast('💰','Tip Received!','Vikram sent a ₹1,000 tip for Danza Kuduro')); }
  },

  // 7 — Chat with Owner
  { label:'Chat with Owner', callouts:[{id:'lc1',tag:'CHAT STATUS',val:'Online',title:'Owner Connected',sub:'Direct communication channel',hi:true},{id:'lc2',tag:'VENUE',val:'ABO Bar CBE',title:'Manager: Vinay',sub:'Event coordinates active'},{id:'rc1',tag:'LATEST MSG',val:'Play Despacito...',title:'Owner: Vinay',sub:'VIP table request incoming',hi:true},{id:'rc2',tag:'TIME SENT',val:'9:42 PM',title:'Sent 1 min ago',sub:'Read receipt active'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">💬 Chat</span></div>
      <div class="sbody" style="display:flex;flex-direction:column;gap:8px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;overflow-y:auto;padding-right:2px;" id="dj-chat-box">
          <div style="background:rgba(255,255,255,0.03);border-radius:8px;padding:6px;align-self:flex-start;max-width:85%;font-size:7.5px;color:#fff;">
            <div style="font-size:6px;color:#C39BD3;font-weight:700;margin-bottom:2px;">Owner (Vinay)</div>
            Hey Arjun, crowd looks great tonight! Good energy.
          </div>
          <div style="background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.2);border-radius:8px;padding:6px;align-self:flex-end;max-width:85%;font-size:7.5px;color:#fff;">
            <div style="font-size:6px;color:var(--gold);font-weight:700;margin-bottom:2px;">You (DJ Arjun)</div>
            Thanks Vinay! Dance floor is packed. EDM transition went well.
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:8px;padding:6px;align-self:flex-start;max-width:85%;font-size:7.5px;color:#fff;">
            <div style="font-size:6px;color:#C39BD3;font-weight:700;margin-bottom:2px;">Owner (Vinay)</div>
            Can you play Despacito next for the VIP table 4 guest? He just tipped ₹500.
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:3px 6px;">
          <div style="flex:1;font-size:8px;color:var(--grey)">Type a message...</div>
          <div style="width:18px;height:18px;border-radius:50%;background:#9B59B6;display:flex;align-items:center;justify-content:center;font-size:9px;cursor:pointer;">➤</div>
        </div>
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni on">💬<span>Chat</span></div></div>`,
    anim(){ delay(1500,()=>toast('💬','New Message!','Owner: Play Despacito next for VIP table')); }
  },

  // 8 — Past Gigs
  { label:'Past Gigs', callouts:[{id:'lc1',tag:'TOTAL GIGS',val:'28',title:'Completed',sub:'Since joining ABO Network',hi:true},{id:'lc2',tag:'VENUES',val:'8',title:'Bars Worked',sub:'Across Coimbatore'},{id:'rc1',tag:'AVG RATING',val:'4.9⭐',title:'DJ Rating',sub:'Top 5% on ABO Network',hi:true},{id:'rc2',tag:'REPEAT',val:'80%',title:'Rebooking Rate',sub:'Venues keep rehiring'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">Gig History</span></div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox"><div class="sn" style="color:#C39BD3">28</div><div class="sl2">Total Gigs</div></div>
          <div class="sbox g"><div class="sn grn">4.9⭐</div><div class="sl2">Rating</div></div>
          <div class="sbox"><div class="sn" style="color:var(--gold)">₹1.8L</div><div class="sl2">Earned</div></div>
        </div>
        <div class="slbl">RECENT GIGS</div>
        ${[['ABO Bar CBE','Salsa Night','Jun 3','⭐⭐⭐⭐⭐'],['Sky Lounge','EDM Saturday','May 25','⭐⭐⭐⭐⭐'],['Club X Nightclub','Bollywood Night','May 18','⭐⭐⭐⭐'],['Aria Bar','Latin Fiesta','May 10','⭐⭐⭐⭐⭐']].map(g=>`
          <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;margin-bottom:4px;">
            <div>
              <div style="font-size:9px;font-weight:900;color:#fff;">${g[0]}</div>
              <div style="font-size:7px;color:var(--grey);margin-top:1px;">${g[1]} · ${g[2]}</div>
            </div>
            <div style="font-size:8px;color:var(--gold);">${g[3]}</div>
          </div>
        `).join('')}
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni on">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('🎧','Profile Updated!','DJ Arjun profile is 100% complete')); }
  },

  // 9 — DJ Profile
  { label:'DJ Profile', callouts:[{id:'lc1',tag:'DJ PROFILE',val:'DJ Arjun 🎧',title:'Arjun K.',sub:'Professional Club & Event DJ',hi:true},{id:'lc2',tag:'SPECIALTY',val:'EDM & Latin',title:'Key Genres',sub:'Bollywood Remix Specialist'},{id:'rc1',tag:'ABO ID',val:'#ABODJ082',title:'Verified DJ',sub:'Member since Jan 2026',hi:true},{id:'rc2',tag:'BOOKING RATE',val:'₹8K - 12K',title:'Avg Session Fee',sub:'Based on 4-hour performance'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">👤 DJ Profile</span></div>
      <div class="sbody" style="align-items:center;gap:10px;">
        <div style="width:48px;height:48px;border-radius:50%;border:2px solid #9B59B6;background:rgba(155,89,182,.1);display:flex;align-items:center;justify-content:center;font-size:22px;">🎧</div>
        <div style="text-align:center;">
          <div style="font-size:12px;font-weight:900;color:#fff;">DJ Arjun</div>
          <div style="font-size:7px;color:var(--gold);font-weight:700;margin-top:1px;">⭐ 4.9 Verified Performer</div>
        </div>
        <div class="card" style="width:100%;padding:8px;font-size:7px;color:var(--grey-l);line-height:1.4;">
          Professional DJ with 5+ years of experience playing in top lounges and nightclubs across Coimbatore. Specializes in Latin fusion, EDM, and commercial Bollywood sets.
        </div>
        <div style="display:flex;gap:4px;width:100%;justify-content:center;">
          <span style="font-size:6px;background:rgba(255,255,255,0.06);padding:3px 6px;border-radius:6px;color:#fff;">🎵 EDM</span>
          <span style="font-size:6px;background:rgba(255,255,255,0.06);padding:3px 6px;border-radius:6px;color:#fff;">🎷 Latin</span>
          <span style="font-size:6px;background:rgba(255,255,255,0.06);padding:3px 6px;border-radius:6px;color:#fff;">🔥 Commercial</span>
        </div>
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni on">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('🎧','Profile Active','DJ Arjun is open for weekend bookings')); }
  },

  // 10 — New Gig Alert
  { label:'New Gig Alert', callouts:[{id:'lc1',tag:'NEW GIG',val:'🎉',title:'Booking Request',sub:'ABO Bar CBE — Sat June 8',hi:true},{id:'lc2',tag:'PAYMENT',val:'₹10K',title:'Offered Fee',sub:'For 4hr Saturday night set'},{id:'rc1',tag:'DEADLINE',val:'2hrs',title:'Accept By',sub:'Offer expires in 2 hours',hi:true},{id:'rc2',tag:'REVIEW',val:'4.9⭐',title:'Venue Rating',sub:'Top venue in CBE'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc purple">🔔 New Gig!</span></div>
      <div class="sbody" style="align-items:center;justify-content:center">
        <div class="card purple-b" style="width:100%;text-align:center;padding:16px">
          <div style="font-size:32px;margin-bottom:8px">🎉</div>
          <div style="font-size:7px;color:#C39BD3;font-weight:700;letter-spacing:2px;margin-bottom:6px">NEW BOOKING REQUEST</div>
          <div style="font-size:14px;font-weight:900;color:#fff;margin-bottom:4px">ABO Bar CBE</div>
          <div style="font-size:8px;color:var(--grey-l);margin-bottom:12px">Saturday · June 8 · 8 PM – 12 AM</div>
          <div style="font-size:28px;font-weight:900;color:#C39BD3;margin-bottom:4px">₹10,000</div>
          <div style="font-size:7px;color:var(--grey);margin-bottom:14px">Payment via ABO Network · Instant transfer</div>
          <div class="btn-row">
            <div class="btn grn fill" style="background:var(--green);color:#000;border-color:var(--green)">✅ Accept Gig</div>
            <div class="btn red">✕ Decline</div>
          </div>
        </div>
      </div>
      <div class="snav purple"><div class="ni">🏠<span>Home</span></div><div class="ni">🎵<span>Sets</span></div><div class="ni">📋<span>Req</span></div><div class="ni on">👤<span>Profile</span></div></div>`,
    anim(){ delay(800,()=>toast('🎉','New Gig Request!','Accept to secure the Saturday booking')); }
  }
],

/* ══════════════════ BOUNCER ══════════════════ */
bouncer:[
  { label:'QR Scanner', callouts:[{id:'lc1',tag:'TODAY',val:'247',title:'Scanned In',sub:'Since 6 PM tonight',hi:true},{id:'lc2',tag:'SUCCESS',val:'99.2%',title:'Scan Rate',sub:'Clean entries, low flags'},{id:'rc1',tag:'QUEUE',val:'14',title:'Guests Waiting',sub:'~8 min estimated wait',hi:true},{id:'rc2',tag:'VIP',val:'6',title:'VIP Entry',sub:'Direct access, no queue'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">🚪 Entry</span></div>
      <div class="shero" style="background:linear-gradient(135deg,#200000,#0C0C0C)">
        <div class="sh-lbl" style="color:#FF6B6B">TONIGHT'S ENTRY</div>
        <div class="sh-title" style="text-align:center;font-size:44px;font-weight:900;line-height:1" id="bc-c">0</div>
        <div class="sh-sub" style="text-align:center;display:flex;align-items:center;justify-content:center;gap:5px"><span class="ld"></span>Scanning Active</div>
      </div>
      <div class="qr-zone">
        <div class="qr-ring"><div style="font-size:28px;position:relative;z-index:1">📷</div></div>
        <div style="font-size:7px;color:var(--grey);margin-top:8px">Align QR code within frame</div>
      </div>
      <div class="sbody">
        <div class="slbl">RECENT ENTRIES</div>
        <div id="bc-feed" style="display:flex;flex-direction:column;gap:3px;"></div>
      </div>
      <div class="snav red"><div class="ni on">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ countUp('bc-c',247,2200);
      const entries=[['👤','Arun K.','Walk-in'],['❤','Couple','Event booking'],['VIP','Rajesh V.','VIP List'],['👥','Group x4','Table reservation']];
      const f=el('bc-feed');
      entries.forEach((e,i)=>delay(600+i*600,()=>appendFeed(f,e[0],`${e[1]} · ${e[2]}`,'var(--red)')));
      delay(1200,()=>toast('📷','247 Scanned In!','Scanning is live — 14 in queue')); }
  },
  { label:'Entry List', callouts:[{id:'lc1',tag:'TOTAL IN',val:'247',title:'Entered Tonight',sub:'All verified via QR or ID',hi:true},{id:'lc2',tag:'FLAGGED',val:'2',title:'Pending Review',sub:'Manual ID check needed'},{id:'rc1',tag:'WALK-IN',val:'189',title:'Walk-in Guests',sub:'No advance booking',hi:true},{id:'rc2',tag:'BOOKED',val:'58',title:'Pre-booked',sub:'Table or event reservation'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">Entry List</span></div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox hi"><div class="sn" style="color:var(--red)" id="bl-t">0</div><div class="sl2">Total</div></div>
          <div class="sbox g"><div class="sn grn">189</div><div class="sl2">Walk-in</div></div>
          <div class="sbox"><div class="sn">58</div><div class="sl2">Booked</div></div>
        </div>
        <div style="display:flex;gap:4px;background:#1A1A1A;border-radius:9px;padding:3px;margin:2px 0">
          <div style="flex:1;background:var(--red);color:#fff;font-size:7px;font-weight:700;text-align:center;padding:5px;border-radius:7px">All</div>
          <div style="flex:1;color:var(--grey);font-size:7px;text-align:center;padding:5px">Walk-in</div>
          <div style="flex:1;color:var(--grey);font-size:7px;text-align:center;padding:5px">Booked</div>
          <div style="flex:1;color:var(--red);font-size:7px;text-align:center;padding:5px">⚠️ 2</div>
        </div>
        ${[['Arun Kumar','Walk-in','9:41 PM','g'],['Sneha R.','VIP','9:43 PM','p'],['Rajesh V.','Event Booking','9:45 PM','g'],['Group x4','Table Res.','9:48 PM','g'],['Unknown M.','ID Check ⚠️','9:52 PM','r'],['Priya & Jay','Couple Walk-in','9:54 PM','g']].map(([n,t,ti,c])=>`
          <div class="li"><div class="li-av" style="background:rgba(255,59,48,.15);color:var(--red)">${n[0]}</div><div class="li-txt"><div class="li-name">${n}</div><div class="li-sub">${t} · ${ti}</div></div><div class="tag ${c}">${c==='r'?'⚠️ Flag':'✓ In'}</div></div>`).join('')}
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni on">📋<span>List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ countUp('bl-t',247,1800); delay(900,()=>toast('⚠️','ID Check Required','Unknown male at gate — manual verify')); }
  },
  { label:'VIP List', callouts:[{id:'lc1',tag:'VIP GUESTS',val:'6',title:'VIP Tonight',sub:'Direct entry, no wait',hi:true},{id:'lc2',tag:'ARRIVED',val:'4',title:'VIP Checked In',sub:'2 still expected'},{id:'rc1',tag:'TABLE',val:'Table 1',title:'VIP Reserved',sub:'Premium corner seating',hi:true},{id:'rc2',tag:'SPEND',val:'₹8K+',title:'VIP Avg Spend',sub:'Per visit estimate'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">🌟 VIP List</span></div>
      <div class="sbody">
        <div class="card red-b" style="display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-size:9px;font-weight:800;color:#fff">VIP Entry Tonight</div><div style="font-size:7px;color:var(--grey)">6 guests · Table 1 reserved</div></div>
          <div style="font-size:22px;font-weight:900;color:var(--red)">6</div>
        </div>
        <div class="slbl">VIP GUESTS</div>
        ${[['Vikram S.','Regular VIP · Table 1','🟢 Arrived','g'],['Meera & Guest','Corporate · VIP Couple','🟢 Arrived','g'],['DJ Arjun','Performer · Staff VIP','🟢 Arrived','g'],['Ravi Sharma','Monthly Member','🟢 Arrived','g'],['Priya Patel','Owner Guest','⏳ Expected','y'],['Mr. Krishnan','Investor Visit','⏳ Expected','y']].map(([n,d,s,c])=>`
          <div class="li"><div class="li-av" style="background:rgba(255,215,0,.15);color:gold;font-size:12px">🌟</div><div class="li-txt"><div class="li-name">${n}</div><div class="li-sub">${d}</div></div><div class="tag ${c}">${s}</div></div>`).join('')}
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni on">🌟<span>VIP</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ delay(800,()=>toast('🌟','VIP Arriving!','Vikram S. — VIP Table 1 — no queue')); }
  },
  { label:'Capacity', callouts:[{id:'lc1',tag:'INSIDE NOW',val:'247',title:'Guests Present',sub:'Current indoor count',hi:true},{id:'lc2',tag:'MAX',val:'300',title:'Venue Capacity',sub:'17% headroom remaining'},{id:'rc1',tag:'FIRE LIMIT',val:'280',title:'Safety Cap',sub:'Must not exceed 280',hi:true},{id:'rc2',tag:'ALERT',val:'⚠️',title:'Nearing Limit',sub:'Slow entry — 33 to limit'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">Capacity</span></div>
      <div class="sbody">
        <div class="card red-b" style="text-align:center;padding:14px">
          <div style="font-size:9px;color:var(--grey-l);margin-bottom:4px">CURRENT OCCUPANCY</div>
          <div style="font-size:36px;font-weight:900;color:var(--red)">247 <span style="font-size:14px;color:var(--grey)">/300</span></div>
          <div class="spbar" style="margin:10px 0 5px"><div class="spbar-f" style="width:82%;background:var(--red)"></div></div>
          <div style="font-size:7px;color:var(--grey-l)">82% full · 53 spots remaining</div>
        </div>
        <div class="srow">
          <div class="sbox r"><div class="sn red">247</div><div class="sl2">Inside</div></div>
          <div class="sbox g"><div class="sn grn">53</div><div class="sl2">Remaining</div></div>
          <div class="sbox"><div class="sn">14</div><div class="sl2">In Queue</div></div>
        </div>
        <div class="card" style="display:flex;align-items:center;gap:8px">
          <div style="font-size:14px">⚠️</div>
          <div><div style="font-size:8px;font-weight:700;color:#fff">Approaching Safety Limit</div><div style="font-size:7px;color:var(--grey)">Fire limit: 280. Currently 33 spots to limit</div></div>
        </div>
        <div style="display:flex;gap:5px">
          <div class="btn red fill" style="background:var(--red);color:#fff">🔴 Pause Entry</div>
          <div class="btn grn">🟢 Allow Entry</div>
        </div>
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni on">📊<span>Cap</span></div></div>`,
    anim(){ delay(800,()=>toast('⚠️','82% Capacity!','33 spots left — monitor queue closely')); }
  },
  { label:'Alerts', callouts:[{id:'lc1',tag:'ACTIVE',val:'2',title:'Open Alerts',sub:'Require immediate attention',hi:true},{id:'lc2',tag:'RESOLVED',val:'5',title:'Closed Tonight',sub:'All handled successfully'},{id:'rc1',tag:'TYPE',val:'⚠️ID',title:'ID Verification',sub:'Unknown at gate',hi:true},{id:'rc2',tag:'SECURITY',val:'🚨',title:'Incident Logged',sub:'Altercation · Section B'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">⚠️ Alerts</span></div>
      <div class="sbody">
        <div class="slbl">ACTIVE ALERTS</div>
        ${[['🚨','Altercation Report','Section B near bar counter','High','r'],['⚠️','ID Verification Failed','Unknown male at main gate','Medium','y']].map(([i,t,s,p,c])=>`
          <div class="card red-b"><div style="display:flex;align-items:center;gap:7px"><div style="font-size:16px">${i}</div><div class="li-txt"><div class="li-name">${t}</div><div class="li-sub">${s}</div></div><div class="tag ${c}">${p}</div></div><div style="display:flex;gap:4px;margin-top:8px"><div class="btn red">Escalate</div><div class="btn grn">Resolved ✓</div></div></div>`).join('')}
        <div class="slbl">RESOLVED TONIGHT</div>
        ${[['Late arrival dispute — resolved 9:15 PM'],['Dress code enforcement — 2 guests asked to leave'],['Overcrowding zone B — redistributed'],['VIP queue conflict — managed calmly']].map(t=>`
          <div class="li"><div class="li-av" style="background:rgba(52,199,89,.15);color:var(--green);font-size:12px">✅</div><div class="li-txt"><div class="li-name" style="font-size:7.5px">${t}</div></div></div>`).join('')}
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni on">⚠️<span>Alerts</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ delay(600,()=>toast('🚨','New Alert!','Altercation near Section B bar counter')); }
  },
  { label:'Shift Stats', callouts:[{id:'lc1',tag:'SHIFT',val:'6hrs',title:'On Duty',sub:'6 PM to midnight',hi:true},{id:'lc2',tag:'SCANNED',val:'247',title:'Total Entry',sub:'All personally verified'},{id:'rc1',tag:'INCIDENTS',val:'2',title:'Events Logged',sub:'Both resolved successfully',hi:true},{id:'rc2',tag:'RATING',val:'4.8⭐',title:'Performance',sub:'Owner scored your shift'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">Shift Summary</span></div>
      <div class="sbody">
        <div class="card red-b" style="text-align:center;padding:14px">
          <div style="font-size:9px;color:#FF6B6B;font-weight:700;letter-spacing:2px;margin-bottom:4px">TONIGHT'S SHIFT</div>
          <div style="font-size:14px;font-weight:900;color:#fff">Ravi · Entry Head</div>
          <div style="font-size:7.5px;color:var(--grey-l);margin-top:3px">6:00 PM – 12:00 AM · ABO Bar CBE</div>
        </div>
        <div class="srow">
          <div class="sbox r"><div class="sn red">247</div><div class="sl2">Scanned</div></div>
          <div class="sbox"><div class="sn">2</div><div class="sl2">Incidents</div></div>
          <div class="sbox g"><div class="sn grn">4.8⭐</div><div class="sl2">Rating</div></div>
        </div>
        <div class="slbl">PERFORMANCE</div>
        ${[['QR Scan Speed','Excellent','g'],['ID Verification','Good','g'],['Queue Management','Excellent','g'],['Incident Handling','Good','g'],['Communication','Excellent','g']].map(([k,v,c])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <div style="font-size:8px;color:var(--grey-l)">${k}</div>
            <div class="tag ${c}">${v}</div>
          </div>`).join('')}
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni on">📊<span>Stats</span></div></div>`,
    anim(){ delay(900,()=>toast('📊','Shift Summary Ready','4.8⭐ performance rating tonight')); }
  },
  { label:'Blacklist', callouts:[{id:'lc1',tag:'FLAGGED',val:'14',title:'Blacklisted',sub:'Banned from this venue',hi:true},{id:'lc2',tag:'NETWORK',val:'28',title:'Network Bans',sub:'Flagged across ABO bars'},{id:'rc1',tag:'NEW FLAG',val:'1',title:'Added Tonight',sub:'Aggressive behaviour',hi:true},{id:'rc2',tag:'CLEARED',val:'2',title:'Appeals Passed',sub:'Reinstated by owner'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">🚫 Blacklist</span></div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox r"><div class="sn red">14</div><div class="sl2">This Venue</div></div>
          <div class="sbox"><div class="sn">28</div><div class="sl2">Network</div></div>
          <div class="sbox g"><div class="sn grn">2</div><div class="sl2">Cleared</div></div>
        </div>
        <div class="slbl">BANNED LIST</div>
        ${[['AM','Aggressive at bar','Permanent','r'],['SK','Fake ID attempt','6 months','r'],['Unknown','Tonight — behaviour','Pending','y'],['RK','Past altercation','3 months','r'],['PP','Dress code refusal','1 week','y']].map(([i,r,d,c])=>`
          <div class="li"><div class="li-av" style="background:rgba(255,59,48,.15);color:var(--red)">${i}</div><div class="li-txt"><div class="li-name">${r}</div><div class="li-sub">Ban: ${d}</div></div><div class="tag ${c}">${c==='r'?'🚫 Banned':'⏳ Review'}</div></div>`).join('')}
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni on">🚫<span>Ban List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ delay(700,()=>toast('🚫','Blacklist Check!','Unknown male flagged — cross-referencing')); }
  },
  { label:'Dress Code', callouts:[{id:'lc1',tag:'ENFORCED',val:'✅',title:'Dress Policy Active',sub:'Smart casual required',hi:true},{id:'lc2',tag:'DENIED',val:'4',title:'Entry Refused',sub:'Dress code violation tonight'},{id:'rc1',tag:'POLICY',val:'No Slippers',title:'Strict Rules',sub:'No shorts, no vests',hi:true},{id:'rc2',tag:'VIP EXEMPT',val:'6',title:'VIP Bypassed',sub:'Owner-approved exceptions'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">Dress Code</span></div>
      <div class="sbody">
        <div class="card red-b">
          <div style="font-size:9px;font-weight:800;color:#fff;margin-bottom:8px">🎽 DRESS CODE POLICY</div>
          ${[['✅','Formal Shirts','Required for men'],['✅','Smart Casual','Allowed'],['✅','Cocktail Dresses','Ladies welcome'],['❌','Slippers / Flip-flops','Strictly not allowed'],['❌','Shorts & Vests','Entry refused'],['❌','Sports Jerseys','Not permitted']].map(([s,t,d])=>`
            <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04)">
              <div style="font-size:10px">${s}</div>
              <div><div style="font-size:7.5px;font-weight:700;color:#fff">${t}</div><div style="font-size:6.5px;color:var(--grey)">${d}</div></div>
            </div>`).join('')}
        </div>
        <div class="srow">
          <div class="sbox r"><div class="sn red">4</div><div class="sl2">Denied</div></div>
          <div class="sbox g"><div class="sn grn">243</div><div class="sl2">Passed</div></div>
          <div class="sbox"><div class="sn">98%</div><div class="sl2">Pass Rate</div></div>
        </div>
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni on">👔<span>Dress</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ delay(800,()=>toast('👔','Dress Code Active','Smart casual policy enforced tonight')); }
  },
  { label:'Emergency', callouts:[{id:'lc1',tag:'EXITS',val:'4',title:'Emergency Exits',sub:'All clear and accessible',hi:true},{id:'lc2',tag:'FIRE',val:'Safe',title:'Fire Alert Status',sub:'All sensors nominal'},{id:'rc1',tag:'MEDICAL',val:'1st Aid',title:'Kit Location',sub:'Near main bar counter',hi:true},{id:'rc2',tag:'SECURITY',val:'2',title:'Guards On Duty',sub:'Ravi + Kumar tonight'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">🚨 Emergency</span></div>
      <div class="sbody">
        <div class="card" style="background:rgba(52,199,89,.08);border-color:rgba(52,199,89,.4);display:flex;align-items:center;gap:8px">
          <div style="font-size:20px">🟢</div>
          <div><div style="font-size:9px;font-weight:800;color:var(--green)">ALL CLEAR</div><div style="font-size:7px;color:var(--grey)">No active emergencies at this time</div></div>
        </div>
        <div class="slbl">EMERGENCY CONTACTS</div>
        ${[['🚒','Fire Dept','101'],['🚑','Ambulance','108'],['👮','Police','100'],['🏥','Nearest Hospital','Kovai Medical · 0.8km']].map(([i,n,c])=>`
          <div class="li"><div style="font-size:16px">${i}</div><div class="li-txt"><div class="li-name">${n}</div><div class="li-sub">${c}</div></div><div class="btn blue" style="font-size:7px;padding:4px 8px;border-radius:8px">Call</div></div>`).join('')}
        <div class="slbl">EXIT MAP</div>
        <div class="card" style="text-align:center;padding:12px">
          <div style="font-size:7.5px;color:var(--grey-l);line-height:1.8">Main Exit: Front Gate<br>Emergency Exit 1: Kitchen side<br>Emergency Exit 2: Terrace stairs<br>Emergency Exit 3: Back alley</div>
        </div>
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni on">🚨<span>SOS</span></div><div class="ni">📊<span>Stats</span></div></div>`,
    anim(){ delay(800,()=>toast('🟢','All Clear!','No emergencies · All exits accessible')); }
  },
  { label:'End of Shift', callouts:[{id:'lc1',tag:'SIGN OFF',val:'12:00',title:'Shift Complete',sub:'Midnight handover done',hi:true},{id:'lc2',tag:'HANDOVER',val:'✅',title:'Next Team Ready',sub:'Night shift handed over'},{id:'rc1',tag:'SUMMARY',val:'247',title:'Total Entries',sub:'Clean shift · well managed',hi:true},{id:'rc2',tag:'PAYMENT',val:'₹1,200',title:'Shift Pay',sub:'Credited via ABO Network'}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc red">Shift End</span></div>
      <div class="sbody" style="align-items:center;justify-content:center">
        <div class="card red-b" style="width:100%;text-align:center;padding:16px">
          <div style="font-size:36px;margin-bottom:8px">🎉</div>
          <div style="font-size:11px;font-weight:900;color:#fff;margin-bottom:4px">Shift Complete!</div>
          <div style="font-size:7.5px;color:var(--grey-l);margin-bottom:12px">6:00 PM – 12:00 AM · ABO Bar CBE</div>
          <div class="srow">
            <div class="sbox r"><div class="sn red">247</div><div class="sl2">Entries</div></div>
            <div class="sbox g"><div class="sn grn">4.8⭐</div><div class="sl2">Rating</div></div>
            <div class="sbox"><div class="sn" style="color:var(--gold)">₹1,200</div><div class="sl2">Pay</div></div>
          </div>
          <div style="margin-top:12px;background:rgba(52,199,89,.1);border:1px solid rgba(52,199,89,.3);border-radius:9px;padding:8px;font-size:7.5px;color:var(--green)">✅ Handover complete to night shift team</div>
          <div style="margin-top:8px;display:flex;gap:5px;">
            <div class="btn grn fill" style="background:var(--green);color:#000;border-color:var(--green)">Sign Out</div>
            <div class="btn red">View Full Report</div>
          </div>
        </div>
      </div>
      <div class="snav red"><div class="ni">📷<span>Scan</span></div><div class="ni">📋<span>List</span></div><div class="ni">⚠️<span>Alerts</span></div><div class="ni on">📊<span>Done</span></div></div>`,
    anim(){ delay(600,()=>toast('🎉','Shift Complete!','₹1,200 credited to your ABO wallet')); }
  },
],

/* Simple stubs for other roles with 10 screens each */
event: Array.from({length:10},(_,i)=>({
  label:['Overview','Bookings','Guests','Seating','Promotions','Notifications','Revenue','Vendors','Timeline','Post-Event'][i],
  callouts:[{id:'lc1',tag:'EVENT',val:'Salsa 🎺',title:'Tonight\'s Event',sub:'Live now · 28 guests in',hi:true},{id:'lc2',tag:'REVENUE',val:`₹${(i+1)*2}K`,title:'Running Total',sub:'Growing every hour'},{id:'rc1',tag:'CAPACITY',val:`${70+i*2}%`,title:'Hall Filling',sub:'Seats going fast',hi:true},{id:'rc2',tag:'SCREEN',val:`${i+1}/10`,title:'Eventier Screen',sub:`Feature ${i+1} of 10`}],
  html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc orange">🎉 Eventier</span></div>
    <div class="shero" style="background:linear-gradient(135deg,#1A0800,#0C0C0C)">
      <div class="sh-lbl" style="color:#FFAA70">EVENTIER · ${'Overview,Bookings,Guests,Seating,Promotions,Notifications,Revenue,Vendors,Timeline,Post-Event'.split(',')[i].toUpperCase()}</div>
      <div class="sh-title">Salsa Night 🎺</div>
      <div class="sh-sub" style="display:flex;align-items:center;gap:4px"><span class="ld"></span>Live · June 3 · 6 PM · ABO Bar CBE</div>
    </div>
    <div class="sbody">
      <div class="ev-banner"><div class="evb-big">ABO</div><div class="evb-sub">ALL · BAR · ONE</div></div>
      <div class="srow">
        <div class="sbox hi"><div class="sn" id="ev-bk${i}">0</div><div class="sl2">Bookings</div></div>
        <div class="sbox g"><div class="sn grn">28</div><div class="sl2">Checked In</div></div>
        <div class="sbox"><div class="sn" style="color:var(--orange)">${70+i*2}%</div><div class="sl2">Capacity</div></div>
      </div>
      <div class="slbl">ACTIVITY FEED</div>
      <div id="evf-${i}" style="display:flex;flex-direction:column;gap:3px;flex:1;overflow:hidden"></div>
    </div>
    <div class="snav orange"><div class="ni on">🏠<span>Home</span></div><div class="ni">📅<span>Events</span></div><div class="ni">👥<span>Guests</span></div><div class="ni">📊<span>Reports</span></div></div>`,
  anim(){ countUp(`ev-bk${i}`,42+i,1500);
    const f=el(`evf-${i}`); if(!f)return;
    [['🎟','Booking confirmed — Ravi & Party'],['👤','Guest checked in via QR'],['📣','Event promoted to 3,200 followers'],['💰','Revenue milestone: ₹'+((i+1)*2)+'K reached']].forEach((m,j)=>delay(400+j*500,()=>appendFeed(f,m[0],m[1],'#FF8C42')));
    delay(900,()=>toast('🎉',`Eventier: ${'Overview,Bookings,Guests,Seating,Promotions,Notifications,Revenue,Vendors,Timeline,Post-Event'.split(',')[i]}`,'Salsa Night running smoothly'));
  }
})),

waiter: Array.from({length:10},(_,i)=>{
  const activeIdx = [1, 0, 2, 0, 0, 0, 3, 0, 1, 0][i];
  const navHTML = `
    <div class="snav blue">
      <div class="ni${activeIdx === 0 ? ' on' : ''}">🏠<span>Dashboard</span></div>
      <div class="ni${activeIdx === 1 ? ' on' : ''}">🪑<span>Tables</span></div>
      <div class="ni${activeIdx === 2 ? ' on' : ''}">📷<span>Scan</span></div>
      <div class="ni${activeIdx === 3 ? ' on' : ''}">🏷<span>Offers</span></div>
    </div>`;
  return {
    label:['My Tables','Active Orders','New Order','KOT','Bill & Pay','Guest Requests','Tips','Special Req.','Reservations','Shift End'][i],
    callouts:[{id:'lc1',tag:'TABLES',val:'6',title:'My Section',sub:'Tables 4–9 assigned',hi:true},{id:'lc2',tag:'ORDERS',val:`${3+i}`,title:'Pending',sub:'Need attention now'},{id:'rc1',tag:'TIPS',val:'⭐ 4.8',title:'My Rating',sub:'Guests love your service',hi:true},{id:'rc2',tag:'SCREEN',val:`${i+1}/10`,title:'Waiter Screen',sub:`Feature ${i+1} of 10`}],
    html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc blue">🍽 Waiter</span></div>
      <div class="shero" style="background:linear-gradient(135deg,#001428,#0C0C0C)">
        <div class="sh-lbl" style="color:#64B5F6">WAITER · ${'MY TABLES,ORDERS,NEW ORDER,KOT,BILL,REQUESTS,TIPS,SPECIAL,RESERVATIONS,SHIFT END'.split(',')[i]}</div>
        <div class="sh-title">Section: Tables 4–9</div>
        <div class="sh-sub">22 Guests · ABO Bar CBE</div>
      </div>
      <div class="sbody">
        <div class="srow">
          <div class="sbox b"><div class="sn blue">6</div><div class="sl2">My Tables</div></div>
          <div class="sbox"><div class="sn" id="wo-n${i}">0</div><div class="sl2">Orders</div></div>
          <div class="sbox g"><div class="sn grn">4.8⭐</div><div class="sl2">Rating</div></div>
        </div>
        <div class="tbl-grid">
          ${[4,5,6,7,8,9].map((n,j)=>`<div class="tbl-cell ${j<3?'busy':j<5?'active':'done'}"><span class="tn">${n}</span>Tbl</div>`).join('')}
          ${[10,11].map(n=>`<div class="tbl-cell"><span class="tn">${n}</span>Empty</div>`).join('')}
        </div>
        <div class="slbl">ORDER STATUS</div>
        <div id="wof-${i}" style="display:flex;flex-direction:column;gap:3px;flex:1;overflow:hidden"></div>
      </div>
      ${navHTML}`,
    anim(){ countUp(`wo-n${i}`,3+i,1400);
      const f=el(`wof-${i}`); if(!f)return;
      [['🍹','Table 5 · Cocktail Platter — Preparing'],['🍺','Table 7 · Beer Pitcher x2 — Ready! ✅'],['🍽','Table 4 · Fish Tacos x3 — Preparing'],['💳','Table 6 · Bill requested']].forEach((m,j)=>delay(300+j*450,()=>appendFeed(f,m[0],m[1],'var(--blue)')));
      delay(900,()=>toast('🍽',`Waiter: ${'My Tables,Orders,New Order,KOT,Bill,Requests,Tips,Special,Reservations,Shift End'.split(',')[i]}`,'Table 7 order ready to serve'));
    }
  };
}),

valet: Array.from({length:10},(_,i)=>({
  label:['Vehicle Queue','Park Vehicle','Slot Map','Return Car','Key Manager','Damage Check','Payment','Stats','Assignments','Shift End'][i],
  callouts:[{id:'lc1',tag:'PARKED',val:'18',title:'Vehicles Parked',sub:`Slots A1–A${i+8} occupied`,hi:true},{id:'lc2',tag:'QUEUE',val:`${3+i}`,title:'Awaiting Park',sub:'Avg park time: 3 min'},{id:'rc1',tag:'RETURNED',val:'7',title:'Keys Handed',sub:'No damage tonight',hi:true},{id:'rc2',tag:'SCREEN',val:`${i+1}/10`,title:'Valet Screen',sub:`Feature ${i+1} of 10`}],
  html:`<div class="sh"><span class="sl">ABO<b>TRIBE</b></span><span class="sc green">🚗 Valet</span></div>
    <div class="shero" style="background:linear-gradient(135deg,#001408,#0C0C0C)">
      <div class="sh-lbl" style="color:#69D98B">VALET · ${'QUEUE,PARK,SLOT MAP,RETURN,KEYS,DAMAGE,PAYMENT,STATS,ASSIGN,SHIFT END'.split(',')[i]}</div>
      <div class="sh-title">Parking Operations</div>
      <div class="sh-sub">ABO Bar CBE · ${18+i} vehicles managed</div>
    </div>
    <div class="sbody">
      <div class="srow">
        <div class="sbox g"><div class="sn grn" id="vl-p${i}">0</div><div class="sl2">Parked</div></div>
        <div class="sbox"><div class="sn">${3+i}</div><div class="sl2">Queue</div></div>
        <div class="sbox"><div class="sn">7</div><div class="sl2">Returned</div></div>
      </div>
      <div class="slbl">VEHICLE LOG</div>
      <div id="vlf-${i}" style="display:flex;flex-direction:column;gap:3px;flex:1;overflow:hidden"></div>
      <div style="background:linear-gradient(135deg,var(--green),#27AE60);color:#000;font-size:7.5px;font-weight:800;padding:7px;border-radius:11px;text-align:center;margin-top:4px">🚗 Scan & Log Vehicle</div>
    </div>
    <div class="snav green"><div class="ni on">🏠<span>Home</span></div><div class="ni">🚗<span>Cars</span></div><div class="ni">🔑<span>Keys</span></div><div class="ni">📊<span>Stats</span></div></div>`,
  anim(){ countUp(`vl-p${i}`,18+i,1500);
    const f=el(`vlf-${i}`); if(!f)return;
    [['🚗','KA-09-AB-1234 · Parked Slot A3'],['🚗','TN-11-ZZ-8800 · Parked Slot A7'],['🔑','MH-04-CG-5521 · Key returned ✅'],['🚗','KA-01-VK-2211 · Awaiting slot']].forEach((m,j)=>delay(300+j*450,()=>appendFeed(f,m[0],m[1],'var(--green)')));
    delay(900,()=>toast('🚗',`Valet: ${'Queue,Park,Slot Map,Return,Keys,Damage,Payment,Stats,Assign,Shift End'.split(',')[i]}`,'Vehicle logged to Slot A3'));
  }
})),
};

/* ─── FEED / UTILITY HELPERS ─────────────────────── */
function el(id){ return document.getElementById(id); }
function delay(ms,fn){ return setTimeout(fn,ms); }
let feedIv = null;
function countUp(id,target,dur){
  const e=el(id); if(!e)return;
  const s=performance.now();
  (function tick(now){ const p=Math.min((now-s)/dur,1); e.textContent=Math.round((1-Math.pow(1-p,3))*target); if(p<1)requestAnimationFrame(tick); })(s);
}
function appendFeed(container,icon,text,borderColor){
  if(!container)return;
  const old=container.querySelectorAll('.fi-item');
  if(old.length>=4) gsap.to(old[0],{opacity:0,height:0,marginBottom:0,duration:.25,onComplete:()=>old[0].remove()});
  const d=document.createElement('div');
  d.className='fi-item';
  d.style.cssText=`display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:7px;background:#151515;border-left:2px solid ${borderColor};margin-bottom:3px;font-size:8px;color:#aaa;opacity:0;transform:translateX(-10px);transition:opacity .4s,transform .4s;`;
  d.innerHTML=`<span style="font-size:12px;flex-shrink:0">${icon}</span><span>${text}</span>`;
  container.appendChild(d);
  requestAnimationFrame(()=>{ d.style.opacity='1'; d.style.transform='none'; });
}

/* ─── CALLOUT CARDS ─────────────────────────────── */
function renderCallouts(data){
  ['lc1','lc2','rc1','rc2'].forEach(id=>{ const c=el(id); if(c){c.classList.remove('in','hi'); c.innerHTML=''; }});
  delay(150,()=>{
    data.forEach((d,i)=>{
      const c=el(d.id); if(!c)return;
      c.style.setProperty('--cc-color',ROLE_META[currentRole].color);
      if(d.hi)c.classList.add('hi');
      c.innerHTML=`${d.tag?`<div class="co-tag" style="color:${ROLE_META[currentRole].color}">${d.tag}</div>`:''}${d.val?`<div class="co-val">${d.val}</div>`:''}${d.title?`<div class="co-title">${d.title}</div>`:''}${d.sub?`<div class="co-sub">${d.sub}</div>`:''}`;
      delay(i*90,()=>c.classList.add('in'));
    });
  });
}

/* ─── SCREEN RENDERING ──────────────────────────── */
function renderScreen(roleKey,idx){
  clearInterval(feedIv);
  const sc=SCREENS[roleKey][idx];
  if(!sc)return;
  const wrap=el('ph-wrap');
  if(!wrap)return;

  // Slide out existing
  const old=wrap.querySelector('.phs.active');
  if(old){ old.classList.add('exit-left'); delay(350,()=>old.remove()); }

  // Inject new screen
  const d=document.createElement('div');
  d.className='phs';
  d.innerHTML=sc.html;
  wrap.appendChild(d);
  delay(30,()=>d.classList.add('active'));

  // Render callouts
  renderCallouts(sc.callouts);

  // Run animation
  delay(200,()=>{ if(sc.anim)sc.anim(); });

  // Screen label
  const lbl=el('scr-label'); if(lbl)lbl.textContent=`${idx+1}/${SCREENS[roleKey].length} · ${sc.label}`;

  // Dots
  updateDots(roleKey,idx);
}

function updateDots(role,idx){
  const dc=el('scr-dots'); if(!dc)return;
  dc.innerHTML='';
  SCREENS[role].forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='sd'+(i===idx?' on':'');
    d.style.setProperty('--role-color',ROLE_META[role].color);
    d.onclick=()=>goScreen(i);
    dc.appendChild(d);
  });
}

/* ─── NAVIGATION ────────────────────────────────── */
let screenIdx=0;

window.goScreen=function(idx){
  screenIdx=idx;
  renderScreen(currentRole,screenIdx);
  startProgress();
  resetAutoScreen();
};
window.nextScreen=()=>goScreen((screenIdx+1)%SCREENS[currentRole].length);
window.prevScreen=()=>goScreen((screenIdx-1+SCREENS[currentRole].length)%SCREENS[currentRole].length);

window.selectRole=function(role){
  currentRole=role;
  screenIdx=0;
  const meta=ROLE_META[role];

  // Update CSS variable for role color
  document.documentElement.style.setProperty('--role-color',meta.color);

  // Tab active state
  document.querySelectorAll('.rtab').forEach(t=>{
    t.classList.toggle('active',t.dataset.role===role);
    t.style.setProperty('--role-color',meta.color);
  });
  document.querySelectorAll('.rtab.active').forEach(t=>{ t.style.background=meta.color; t.style.borderColor=meta.color; });
  document.querySelectorAll('.rtab:not(.active)').forEach(t=>{ t.style.background='none'; t.style.borderColor='transparent'; });

  // Update mobile role selector text and style
  const mobileSel = el('mobile-role-selector');
  if (mobileSel) {
    const roleTextSpan = mobileSel.querySelector('.m-active-role-text');
    if (roleTextSpan) {
      const emojiMap = { owner: '👑', dj: '🎧', event: '🎉', bouncer: '🚪', waiter: '🍽', valet: '🚗' };
      const cleanName = ROLE_META[role].label.replace(' Dashboard', '').replace(' Console', '').replace(' / Bouncer', '').replace(' Driver', '');
      roleTextSpan.textContent = `${emojiMap[role] || ''} ${cleanName}`;
    }
    mobileSel.style.setProperty('--role-color', meta.color);
  }

  // Update drawer options active state
  document.querySelectorAll('.drawer-opt').forEach(opt => {
    const isActive = opt.dataset.role === role;
    opt.classList.toggle('active', isActive);
    if (isActive) {
      opt.style.setProperty('--opt-color', meta.color);
    } else {
      opt.style.removeProperty('--opt-color');
    }
  });

  // Glow
  el('pglow').style.background=meta.glowBg;

  renderScreen(role,0);
  startProgress();
  resetAutoScreen();
};

window.openDrawer = function() {
  const drawer = el('bottom-drawer');
  const overlay = el('drawer-overlay');
  const selector = el('mobile-role-selector');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  if (selector) selector.classList.add('active');
};

window.closeDrawer = function() {
  const drawer = el('bottom-drawer');
  const overlay = el('drawer-overlay');
  const selector = el('mobile-role-selector');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  if (selector) selector.classList.remove('active');
};

window.selectRoleMobile = function(role) {
  window.selectRole(role);
  window.closeDrawer();
};

let autoScreenTm=null;
const SCR_DUR=5000;
function startProgress(){ const f=el('prog-f'); if(!f)return; f.style.transition='none'; f.style.width='0%'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ f.style.transition=`width ${SCR_DUR}ms linear`; f.style.width='100%'; })); }
function resetAutoScreen(){ clearInterval(autoScreenTm); autoScreenTm=setInterval(window.nextScreen,SCR_DUR); }

/* ─── TOAST ─────────────────────────────────────── */
let toastTm2;
function toast(icon,title,sub){
  clearTimeout(toastTm2);
  el('t-i').textContent=icon; el('t-t').textContent=title; el('t-s').textContent=sub;
  const t=el('toast'); t.classList.add('on');
  toastTm2=setTimeout(()=>t.classList.remove('on'),3500);
}

/* ─── KEYBOARD ──────────────────────────────────── */
document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight')window.nextScreen(); if(e.key==='ArrowLeft')window.prevScreen(); });
let tx=0;
document.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;},{passive:true});
document.addEventListener('touchend',e=>{ const d=tx-e.changedTouches[0].clientX; if(Math.abs(d)>50) d>0?window.nextScreen():window.prevScreen(); });

/* ─── CLOCK ─────────────────────────────────────── */
function updateClock(){ const n=new Date(); const h=n.getHours().toString().padStart(2,'0'); const m=n.getMinutes().toString().padStart(2,'0'); const e=el('ph-time'); if(e)e.textContent=`${h}:${m}`; }
updateClock(); setInterval(updateClock,30000);

/* ─── INIT ──────────────────────────────────────── */
document.documentElement.style.setProperty('--role-color',ROLE_META.owner.color);
selectRole('owner');
