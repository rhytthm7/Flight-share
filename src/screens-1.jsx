// TripRoom — all screens

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// 1. Onboarding splash — first time users see TripRoom
// ─────────────────────────────────────────────────────────────
function ScreenOnboarding({ onCreate, members }) {
  return (
    <div style={{height:"100%",background:"var(--gradient-room-bg)",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      {/* Decorative orbs */}
      <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:999,background:"radial-gradient(circle, rgba(232,95,182,0.35), transparent 70%)"}}/>
      <div style={{position:"absolute",bottom:120,left:-60,width:240,height:240,borderRadius:999,background:"radial-gradient(circle, rgba(107,77,236,0.28), transparent 70%)"}}/>

      <div className="row" style={{justifyContent:"space-between",padding:"8px 16px 0"}}>
        <TripRoomLogo/>
        <button className="pill" onClick={onCreate} style={{background:"transparent",border:"none",boxShadow:"none",color:"var(--text-tertiary)"}}>
          Skip
        </button>
      </div>

      <div style={{flex:1,padding:"24px 20px",position:"relative",zIndex:1}}>
        {/* Hero illustration: stylized room with members */}
        <div style={{
          background:"#fff",borderRadius:24,padding:"24px 16px",
          boxShadow:"0 20px 40px rgba(107,77,236,0.18),0 4px 8px rgba(0,0,0,0.04)",
          position:"relative",marginTop:24,
        }}>
          {/* "Room" frame illustration */}
          <div style={{
            height:200,borderRadius:18,
            background:"linear-gradient(180deg,#FFF8F2 0%, #F2EEFF 100%)",
            border:"1px solid var(--n-100)",position:"relative",overflow:"hidden",
          }}>
            {/* Flight card preview floating in room */}
            <div style={{position:"absolute",top:24,left:20,right:60,background:"#fff",borderRadius:12,padding:"8px 10px",boxShadow:"var(--shadow-m)",display:"flex",alignItems:"center",gap:8,border:"1px solid var(--n-100)"}}>
              <div style={{width:22,height:22,borderRadius:6,background:"#0A2767",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",font:"800 9px/1 var(--font-sans)"}}>6E</div>
              <div style={{flex:1}}>
                <div style={{font:"700 11px/1 var(--font-sans)"}}>DEL → HKT</div>
                <div style={{font:"500 9px/1 var(--font-sans)",color:"var(--text-tertiary)",marginTop:3}}>02:55 · 1 stop · ₹28,499</div>
              </div>
              <div className="vote-chip voted" style={{height:18,padding:"0 6px 0 3px",fontSize:9}}>
                <span className="av sm" style={{background:"var(--m-1)",width:14,height:14,fontSize:7,boxShadow:"none"}}>R</span>
                4
              </div>
            </div>

            {/* Tiny vote chips below */}
            <div style={{position:"absolute",top:100,left:36,right:36,display:"flex",justifyContent:"space-between"}}>
              {[{c:"var(--m-3)",t:"❤️ Kabir"},{c:"var(--m-4)",t:"👍 Mira"},{c:"var(--m-6)",t:"💸 Sara"}].map((r,i)=>
                <div key={i} style={{background:"#fff",borderRadius:99,padding:"3px 8px",font:"600 9px/1 var(--font-sans)",boxShadow:"var(--shadow-xs)",border:"1px solid var(--n-100)",display:"flex",alignItems:"center",gap:4}}>
                  <span style={{width:8,height:8,borderRadius:99,background:r.c}}/>{r.t}
                </div>
              )}
            </div>

            {/* Cursors */}
            <div style={{position:"absolute",bottom:30,left:24}}>
              <svg width="18" height="20" viewBox="0 0 20 22"><path d="M2 1.5L17 11l-7 1.5-3 7L2 1.5z" fill="var(--m-2)" stroke="#fff" strokeWidth="1.2"/></svg>
              <div style={{background:"var(--m-2)",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:4,marginLeft:14,marginTop:-4,display:"inline-block"}}>Aanya</div>
            </div>
            <div style={{position:"absolute",bottom:60,right:32}}>
              <svg width="18" height="20" viewBox="0 0 20 22"><path d="M2 1.5L17 11l-7 1.5-3 7L2 1.5z" fill="var(--m-5)" stroke="#fff" strokeWidth="1.2"/></svg>
              <div style={{background:"var(--m-5)",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:4,marginLeft:14,marginTop:-4,display:"inline-block"}}>Devansh</div>
            </div>

            {/* AI orb peeking out */}
            <div className="copilot" style={{position:"absolute",bottom:8,left:8,right:8,padding:"6px 10px",borderRadius:10,display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 10px rgba(107,77,236,0.3)"}}>
              <div className="ai-orb" style={{width:18,height:18}}/>
              <div style={{font:"600 10px/12px var(--font-sans)",position:"relative",zIndex:1}}>4 of 5 prefer IndiGo 02:55 — saves ₹14,605</div>
            </div>
          </div>

          <h1 style={{font:"700 26px/30px var(--font-sans)",margin:"22px 0 8px",letterSpacing:"-0.02em"}}>
            Stop screenshotting flights in WhatsApp.
          </h1>
          <p style={{font:"500 14px/22px var(--font-sans)",color:"var(--text-secondary)",margin:0}}>
            <span style={{color:"var(--tr-700)",fontWeight:700}}>TripRoom</span> is multiplayer flight booking. Create a room, invite friends, vote, lock the fare, split the bill — all in one place.
          </p>
        </div>

        <div className="row gap-10" style={{marginTop:18,padding:"0 4px"}}>
          {[{t:"Vote on flights",i:"thumb",c:"var(--tr-500)"},{t:"Lock the fare",i:"lockFill",c:"var(--o-500)"},{t:"Split the bill",i:"split",c:"var(--g-500)"}].map(f =>
            <div key={f.t} className="col gap-4" style={{flex:1,alignItems:"center",textAlign:"center"}}>
              <div style={{width:38,height:38,borderRadius:12,background:"rgba(255,255,255,0.7)",border:"1px solid var(--n-100)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={f.i} size={18} color={f.c}/>
              </div>
              <div className="t-xs tx-600">{f.t}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{padding:"16px 20px 28px",position:"relative",zIndex:1}}>
        <button onClick={onCreate} className="btn btn-gradient" style={{width:"100%",height:54,borderRadius:16,font:"700 16px/1 var(--font-sans)",background:"var(--gradient-triproom)",boxShadow:"0 10px 24px rgba(107,77,236,0.35),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
          <Icon name="plus" size={18} color="#fff"/> Create TripRoom
        </button>
        <div className="t-xs muted" style={{textAlign:"center",marginTop:10}}>
          Already invited? <span style={{color:"var(--tr-600)",fontWeight:700}}>Open invite link</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Create TripRoom — search form expanded into "creating room" moment
// ─────────────────────────────────────────────────────────────
function ScreenCreate({ trip, onCreated, onBack }) {
  const [name, setName] = useState("Phuket reunion ✈️");
  const [tripKind, setTripKind] = useState("round");

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--n-50)"}}>
      <div style={{padding:"8px 16px 0",background:"#fff",borderBottom:"1px solid var(--n-100)"}}>
        <div className="row" style={{justifyContent:"space-between",height:44}}>
          <button onClick={onBack} style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
            <Icon name="chevL" size={22} color="var(--text-primary)"/>
          </button>
          <TripRoomLogo/>
          <span style={{width:32}}/>
        </div>
        <div style={{padding:"4px 0 14px"}}>
          <div className="t-2xl tx-700" style={{letterSpacing:"-0.01em"}}>New TripRoom</div>
          <div className="t-s sec" style={{marginTop:2}}>One room. Everyone sees the same flights, votes, and pays.</div>
        </div>
      </div>

      <div className="scroll" style={{flex:1,padding:"16px"}}>
        {/* Room name */}
        <div className="col gap-6" style={{marginBottom:14}}>
          <label className="t-xs tx-600 sec">Room name</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={{height:52,borderRadius:14,border:"1.5px solid var(--tr-200)",background:"#fff",padding:"0 16px",font:"700 16px/1 var(--font-sans)",outline:"none",boxShadow:"0 0 0 4px rgba(107,77,236,0.08)"}}
          />
        </div>

        {/* Trip type segmented */}
        <div style={{background:"var(--n-100)",borderRadius:99,padding:4,display:"flex",gap:2,marginBottom:14}}>
          {[["oneway","One-way"],["round","Round trip"],["multi","Multi-city"]].map(([k,l]) =>
            <button key={k} onClick={()=>setTripKind(k)} style={{
              flex:1,height:36,border:0,borderRadius:99,cursor:"pointer",
              background:tripKind===k?"#fff":"transparent",
              color:tripKind===k?"var(--text-primary)":"var(--text-tertiary)",
              font:"600 13px/1 var(--font-sans)",
              boxShadow:tripKind===k?"var(--shadow-xs)":"none",
            }}>{l}</button>
          )}
        </div>

        {/* From / To */}
        <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:0,marginBottom:14,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid var(--n-100)"}}>
            <div className="t-xs sec tx-600" style={{textTransform:"uppercase",letterSpacing:"0.06em"}}>From</div>
            <div className="row" style={{justifyContent:"space-between",marginTop:4}}>
              <div>
                <div className="t-xl tx-700">{trip.from} · {trip.fromCity}</div>
                <div className="t-xs muted">{trip.fromAirport}</div>
              </div>
              <button style={{border:"1px solid var(--n-200)",background:"#fff",width:36,height:36,borderRadius:99,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"var(--shadow-xs)"}}>
                <Icon name="swap" size={16} color="var(--o-600)"/>
              </button>
            </div>
          </div>
          <div style={{padding:"14px 16px"}}>
            <div className="t-xs sec tx-600" style={{textTransform:"uppercase",letterSpacing:"0.06em"}}>To</div>
            <div className="t-xl tx-700" style={{marginTop:4}}>{trip.to} · {trip.toCity}</div>
            <div className="t-xs muted">{trip.toAirport}</div>
          </div>
        </div>

        {/* Date + pax */}
        <div className="row gap-10" style={{marginBottom:14}}>
          <div className="card" style={{flex:1,background:"#fff",border:"1px solid var(--n-150)",borderRadius:14,padding:"12px 14px"}}>
            <div className="t-xs sec tx-600" style={{textTransform:"uppercase",letterSpacing:"0.06em"}}>Depart</div>
            <div className="t-m tx-700" style={{marginTop:4}}>{trip.depart}</div>
          </div>
          <div className="card" style={{flex:1,background:"#fff",border:"1px solid var(--n-150)",borderRadius:14,padding:"12px 14px"}}>
            <div className="t-xs sec tx-600" style={{textTransform:"uppercase",letterSpacing:"0.06em"}}>Return</div>
            <div className="t-m tx-700" style={{marginTop:4}}>{trip.returnDate}</div>
          </div>
        </div>

        <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div className="t-xs sec tx-600" style={{textTransform:"uppercase",letterSpacing:"0.06em"}}>Travellers</div>
            <div className="t-m tx-700" style={{marginTop:4}}>{trip.pax}</div>
          </div>
          <Icon name="chev" size={16} color="var(--text-tertiary)"/>
        </div>

        {/* Why TripRoom — collapsible feature row */}
        <div style={{background:"var(--tr-50)",border:"1px solid var(--tr-100)",borderRadius:16,padding:14,marginBottom:16}}>
          <div className="row gap-8" style={{marginBottom:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:"var(--gradient-triproom)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px rgba(107,77,236,0.3)"}}>
              <Icon name="users" size={14} color="#fff"/>
            </div>
            <div className="tx-700 t-m tr">Why a TripRoom?</div>
          </div>
          <div className="col gap-6">
            {[
              "Everyone sees the same flights in real time",
              "Vote, then AI picks the best option for the group",
              "Lock today's fare while friends decide",
              "Split the bill in-app · no Splitwise needed",
            ].map((t,i)=>
              <div key={i} className="row gap-6" style={{alignItems:"flex-start"}}>
                <Icon name="check" size={14} color="var(--tr-600)" style={{marginTop:2}}/>
                <div className="t-s sec" style={{flex:1}}>{t}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{padding:"12px 16px 16px",background:"#fff",borderTop:"1px solid var(--n-100)"}}>
        <button onClick={onCreated} className="btn btn-gradient" style={{width:"100%",height:52,borderRadius:14,font:"700 16px/1 var(--font-sans)",background:"var(--gradient-triproom)",boxShadow:"0 8px 20px rgba(107,77,236,0.32),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
          Create room & invite friends
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Invite — share sheet + QR
// ─────────────────────────────────────────────────────────────
function ScreenInvite({ trip, members, onSkip, onContinue }) {
  const host = members[0];
  const joined = members.filter(m => m.id !== host.id).slice(0, Math.min(2, members.length-1));
  const [copied, setCopied] = useState(false);

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--gradient-room-bg)"}}>
      <div className="row" style={{justifyContent:"space-between",padding:"8px 16px",height:52}}>
        <button onClick={onSkip} style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
          <Icon name="chevL" size={22} color="var(--text-primary)"/>
        </button>
        <div className="row gap-6"><span className="live-dot"/><span className="t-xs tx-600 tr">ROOM CREATED</span></div>
        <span style={{width:32}}/>
      </div>

      <div style={{padding:"4px 20px 18px"}}>
        <div className="t-3xl tx-700" style={{letterSpacing:"-0.02em",lineHeight:"30px"}}>Phuket reunion ✈️</div>
        <div className="t-s sec" style={{marginTop:6}}>{trip.from} → {trip.to} · {trip.depart} – {trip.returnDate}</div>
      </div>

      <div className="scroll" style={{flex:1,padding:"0 16px 16px"}}>
        {/* QR card */}
        <div style={{background:"#fff",borderRadius:24,padding:"22px 16px",boxShadow:"0 12px 32px rgba(107,77,236,0.16),0 2px 6px rgba(0,0,0,0.04)",display:"flex",alignItems:"center",gap:16}}>
          <div className="qr" style={{flexShrink:0,width:128,height:128}}>
            <i/>
            <div className="center"><span><Icon name="plane" size={20} color="var(--o-500)"/></span></div>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em"}}>Scan to join</div>
            <div className="t-m tx-700" style={{margin:"4px 0 8px"}}>ixigo.in/r/Phk-29D</div>
            <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="pill" style={{padding:"6px 10px",fontSize:11,border:"1px solid var(--tr-200)",color:"var(--tr-700)",background:copied?"var(--tr-50)":"#fff"}}>
              {copied ? <><Icon name="check" size={12} color="var(--tr-600)"/> Copied</> : <>Copy link</>}
            </button>
          </div>
        </div>

        {/* Share to apps */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 12px"}}>Or share to</div>
        <div className="row gap-12">
          {[
            {n:"WhatsApp",bg:"#25D366",g:<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M20.5 3.5A11.7 11.7 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A11.9 11.9 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22a9.9 9.9 0 01-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 012 12C2 6.5 6.5 2 12 2c2.7 0 5.2 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.4 10-9.9 10zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.4.8-1.4.1-.2.1-.3 0-.5L9.6 8c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.6-.7 1.9-1.3.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>},
            {n:"Instagram",bg:"linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)",g:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>},
            {n:"Telegram",bg:"#0088CC",g:<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M22 3L1 11l6 2 2 7 4-5 7 6 2-18z"/></svg>},
            {n:"iMessage",bg:"#34C759",g:<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C5.4 2 0 6.6 0 12c0 2.7 1.4 5.2 3.6 7v3.5l3.6-2c1.4.5 3 .7 4.8.7 6.6 0 12-4.6 12-10S18.6 2 12 2z"/></svg>},
            {n:"More",bg:"var(--n-100)",g:<Icon name="share" size={18} color="var(--text-secondary)"/>},
          ].map(s=>
            <div key={s.n} className="col gap-6" style={{flex:1,alignItems:"center"}}>
              <div style={{width:48,height:48,borderRadius:14,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.10)"}}>
                {s.g}
              </div>
              <div className="t-xs tx-600 sec">{s.n}</div>
            </div>
          )}
        </div>

        {/* Invite preview — what friends will see */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>Invite preview</div>
        <div style={{background:"#ECEFF3",borderRadius:14,padding:"10px 12px",marginBottom:14}}>
          {/* Mock WA message bubble */}
          <div style={{background:"#fff",borderRadius:10,padding:10,boxShadow:"var(--shadow-xs)",maxWidth:260}}>
            <div style={{background:"linear-gradient(135deg,#FC790D,#E85FB6,#6B4DEC)",borderRadius:8,padding:"10px",color:"#fff"}}>
              <div className="t-xs tx-700" style={{opacity:0.85}}>ixigo TripRoom</div>
              <div className="t-l tx-700" style={{margin:"2px 0"}}>{host.name} invited you to Phuket reunion ✈️</div>
              <div className="t-xs" style={{opacity:0.9}}>{trip.from} → {trip.to} · 19–24 Jun</div>
            </div>
            <div className="t-s sec" style={{marginTop:6}}>Plan together. Book together. Fly together.</div>
            <div className="t-xs" style={{color:"var(--tr-600)",fontWeight:700,marginTop:6}}>ixigo.in/r/Phk-29D</div>
          </div>
        </div>

        {/* Already joined */}
        {joined.length > 0 && (
          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14}}>
            <div className="row" style={{justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div className="t-s tx-700">{joined.length} joined · waiting for {Math.max(2, 5-joined.length-1)} more</div>
              <span className="live-dot"/>
            </div>
            {[host, ...joined].map(m=>
              <div key={m.id} className="row gap-10" style={{padding:"6px 0"}}>
                <Avatar m={m} size="md" showStatus/>
                <div style={{flex:1}}>
                  <div className="t-s tx-600">{m.name}{m.id===host.id && <span className="t-xs muted tx-500"> · you · host</span>}</div>
                  <div className="t-xs muted">Joined just now</div>
                </div>
                {m.id===host.id ? <span className="chip brand">Host</span> : <span className="chip success">✓ Joined</span>}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{padding:"12px 16px 16px",background:"rgba(255,255,255,0.7)",borderTop:"1px solid rgba(0,0,0,0.04)",backdropFilter:"blur(12px)"}}>
        <button onClick={onContinue} className="btn btn-gradient" style={{width:"100%",height:52,borderRadius:14,font:"700 16px/1 var(--font-sans)",background:"var(--gradient-triproom)",boxShadow:"0 8px 20px rgba(107,77,236,0.32),inset 0 1px 0 rgba(255,255,255,0.3)"}}>
          Enter the room
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenOnboarding, ScreenCreate, ScreenInvite });
