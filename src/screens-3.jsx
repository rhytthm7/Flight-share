// TripRoom — Fare freeze moment, booking, ledger, post-booking, nudges

const { useState: useS3, useEffect: useE3 } = React;

// ─────────────────────────────────────────────────────────────
// FARE FREEZE — full screen moment when lock is triggered
// ─────────────────────────────────────────────────────────────
function FareLockMoment({ onDone }) {
  const [stage, setStage] = useS3(0);
  useE3(()=>{
    const t1 = setTimeout(()=>setStage(1), 700);
    const t2 = setTimeout(()=>setStage(2), 1500);
    const t3 = setTimeout(()=>onDone && onDone(), 2700);
    return ()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return (
    <div className="lock-stage">
      <div className="lock-orb">
        <Icon name="lockFill" size={56} color="#fff"/>
      </div>
      <div style={{height:24}}/>
      <div className="t-3xl tx-700" style={{textAlign:"center",letterSpacing:"-0.02em"}}>
        {stage<1 ? "Locking the fare…" : stage<2 ? "Fare locked!" : "Holding ₹28,499"}
      </div>
      <div className="t-m sec" style={{textAlign:"center",marginTop:8,maxWidth:280}}>
        {stage<2 ? "ixigo is holding this fare for the group while everyone confirms." : "Held for 29:58. We'll nudge the group to pay."}
      </div>

      {/* Sparkles around orb */}
      {stage>=1 && [...Array(8)].map((_,i)=>
        <span key={i} className="sparkle" style={{
          top: "30%", left: "50%",
          transform:`translate(${Math.cos(i/8*Math.PI*2)*90}px, ${Math.sin(i/8*Math.PI*2)*90}px)`,
          background: i%2 ? "var(--tr-500)" : "var(--o-500)",
          animationDelay: (i*0.05)+"s",
        }}/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOOKING SHEET — individual pay vs split pay, then payment
// ─────────────────────────────────────────────────────────────
function ScreenBooking({ trip, members, flight, fareTimer, onClose, onConfirm, splitPayMode, setSplitPayMode }) {
  const [step, setStep] = useS3("review"); // review → payment → success
  const perHead = flight.price;
  const total = perHead * members.length;

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--n-50)"}}>
      <div style={{padding:"6px 16px",background:"#fff",borderBottom:"1px solid var(--n-100)"}}>
        <div className="row" style={{justifyContent:"space-between",height:44}}>
          <button onClick={onClose} style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
            <Icon name="chevL" size={22} color="var(--text-primary)"/>
          </button>
          <div className="row gap-6">
            <Icon name="lockFill" size={14} color="var(--o-600)"/>
            <span className="t-xs tx-700" style={{color:"var(--o-700)"}}>FARE LOCKED · {fareTimer}</span>
          </div>
          <span style={{width:32}}/>
        </div>
      </div>

      <div className="scroll" style={{flex:1,padding:"14px 16px 100px"}}>
        {step==="review" && <>
          {/* Flight summary */}
          <div className="f-tile locked" style={{padding:16}}>
            <div className="row gap-8" style={{marginBottom:10}}>
              <AirlineFin code={flight.code} color={flight.fin}/>
              <div style={{flex:1}}>
                <div className="t-m tx-700">{flight.airline}</div>
                <div className="t-xs muted">{flight.num} · {flight.route}</div>
              </div>
              <span className="chip" style={{background:"var(--o-100)",color:"var(--o-700)",borderColor:"var(--o-300)"}}>Locked</span>
            </div>
            <div className="row" style={{alignItems:"flex-start"}}>
              <div>
                <div className="t-xl tx-700">{flight.dep}</div>
                <div className="t-xs muted">{flight.depAp} · {trip.depart}</div>
              </div>
              <div style={{flex:1,padding:"0 14px",alignSelf:"center"}}>
                <div className="row gap-4" style={{alignItems:"center"}}>
                  <span style={{flex:1,height:1,background:"var(--n-200)"}}/>
                  <span className="t-xs muted" style={{whiteSpace:"nowrap"}}>{flight.dur}</span>
                  <span style={{flex:1,height:1,background:"var(--n-200)"}}/>
                </div>
                <div className="t-xxs muted" style={{textAlign:"center",fontSize:10,marginTop:2}}>{flight.stops}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="t-xl tx-700">{flight.arr}</div>
                <div className="t-xs muted">{flight.arrAp}</div>
              </div>
            </div>
          </div>

          {/* Pay mode toggle */}
          <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>How will the group pay?</div>
          <div className="col gap-10">
            {[
              {k:"individual", title:"Everyone pays separately", desc:"Each member completes their own booking with their own UPI/card.", icon:"users"},
              {k:"split", title:"One person books, others split", desc:"Rhytthm books for ₹"+(total/1000).toFixed(1)+"K. Others UPI their share to TripRoom ledger.", icon:"split", recommended:true},
            ].map(o=>
              <button key={o.k} onClick={()=>setSplitPayMode(o.k)} style={{
                width:"100%",textAlign:"left",cursor:"pointer",
                background:splitPayMode===o.k?"#fff":"rgba(255,255,255,0.6)",
                border:`1.5px solid ${splitPayMode===o.k?"var(--tr-400)":"var(--n-150)"}`,
                borderRadius:16,padding:14,
                boxShadow:splitPayMode===o.k?"0 0 0 4px rgba(107,77,236,0.1)":"none",
              }}>
                <div className="row gap-10" style={{alignItems:"flex-start"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:splitPayMode===o.k?"var(--tr-50)":"var(--n-50)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon name={o.icon} size={18} color={splitPayMode===o.k?"var(--tr-600)":"var(--text-secondary)"}/>
                  </div>
                  <div style={{flex:1}}>
                    <div className="row" style={{justifyContent:"space-between",alignItems:"baseline"}}>
                      <div className="t-m tx-700">{o.title}</div>
                      {o.recommended && <span className="chip tr" style={{height:20,padding:"0 8px",fontSize:10}}>AI pick</span>}
                    </div>
                    <div className="t-xs sec" style={{marginTop:4}}>{o.desc}</div>
                  </div>
                  <span style={{width:18,height:18,borderRadius:99,border:`6px solid ${splitPayMode===o.k?"var(--tr-500)":"var(--n-200)"}`,background:"#fff",flexShrink:0,marginTop:8}}/>
                </div>
              </button>
            )}
          </div>

          {/* Fare summary */}
          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14,marginTop:14}}>
            <div className="t-s tx-700" style={{marginBottom:8}}>Fare breakup</div>
            {[
              ["Base fare × 5", flight.price*5 - 5*450 - 2495],
              ["Taxes & fees × 5", 5*450 + 2495],
              ["TripRoom protection", 99],
            ].map(([k,v])=>
              <div key={k} className="row" style={{justifyContent:"space-between",padding:"4px 0"}}>
                <span className="t-s sec">{k}</span>
                <span className="t-s">{inr(v)}</span>
              </div>
            )}
            <div className="row" style={{justifyContent:"space-between",borderTop:"1px solid var(--n-100)",marginTop:8,paddingTop:10}}>
              <span className="t-m tx-700">Total · group</span>
              <span className="t-l tx-700">{inr(total + 99)}</span>
            </div>
            <div className="row" style={{justifyContent:"space-between",marginTop:4}}>
              <span className="t-xs muted">Per person</span>
              <span className="t-xs sec tx-600">{inr(Math.round((total+99)/members.length))}</span>
            </div>
          </div>

          {/* AI seating */}
          <div className="copilot subtle" style={{marginTop:14}}>
            <div className="row gap-10">
              <div className="ai-orb"/>
              <div style={{flex:1}}>
                <div className="t-s tx-700">5 seats together · Row 18 A-F</div>
                <div className="t-xs sec" style={{marginTop:2}}>AI seating optimizer reserved a block of 5 across the aisle. ₹0 extra.</div>
              </div>
              <button className="pill" style={{padding:"4px 10px",fontSize:11,border:"1px solid var(--tr-200)",color:"var(--tr-700)"}}>View</button>
            </div>
          </div>
        </>}

        {step==="payment" && splitPayMode==="split" && <>
          <div className="t-2xl tx-700" style={{marginTop:4,letterSpacing:"-0.01em"}}>You're booking for 5</div>
          <div className="t-s sec" style={{marginTop:4,marginBottom:14}}>The group will UPI ₹{Math.round(total/members.length).toLocaleString("en-IN")} each to your TripRoom ledger.</div>

          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14}}>
            <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Pay with</div>
            {[
              {k:"upi",t:"UPI · rhytthm@okhdfc",d:"Default",g:"#0884F2"},
              {k:"card",t:"HDFC Credit · ••4421",d:"5% TripRoom cashback",g:"#1F2937"},
            ].map((p,i)=>
              <div key={p.k} className="row gap-10" style={{padding:"10px 0",borderBottom:i===0?"1px solid var(--n-100)":"0"}}>
                <div style={{width:38,height:38,borderRadius:8,background:p.g,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Icon name={p.k==="upi"?"upi":"money"} size={18} color="#fff"/>
                </div>
                <div style={{flex:1}}>
                  <div className="t-s tx-600">{p.t}</div>
                  <div className="t-xs muted">{p.d}</div>
                </div>
                <span style={{width:18,height:18,borderRadius:99,border:`6px solid ${i===0?"var(--tr-500)":"var(--n-200)"}`,background:"#fff"}}/>
              </div>
            )}
          </div>

          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14,marginTop:14}}>
            <div className="t-s tx-700" style={{marginBottom:8}}>After you pay, ixigo will:</div>
            {["Book all 5 tickets at locked fare","Send UPI collect to 4 members","Track who has paid in the ledger","Auto-settle when everyone's in"].map((t,i)=>
              <div key={i} className="row gap-8" style={{padding:"4px 0",alignItems:"flex-start"}}>
                <Icon name="check" size={14} color="var(--g-500)" style={{marginTop:2}}/>
                <span className="t-s sec">{t}</span>
              </div>
            )}
          </div>
        </>}

        {step==="payment" && splitPayMode==="individual" && <>
          <div className="t-2xl tx-700" style={{marginTop:4,letterSpacing:"-0.01em"}}>Pay your share</div>
          <div className="t-s sec" style={{marginTop:4,marginBottom:14}}>You'll book your own ticket. ixigo will sync seats across the group.</div>

          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14,marginBottom:14}}>
            <div className="row" style={{justifyContent:"space-between"}}>
              <span className="t-s sec">Your share</span>
              <span className="t-xl tx-700">{inr(flight.price + 20)}</span>
            </div>
          </div>

          <div className="card" style={{background:"#fff",border:"1px solid var(--n-150)",borderRadius:16,padding:14}}>
            <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Group progress</div>
            {members.map((m,i)=>{
              const paid = i<2;
              return (
                <div key={m.id} className="row gap-10" style={{padding:"8px 0",borderBottom:i<members.length-1?"1px solid var(--n-100)":0}}>
                  <Avatar m={m} size="md"/>
                  <div style={{flex:1}}>
                    <div className="t-s tx-600">{m.name}</div>
                    <div className="t-xs muted">{paid?"Paid · seat 18"+["A","B","C","D","E"][i]:"Waiting"}</div>
                  </div>
                  {paid ? <span className="chip success">✓ Paid</span> : <span className="chip warn">⏱ Holding</span>}
                </div>
              );
            })}
          </div>
        </>}
      </div>

      <div style={{padding:"12px 16px 16px",background:"#fff",borderTop:"1px solid var(--n-100)"}}>
        {step==="review" && (
          <button onClick={()=>setStep("payment")} className="btn btn-primary" style={{width:"100%",height:54,borderRadius:14,fontSize:16,background:"var(--gradient-brand)"}}>
            Continue to payment · {inr(splitPayMode==="split" ? total+99 : flight.price+20)}
          </button>
        )}
        {step==="payment" && (
          <button onClick={onConfirm} className="btn btn-primary" style={{width:"100%",height:54,borderRadius:14,fontSize:16,background:"var(--gradient-brand)"}}>
            <Icon name="lockFill" size={14} color="#fff"/> Pay {inr(splitPayMode==="split" ? total+99 : flight.price+20)} securely
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEDGER — Splitwise-style
// ─────────────────────────────────────────────────────────────
function ScreenLedger({ members, ledger, onClose }) {
  const totalSpent = ledger.reduce((a,l)=>a+l.amount,0);
  const myId = members[0].id;
  const myDebts = ledger.filter(l=>l.who!==myId && !l.paid.includes(myId)).reduce((a,l)=>a+l.perHead,0);
  const owedToMe = ledger.filter(l=>l.who===myId).reduce((a,l)=>a+(members.length-l.paid.length)*l.perHead,0);

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--n-50)"}}>
      <div style={{padding:"6px 16px",background:"#fff",borderBottom:"1px solid var(--n-100)"}}>
        <div className="row" style={{justifyContent:"space-between",height:44}}>
          <button onClick={onClose} style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
            <Icon name="chevL" size={22} color="var(--text-primary)"/>
          </button>
          <div className="t-m tx-700">Trip ledger</div>
          <button style={{border:0,background:"transparent",cursor:"pointer"}}>
            <Icon name="plus" size={22} color="var(--text-primary)"/>
          </button>
        </div>
      </div>

      <div className="scroll" style={{flex:1,padding:"14px 16px 24px"}}>
        {/* Balance hero */}
        <div style={{background:"linear-gradient(135deg,#fff 0%, var(--tr-50) 100%)",border:"1px solid var(--tr-100)",borderRadius:18,padding:16}}>
          <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em"}}>Group spent</div>
          <div className="t-3xl tx-700" style={{margin:"4px 0",letterSpacing:"-0.02em"}}>{inr(totalSpent)}</div>
          <div className="row gap-12" style={{marginTop:10}}>
            <div style={{flex:1,background:"#fff",borderRadius:12,padding:"10px 12px",border:"1px solid var(--n-100)"}}>
              <div className="t-xs muted">You owe</div>
              <div className="t-l tx-700" style={{color:"var(--r-600)"}}>{inr(myDebts)}</div>
            </div>
            <div style={{flex:1,background:"#fff",borderRadius:12,padding:"10px 12px",border:"1px solid var(--n-100)"}}>
              <div className="t-xs muted">You're owed</div>
              <div className="t-l tx-700" style={{color:"var(--g-700)"}}>{inr(owedToMe)}</div>
            </div>
          </div>
        </div>

        {/* AI suggestion */}
        <div className="copilot" style={{marginTop:14}}>
          <div className="row gap-10" style={{position:"relative",zIndex:1}}>
            <div className="ai-orb"/>
            <div style={{flex:1}}>
              <div className="t-xs tx-600" style={{opacity:0.8}}>ixigo AI · settle smart</div>
              <div className="t-m tx-700" style={{marginTop:2,lineHeight:"20px"}}>3 transfers will settle everything</div>
              <div className="t-xs" style={{opacity:0.85,marginTop:4}}>Devansh → Rhytthm · ₹38,499. Mira → Aanya · ₹7,100. Kabir → Rhytthm · ₹26,819.</div>
            </div>
            <button style={{border:0,background:"#fff",color:"var(--tr-700)",font:"700 12px/1 var(--font-sans)",height:32,borderRadius:8,padding:"0 10px",cursor:"pointer",flexShrink:0}}>Settle</button>
          </div>
        </div>

        {/* Items */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>Expenses</div>
        <div style={{background:"#fff",borderRadius:16,padding:"4px 14px",border:"1px solid var(--n-150)"}}>
          {ledger.map(l=>{
            const owner = members.find(m=>m.id===l.who);
            const paid = l.paid.length;
            return (
              <div key={l.id} className="ledger-row">
                <Avatar m={owner} size="md"/>
                <div style={{flex:1,minWidth:0}}>
                  <div className="t-s tx-600" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{l.what}</div>
                  <div className="t-xs muted">{owner.name} paid · split 5 ways</div>
                  {/* Paid avatars */}
                  <div className="row gap-4" style={{marginTop:4}}>
                    <span className="t-xxs muted tx-600" style={{fontSize:10}}>{paid}/{members.length} paid</span>
                    <div className="vote-bar" style={{flex:1,height:4,maxWidth:80}}><i style={{width:(paid/members.length*100)+"%"}}/></div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="t-s tx-700">{inr(l.amount)}</div>
                  <div className="t-xs muted">{inr(l.perHead)}/p</div>
                </div>
              </div>
            );
          })}
        </div>

        <button style={{width:"100%",marginTop:12,padding:"14px",background:"#fff",border:"1.5px dashed var(--n-200)",borderRadius:14,color:"var(--text-tertiary)",font:"600 14px/1 var(--font-sans)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Icon name="plus" size={16} color="var(--text-tertiary)"/> Add an expense
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// POST-BOOKING — TripRoom persists as itinerary, reminders, etc
// ─────────────────────────────────────────────────────────────
function ScreenPostBooking({ trip, members, flight, onOpenLedger }) {
  const [tab, setTab] = useS3("itinerary");
  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"var(--n-50)"}}>
      {/* Header w/ confetti tint */}
      <div style={{background:"linear-gradient(180deg, var(--tr-50) 0%, transparent 100%)",padding:"6px 16px 0"}}>
        <div className="row" style={{justifyContent:"space-between",height:44}}>
          <button style={{border:0,background:"transparent",padding:8,marginLeft:-8,cursor:"pointer"}}>
            <Icon name="chevL" size={22} color="var(--text-primary)"/>
          </button>
          <div className="row gap-6"><span className="chip success">✓ All booked</span></div>
          <button style={{border:0,background:"transparent",cursor:"pointer"}}>
            <Icon name="share" size={20} color="var(--text-primary)"/>
          </button>
        </div>
        <div style={{padding:"4px 0 12px"}}>
          <div className="t-3xl tx-700" style={{letterSpacing:"-0.02em",lineHeight:"30px"}}>Phuket reunion ✈️</div>
          <div className="row gap-8" style={{marginTop:6}}>
            <AvatarStack members={members.slice(0,5)} size="sm" max={5}/>
            <span className="t-s sec">5 going · in 38 days</span>
          </div>
        </div>
        <div className="room-tabs" style={{marginBottom:12,background:"#fff"}}>
          {[["itinerary","Itinerary"],["chat","Chat"],["expenses","Ledger"],["docs","Docs"]].map(([k,l])=>
            <button key={k} onClick={()=>k==="expenses"?onOpenLedger():setTab(k)} className={tab===k?"on":""}>{l}</button>
          )}
        </div>
      </div>

      <div className="scroll" style={{flex:1,padding:"0 16px 24px"}}>
        {/* Countdown card */}
        <div style={{
          background:"linear-gradient(135deg,#3F25A8 0%, #6B4DEC 60%, #E85FB6 100%)",
          borderRadius:18,padding:16,color:"#fff",position:"relative",overflow:"hidden",
          boxShadow:"0 12px 28px rgba(107,77,236,0.3)",
        }}>
          {/* decorative plane */}
          <Icon name="plane" size={120} color="rgba(255,255,255,0.1)" style={{position:"absolute",right:-20,top:-10,transform:"rotate(35deg)"}}/>
          <div className="t-xs tx-600" style={{opacity:0.85,letterSpacing:"0.06em",textTransform:"uppercase"}}>Take off in</div>
          <div className="row" style={{alignItems:"baseline",gap:8,margin:"6px 0 12px"}}>
            <span className="t-3xl tx-700" style={{fontSize:42,lineHeight:"44px"}}>38</span>
            <span className="t-m tx-600" style={{opacity:0.85}}>days · 14h · 22m</span>
          </div>
          <div className="row" style={{alignItems:"center",gap:8,position:"relative",zIndex:1}}>
            <div style={{flex:1}}>
              <div className="t-s tx-700">{flight.airline} {flight.code}-{flight.num.split(" ")[1]}</div>
              <div className="t-xs" style={{opacity:0.85,marginTop:2}}>{trip.depart} · {flight.dep} from {flight.depAp}</div>
            </div>
            <button style={{height:34,padding:"0 12px",borderRadius:10,background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",font:"700 12px/1 var(--font-sans)",cursor:"pointer"}}>View ticket</button>
          </div>
        </div>

        {/* Itinerary timeline */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>Timeline</div>
        <div style={{background:"#fff",borderRadius:16,padding:"12px 14px",border:"1px solid var(--n-150)"}}>
          {[
            {when:"19 Jun · 02:55", what:"Flight DEL → BKK · IndiGo", sub:"5 seats · Row 18 A-F", icon:"plane", done:false, status:"On time"},
            {when:"19 Jun · 14:20", what:"Land in Phuket (HKT)", sub:"Layover at BKK 2h 10m", icon:"pin", done:false},
            {when:"19 Jun · 15:00", what:"Airport transfer · 2 cars", sub:"Booked · driver Aroon", icon:"cab", done:false},
            {when:"19–24 Jun", what:"Villa Saanti, Kata Beach", sub:"3 bedrooms · pool view", icon:"sun", done:false},
            {when:"22 Jun", what:"Phi Phi day tour", sub:"Pending booking · ₹3,700/p", icon:"bag", done:false, action:"Book"},
          ].map((it,i,arr)=>
            <div key={i} className="row gap-12" style={{paddingTop:i===0?2:0,paddingBottom:i===arr.length-1?2:6,alignItems:"flex-start"}}>
              <div className="col" style={{alignItems:"center",alignSelf:"stretch"}}>
                <div className="tl-dot"/>
                {i<arr.length-1 && <div className="tl-line"/>}
              </div>
              <div style={{flex:1,paddingBottom:i<arr.length-1?12:0}}>
                <div className="t-xs tx-600 sec">{it.when}</div>
                <div className="row" style={{justifyContent:"space-between",alignItems:"baseline",gap:8,marginTop:2}}>
                  <div className="t-s tx-700">{it.what}</div>
                  {it.status && <span className="chip success" style={{height:18,padding:"0 6px",fontSize:10}}>{it.status}</span>}
                  {it.action && <button className="pill" style={{padding:"4px 10px",fontSize:11,color:"var(--tr-700)",border:"1px solid var(--tr-200)"}}>{it.action}</button>}
                </div>
                <div className="t-xs muted">{it.sub}</div>
              </div>
            </div>
          )}
        </div>

        {/* Cross-sell strip */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>For the group</div>
        <div className="row gap-10" style={{overflowX:"auto",paddingBottom:4,margin:"0 -16px",padding:"0 16px 4px"}}>
          {[
            {t:"Travel insurance",sub:"Cover all 5 · ₹399/p",b:"#0770E4",i:"check"},
            {t:"Forex card",sub:"THB at live rate",b:"#00A854",i:"money"},
            {t:"Phi Phi tour",sub:"₹3,700/p · 5 spots",b:"#FC790D",i:"sun"},
            {t:"Airport lounge",sub:"Priority · free",b:"#6B4DEC",i:"sparkle"},
          ].map(c=>
            <div key={c.t} style={{flex:"none",width:160,background:"#fff",borderRadius:14,padding:12,border:"1px solid var(--n-150)"}}>
              <div style={{width:32,height:32,borderRadius:8,background:c.b,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}>
                <Icon name={c.i} size={16} color="#fff"/>
              </div>
              <div className="t-s tx-700">{c.t}</div>
              <div className="t-xs muted" style={{marginTop:2}}>{c.sub}</div>
            </div>
          )}
        </div>

        {/* Group chat snippet */}
        <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"22px 4px 10px"}}>Room chat</div>
        <div style={{background:"#fff",borderRadius:16,padding:12,border:"1px solid var(--n-150)"}}>
          {[
            {by:"an", text:"who's bringing the speaker 🔊"},
            {by:"ka", text:"i got snorkel masks for everyone"},
            {by:"mi", text:"villa wifi password — sharing in docs"},
          ].map((c,i,a)=>{
            const m = members.find(x=>x.id===c.by);
            return (
              <div key={i} className="row gap-10" style={{padding:"6px 0",borderBottom:i<a.length-1?"1px solid var(--n-100)":0,alignItems:"flex-start"}}>
                <Avatar m={m} size="sm"/>
                <div style={{flex:1}}>
                  <div className="t-xs tx-600 sec">{m.name}</div>
                  <div className="t-s">{c.text}</div>
                </div>
                <span className="t-xs muted">2m</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NUDGES — bottom sheet showing AI nudges + activity
// ─────────────────────────────────────────────────────────────
function ScreenNudges({ members, nudges, onClose }) {
  return (
    <>
      <div className="scrim" onClick={onClose}/>
      <div className="sheet" style={{maxHeight:"75%",display:"flex",flexDirection:"column"}}>
        <div className="handle"/>
        <div className="row" style={{justifyContent:"space-between",marginBottom:12}}>
          <div className="t-l tx-700">Activity</div>
          <button onClick={onClose} style={{border:0,background:"transparent",padding:4,cursor:"pointer"}}>
            <Icon name="close" size={20} color="var(--text-tertiary)"/>
          </button>
        </div>

        <div style={{flex:1,overflowY:"auto"}}>
          <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 8px"}}>AI nudges</div>
          <div className="col gap-8" style={{marginBottom:18}}>
            {nudges.map(n=>{
              const kindMeta = {
                fare:{i:"bolt",c:"var(--o-500)",label:"Fare alert"},
                member:{i:"users",c:"var(--tr-500)",label:"Member"},
                consensus:{i:"sparkle",c:"var(--g-500)",label:"Consensus"},
              }[n.kind];
              return (
                <div key={n.id} className="nudge">
                  <div className="ai-orb"/>
                  <div style={{flex:1}}>
                    <div className="row" style={{justifyContent:"space-between",marginBottom:4}}>
                      <span className="t-xs tx-700 tr">{kindMeta.label}</span>
                      <span className="t-xs muted">2m ago</span>
                    </div>
                    <div className="t-s" style={{color:"var(--text-secondary)"}}>{n.text}</div>
                    {n.kind==="fare" && <button className="pill" style={{marginTop:8,padding:"6px 12px",border:"1px solid var(--o-300)",color:"var(--o-700)",background:"var(--o-50)"}}><Icon name="lockFill" size={12} color="var(--o-600)"/> Lock now</button>}
                    {n.kind==="member" && <button className="pill" style={{marginTop:8,padding:"6px 12px",border:"1px solid var(--tr-200)",color:"var(--tr-700)"}}>Send nudge</button>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="t-xs tx-600 sec" style={{textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 8px"}}>Recent activity</div>
          <div className="col" style={{paddingBottom:24}}>
            {[
              {by:"ka",text:"voted for IndiGo 02:55",emoji:"❤️"},
              {by:"mi",text:"voted for IndiGo 02:55",emoji:"👍"},
              {by:"an",text:"reacted 💸 to Malindo flight"},
              {by:"sa",text:"joined the room"},
              {by:"rh",text:"created the room"},
            ].map((a,i)=>{
              const m = members.find(x=>x.id===a.by);
              return (
                <div key={i} className="row gap-10" style={{padding:"8px 0",borderBottom:i<4?"1px solid var(--n-100)":0,alignItems:"center"}}>
                  <Avatar m={m} size="md"/>
                  <div style={{flex:1}}>
                    <div className="t-s"><span className="tx-700">{m.name}</span> <span className="sec">{a.text}</span> {a.emoji && <span>{a.emoji}</span>}</div>
                  </div>
                  <span className="t-xs muted">{i*5+2}m</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { FareLockMoment, ScreenBooking, ScreenLedger, ScreenPostBooking, ScreenNudges });
