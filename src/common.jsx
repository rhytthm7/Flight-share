// TripRoom — shared visual primitives (avatars, cursors, presence, icons)

const TR = (...xs) => xs.filter(Boolean).join(" ");

function Icon({ name, size=18, color="currentColor", style }) {
  const s = { width:size, height:size, flexShrink:0, ...style };
  const sw = 1.8;
  const map = {
    plus: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
    chev: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
    chevL: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>,
    chevDown: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
    close: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
    plane: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M21 16v-2l-8.5-5V3.5a1.5 1.5 0 10-3 0V9L1 14v2l8.5-2.5V19L7 20.5V22l4.5-1L16 22v-1.5L13.5 19v-5.5L21 16z"/></svg>,
    share: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>,
    qr: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v3M14 17v4h3M17 21h4"/></svg>,
    lock: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
    lockFill: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 8V7a3 3 0 116 0v3H9z"/></svg>,
    heart: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M12 21s-7-4.5-9.5-9C.8 8 3 4 6.5 4c1.8 0 3.4 1 4.5 2.5C12.1 5 13.7 4 15.5 4 19 4 21.2 8 19.5 12 17 16.5 12 21 12 21z"/></svg>,
    thumb: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M2 11h4v10H2zM23 11.5c0-1-.8-1.5-1.7-1.5H15l.9-4.5c.2-1-.5-2-1.5-2-.5 0-.9.2-1.2.6L8 11v10h11c.8 0 1.5-.5 1.7-1.3L23 12.5c0-.4 0-.7-.0-1z"/></svg>,
    bolt: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
    money: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>,
    bell: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>,
    check: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
    sparkle: <svg viewBox="0 0 24 24" style={s} fill={color}><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM19 14l.7 2.3 2.3.7-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14zM5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5L5 16z"/></svg>,
    users: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    pin: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    cab: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l1.5-6a3 3 0 013-2h9a3 3 0 013 2L21 17M5 17h14v3H5v-3z"/><circle cx="7" cy="14" r="1.5"/><circle cx="17" cy="14" r="1.5"/></svg>,
    bag: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="14" rx="2"/><path d="M9 7V5a3 3 0 016 0v2"/></svg>,
    sun: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>,
    seat: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M5 5v9a3 3 0 003 3h10M9 19h12M9 19l-1-2h13"/></svg>,
    swap: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/></svg>,
    cal: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>,
    upi: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M5 7h10a3 3 0 010 6H7"/></svg>,
    split: <svg viewBox="0 0 24 24" style={s} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v3a6 6 0 006 6h0a6 6 0 006-6V3M6 21v-3a6 6 0 016-6h0a6 6 0 016 6v3"/></svg>,
  };
  return map[name] || null;
}

function Avatar({ m, size="md", showStatus=false }) {
  return (
    <span className={"av " + (size==="md"?"":size)} style={{background:m.color}}>
      {m.short}
      {showStatus && m.here && <span className="dot"/>}
    </span>
  );
}

function AvatarStack({ members, size="md", max=5 }) {
  const visible = members.slice(0, max);
  const rest = members.length - visible.length;
  return (
    <span className={"av-stack " + (size==="sm"?"sm":"")}>
      {visible.map(m => <Avatar key={m.id} m={m} size={size}/>)}
      {rest > 0 && <span className={"av " + (size==="sm"?"sm":"")} style={{background:"#fff",color:"var(--text-tertiary)",fontSize:size==="sm"?9:11,fontWeight:700,border:"1px solid var(--n-200)",boxShadow:"none"}}>+{rest}</span>}
    </span>
  );
}

// Live cursor SVG — pointer + label
function Cursor({ x, y, color, name, offsetTop=0, offsetLeft=0 }) {
  return (
    <div className="cursor" style={{transform:`translate(${x+offsetLeft}px,${y+offsetTop}px)`,transition:"transform 1.2s cubic-bezier(.4,.8,.4,1)"}}>
      <svg width="20" height="22" viewBox="0 0 20 22">
        <path d="M2 1.5L17 11l-7 1.5-3 7L2 1.5z" fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
      <span className="lbl" style={{background:color}}>{name}</span>
    </div>
  );
}

// Logo mark
function TripRoomLogo({ size="md" }) {
  return (
    <span className="tr-logo" style={size==="lg"?{fontSize:18,gap:8}:{}}>
      <span className="mark" style={size==="lg"?{width:24,height:24,fontSize:13,borderRadius:8}:{}}>T</span>
      <span><span className="ix">ixigo</span> <span className="room">TripRoom</span></span>
    </span>
  );
}

// Section header
function Section({ title, right, children, style }) {
  return (
    <div style={{padding:"0 16px",...style}}>
      {title && <div className="row" style={{justifyContent:"space-between",marginBottom:10,alignItems:"baseline"}}>
        <div className="t-l tx-700">{title}</div>
        {right}
      </div>}
      {children}
    </div>
  );
}

// Airline fin (colored square w/ code)
function AirlineFin({ code, color }) {
  return <span className="airline-fin" style={{background:color}}>{code}</span>;
}

// Currency formatter (Indian grouping)
const inr = (n) => "₹" + n.toLocaleString("en-IN");

// Mini live-cursor animator hook
function useLiveCursors(memberIds, bounds) {
  const [positions, setPositions] = React.useState(() => {
    const o = {};
    memberIds.forEach((id,i) => {
      o[id] = { x: 30 + i*40, y: 60 + i*30 };
    });
    return o;
  });
  React.useEffect(() => {
    const ids = setInterval(() => {
      setPositions(prev => {
        const next = { ...prev };
        memberIds.forEach(id => {
          const tx = 20 + Math.random() * (bounds.w - 60);
          const ty = 40 + Math.random() * (bounds.h - 100);
          next[id] = { x: tx, y: ty };
        });
        return next;
      });
    }, 2400 + Math.random()*1000);
    return () => clearInterval(ids);
  }, []);
  return positions;
}

Object.assign(window, { TR, Icon, Avatar, AvatarStack, Cursor, TripRoomLogo, Section, AirlineFin, inr, useLiveCursors });
