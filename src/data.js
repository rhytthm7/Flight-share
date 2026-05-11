// TripRoom — mock data for Delhi → Phuket, 5 friends
window.TR_DATA = {
  trip: {
    from: "DEL", fromCity: "Delhi", fromAirport: "Indira Gandhi Intl",
    to:   "HKT", toCity:   "Phuket", toAirport: "Phuket Intl",
    depart: "Fri, 19 Jun", returnDate: "Wed, 24 Jun",
    pax: "5 adults · Economy",
    nights: 5,
  },

  // host first
  members: [
    { id:"rh", name:"Rhytthm", short:"R", color:"var(--m-1)", role:"Host", here:true, status:"viewing flights" },
    { id:"an", name:"Aanya",   short:"A", color:"var(--m-2)", here:true, status:"typing" },
    { id:"ka", name:"Kabir",   short:"K", color:"var(--m-3)", here:true, status:"voting" },
    { id:"mi", name:"Mira",    short:"M", color:"var(--m-4)", here:true, status:"viewing" },
    { id:"de", name:"Devansh", short:"D", color:"var(--m-5)", here:false, status:"last seen 4m" },
    { id:"sa", name:"Sara",    short:"S", color:"var(--m-6)", here:true, status:"viewing" },
    { id:"vi", name:"Vir",     short:"V", color:"var(--m-7)", here:true, status:"viewing" },
    { id:"ny", name:"Nyra",    short:"N", color:"var(--m-8)", here:false, status:"last seen 1h" },
  ],

  flights: [
    {
      id:"6e-bkk", code:"6E", airline:"IndiGo", num:"6E 1075 + 6E 1031", route:"via Bangkok",
      dep:"02:55", arr:"14:20", depAp:"DEL", arrAp:"HKT", dur:"10h 55m", stops:"1 stop · BKK 2h 10m",
      price:28499, fin:"#0A2767",
      // vote-by-member-id
      votes:["rh","ka","mi","sa"],
      meta:["Refundable","Free meal"],
    },
    {
      id:"mh-kul", code:"MH", airline:"Malindo Air", num:"OD 207 + OD 553", route:"via Kuala Lumpur",
      dep:"23:45", arr:"13:50+1", depAp:"DEL", arrAp:"HKT", dur:"11h 35m", stops:"1 stop · KUL 3h 00m",
      price:26980, fin:"#FFC72C",
      votes:["an","vi"],
      meta:["Cheapest","Red-eye"],
    },
    {
      id:"tg-bkk", code:"TG", airline:"Thai Airways", num:"TG 316 + TG 215", route:"via Bangkok",
      dep:"09:30", arr:"19:55", depAp:"DEL", arrAp:"HKT", dur:"9h 55m", stops:"1 stop · BKK 1h 30m",
      price:34200, fin:"#5E1A8E",
      votes:[],
      meta:["Fastest","Free meal"],
    },
    {
      id:"sq-sin", code:"SQ", airline:"Singapore Air", num:"SQ 403 + TR 730", route:"via Singapore",
      dep:"21:30", arr:"15:40+1", depAp:"DEL", arrAp:"HKT", dur:"14h 40m", stops:"1 stop · SIN 4h 20m",
      price:42850, fin:"#F0AC2E",
      votes:[],
      meta:["Premium"],
    },
  ],

  reactions: [
    { flightId:"6e-bkk", by:"ka", emoji:"❤️" },
    { flightId:"6e-bkk", by:"mi", emoji:"👍" },
    { flightId:"mh-kul", by:"an", emoji:"💸" },
    { flightId:"tg-bkk", by:"ka", emoji:"⏱️" },
  ],

  // Ledger entries — Phuket trip splits
  ledger: [
    { id:1, who:"rh", what:"Flight booking · IndiGo (group of 5)", amount:142495, perHead:28499, paid:["rh"] },
    { id:2, who:"an", what:"Phuket villa · 3 nights",              amount:54000,  perHead:10800, paid:["an","rh","ka"] },
    { id:3, who:"ka", what:"Airport transfer · 2 cars",            amount:8400,   perHead:1680,  paid:["ka"] },
    { id:4, who:"mi", what:"Phi Phi day tour",                     amount:18500,  perHead:3700,  paid:[] },
  ],

  nudges: [
    { id:"n1", kind:"fare", text:"Fare for IndiGo 02:55 increased by ₹420 in the last hour. Lock now to save the group ₹2,100." },
    { id:"n2", kind:"member", text:"Devansh hasn't opened TripRoom in 4h. Send a nudge?" },
    { id:"n3", kind:"consensus", text:"4 of 5 members prefer IndiGo 02:55 — it saves the group ₹14,605 vs Thai Airways." },
  ],
};
