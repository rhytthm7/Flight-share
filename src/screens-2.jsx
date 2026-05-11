// TripRoom — screens 4-7: Room (flight discovery), Consensus, Fare Freeze, Booking, Ledger

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// ─────────────────────────────────────────────────────────────
// ROOM — shared flight discovery with live cursors, votes, reactions
// ─────────────────────────────────────────────────────────────
function ScreenRoom({ trip, members, flights, reactions, aiMode, voteState, onSelectFlight, onLockFare, onOpenLedger, onOpenNudges, lockedFlightId, fareTimer }) {
  const [tab, setTab] = useS2("flights");
  const presentMembers = members.filter(m=>m.here);

  // Live cursor positions — fake them
  const [cursors, setCursors] = useS2(()=>({
    an:{x:60,y:180}, ka:{x:180,y:320}, mi:{x:90,y:480}, sa:{x:220,y:240}, vi:{x:140,y:540}, ny:{x:200,y:400},
  }));
  useE2(()=>{
    const ids = setInterval(()=>{
      setCursors(p=>{
        const next = {};
        Object.keys(p).forEach(k=>{
          next[k] = { x: 30 + Math.random()*260, y: 100 + Math.random()*460 };
        });
        return next;
      });
    }, 2200);
    return ()=>clearInterval(ids);
  },[]);

  // Floating reactions
  const [bursts, setBursts] = useS2([]);
  useE2(()=>{
    const id = setInterval(()=>{
      const r = reactions[Math.floor(Math.random()*reactions.length)];
      const fid = Math.random()<0.55 ? "6e-bkk" : (Math.random()<0.6 ? "mh-kul" : "tg-bkk");
      const m = members.find(x=>x.id===r.by);
      setBursts(b=>[...b, { id:Math.random(), fid, emoji:r.emoji, color:m?.color }]);
    }, 2800);
    return ()=>clearInterval(id);
  },[]);
  useE2(()=>{
    if (!bursts.length) return;
    const t = setTimeout(()=>setBursts(b=>b.slice(1)), 1700);
    return ()=>clearTimeout(t);
  },[bursts]);

  // Vote state branching
  const showConsensus = voteState === "consensus" || voteState === "locked";
  const topFlight = flights[0];
  const totalVotes = flights.reduce((a,f)=>a+f.votes.length,0);

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--n-50)",position:"relative",overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"6px 16px 0",background:"#fff",borderBottom:"1px solid var(--n-100)",zIndex:5,position:"relative"}}>
        <div className="row" style={{justifyContent:"space-between",height:44}}>
          <button style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
            <Icon name="chevL" size={22} color="var(--text-primary)"/>
          </button>
          <div className="row gap-6"><span className="live-dot"/><span className="t-xs tx-700">LIVE</span></div>
          <button onClick={onOpenNudges} style={{border:0,background:"var(--n-50)",borderRadius:99,padding:"6px 8px",cursor:"pointer",position:"relative"}}>
            <Icon name="bell" size={18} color="var(--text-secondary)"/>
            <span style={{position:"absolute",top:4,right:4,width:8,height:8,borderRadius:99,background:"var(--r-500)",boxShadow:"0 0 0 1.5px #fff"}}/>
          </button>
        </div>
        <div style={{padding:"0 0 10px"}}>
          <div className="row" style={{justifyContent:"space-between",alignItems:"flex-end"}}>
            <div>
              <div className="t-2xl tx-700" style={{letterSpacing:"-0.01em",lineHeight:"26px"}}>Phuket reunion ✈️</div>
              <div className="t-s sec" style={{marginTop:2}}>{trip.from} → {trip.to} · {trip.depart} – {trip.returnDate.replace("Wed, ","")}</div>
            </div>
            <AvatarStack members={presentMembers} size="sm" max={4}/>
          </div>
        </div>

        {/* Fare freeze banner */}
        {lockedFlightId && fareTimer && (
          <div style={{margin:"0 -16px",padding:"8px 16px",background:"linear-gradient(90deg, var(--o-50), #FFE0C9)",borderTop:"1px solid var(--o-200)",display:"flex",alignItems:"center",gap:10}}>
            <span style={{width:24,height:24,borderRadius:99,background:"var(--o-500)",display:"flex",alignItems:"center",justifyContent:"center"}} className="lock-pulse">
              <Icon name="lockFill" size={12} color="#fff"/>
            </span>
            <div style={{flex:1}}>
              <div className="t-xs tx-700 brand">FARE LOCKED · {fareTimer}</div>
              <div className="t-xs" style={{color:"var(--o-700)"}}>IndiGo 02:55 · ₹28,499 held for the group</div>
            </div>
            <button className="pill" style={{background:"#fff",border:"1px solid var(--o-200)",color:"var(--o-700)",fontSize:11,padding:"4px 8px"}}>+5m</button>
          </div>
        )}

        {/* Tabs */}
        <div className="room-tabs" style={{marginBottom:10,background:"var(--n-50)",border:"1px solid var(--n-100)"}}>
          {[["flights","Flights",flights.length],["chat","Chat",3],["members","Members",members.filter(m=>m.here).length+"/"+members.length],["pay","Pay",""]].map(([k,l,n])=>
            <button key={k} onClick={()=>setTab(k)} className={tab===k?"on":""}>
              {l} {n && <span style={{opacity:0.65,marginLeft:2}}>{n}</span>}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="scroll" style={{flex:1,padding:"12px 16px 100px",position:"relative"}}>
        {/* AI co-pilot */}
        {aiMode !== "subtle" && (
          <AICopilot mode={aiMode} voteState={voteState} flights={flights} members={members}/>
        )}
        {aiMode === "subtle" && (
          <AICopilot mode="subtle" voteState={voteState} flights={flights} members={members}/>
        )}

        {/* Filter chips */}
        <div className="row gap-6" style={{margin:"14px 0 12px",overflowX:"auto",paddingBottom:2}}>
          <span className="chip brand" style={{flexShrink:0}}>Cheapest first</span>
          <span className="chip" style={{flexShrink:0}}>Non-stop</span>
          <span className="chip" style={{flexShrink:0}}>Morning</span>
          <span className="chip" style={{flexShrink:0}}>IndiGo</span>
          <span className="chip" style={{flexShrink:0}}>Refundable</span>
        </div>

        {/* Group voting summary */}
        <div className="row" style={{justifyContent:"space-between",marginBottom:8,padding:"0 2px"}}>
          <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em"}}>4 flights · {totalVotes} votes</div>
          <button className="row gap-4" style={{border:0,background:"transparent",cursor:"pointer",color:"var(--tr-600)",font:"600 12px/1 var(--font-sans)"}}>
            <Icon name="sparkle" size={12} color="var(--tr-600)"/> Sort by group fit
          </button>
        </div>

        {/* Flight tiles */}
        <div className="col gap-10" style={{position:"relative"}}>
          {flights.map(f=>{
            const myId = members[0].id;
            const myVote = f.votes.includes(myId);
            const voters = f.votes.map(v=>members.find(m=>m.id===v)).filter(Boolean);
            const flightBursts = bursts.filter(b=>b.fid===f.id);
            const isConsensus = showConsensus && f.id===topFlight.id;
            const isLocked = lockedFlightId === f.id;
            return (
              <div key={f.id} className={"f-tile " + (isLocked?"locked":isConsensus?"consensus":"")} onClick={()=>!isLocked && onSelectFlight(f)} style={{cursor:"pointer",position:"relative"}}>
                {/* Top badges */}
                <div className="row" style={{justifyContent:"space-between",marginBottom:8}}>
                  <div className="row gap-8">
                    <AirlineFin code={f.code} color={f.fin}/>
                    <div>
                      <div className="t-s tx-700">{f.airline}</div>
                      <div className="t-xs muted">{f.num}</div>
                    </div>
                  </div>
                  <div className="row gap-4">
                    {f.meta.includes("Cheapest") && <span className="chip success">Cheapest</span>}
                    {f.meta.includes("Fastest") && <span className="chip brand">Fastest</span>}
                    {isConsensus && <span className="chip tr"><Icon name="sparkle" size={11} color="var(--tr-600)"/> Group pick</span>}
                    {isLocked && <span className="chip" style={{background:"var(--o-100)",color:"var(--o-700)",borderColor:"var(--o-300)"}}><Icon name="lockFill" size={11} color="var(--o-600)"/> Locked</span>}
                  </div>
                </div>

                {/* Route */}
                <div className="row" style={{alignItems:"flex-start",marginBottom:8}}>
                  <div style={{minWidth:54}}>
                    <div className="t-l tx-700">{f.dep}</div>
                    <div className="t-xs muted">{f.depAp}</div>
                  </div>
                  <div style={{flex:1,padding:"0 10px"}}>
                    <div className="row" style={{alignItems:"center",gap:6}}>
                      <span style={{width:6,height:6,borderRadius:99,background:"var(--n-300)"}}/>
                      <span style={{flex:1,height:1,background:"var(--n-200)",position:"relative"}}>
                        <Icon name="plane" size={12} color="var(--o-500)" style={{position:"absolute",left:"50%",top:-6,transform:"translateX(-50%) rotate(0deg)",background:"var(--n-50)",padding:"0 2px"}}/>
                      </span>
                      <span style={{width:6,height:6,borderRadius:99,background:"var(--n-300)"}}/>
                    </div>
                    <div className="t-xs muted" style={{textAlign:"center",marginTop:2}}>{f.dur} · {f.stops}</div>
                  </div>
                  <div style={{minWidth:54,textAlign:"right"}}>
                    <div className="t-l tx-700">{f.arr}</div>
                    <div className="t-xs muted">{f.arrAp}</div>
                  </div>
                </div>

                {/* Vote row + price */}
                <div className="row" style={{justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--n-100)",paddingTop:10}}>
                  <div className="row gap-6">
                    <button onClick={(e)=>{e.stopPropagation();}} className={"vote-chip " + (myVote?"voted":"")}>
                      {voters.length>0 && <AvatarStack members={voters} size="sm" max={3}/>}
                      {voters.length===0 && <Icon name="thumb" size={11} color="var(--text-tertiary)" style={{marginLeft:2}}/>}
                      {voters.length>0 ? voters.length : "Vote"}
                    </button>
                    {f.votes.length>0 && <span className="t-xs sec">{Math.round(f.votes.length/members.length*100)}% group</span>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="t-xl tx-700">{inr(f.price)}</div>
                    <div className="t-xs muted">/person</div>
                  </div>
                </div>

                {/* Vote progress bar */}
                {f.votes.length>0 && (
                  <div className="vote-bar" style={{marginTop:8}}>
                    <i style={{width:(f.votes.length/members.length*100)+"%"}}/>
                  </div>
                )}

                {/* Reaction bursts */}
                {flightBursts.map(b=>
                  <span key={b.id} className="react-burst" style={{right:24+Math.random()*40,bottom:24,color:b.color}}>{b.emoji}</span>
                )}

                {/* Locked actions */}
                {isLocked && (
                  <div className="row gap-8" style={{marginTop:10}}>
                    <button onClick={(e)=>{e.stopPropagation();onSelectFlight(f);}} className="btn btn-primary" style={{flex:1,height:42,borderRadius:12}}>Confirm & pay</button>
                    <button className="btn btn-secondary" style={{height:42,borderRadius:12,padding:"0 14px"}}>Extend</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lock fare CTA */}
        {voteState === "consensus" && !lockedFlightId && (
          <div style={{marginTop:14,background:"#fff",border:"1.5px solid var(--o-300)",borderRadius:18,padding:14,boxShadow:"0 8px 20px rgba(252,121,13,0.15)"}}>
            <div className="row gap-10" style={{marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:"var(--gradient-brand)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"var(--shadow-brand)"}}>
                <Icon name="lockFill" size={16} color="#fff"/>
              </div>
              <div style={{flex:1}}>
                <div className="t-m tx-700">Lock this fare for the group?</div>
                <div className="t-xs sec">Hold ₹28,499 for 30 minutes while everyone confirms.</div>
              </div>
            </div>
            <button onClick={onLockFare} className="btn btn-primary" style={{width:"100%",height:46,borderRadius:12,fontSize:15}}>
              Lock fare · ₹99 for the group
            </button>
          </div>
        )}

        {/* Live cursors overlay */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          {Object.entries(cursors).slice(0,3).map(([id,p])=>{
            const m = members.find(x=>x.id===id);
            if (!m || !m.here) return null;
            return <Cursor key={id} x={p.x} y={p.y} color={m.color} name={m.name}/>;
          })}
        </div>
      </div>

      {/* Members footer */}
      <div className="room-footer">
        <AvatarStack members={presentMembers} size="md" max={5}/>
        <div style={{flex:1,minWidth:0}}>
          <div className="t-s tx-700" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {presentMembers.length} in room
          </div>
          <div className="t-xs muted typing">
            <span>Aanya is typing</span><i/><i/><i/>
          </div>
        </div>
        <button onClick={onOpenLedger} style={{border:"1px solid var(--n-200)",background:"#fff",borderRadius:12,padding:"8px 12px",font:"600 12px/1 var(--font-sans)",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <Icon name="split" size={14} color="var(--text-primary)"/>
          Ledger
        </button>
      </div>
    </div>
  );
}

// AI Co-pilot card — adapts to mode
function AICopilot({ mode, voteState, flights, members }) {
  const top = flights[0];
  const voterCount = top.votes.length;
  const cheapest = [...flights].sort((a,b)=>a.price-b.price)[0];
  const savings = (flights[3].price - top.price) * members.length;

  if (mode === "subtle") {
    return (
      <div className="copilot subtle">
        <div className="row gap-10">
          <div className="ai-orb"/>
          <div style={{flex:1}}>
            <div className="t-s tx-700">{voterCount} of {members.length} prefer IndiGo 02:55</div>
            <div className="t-xs sec" style={{marginTop:2}}>Saves the group {inr(savings)} vs Singapore Airlines</div>
          </div>
        </div>
      </div>
    );
  }
  if (mode === "copilot") {
    return (
      <div className="copilot">
        <div className="row gap-10" style={{position:"relative",zIndex:1,alignItems:"flex-start"}}>
          <div className="ai-orb"/>
          <div style={{flex:1}}>
            <div className="t-xs tx-600" style={{opacity:0.85,letterSpacing:"0.06em",textTransform:"uppercase"}}>ixigo AI · co-pilot</div>
            <div className="t-l tx-700" style={{margin:"4px 0 8px",lineHeight:"22px"}}>
              {voterCount}/{members.length} prefer IndiGo 02:55. <span style={{opacity:0.85}}>It saves the group {inr(savings)}.</span>
            </div>
            <div className="row gap-6" style={{marginBottom:10,flexWrap:"wrap"}}>
              <span style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:99,padding:"4px 8px",font:"600 11px/1 var(--font-sans)"}}>✓ Cheapest after votes</span>
              <span style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:99,padding:"4px 8px",font:"600 11px/1 var(--font-sans)"}}>✓ Arrives before 3 PM</span>
              <span style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:99,padding:"4px 8px",font:"600 11px/1 var(--font-sans)"}}>✓ 5 seats together</span>
            </div>
            <div className="row gap-8">
              <button style={{flex:1,height:38,borderRadius:10,border:0,background:"#fff",color:"var(--tr-700)",font:"700 13px/1 var(--font-sans)",cursor:"pointer"}}>Lock fare for group</button>
              <button style={{height:38,borderRadius:10,border:"1px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.1)",color:"#fff",font:"600 13px/1 var(--font-sans)",padding:"0 12px",cursor:"pointer"}}>Why?</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // hero
  return (
    <div className="copilot">
      <div className="row gap-10" style={{position:"relative",zIndex:1}}>
        <div className="ai-orb"/>
        <div style={{flex:1}}>
          <div className="t-xs tx-600" style={{opacity:0.8}}>ixigo AI</div>
          <div className="t-m tx-700" style={{lineHeight:"20px",marginTop:2}}>
            {voterCount}/{members.length} prefer IndiGo 02:55 — saves {inr(savings)} for the group
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenRoom, AICopilot });
