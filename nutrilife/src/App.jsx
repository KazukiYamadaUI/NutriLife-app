import { useState, useEffect, useRef, useCallback } from "react";

// ============ DESIGN TOKENS ============
const T = {
  green: "#1a5c3a", greenLight: "#e8f5ec", greenMid: "#2d8a5e",
  orange: "#d4710a", orangeLight: "#fff4e6", orangeBg: "#f97316",
  text: "#1a1a1a", textSub: "#4a4a4a", textMuted: "#6b6b6b",
  bg: "#f7f7f5", card: "#ffffff", border: "#d4d4d4",
  danger: "#c0392b", dangerLight: "#fde8e8",
  success: "#1a7a42", successLight: "#e8f8ee",
  blue: "#1d4ed8", blueLight: "#eff6ff",
  radius: 16, radiusSm: 12,
  fontHero: 32, fontTitle: 24, fontLarge: 20, fontBody: 18, fontSub: 16, fontSmall: 14,
  touchMin: 52,
};
const baseBtn = { border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" };

// ============ ICONS ============
const Icon = ({ children, size = 28, color = T.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const CameraIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></Icon>;
const HomeIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Icon>;
const ChartIcon = ({ size, color }) => <Icon size={size} color={color}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Icon>;
const SettingsIcon = ({ size, color }) => <Icon size={size} color={color}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
const UserIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const ArrowLeft = ({ size, color }) => <Icon size={size} color={color}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Icon>;
const ThumbUpIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></Icon>;
const ThumbDownIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></Icon>;
const LockIcon = ({ size, color }) => <Icon size={size} color={color}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const HeartIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65l.77.76L12 20.64l7.65-7.65.77-.76a5.4 5.4 0 0 0 0-7.65z"/></Icon>;
const ActivityIcon = ({ size, color }) => <Icon size={size} color={color}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>;
const LinkIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Icon>;
const CheckCircle = ({ size, color }) => <Icon size={size} color={color}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const RefreshIcon = ({ size, color }) => <Icon size={size} color={color}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>;
const ChevronL = ({ size, color }) => <Icon size={size} color={color}><polyline points="15 18 9 12 15 6"/></Icon>;
const ChevronR = ({ size, color }) => <Icon size={size} color={color}><polyline points="9 18 15 12 9 6"/></Icon>;
const CalendarIcon = ({ size, color }) => <Icon size={size} color={color}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ImageIcon = ({ size, color }) => <Icon size={size} color={color}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></Icon>;
const ListIcon = ({ size, color }) => <Icon size={size} color={color}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const DocIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Icon>;
const BellIcon = ({ size, color }) => <Icon size={size} color={color}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;

// ============ SWIPE HOOK ============
const useSwipe = (onLeft, onRight, threshold = 60) => {
  const ref = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const swiping = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onStart = (e) => {
      const t = e.touches ? e.touches[0] : e;
      startX.current = t.clientX; startY.current = t.clientY; swiping.current = true;
    };
    const onEnd = (e) => {
      if (!swiping.current) return; swiping.current = false;
      const t = e.changedTouches ? e.changedTouches[0] : e;
      const dx = t.clientX - startX.current;
      const dy = Math.abs(t.clientY - startY.current);
      if (dy > Math.abs(dx) * 0.7) return;
      if (dx < -threshold && onLeft) onLeft();
      if (dx > threshold && onRight) onRight();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("mousedown", onStart);
    el.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mouseup", onEnd);
    };
  }, [onLeft, onRight, threshold]);
  return ref;
};

// ============ MOCK AI ============
const mockAnalyze = (ls, hd) => new Promise((res) => {
  setTimeout(() => {
    const foods = [
      { name: "鮭の塩焼き定食", cal: 520, p: 32, f: 15, c: 58, fiber: 4.2, salt: 2.8, score: 82, ingredients: ["鮭","ご飯","味噌汁","漬物"], missing: "ビタミンC", praise: "素晴らしいお食事です！🎉" },
      { name: "カレーライス", cal: 680, p: 18, f: 22, c: 95, fiber: 3.1, salt: 3.5, score: 65, ingredients: ["ご飯","カレールー","じゃがいも","にんじん","玉ねぎ","豚肉"], missing: "食物繊維", praise: "きちんと記録できました！👍" },
      { name: "サラダチキンと玄米", cal: 380, p: 35, f: 8, c: 42, fiber: 5.8, salt: 1.9, score: 91, ingredients: ["鶏むね肉","レタス","トマト","アボカド","玄米"], missing: "カルシウム", praise: "パーフェクトに近いお食事！✨" },
      { name: "天ぷらうどん", cal: 510, p: 14, f: 18, c: 72, fiber: 2.4, salt: 4.1, score: 55, ingredients: ["うどん","海老天","かまぼこ","ねぎ"], missing: "たんぱく質", praise: "記録ありがとうございます！📝" },
      { name: "焼き魚と煮物定食", cal: 440, p: 28, f: 12, c: 50, fiber: 5.2, salt: 2.2, score: 88, ingredients: ["さば","大根","にんじん","こんにゃく","ご飯"], missing: "カルシウム", praise: "理想的な和食です！🌟" },
    ];
    const base = foods[Math.floor(Math.random() * foods.length)];
    const ex = ls?.exerciseLevel || "light";
    const portion = ls?.portionSize || "normal";
    const steps = hd?.steps;
    let advice = "";
    if (ex === "active" || ex === "veryActive") advice += "運動量が多いので、たんぱく質をしっかり摂れているのは良いですね。";
    else if (ex === "sedentary") advice += "あまり動かない日は、カロリーを少しひかえめにすると良いですよ。";
    else advice += "適度な活動量ですね。";
    if (portion === "small") advice += "ふだん少食とのことなので、1食1食の栄養の質がとても大切です。";
    else if (portion === "large") advice += "食事量が多めなので、お野菜を先に食べると血糖値が安定しやすくなります。";
    if (steps && steps > 6000) advice += ` 今日は${steps.toLocaleString()}歩も歩かれていますね！水分補給も忘れずに。`;
    else if (steps) advice += ` 今日の歩数は${steps.toLocaleString()}歩です。食後に軽いお散歩もおすすめですよ。`;
    if (base.fiber < 4) advice += " 次のお食事ではお野菜を少し増やしてみましょう。";
    res({ ...base, advice });
  }, 3000);
});

// ============ SHARED COMPONENTS ============
const ScoreRing = ({ score, size = 110 }) => {
  const sw = Math.max(size * 0.09, 4);
  const r = (size - sw * 2) / 2;
  const circ = Math.PI * 2 * r;
  const color = score >= 80 ? T.success : score >= 60 ? T.orange : T.danger;
  const fs = size <= 48 ? size * 0.4 : size <= 70 ? size * 0.36 : size * 0.32;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e0e0e0" strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: fs, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
};
const NutrientBar = ({ label, value, max, unit="g", color, status }) => {
  const pct = Math.min((value/max)*100, 100);
  const sc = status==="good"?T.success:status==="low"?T.orange:T.textMuted;
  const st = status==="good"?"✓ 足りています":status==="low"?"△ 少し不足":"";
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: T.fontBody, fontWeight: 700, color: T.text }}>{label}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: T.fontLarge, fontWeight: 800, color }}>{value}{unit}</span>
          {st && <span style={{ fontSize: T.fontSmall, fontWeight: 600, color: sc }}>{st}</span>}
        </div>
      </div>
      <div style={{ height: 12, background: "#e8e8e8", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 6, transition: "width 1s ease" }}/>
      </div>
    </div>
  );
};

// --- Swipe indicator dots ---
const SwipeDots = ({ pages, current }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "6px 0" }}>
    {pages.map((_, i) => (
      <div key={i} style={{ width: i===current?20:8, height: 8, borderRadius: 4, background: i===current?T.green:"#ccc", transition: "all 0.3s" }}/>
    ))}
  </div>
);

const BottomNav = ({ current, onNav }) => {
  const items = [
    { key: "home", label: "ホーム", icon: HomeIcon },
    { key: "record", label: "きろく", icon: ChartIcon },
    { key: "settings", label: "せってい", icon: SettingsIcon },
  ];
  return (
    <div style={{ display: "flex", borderTop: `2px solid ${T.border}`, background: T.card, paddingBottom: 6 }}>
      {items.map(({ key, label, icon: Ic }) => {
        const a = current === key;
        return (
          <button key={key} onClick={() => onNav(key)}
            style={{ ...baseBtn, flex: 1, flexDirection: "column", gap: 3, background: "none", minHeight: T.touchMin+10, padding: "8px 0",
              color: a?T.green:T.textMuted, fontWeight: a?700:500, fontSize: T.fontSub }}>
            <Ic size={26} color={a?T.green:T.textMuted}/>{label}
          </button>
        );
      })}
    </div>
  );
};
const BigButton = ({ children, onClick, color=T.green, textColor="#fff", icon, style: s={}, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ ...baseBtn, width: "100%", minHeight: T.touchMin+4, padding: "14px 20px", borderRadius: T.radiusSm,
      background: disabled?T.border:color, color: disabled?T.textMuted:textColor,
      fontSize: T.fontLarge, fontWeight: 700, gap: 10, opacity: disabled?0.6:1, ...s }}>
    {icon}{children}
  </button>
);
const Header = ({ title, onBack, right }) => (
  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", borderBottom: `2px solid ${T.border}`, background: T.card, minHeight: 56 }}>
    {onBack && <button onClick={onBack} style={{ ...baseBtn, background: "none", minWidth: T.touchMin, minHeight: T.touchMin, marginRight: 4 }}><ArrowLeft size={28} color={T.green}/></button>}
    <span style={{ flex: 1, fontSize: T.fontTitle, fontWeight: 800, color: T.text, textAlign: onBack?"center":"left", marginRight: onBack&&!right?T.touchMin+4:0 }}>{title}</span>
    {right && <div style={{ minWidth: T.touchMin }}>{right}</div>}
  </div>
);
const Card = ({ children, onClick, style: s={} }) => (
  <div onClick={onClick} style={{ background: T.card, borderRadius: T.radius, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1px solid ${T.border}`, cursor: onClick?"pointer":"default", ...s }}>{children}</div>
);
// Numeric-only input (shows numeric keypad, blocks non-digits)
const NumInput = ({ value, onChange, placeholder, maxLen, decimal, style: s={}, ...rest }) => (
  <input type="text" inputMode={decimal?"decimal":"numeric"} pattern={decimal?"[0-9.]*":"[0-9]*"}
    value={value} placeholder={placeholder} maxLength={maxLen||undefined}
    onChange={e=>{let v=e.target.value.replace(decimal?/[^0-9.]/g:/[^0-9]/g,"");if(maxLen)v=v.slice(0,maxLen);onChange(v);}}
    style={s} {...rest}/>
);

const SelectButton = ({ label, selected, onClick }) => (
  <button onClick={onClick}
    style={{ ...baseBtn, flex: 1, minHeight: T.touchMin, borderRadius: T.radiusSm, padding: "10px 6px",
      border: `2px solid ${selected?T.green:T.border}`, background: selected?T.greenLight:T.card,
      color: selected?T.green:T.text, fontSize: T.fontSub, fontWeight: selected?700:500 }}>{label}</button>
);

// ============ SWIPEABLE PAGE CONTAINER ============
const SwipeablePages = ({ pages, currentIndex, onSwipeLeft, onSwipeRight, children }) => {
  const swipeRef = useSwipe(onSwipeLeft, onSwipeRight);
  return (
    <div ref={swipeRef} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <SwipeDots pages={pages} current={currentIndex}/>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

// ============ SCREENS ============

// --- Auth ---
const AuthScreen = ({ onAuth }) => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [ld, setLd] = useState(false);
  const [err, setErr] = useState("");
  const inp = { width: "100%", padding: "16px 18px", border: `2px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: T.fontLarge, fontFamily: "inherit", outline: "none", boxSizing: "border-box", textAlign: "center" };
  const send = () => { if (phone.length<11){setErr("電話番号は11桁で入力してください");return;} setErr("");setLd(true);setTimeout(()=>{setLd(false);setStep("code");},1000); };
  const verify = () => { if (code.length<4){setErr("4桁の認証番号を入力してください");return;} setErr("");setLd(true);setTimeout(()=>{onAuth({id:"u1",displayName:"田中さん",phone,gender:"other"});},800); };
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",padding:28,background:`linear-gradient(170deg,${T.greenLight} 0%,#fafaf8 60%)` }}>
      <h1 style={{fontSize:T.fontHero,fontWeight:800,color:T.green,margin:"0 0 4px"}}>NutriLife</h1>
      <p style={{color:T.textSub,fontSize:T.fontBody,marginBottom:32,fontWeight:500}}>撮るだけ かんたん 栄養チェック</p>
      <div style={{width:"100%",maxWidth:360}}>
        {step==="phone"?(<>
          <label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>電話番号を入力してください</label>
          <NumInput placeholder="09012345678" value={phone} onChange={setPhone} maxLen={11} style={inp}/>
          {err&&<p style={{color:T.danger,fontSize:T.fontSub,marginTop:8,fontWeight:600}}>{err}</p>}
          <div style={{marginTop:16}}><BigButton onClick={send} disabled={ld}>{ld?"送信中...":"認証コードを送る"}</BigButton></div>
          <p style={{fontSize:T.fontSmall,color:T.textMuted,textAlign:"center",marginTop:16,lineHeight:1.6}}>ショートメッセージ（SMS）で<br/>4桁の番号が届きます</p>
        </>):(<>
          <p style={{fontSize:T.fontBody,color:T.textSub,marginBottom:4,textAlign:"center"}}><strong>{phone}</strong> に送信しました</p>
          <label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block",textAlign:"center"}}>届いた4桁の番号を入力</label>
          <NumInput placeholder="1234" value={code} onChange={setCode} maxLen={4} style={{...inp,fontSize:32,fontWeight:800,letterSpacing:"0.4em"}}/>
          {err&&<p style={{color:T.danger,fontSize:T.fontSub,marginTop:8,fontWeight:600,textAlign:"center"}}>{err}</p>}
          <div style={{marginTop:16}}><BigButton onClick={verify} disabled={ld}>{ld?"確認中...":"ログイン"}</BigButton></div>
          <button onClick={()=>{setStep("phone");setCode("");setErr("");}} style={{...baseBtn,background:"none",width:"100%",marginTop:12,color:T.green,fontSize:T.fontSub,fontWeight:600,minHeight:T.touchMin}}>← 電話番号を変更する</button>
        </>)}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:32,color:T.textMuted,fontSize:T.fontSmall}}><LockIcon size={18} color={T.textMuted}/>あなたの情報は安全に守られています</div>
    </div>
  );
};

// --- Avatar Picker ---
const AvatarPicker = ({ avatar, onChange, size=80 }) => {
  const avatars=["👤","👨","👩","👴","👵","🧑","😊","🌸","🍀","🐱"];
  const [open,setOpen]=useState(false);
  const fileRef=useRef(null);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      <button onClick={()=>setOpen(!open)} style={{...baseBtn,width:size,height:size,borderRadius:"50%",background:T.greenLight,border:`3px solid ${T.green}`,position:"relative",overflow:"hidden"}}>
        {avatar?.type==="file"?<img src={avatar.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:avatar?.emoji?<span style={{fontSize:size*0.5}}>{avatar.emoji}</span>:<UserIcon size={size*0.5} color={T.green}/>}
      </button>
      <button onClick={()=>setOpen(!open)} style={{...baseBtn,background:"none",color:T.green,fontSize:T.fontSub,fontWeight:600,minHeight:36}}>写真をかえる</button>
      {open&&(
        <Card style={{padding:14,width:"100%",maxWidth:300}}>
          <p style={{margin:"0 0 8px",fontSize:T.fontSub,fontWeight:700,color:T.text}}>アイコンを選ぶ</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:12}}>
            {avatars.map(e=>(<button key={e} onClick={()=>{onChange({type:"emoji",emoji:e});setOpen(false);}} style={{...baseBtn,width:44,height:44,borderRadius:10,border:`2px solid ${avatar?.emoji===e?T.green:T.border}`,background:avatar?.emoji===e?T.greenLight:T.card,fontSize:24}}>{e}</button>))}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){const url=URL.createObjectURL(f);onChange({type:"file",url});setOpen(false);}}} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={{...baseBtn,width:"100%",minHeight:44,borderRadius:10,border:`2px dashed ${T.green}`,background:T.greenLight,color:T.green,fontSize:T.fontSub,fontWeight:600,gap:8}}><ImageIcon size={18} color={T.green}/>写真をアップロード</button>
        </Card>
      )}
    </div>
  );
};

// --- Profile Setup ---
const ProfileSetupScreen = ({ onComplete }) => {
  const [step,setStep]=useState(0);
  const [avatar,setAvatar]=useState(null);
  const [name,setName]=useState("");
  const [gender,setGender]=useState("");
  const [birth,setBirth]=useState("");
  const [height,setHeight]=useState("");
  const [weight,setWeight]=useState("");
  const inp={width:"100%",padding:"16px 18px",border:`2px solid ${T.border}`,borderRadius:T.radiusSm,fontSize:T.fontLarge,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
  const inpC={...inp,textAlign:"center",fontSize:T.fontTitle};

  const steps=[
    // Step 0: name, avatar, gender
    <div key={0} style={{display:"flex",flexDirection:"column",gap:20}}>
      <AvatarPicker avatar={avatar} onChange={setAvatar}/>
      <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>ニックネーム</label><input placeholder="例：田中太郎" value={name} onChange={e=>setName(e.target.value)} style={inp}/></div>
      <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>性別</label>
        <div style={{display:"flex",gap:10}}>{[["male","男性"],["female","女性"],["other","答えない"]].map(([v,l])=><SelectButton key={v} label={l} selected={gender===v} onClick={()=>setGender(v)}/>)}</div>
      </div>
    </div>,
    // Step 1: body info
    <div key={1} style={{display:"flex",flexDirection:"column",gap:20}}>
      <Card style={{background:T.orangeLight,border:`1px solid #f5d9b3`,padding:16}}>
        <p style={{margin:0,fontSize:T.fontBody,color:T.text,lineHeight:1.8}}>🤖 身長・体重・年齢をもとに、あなたに必要な<strong>カロリーや栄養素</strong>をAIが正確に計算します。</p>
      </Card>
      <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>生まれた年（4桁）</label>
        <NumInput placeholder="例：1958" value={birth} onChange={setBirth} maxLen={4} style={inpC}/></div>
      <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>身長（cm）</label>
        <div style={{display:"flex",alignItems:"center",gap:10}}><NumInput placeholder="160" value={height} onChange={setHeight} maxLen={3} style={{...inpC,flex:1}}/><span style={{fontSize:T.fontLarge,fontWeight:700,color:T.text}}>cm</span></div></div>
      <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>体重（kg）</label>
        <div style={{display:"flex",alignItems:"center",gap:10}}><NumInput placeholder="60" value={weight} onChange={setWeight} maxLen={3} decimal style={{...inpC,flex:1}}/><span style={{fontSize:T.fontLarge,fontWeight:700,color:T.text}}>kg</span></div></div>
      <p style={{fontSize:T.fontSmall,color:T.textMuted,margin:0,lineHeight:1.6}}>※ あとから「せってい」でいつでも変更できます。<br/>入力しなくても始められます。</p>
    </div>,
  ];

  const swipeRef=useSwipe(
    ()=>{if(step<steps.length-1)setStep(step+1);},
    ()=>{if(step>0)setStep(step-1);}
  );

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title={step===0?"あなたのことを教えてください":"からだの情報"} onBack={step>0?()=>setStep(step-1):undefined}/>
      {/* Progress */}
      <div style={{display:"flex",gap:6,padding:"10px 20px"}}>
        {steps.map((_,i)=>(<div key={i} style={{flex:1,height:6,borderRadius:3,background:i<=step?T.green:"#e0e0e0",transition:"background 0.3s"}}/>))}
      </div>
      <div ref={swipeRef} style={{flex:1,overflowY:"auto",padding:20}}>
        {steps[step]}
      </div>
      <div style={{padding:"12px 20px 24px",display:"flex",gap:10}}>
        {step>0&&<BigButton onClick={()=>setStep(step-1)} color={T.card} textColor={T.text} style={{flex:0,minWidth:100,border:`2px solid ${T.border}`,boxShadow:"none"}}>もどる</BigButton>}
        {step<steps.length-1?(
          <BigButton onClick={()=>setStep(step+1)} disabled={!name} style={{flex:1}}>つぎへ →</BigButton>
        ):(
          <BigButton onClick={()=>onComplete({displayName:name||"ユーザー",gender,birthYear:birth,height,weight,avatar})} style={{flex:1}}>はじめる →</BigButton>
        )}
      </div>
    </div>
  );
};

// --- Home ---
const HomeScreen = ({ user, logs, healthData, onCamera, onNav }) => {
  const today = new Date();
  const dn=["日","月","火","水","木","金","土"];
  const h=today.getHours();
  const gr=h<11?"おはようございます":h<17?"こんにちは":"こんばんは";
  const tl=logs.filter(l=>l.date===today.toDateString());
  const totalCal=tl.reduce((s,l)=>s+l.cal,0);
  const totalP=tl.reduce((s,l)=>s+l.p,0);

  const swipeRef = useSwipe(()=>onNav("record"), null);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div ref={swipeRef} style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>
        <p style={{color:T.textMuted,fontSize:T.fontSub,margin:"0 0 2px",fontWeight:500}}>{today.getFullYear()}年{today.getMonth()+1}月{today.getDate()}日（{dn[today.getDay()]}）</p>
        <h2 style={{margin:"0 0 20px",fontSize:T.fontTitle+2,fontWeight:800,color:T.text}}>{gr}、{user.displayName}さん</h2>
        {healthData?.connected&&(
          <Card style={{background:T.blueLight,border:`1px solid #bfdbfe`,marginBottom:14,display:"flex",alignItems:"center",gap:12,padding:14}}>
            <HeartIcon size={24} color={T.blue}/>
            <div style={{flex:1}}><p style={{margin:0,fontSize:T.fontSub,fontWeight:700,color:T.blue}}>ヘルスケア連携中</p>
              <p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.textSub}}>今日 {healthData.steps?.toLocaleString()||0}歩 ・ 心拍 {healthData.heartRate||"--"}bpm</p></div>
          </Card>
        )}
        <Card style={{marginBottom:16}}>
          <h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 16px",color:T.green}}>📊 今日のまとめ</h3>
          <div style={{display:"flex",justifyContent:"space-around",marginBottom:8}}>
            {[{label:"カロリー",val:totalCal,unit:"kcal",color:T.green},{label:"たんぱく質",val:totalP,unit:"g",color:T.orange},{label:"記録した数",val:tl.length,unit:"食",color:T.greenMid}].map(({label,val,unit,color})=>(
              <div key={label} style={{textAlign:"center"}}><div style={{fontSize:T.fontHero,fontWeight:800,color}}>{val}</div><div style={{fontSize:T.fontSub,color:T.textMuted,fontWeight:500}}>{unit}</div><div style={{fontSize:T.fontSub,color:T.textSub,marginTop:2,fontWeight:600}}>{label}</div></div>
            ))}
          </div>
          {tl.length===0&&<p style={{fontSize:T.fontBody,color:T.textMuted,textAlign:"center",margin:"12px 0 0",lineHeight:1.7}}>まだ記録がありません。<br/>下のボタンから食事を撮影しましょう！</p>}
        </Card>
        <Card style={{background:T.orangeLight,border:`1px solid #f5d9b3`}}>
          <p style={{fontSize:T.fontBody,fontWeight:700,color:T.orange,margin:"0 0 6px"}}>💡 今日のヒント</p>
          <p style={{fontSize:T.fontBody,color:T.text,margin:0,lineHeight:1.8}}>朝食にたんぱく質を摂ると、1日のエネルギーが安定します。卵や納豆がおすすめです。</p>
        </Card>

      </div>
      <div style={{padding:"14px 20px 16px",display:"flex",flexDirection:"column",gap:10}}>
        <BigButton onClick={()=>onCamera("camera")} color={T.orangeBg} icon={<CameraIcon size={32} color="#fff"/>}
          style={{minHeight:76,fontSize:T.fontTitle+2,borderRadius:T.radius,boxShadow:"0 6px 20px rgba(249,115,22,0.4)",letterSpacing:1}}>食事を撮影する</BigButton>
        <BigButton onClick={()=>onCamera("album")} color={T.card} textColor={T.green} icon={<ImageIcon size={26} color={T.green}/>}
          style={{minHeight:56,fontSize:T.fontLarge,borderRadius:T.radiusSm,border:`2px solid ${T.green}`,boxShadow:"none"}}>写真アルバムから選ぶ</BigButton>
      </div>
      <BottomNav current="home" onNav={onNav}/>
    </div>
  );
};

// --- Camera / Album ---
const CameraScreen = ({ mode: initMode, onCapture, onCancel }) => {
  const [mode,setMode]=useState(initMode||"camera");
  const [cap,setCap]=useState(false);
  const [selImg,setSelImg]=useState(null);
  const [cameraReady,setCameraReady]=useState(false);
  const [cameraError,setCameraError]=useState(null);
  const videoRef=useRef(null);
  const canvasRef=useRef(null);
  const streamRef=useRef(null);
  const fileRef=useRef(null);

  // Start real camera
  const startCamera=useCallback(async()=>{
    setCameraError(null);
    try{
      if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());}
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280},height:{ideal:960}},audio:false});
      streamRef.current=stream;
      if(videoRef.current){
        const video=videoRef.current;
        video.srcObject=stream;
        video.onloadedmetadata=()=>{setCameraReady(true);};
      }
    }catch(err){
      console.error("Camera error:",err);
      setCameraError(err.name==="NotAllowedError"?"カメラの使用が許可されていません。\nブラウザの設定からカメラを許可してください。":"カメラを起動できませんでした。");
    }
  },[]);

  const stopCamera=useCallback(()=>{
    if(videoRef.current){videoRef.current.onloadedmetadata=null;}
    if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());streamRef.current=null;}
    setCameraReady(false);
  },[]);

  useEffect(()=>{
    if(mode==="camera")startCamera();
    else stopCamera();
    return ()=>stopCamera();
  },[mode,startCamera,stopCamera]);

  const handleCapture=()=>{
    if(!videoRef.current||!canvasRef.current)return;
    setCap(true);
    const video=videoRef.current;
    const canvas=canvasRef.current;
    canvas.width=video.videoWidth||640;
    canvas.height=video.videoHeight||480;
    const ctx=canvas.getContext("2d");
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    stopCamera();
    setTimeout(()=>onCapture(),600);
  };

  const handleFilePick=(e)=>{
    const file=e.target.files?.[0];
    if(file){setSelImg({id:"file",emoji:"📷",label:file.name.slice(0,10),bg:"#f3f4f6",file});}
  };

  const handleConfirmAlbum=()=>{setCap(true);setTimeout(()=>onCapture(),600);};

  if(mode==="album"){
    return (
      <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.bg}}>
        <div style={{padding:"14px 16px",display:"flex",alignItems:"center",borderBottom:`2px solid ${T.border}`,background:T.card,minHeight:56}}>
          <button onClick={onCancel} style={{...baseBtn,background:"none",minWidth:T.touchMin,minHeight:T.touchMin,marginRight:4}}><ArrowLeft size={28} color={T.green}/></button>
          <span style={{flex:1,fontSize:T.fontTitle,fontWeight:800,color:T.text,textAlign:"center",marginRight:T.touchMin+4}}>写真を選ぶ</span>
        </div>
        {/* Mode toggle */}
        <div style={{display:"flex",padding:"8px 16px",gap:8,background:T.card}}>
          <button onClick={()=>setMode("camera")} style={{...baseBtn,flex:1,minHeight:44,borderRadius:10,gap:6,background:"transparent",border:`2px solid ${T.border}`,color:T.textSub,fontSize:T.fontSub,fontWeight:500}}><CameraIcon size={20} color={T.textMuted}/>撮影する</button>
          <button style={{...baseBtn,flex:1,minHeight:44,borderRadius:10,gap:6,background:T.green,border:`2px solid ${T.green}`,color:"#fff",fontSize:T.fontSub,fontWeight:700}}><ImageIcon size={20} color="#fff"/>アルバム</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:16}}>
          {/* Real file picker button */}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFilePick} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()}
            style={{...baseBtn,width:"100%",minHeight:T.touchMin+8,borderRadius:T.radiusSm,border:`2px dashed ${T.green}`,background:T.greenLight,color:T.green,fontSize:T.fontBody,fontWeight:700,gap:10,marginBottom:16}}>
            <ImageIcon size={24} color={T.green}/>端末から写真を選択
          </button>
          {selImg&&(
            <Card style={{display:"flex",alignItems:"center",gap:14,padding:14}}>
              <span style={{fontSize:32}}>{selImg.emoji}</span>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:T.fontBody,fontWeight:700,color:T.text}}>{selImg.label}</p>
                <p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.success,fontWeight:600}}>選択済み</p>
              </div>
              <CheckCircle size={24} color={T.success}/>
            </Card>
          )}
        </div>
        {/* Confirm bar */}
        <div style={{padding:"12px 20px 24px",borderTop:`2px solid ${T.border}`,background:T.card}}>
          {cap?(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,minHeight:T.touchMin+4}}>
              <div style={{width:28,height:28,border:"3px solid #ddd",borderTopColor:T.green,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
              <span style={{fontSize:T.fontBody,fontWeight:600,color:T.text}}>記録ありがとうございます！</span>
            </div>
          ):(
            <BigButton onClick={handleConfirmAlbum} disabled={!selImg} color={T.orangeBg}
              style={{minHeight:64,fontSize:T.fontTitle}}>
              {selImg?`「${selImg.label}」を解析する`:"写真を選んでください"}
            </BigButton>
          )}
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // Camera mode (real)
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#111"}}>
      <div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>{stopCamera();onCancel();}} style={{...baseBtn,background:"none",color:"#fff",fontSize:T.fontBody,fontWeight:600,minHeight:T.touchMin,gap:6}}><ArrowLeft size={24} color="#fff"/> もどる</button>
      </div>
      {/* Mode toggle */}
      <div style={{display:"flex",padding:"0 16px 8px",gap:8}}>
        <button style={{...baseBtn,flex:1,minHeight:40,borderRadius:10,gap:6,background:"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.3)",color:"#fff",fontSize:T.fontSub,fontWeight:700}}><CameraIcon size={18} color="#fff"/>撮影する</button>
        <button onClick={()=>setMode("album")} style={{...baseBtn,flex:1,minHeight:40,borderRadius:10,gap:6,background:"transparent",border:"2px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)",fontSize:T.fontSub,fontWeight:500}}><ImageIcon size={18} color="rgba(255,255,255,0.7)"/>アルバム</button>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        {/* Real camera video */}
        <video ref={videoRef} autoPlay playsInline muted
          style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16,maxWidth:"92%",maxHeight:"100%",display:cameraReady?"block":"none"}}/>
        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{display:"none"}}/>
        {/* Loading state */}
        {!cameraReady&&!cameraError&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,border:"4px solid rgba(255,255,255,0.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:T.fontBody}}>カメラを起動中...</p>
          </div>
        )}
        {/* Error state */}
        {cameraError&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:24,textAlign:"center"}}>
            <span style={{fontSize:48}}>📷</span>
            <p style={{color:"rgba(255,255,255,0.9)",fontSize:T.fontBody,lineHeight:1.8,whiteSpace:"pre-line"}}>{cameraError}</p>
            <button onClick={startCamera} style={{...baseBtn,padding:"10px 24px",borderRadius:10,background:"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.3)",color:"#fff",fontSize:T.fontSub,fontWeight:600}}>もう一度試す</button>
          </div>
        )}
        {/* Guide overlay */}
        {cameraReady&&(
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
            <div style={{width:260,height:260,border:"3px dashed rgba(255,255,255,0.35)",borderRadius:20}}/>
          </div>
        )}
        {/* Capture feedback */}
        {cap&&<div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.85)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}>
          <div style={{width:44,height:44,border:"4px solid #ddd",borderTopColor:T.green,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
          <p style={{fontSize:T.fontBody,color:T.text,fontWeight:600}}>記録ありがとうございます！</p></div>}
      </div>
      <p style={{color:"rgba(255,255,255,0.8)",textAlign:"center",fontSize:T.fontSub,margin:"0 20px 12px",lineHeight:1.6,fontWeight:500}}>🍽️ 食べかけや、パックのままでもOKです</p>
      <div style={{display:"flex",justifyContent:"center",padding:"0 0 36px"}}>
        <button onClick={handleCapture} disabled={cap||!cameraReady}
          style={{...baseBtn,width:80,height:80,borderRadius:"50%",background:"#fff",border:"5px solid rgba(255,255,255,0.4)",opacity:cameraReady?1:0.4}}>
          <div style={{width:62,height:62,borderRadius:"50%",background:cap?"#ccc":T.orangeBg,transition:"background 0.2s"}}/></button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

// --- Analyzing ---
const AnalyzingScreen = ({ lifestyle, healthData }) => {
  const msgs=["画像を送信中…","食材を確認中…","栄養を計算中…"];
  if(lifestyle?.portionSize)msgs.push("食事量をもとに調整中…");
  if(lifestyle?.exerciseLevel)msgs.push("運動量をもとに調整中…");
  if(healthData?.connected)msgs.push("ヘルスケアデータを参照中…");
  msgs.push("アドバイスを準備中…");
  const [idx,setIdx]=useState(0);const [dots,setDots]=useState("");
  useEffect(()=>{const t1=setInterval(()=>setIdx(i=>(i+1)%msgs.length),1800);const t2=setInterval(()=>setDots(d=>d.length>=3?"":d+"."),500);return()=>{clearInterval(t1);clearInterval(t2);};},[]);
  const pct=((idx+1)/msgs.length)*100;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:24,background:T.bg,padding:32}}>
      <div style={{fontSize:56}}>🔍</div>
      <p style={{fontSize:T.fontTitle,fontWeight:700,color:T.text,margin:0,textAlign:"center"}}>{msgs[idx]}{dots}</p>
      <div style={{width:"80%",maxWidth:300,height:10,background:"#e0e0e0",borderRadius:5,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:T.green,borderRadius:5,transition:"width 0.5s ease"}}/></div>
      <p style={{fontSize:T.fontSub,color:T.textMuted,margin:0}}>しばらくお待ちください</p>
      <div style={{display:"flex",alignItems:"center",gap:6,color:T.textMuted,fontSize:T.fontSmall}}><LockIcon size={16} color={T.textMuted}/> 画像は安全に処理されています</div>
    </div>
  );
};

// --- Supplement Card ---
const SupplCard = ({ missing }) => {
  const [tapped,setTapped]=useState(false);
  return (
    <Card style={{background:`linear-gradient(135deg,${T.greenLight},#f0fdf4)`,border:`2px solid ${T.greenMid}`,marginBottom:14}}>
      <h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 8px",color:T.green}}>💊 あなたへのサプリ提案</h3>
      <p style={{fontSize:T.fontBody,color:T.text,margin:"0 0 14px",lineHeight:1.8}}>{missing}を補うサプリメントをご用意しています。</p>
      {tapped?(
        <Card style={{background:T.card,border:`1px solid ${T.border}`,padding:14,textAlign:"center"}}>
          <p style={{margin:0,fontSize:T.fontBody,fontWeight:700,color:T.orange}}>🚧 ただいま準備中です</p>
          <p style={{margin:"6px 0 0",fontSize:T.fontSub,color:T.textMuted}}>もうしばらくお待ちください</p>
        </Card>
      ):(
        <BigButton onClick={()=>setTapped(true)} color={T.greenMid} style={{fontSize:T.fontBody}}>くわしく見る →</BigButton>
      )}
    </Card>
  );
};

// --- Meal Detail (結果画面と共用) ---
const MealDetailView = ({ analysis, showFeedback, onFeedback }) => {
  const [fb,setFb]=useState(null);
  const { name,cal,p,f,c,fiber,salt,score,ingredients,advice,missing,praise } = analysis;
  const doFb=t=>{setFb(t);onFeedback&&onFeedback(t);};
  return (
    <div style={{padding:16}}>
      {praise&&<Card style={{background:T.successLight,border:`1px solid #a7d8b8`,marginBottom:14,textAlign:"center"}}><p style={{fontSize:T.fontTitle,fontWeight:800,color:T.success,margin:0}}>{praise}</p></Card>}
      <Card style={{display:"flex",alignItems:"center",gap:18,marginBottom:14}}>
        <ScoreRing score={score} size={110}/><div style={{flex:1}}><h2 style={{margin:"0 0 6px",fontSize:T.fontTitle,fontWeight:800,color:T.text}}>{name}</h2><p style={{margin:0,fontSize:T.fontHero,fontWeight:800,color:T.green}}>{cal} <span style={{fontSize:T.fontBody,fontWeight:500}}>kcal</span></p></div>
      </Card>
      <Card style={{marginBottom:14}}>
        <h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 16px",color:T.green}}>栄養バランス</h3>
        <NutrientBar label="たんぱく質" value={p} max={60} color={T.success} status={p>=20?"good":"low"}/>
        <NutrientBar label="あぶら（脂質）" value={f} max={65} color={T.orange} status={f<=25?"good":"low"}/>
        <NutrientBar label="炭水化物" value={c} max={300} color="#3b82f6" status="good"/>
        <NutrientBar label="食物繊維" value={fiber} max={20} color="#7c3aed" status={fiber>=4?"good":"low"}/>
        <NutrientBar label="塩分" value={salt} max={7} color={T.danger} status={salt<=3?"good":"low"}/>
      </Card>
      <Card style={{marginBottom:14}}>
        <h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 12px",color:T.green}}>見つけた食材</h3>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{ingredients.map(i=><span key={i} style={{padding:"8px 16px",background:T.greenLight,borderRadius:24,fontSize:T.fontBody,fontWeight:600,color:T.green}}>{i}</span>)}</div>
      </Card>
      <Card style={{background:T.orangeLight,border:`1px solid #f5d9b3`,marginBottom:14}}>
        <h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 8px",color:T.orange}}>🤖 あなたへのアドバイス</h3>
        <p style={{fontSize:T.fontBody,color:T.text,margin:"0 0 10px",lineHeight:1.9}}>{advice}</p>
        <p style={{fontSize:T.fontBody,color:T.danger,margin:0,fontWeight:700}}>不足しています → {missing}</p>
      </Card>
      <SupplCard missing={missing}/>
      {showFeedback&&(
        <Card style={{marginBottom:14,textAlign:"center"}}>
          <p style={{fontSize:T.fontBody,fontWeight:700,margin:"0 0 14px",color:T.text}}>この結果は参考になりましたか？</p>
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>doFb("good")} style={{...baseBtn,flex:1,minHeight:T.touchMin,borderRadius:T.radiusSm,gap:8,border:`2px solid ${fb==="good"?T.success:T.border}`,background:fb==="good"?T.successLight:T.card,color:fb==="good"?T.success:T.textSub,fontSize:T.fontBody,fontWeight:700}}><ThumbUpIcon size={24} color={fb==="good"?T.success:T.textMuted}/> 良い</button>
            <button onClick={()=>doFb("bad")} style={{...baseBtn,flex:1,minHeight:T.touchMin,borderRadius:T.radiusSm,gap:8,border:`2px solid ${fb==="bad"?T.danger:T.border}`,background:fb==="bad"?T.dangerLight:T.card,color:fb==="bad"?T.danger:T.textSub,fontSize:T.fontBody,fontWeight:700}}><ThumbDownIcon size={24} color={fb==="bad"?T.danger:T.textMuted}/> ちがう</button>
          </div>
          {fb&&<p style={{fontSize:T.fontSub,color:T.success,marginTop:10,marginBottom:0,fontWeight:600}}>ありがとうございます！</p>}
        </Card>
      )}
      <p style={{fontSize:T.fontSmall,color:T.textMuted,textAlign:"center",lineHeight:1.7,margin:"0 0 16px"}}>※本アドバイスはAIによる推測であり、<br/>医療診断ではありません</p>
    </div>
  );
};

// --- Result Screen (after camera) ---
const ResultScreen = ({ analysis, onClose, onFeedback, onNav }) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <Header title="けっかを見る" onBack={onClose}/>
    <div style={{flex:1,overflowY:"auto"}}><MealDetailView analysis={analysis} showFeedback onFeedback={onFeedback}/></div>
    <BottomNav current="home" onNav={onNav}/>
  </div>
);

// --- Record Screen (Calendar + List, swipeable sub-tabs) ---
const RecordScreen = ({ logs, onNav, onViewDetail }) => {
  const [tab,setTab]=useState(0); // 0=calendar, 1=list
  const [calMonth,setCalMonth]=useState(()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),1);});
  const [selectedDate,setSelectedDate]=useState(null);

  const tabs=["カレンダー","リスト"];
  const swipeRef=useSwipe(
    ()=>{if(tab===0){setTab(1);}else{onNav("settings");}},
    ()=>{if(tab===1){setTab(0);}else{onNav("home");}}
  );

  // Calendar helpers
  const year=calMonth.getFullYear(), month=calMonth.getMonth();
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const today=new Date();
  const todayStr=today.toDateString();

  const logDates={};
  logs.forEach(l=>{
    const k=l.date;
    if(!logDates[k])logDates[k]={count:0,totalCal:0,avgScore:0,scores:[]};
    logDates[k].count++;logDates[k].totalCal+=l.cal;logDates[k].scores.push(l.score);
  });
  Object.values(logDates).forEach(v=>{v.avgScore=Math.round(v.scores.reduce((a,b)=>a+b,0)/v.scores.length);});

  const prevMonth=()=>setCalMonth(new Date(year,month-1,1));
  const nextMonth=()=>setCalMonth(new Date(year,month+1,1));

  const selDateStr=selectedDate?selectedDate.toDateString():todayStr;
  const selLogs=logs.filter(l=>l.date===selDateStr);

  const renderCalendar=()=>(
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      {/* Month nav */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={prevMonth} style={{...baseBtn,background:"none",minWidth:T.touchMin,minHeight:T.touchMin}}><ChevronL size={28} color={T.green}/></button>
        <span style={{fontSize:T.fontTitle,fontWeight:800,color:T.text}}>{year}年{month+1}月</span>
        <button onClick={nextMonth} style={{...baseBtn,background:"none",minWidth:T.touchMin,minHeight:T.touchMin}}><ChevronR size={28} color={T.green}/></button>
      </div>
      {/* Weekday headers */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",textAlign:"center",marginBottom:6}}>
        {["日","月","火","水","木","金","土"].map((d,i)=>(<div key={d} style={{fontSize:T.fontSub,fontWeight:700,color:i===0?T.danger:i===6?T.blue:T.textMuted,padding:"4px 0"}}>{d}</div>))}
      </div>
      {/* Days grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:daysInMonth}).map((_,i)=>{
          const day=i+1;
          const d=new Date(year,month,day);
          const ds=d.toDateString();
          const isToday=ds===todayStr;
          const isSel=ds===selDateStr;
          const hasLog=logDates[ds];
          const sc=hasLog?.avgScore;
          const dotColor=sc>=80?T.success:sc>=60?T.orange:sc?T.danger:null;
          return (
            <button key={day} onClick={()=>setSelectedDate(d)}
              style={{...baseBtn,flexDirection:"column",gap:2,minHeight:50,borderRadius:10,background:isSel?T.green:isToday?T.greenLight:"transparent",
                border:isToday&&!isSel?`2px solid ${T.green}`:"2px solid transparent",position:"relative",padding:"4px 0"}}>
              <span style={{fontSize:T.fontBody,fontWeight:isToday||isSel?800:500,color:isSel?"#fff":isToday?T.green:T.text}}>{day}</span>
              {hasLog?(
                <div style={{display:"flex",gap:2}}>
                  {Array.from({length:Math.min(hasLog.count,3)}).map((_,j)=>(
                    <div key={j} style={{width:7,height:7,borderRadius:"50%",background:isSel?"rgba(255,255,255,0.8)":dotColor}}/>
                  ))}
                </div>
              ):<div style={{height:7}}/>}
            </button>
          );
        })}
      </div>
      {/* Selected date logs */}
      <div style={{marginTop:18}}>
        <h3 style={{fontSize:T.fontLarge,fontWeight:800,color:T.text,margin:"0 0 10px"}}>
          {selectedDate?`${selectedDate.getMonth()+1}月${selectedDate.getDate()}日`:`${today.getMonth()+1}月${today.getDate()}日（今日）`}の記録
        </h3>
        {selLogs.length===0?(
          <Card style={{textAlign:"center",padding:24}}><p style={{fontSize:T.fontBody,color:T.textMuted,margin:0}}>この日の記録はありません</p></Card>
        ):selLogs.map((l,i)=>(
          <Card key={i} onClick={()=>onViewDetail(l)} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10,padding:16}}>
            <ScoreRing score={l.score} size={54}/>
            <div style={{flex:1}}><p style={{margin:"0 0 2px",fontWeight:700,fontSize:T.fontLarge,color:T.text}}>{l.name}</p><p style={{margin:0,fontSize:T.fontSub,color:T.textMuted}}>{l.time}</p></div>
            <div style={{textAlign:"right"}}><p style={{margin:0,fontWeight:800,color:T.green,fontSize:T.fontTitle}}>{l.cal}</p><p style={{margin:0,fontSize:T.fontSmall,color:T.textMuted}}>kcal</p></div>
            <ChevronR size={22} color={T.textMuted}/>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderList=()=>(
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      {logs.length===0?(
        <div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:56,marginBottom:16}}>📋</div>
          <p style={{fontSize:T.fontTitle,fontWeight:700,color:T.textSub,margin:"0 0 8px"}}>まだ記録がありません</p>
          <p style={{fontSize:T.fontBody,color:T.textMuted,margin:0,lineHeight:1.7}}>食事を撮影すると<br/>ここに記録が表示されます</p></div>
      ):(<>
        {/* Group by date */}
        {Object.entries(logs.reduce((acc,l)=>{const k=l.date;if(!acc[k])acc[k]=[];acc[k].push(l);return acc;},{})).map(([date,items])=>{
          const d=new Date(date);
          const isToday=date===todayStr;
          const totalCal=items.reduce((s,l)=>s+l.cal,0);
          return (
            <div key={date} style={{marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <p style={{margin:0,fontSize:T.fontBody,fontWeight:800,color:T.text}}>{isToday?"今日":`${d.getMonth()+1}月${d.getDate()}日`}</p>
                <p style={{margin:0,fontSize:T.fontSub,color:T.green,fontWeight:700}}>合計 {totalCal} kcal</p>
              </div>
              {items.map((l,i)=>(
                <Card key={i} onClick={()=>onViewDetail(l)} style={{display:"flex",alignItems:"center",gap:14,marginBottom:8,padding:14}}>
                  <ScoreRing score={l.score} size={48}/>
                  <div style={{flex:1}}><p style={{margin:"0 0 2px",fontWeight:700,fontSize:T.fontBody,color:T.text}}>{l.name}</p><p style={{margin:0,fontSize:T.fontSmall,color:T.textMuted}}>{l.time}</p></div>
                  <span style={{fontSize:T.fontLarge,fontWeight:800,color:T.green}}>{l.cal}</span>
                  <ChevronR size={22} color={T.textMuted}/>
                </Card>
              ))}
            </div>
          );
        })}
      </>)}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="きろく"/>
      {/* Sub-tab toggle */}
      <div style={{display:"flex",padding:"8px 16px",gap:8,background:T.card}}>
        {tabs.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)}
            style={{...baseBtn,flex:1,minHeight:44,borderRadius:10,gap:6,
              background:tab===i?T.green:"transparent",border:`2px solid ${tab===i?T.green:T.border}`,
              color:tab===i?"#fff":T.textSub,fontSize:T.fontSub,fontWeight:tab===i?700:500}}>
            {i===0?<CalendarIcon size={20} color={tab===i?"#fff":T.textMuted}/>:<ListIcon size={20} color={tab===i?"#fff":T.textMuted}/>}{t}
          </button>
        ))}
      </div>
      <SwipeDots pages={tabs} current={tab}/>
      <div ref={swipeRef} style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {tab===0?renderCalendar():renderList()}
      </div>
      <BottomNav current="record" onNav={onNav}/>
    </div>
  );
};

// --- Meal Log Detail Screen ---
const MealLogDetailScreen = ({ log, onBack }) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <Header title={`${log.name}のきろく`} onBack={onBack}/>
    <div style={{flex:1,overflowY:"auto"}}>
      {/* Time badge */}
      <div style={{padding:"12px 16px 0",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:T.fontSub,fontWeight:700,color:T.textMuted}}>📅 {log.date}</span>
        <span style={{fontSize:T.fontSub,fontWeight:700,color:T.green}}>🕐 {log.time}</span>
      </div>
      <MealDetailView analysis={log} showFeedback={false}/>
    </div>
  </div>
);

// --- Settings ---
const SettingsScreen = ({ user, healthData, onNav, onLogout, onEditProfile }) => {
  const swipeRef=useSwipe(null, ()=>onNav("record"));
  const MenuItem=({label,icon,desc,tag,onClick,danger})=>(
    <button onClick={onClick}
      style={{...baseBtn,width:"100%",minHeight:T.touchMin+8,padding:"14px 20px",background:T.card,borderBottom:`1px solid ${T.border}`,
        justifyContent:"flex-start",gap:14,fontSize:T.fontLarge,fontWeight:600,color:danger?T.danger:T.text,textAlign:"left"}}>
      {icon}<div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>{label}{tag&&<span style={{fontSize:T.fontSmall,fontWeight:700,color:T.blue,background:T.blueLight,padding:"2px 8px",borderRadius:8}}>{tag}</span>}</div>
        {desc&&<p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.textMuted,fontWeight:400}}>{desc}</p>}
      </div><span style={{color:T.textMuted,fontSize:T.fontTitle}}>›</span></button>
  );
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="せってい"/>
      <div ref={swipeRef} style={{flex:1,overflowY:"auto"}}>
        <Card style={{display:"flex",alignItems:"center",gap:16,margin:"16px 16px 8px",padding:20}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:T.greenLight,border:`3px solid ${T.green}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
            {user.avatar?.type==="file"?<img src={user.avatar.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:user.avatar?.emoji?<span style={{fontSize:32}}>{user.avatar.emoji}</span>:<UserIcon size={32} color={T.green}/>}
          </div>
          <div><p style={{margin:"0 0 2px",fontWeight:800,fontSize:T.fontTitle,color:T.text}}>{user.displayName}</p>
            <p style={{margin:0,fontSize:T.fontSub,color:T.textMuted}}>{user.phone||""}</p>
            {(user.height||user.weight)&&<p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.textMuted}}>{user.height?`${user.height}cm`:""}　{user.weight?`${user.weight}kg`:""}</p>}
          </div>
        </Card>
        <div style={{margin:"20px 16px 8px"}}><p style={{fontSize:T.fontSub,color:T.textMuted,margin:0,fontWeight:700}}>アカウント</p></div>
        <div style={{margin:"0 16px",borderRadius:T.radiusSm,overflow:"hidden",border:`1px solid ${T.border}`}}>
          <MenuItem label="プロフィール編集" icon={<UserIcon size={22} color={T.green}/>} onClick={onEditProfile}/>
          <MenuItem label="食事の目標" icon={<ChartIcon size={22} color={T.green}/>} onClick={()=>onNav("mealSettings")}/>
          <MenuItem label="通知設定" icon={<BellIcon size={22} color={T.green}/>} onClick={()=>onNav("notifSettings")}/>
        </div>
        <div style={{margin:"20px 16px 8px"}}><p style={{fontSize:T.fontSub,color:T.textMuted,margin:0,fontWeight:700}}>AI解析をもっと正確に</p></div>
        <div style={{margin:"0 16px",borderRadius:T.radiusSm,overflow:"hidden",border:`1px solid ${T.border}`}}>
          <MenuItem label="食事量・運動量" icon={<ActivityIcon size={22} color={T.orange}/>} desc="ふだんの生活スタイルを教えてください" onClick={()=>onNav("lifestyle")}/>
          <MenuItem label="ヘルスケア連携" icon={<HeartIcon size={22} color={T.danger}/>} desc={healthData?.connected?"連携中 ✓":"iOSヘルスケアと接続"} tag={healthData?.connected?"ON":""} onClick={()=>onNav("healthKit")}/>
        </div>
        <div style={{margin:"24px 16px 8px"}}><p style={{fontSize:T.fontSub,color:T.textMuted,margin:0,fontWeight:700}}>そのほか</p></div>
        <div style={{margin:"0 16px 24px",borderRadius:T.radiusSm,overflow:"hidden",border:`1px solid ${T.border}`}}>
          <MenuItem label="利用規約" icon={<DocIcon size={22} color={T.textMuted}/>} onClick={()=>onNav("terms")}/>
          <MenuItem label="ログアウト" icon={null} onClick={onLogout} danger/>
        </div>
      </div>
      <BottomNav current="settings" onNav={onNav}/>
    </div>
  );
};

// --- Profile Edit ---
const ProfileEditScreen = ({ user, onSave, onCancel }) => {
  const [name,setName]=useState(user.displayName);
  const [gender,setGender]=useState(user.gender||"other");
  const [avatar,setAvatar]=useState(user.avatar||null);
  const [birth,setBirth]=useState(user.birthYear||"");
  const [height,setHeight]=useState(user.height||"");
  const [weight,setWeight]=useState(user.weight||"");
  const inp={width:"100%",padding:"16px 18px",border:`2px solid ${T.border}`,borderRadius:T.radiusSm,fontSize:T.fontLarge,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};
  const inpC={...inp,textAlign:"center",fontSize:T.fontTitle};
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="プロフィール編集" onBack={onCancel} right={<button onClick={()=>onSave({...user,displayName:name,gender,avatar,birthYear:birth,height,weight})} style={{...baseBtn,background:"none",color:T.green,fontSize:T.fontBody,fontWeight:700,minHeight:T.touchMin}}>保存</button>}/>
      <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:20}}>
        <AvatarPicker avatar={avatar} onChange={setAvatar} size={90}/>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>ニックネーム</label><input value={name} onChange={e=>setName(e.target.value)} style={inp}/></div>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>性別</label>
          <div style={{display:"flex",gap:10}}>{[["male","男性"],["female","女性"],["other","答えない"]].map(([v,l])=><SelectButton key={v} label={l} selected={gender===v} onClick={()=>setGender(v)}/>)}</div></div>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>生まれた年</label>
          <input type="number" placeholder="例：1958" value={birth} onChange={e=>setBirth(e.target.value)} style={inpC}/></div>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>身長（cm）</label>
          <div style={{display:"flex",alignItems:"center",gap:10}}><input type="number" placeholder="160" value={height} onChange={e=>setHeight(e.target.value)} style={{...inpC,flex:1}}/><span style={{fontSize:T.fontLarge,fontWeight:700,color:T.text}}>cm</span></div></div>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>体重（kg）</label>
          <div style={{display:"flex",alignItems:"center",gap:10}}><input type="number" placeholder="60" value={weight} onChange={e=>setWeight(e.target.value)} style={{...inpC,flex:1}}/><span style={{fontSize:T.fontLarge,fontWeight:700,color:T.text}}>kg</span></div></div>
        <Card style={{background:T.greenLight,border:`1px solid #a7d8b8`,padding:14}}>
          <p style={{margin:0,fontSize:T.fontSub,color:T.green,lineHeight:1.7}}>💡 身長・体重をせっていすると、AIがあなたの基礎代謝にもとづいた正確なアドバイスをします。</p>
        </Card>
      </div>
    </div>
  );
};

// --- Meal Settings ---
const MealSettingsScreen = ({ mealGoal, onSave, onCancel }) => {
  const [cal,setCal]=useState(mealGoal?.cal||"1800");
  const [pro,setPro]=useState(mealGoal?.pro||"50");
  const inp={width:"100%",padding:"16px 18px",border:`2px solid ${T.border}`,borderRadius:T.radiusSm,fontSize:T.fontTitle,fontFamily:"inherit",outline:"none",boxSizing:"border-box",textAlign:"center"};
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="食事の目標" onBack={onCancel} right={<button onClick={()=>onSave({cal,pro})} style={{...baseBtn,background:"none",color:T.green,fontSize:T.fontBody,fontWeight:700,minHeight:T.touchMin}}>保存</button>}/>
      <div style={{flex:1,padding:20,display:"flex",flexDirection:"column",gap:24}}>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>1日の目標カロリー（kcal）</label><input type="number" value={cal} onChange={e=>setCal(e.target.value)} style={inp}/></div>
        <div><label style={{fontSize:T.fontBody,fontWeight:700,color:T.text,marginBottom:8,display:"block"}}>1日の目標たんぱく質（g）</label><input type="number" value={pro} onChange={e=>setPro(e.target.value)} style={inp}/></div>
        <Card style={{background:T.greenLight,border:`1px solid #a7d8b8`}}><p style={{fontSize:T.fontBody,color:T.green,margin:0,lineHeight:1.8}}>💡 目標をせっていすると、AIがあなたに合ったアドバイスをしてくれます。</p></Card>
      </div>
    </div>
  );
};

// --- Lifestyle ---
const LifestyleScreen = ({ lifestyle, onSave, onCancel }) => {
  const [portion,setPortion]=useState(lifestyle?.portionSize||"");
  const [exercise,setExercise]=useState(lifestyle?.exerciseLevel||"");
  const [appetite,setAppetite]=useState(lifestyle?.appetite||"");
  const [mealFreq,setMealFreq]=useState(lifestyle?.mealFrequency||"");
  const [snack,setSnack]=useState(lifestyle?.snackFrequency||"");
  const [walk,setWalk]=useState(lifestyle?.walkMinutes||"");
  const Section=({label,desc,children})=>(<div style={{marginBottom:24}}><label style={{fontSize:T.fontBody,fontWeight:800,color:T.text,display:"block",marginBottom:4}}>{label}</label>{desc&&<p style={{fontSize:T.fontSmall,color:T.textMuted,margin:"0 0 10px"}}>{desc}</p>}{children}</div>);
  const OptionGrid=({options,value,onChange,cols=3})=>(<div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:8}}>{options.map(([v,l,emoji])=>(<button key={v} onClick={()=>onChange(v)} style={{...baseBtn,flexDirection:"column",gap:4,minHeight:T.touchMin+12,borderRadius:T.radiusSm,padding:"10px 6px",border:`2px solid ${value===v?T.green:T.border}`,background:value===v?T.greenLight:T.card,color:value===v?T.green:T.text,fontSize:T.fontSub,fontWeight:value===v?700:500,whiteSpace:"pre-line",lineHeight:1.3}}>{emoji&&<span style={{fontSize:24}}>{emoji}</span>}{l}</button>))}</div>);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="食事量・運動量" onBack={onCancel}/>
      <div style={{flex:1,overflowY:"auto",padding:20}}>
        <Card style={{background:T.orangeLight,border:`1px solid #f5d9b3`,marginBottom:24,padding:16}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}><span style={{fontSize:28,lineHeight:1}}>🤖</span><p style={{fontSize:T.fontBody,color:T.text,margin:0,lineHeight:1.8}}>ふだんの生活スタイルを教えていただくと、AIがより<strong>あなたに合ったアドバイス</strong>をお伝えできます。</p></div>
        </Card>
        <Section label="🍚 ふだんの食事量は？" desc="1食あたりの量を教えてください"><OptionGrid value={portion} onChange={setPortion} options={[["small","少なめ","🍙"],["normal","ふつう","🍱"],["large","多め","🍛"]]}/></Section>
        <Section label="🍽️ 1日に何回食べますか？"><OptionGrid value={mealFreq} onChange={setMealFreq} cols={4} options={[["1","1回",""],["2","2回",""],["3","3回",""],["4+","4回以上",""]]}/></Section>
        <Section label="😋 最近の食欲は？"><OptionGrid value={appetite} onChange={setAppetite} options={[["low","あまりない","😔"],["normal","ふつう","😊"],["good","旺盛","😋"]]}/></Section>
        <Section label="🍪 間食（おやつ）は？"><OptionGrid value={snack} onChange={setSnack} options={[["rarely","ほとんど\nしない",""],["sometimes","ときどき",""],["often","毎日\n食べる",""]]}/></Section>
        <div style={{height:1,background:T.border,margin:"8px 0 24px"}}/>
        <Section label="🏃 ふだんの運動量は？" desc="一番近いものを選んでください">
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[["sedentary","ほとんど動かない","自宅で過ごすことが多い","🏠"],["light","軽い運動","散歩や買い物に出かける程度","🚶"],["moderate","適度に運動","週2〜3回の体操やウォーキング","🏃"],["active","よく運動する","毎日のウォーキングやスポーツ","💪"],["veryActive","活発に運動","農作業やハードな運動を毎日","🔥"]].map(([v,l,desc,emoji])=>(
              <button key={v} onClick={()=>setExercise(v)} style={{...baseBtn,justifyContent:"flex-start",gap:14,minHeight:T.touchMin+8,borderRadius:T.radiusSm,padding:"12px 16px",border:`2px solid ${exercise===v?T.green:T.border}`,background:exercise===v?T.greenLight:T.card,textAlign:"left"}}>
                <span style={{fontSize:28,width:36,textAlign:"center"}}>{emoji}</span><div style={{flex:1}}><p style={{margin:0,fontSize:T.fontBody,fontWeight:exercise===v?800:600,color:exercise===v?T.green:T.text}}>{l}</p><p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.textMuted}}>{desc}</p></div>{exercise===v&&<CheckCircle size={24} color={T.green}/>}
              </button>))}
          </div>
        </Section>
        <Section label="🚶 1日の歩く時間（目安）">
          <div style={{display:"flex",alignItems:"center",gap:12}}><NumInput placeholder="30" value={walk} onChange={setWalk} style={{flex:1,padding:"16px 18px",border:`2px solid ${T.border}`,borderRadius:T.radiusSm,fontSize:T.fontTitle,fontFamily:"inherit",outline:"none",textAlign:"center",boxSizing:"border-box"}}/><span style={{fontSize:T.fontLarge,fontWeight:700,color:T.text,whiteSpace:"nowrap"}}>分くらい</span></div>
        </Section>
      </div>
      <div style={{padding:"12px 20px 24px",borderTop:`2px solid ${T.border}`,background:T.card}}><BigButton onClick={()=>onSave({portionSize:portion,exerciseLevel:exercise,appetite,mealFrequency:mealFreq,snackFrequency:snack,walkMinutes:walk})}>保存する</BigButton></div>
    </div>
  );
};

// --- HealthKit ---
const HealthKitScreen = ({ healthData, onConnect, onDisconnect, onCancel }) => {
  const [syncing,setSyncing]=useState(false);
  const connected=healthData?.connected;
  const doConnect=()=>{setSyncing(true);setTimeout(()=>{setSyncing(false);onConnect({connected:true,steps:4280,heartRate:72,weight:62.5,bloodPressureSys:128,bloodPressureDia:78,sleepHours:6.5,lastSynced:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})});},2000);};
  const doRefresh=()=>{setSyncing(true);setTimeout(()=>{setSyncing(false);onConnect({...healthData,steps:healthData.steps+Math.floor(Math.random()*500),heartRate:68+Math.floor(Math.random()*10),lastSynced:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})});},1500);};
  const DataRow=({icon,label,value,unit})=>(<div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:26,width:36,textAlign:"center"}}>{icon}</span><div style={{flex:1}}><p style={{margin:0,fontSize:T.fontSub,color:T.textMuted}}>{label}</p><p style={{margin:"2px 0 0",fontSize:T.fontTitle,fontWeight:800,color:T.text}}>{value} <span style={{fontSize:T.fontSub,fontWeight:500}}>{unit}</span></p></div></div>);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="ヘルスケア連携" onBack={onCancel}/>
      <div style={{flex:1,overflowY:"auto",padding:20}}>
        <Card style={{background:T.blueLight,border:`1px solid #bfdbfe`,marginBottom:20,padding:16}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}><HeartIcon size={28} color={T.blue}/><div><p style={{margin:"0 0 6px",fontSize:T.fontBody,fontWeight:700,color:T.blue}}>iOSヘルスケアと連携</p><p style={{margin:0,fontSize:T.fontSub,color:T.textSub,lineHeight:1.7}}>歩数・体重・心拍数・血圧・睡眠時間をAI解析に活用し、<strong>より正確なカロリー計算</strong>と<strong>あなただけのアドバイス</strong>をお届けします。</p></div></div>
        </Card>
        {!connected&&<Card style={{marginBottom:20}}><h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:"0 0 14px",color:T.text}}>取得するデータ</h3>
          {[{icon:"👟",label:"歩数",use:"消費カロリーの推定に活用"},{icon:"⚖️",label:"体重",use:"基礎代謝の計算に活用"},{icon:"❤️",label:"心拍数",use:"活動量の推定に活用"},{icon:"💉",label:"血圧",use:"塩分のアドバイスに活用"},{icon:"😴",label:"睡眠時間",use:"生活リズムの把握に活用"}].map(({icon,label,use})=>(<div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:24,width:36,textAlign:"center"}}>{icon}</span><div><p style={{margin:0,fontSize:T.fontBody,fontWeight:700,color:T.text}}>{label}</p><p style={{margin:"2px 0 0",fontSize:T.fontSmall,color:T.textMuted}}>{use}</p></div></div>))}
        </Card>}
        {connected&&<><Card style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}><h3 style={{fontSize:T.fontLarge,fontWeight:800,margin:0,color:T.green}}>✓ 連携中のデータ</h3><button onClick={doRefresh} disabled={syncing} style={{...baseBtn,background:T.greenLight,borderRadius:8,padding:"6px 12px",gap:6,fontSize:T.fontSmall,fontWeight:600,color:T.green}}><RefreshIcon size={16} color={T.green}/> 更新</button></div>
          <p style={{fontSize:T.fontSmall,color:T.textMuted,margin:"0 0 8px"}}>最終同期: {healthData.lastSynced}</p>
          <DataRow icon="👟" label="今日の歩数" value={healthData.steps?.toLocaleString()} unit="歩"/>
          <DataRow icon="❤️" label="心拍数" value={healthData.heartRate} unit="bpm"/>
          <DataRow icon="⚖️" label="体重" value={healthData.weight} unit="kg"/>
          <DataRow icon="💉" label="血圧" value={`${healthData.bloodPressureSys}/${healthData.bloodPressureDia}`} unit="mmHg"/>
          <DataRow icon="😴" label="睡眠時間" value={healthData.sleepHours} unit="時間"/>
        </Card>
        <Card style={{background:T.greenLight,border:`1px solid #a7d8b8`,marginBottom:20}}><p style={{margin:0,fontSize:T.fontBody,color:T.green,lineHeight:1.8}}>✨ これらのデータをもとに、食事のカロリー計算やアドバイスをあなた専用に調整しています。</p></Card></>}
        <Card style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:20,padding:16}}><LockIcon size={24} color={T.green}/><div><p style={{margin:"0 0 4px",fontSize:T.fontBody,fontWeight:700,color:T.text}}>データの安全性について</p><p style={{margin:0,fontSize:T.fontSub,color:T.textSub,lineHeight:1.7}}>ヘルスケアデータは暗号化して安全に保管されます。第三者への提供や販売は一切行いません。</p></div></Card>
      </div>
      <div style={{padding:"12px 20px 24px",borderTop:`2px solid ${T.border}`,background:T.card}}>
        {!connected?<BigButton onClick={doConnect} disabled={syncing} icon={syncing?null:<LinkIcon size={24} color="#fff"/>} color={T.blue}>{syncing?"接続中...":"ヘルスケアと連携する"}</BigButton>
        :<button onClick={()=>onDisconnect()} style={{...baseBtn,width:"100%",minHeight:T.touchMin,borderRadius:T.radiusSm,border:`2px solid ${T.danger}`,background:T.card,color:T.danger,fontSize:T.fontBody,fontWeight:600}}>連携を解除する</button>}
      </div>
    </div>
  );
};

// --- Notification Permission (iOS style) ---
const NotifPermissionScreen = ({ onAllow, onSkip }) => {
  const [showDialog,setShowDialog]=useState(false);
  const [done,setDone]=useState(false);

  const handleAllow = () => {
    setShowDialog(false);
    setDone(true);
    setTimeout(()=>onAllow(),800);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.bg}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
        <div style={{fontSize:72,marginBottom:20}}>🔔</div>
        <h2 style={{fontSize:T.fontTitle+2,fontWeight:800,color:T.text,margin:"0 0 12px",textAlign:"center"}}>通知を受け取りますか？</h2>
        <p style={{fontSize:T.fontBody,color:T.textSub,margin:"0 0 8px",textAlign:"center",lineHeight:1.8}}>
          食事の時間にやさしくお知らせして、<br/>記録のし忘れを防ぎます。
        </p>
        <Card style={{background:T.greenLight,border:`1px solid #a7d8b8`,marginTop:16,marginBottom:8,width:"100%",maxWidth:320,padding:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              {emoji:"🌅",label:"朝食リマインド",time:"7:00"},
              {emoji:"☀️",label:"昼食リマインド",time:"12:00"},
              {emoji:"🌙",label:"夕食リマインド",time:"18:00"},
            ].map(({emoji,label,time})=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{emoji}</span>
                <span style={{fontSize:T.fontSub,fontWeight:600,color:T.green,flex:1}}>{label}</span>
                <span style={{fontSize:T.fontSub,fontWeight:700,color:T.text}}>{time}</span>
              </div>
            ))}
          </div>
        </Card>
        <p style={{fontSize:T.fontSmall,color:T.textMuted,margin:"8px 0 0",textAlign:"center"}}>あとから「せってい」でいつでも変更できます</p>

        {done&&(
          <Card style={{background:T.successLight,border:`1px solid #a7d8b8`,marginTop:20,padding:14,textAlign:"center"}}>
            <p style={{margin:0,fontSize:T.fontBody,fontWeight:700,color:T.success}}>✓ 通知を設定しました！</p>
          </Card>
        )}
      </div>

      {!done&&(
        <div style={{padding:"12px 20px 28px",display:"flex",flexDirection:"column",gap:10}}>
          <BigButton onClick={()=>setShowDialog(true)} icon={<BellIcon size={24} color="#fff"/>}>通知を許可する</BigButton>
          <button onClick={onSkip} style={{...baseBtn,width:"100%",minHeight:T.touchMin,background:"none",color:T.textMuted,fontSize:T.fontSub,fontWeight:600}}>あとで設定する</button>
        </div>
      )}

      {/* iOS-style system dialog overlay */}
      {showDialog&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:24}}>
          <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:300,overflow:"hidden",textAlign:"center"}}>
            <div style={{padding:"24px 20px 16px"}}>
              <p style={{margin:"0 0 8px",fontSize:T.fontLarge,fontWeight:700,color:T.text}}>「NutriLife」は通知を<br/>送信します。よろしいですか？</p>
              <p style={{margin:0,fontSize:T.fontSmall,color:T.textMuted,lineHeight:1.6}}>通知方法は、テキスト、サウンド、<br/>アイコンバッジが利用できる可能性が<br/>あります。通知方法は「設定」で<br/>設定できます。</p>
            </div>
            <div style={{borderTop:`1px solid ${T.border}`,display:"flex"}}>
              <button onClick={()=>{setShowDialog(false);onSkip();}}
                style={{...baseBtn,flex:1,padding:"14px 0",background:"none",borderRight:`1px solid ${T.border}`,color:T.blue,fontSize:T.fontBody,fontWeight:500}}>許可しない</button>
              <button onClick={handleAllow}
                style={{...baseBtn,flex:1,padding:"14px 0",background:"none",color:T.blue,fontSize:T.fontBody,fontWeight:700}}>許可</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Notification Settings ---
const NotifSettingsScreen = ({ notifSettings, onSave, onCancel }) => {
  const defaults=[
    {key:"breakfast",label:"朝食",emoji:"🌅",hour:7,min:0,on:true},
    {key:"lunch",label:"昼食",emoji:"☀️",hour:12,min:0,on:true},
    {key:"dinner",label:"夕食",emoji:"🌙",hour:18,min:0,on:true},
  ];
  const init=defaults.map(d=>{const s=notifSettings?.find(n=>n.key===d.key);return s?{...d,...s}:d;});
  const [items,setItems]=useState(init);
  const [editIdx,setEditIdx]=useState(null);

  const toggle=(idx)=>{
    setItems(prev=>prev.map((it,i)=>i===idx?{...it,on:!it.on}:it));
  };

  const setTime=(idx,field,val)=>{
    let num=parseInt(val)||0;
    if(field==="hour")num=Math.max(0,Math.min(23,num));
    if(field==="min")num=Math.max(0,Math.min(59,num));
    setItems(prev=>prev.map((it,i)=>i===idx?{...it,[field]:num}:it));
  };

  const timeStr=(h,m)=>`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;

  const inpTime={width:60,padding:"12px 6px",border:`2px solid ${T.border}`,borderRadius:T.radiusSm,fontSize:T.fontTitle,fontFamily:"inherit",outline:"none",boxSizing:"border-box",textAlign:"center"};

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="通知設定" onBack={onCancel}/>
      <div style={{flex:1,overflowY:"auto",padding:20}}>
        <Card style={{background:T.orangeLight,border:`1px solid #f5d9b3`,marginBottom:20,padding:16}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <span style={{fontSize:28,lineHeight:1}}>🔔</span>
            <p style={{margin:0,fontSize:T.fontBody,color:T.text,lineHeight:1.8}}>食事の時間にお知らせして、<strong>記録のし忘れ</strong>を防ぎます。</p>
          </div>
        </Card>

        {items.map((it,idx)=>(
          <Card key={it.key} style={{marginBottom:12,padding:0,overflow:"hidden"}}>
            {/* Main row */}
            <button onClick={()=>setEditIdx(editIdx===idx?null:idx)}
              style={{...baseBtn,width:"100%",justifyContent:"space-between",padding:"16px 20px",minHeight:T.touchMin+12,background:"transparent"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <span style={{fontSize:32}}>{it.emoji}</span>
                <div style={{textAlign:"left"}}>
                  <p style={{margin:0,fontSize:T.fontLarge,fontWeight:700,color:T.text}}>{it.label}のリマインド</p>
                  <p style={{margin:"2px 0 0",fontSize:T.fontSub,color:it.on?T.green:T.textMuted,fontWeight:600}}>
                    {it.on?`${timeStr(it.hour,it.min)} に通知`:"オフ"}
                  </p>
                </div>
              </div>
              {/* Toggle */}
              <div onClick={(e)=>{e.stopPropagation();toggle(idx);}}
                style={{width:56,height:32,borderRadius:16,background:it.on?T.green:"#ccc",padding:2,cursor:"pointer",transition:"background 0.3s",flexShrink:0}}>
                <div style={{width:28,height:28,borderRadius:14,background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transform:it.on?"translateX(24px)":"translateX(0)",transition:"transform 0.3s"}}/>
              </div>
            </button>

            {/* Time editor (expanded) */}
            {editIdx===idx&&it.on&&(
              <div style={{padding:"0 20px 20px",borderTop:`1px solid ${T.border}`}}>
                <p style={{fontSize:T.fontSub,fontWeight:700,color:T.textMuted,margin:"14px 0 10px"}}>通知する時刻</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <button onClick={()=>setTime(idx,"hour",it.hour+1)} style={{...baseBtn,background:T.greenLight,width:44,height:36,borderRadius:8}}><ChevronR size={20} color={T.green} style={{transform:"rotate(-90deg)"}}/></button>
                    <NumInput value={String(it.hour).padStart(2,"0")} onChange={v=>setTime(idx,"hour",v)} maxLen={2} style={inpTime}/>
                    <button onClick={()=>setTime(idx,"hour",it.hour-1)} style={{...baseBtn,background:T.greenLight,width:44,height:36,borderRadius:8}}><ChevronR size={20} color={T.green} style={{transform:"rotate(90deg)"}}/></button>
                  </div>
                  <span style={{fontSize:T.fontHero,fontWeight:800,color:T.text,paddingBottom:4}}>:</span>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <button onClick={()=>setTime(idx,"min",(it.min+5)%60)} style={{...baseBtn,background:T.greenLight,width:44,height:36,borderRadius:8}}><ChevronR size={20} color={T.green} style={{transform:"rotate(-90deg)"}}/></button>
                    <NumInput value={String(it.min).padStart(2,"0")} onChange={v=>setTime(idx,"min",v)} maxLen={2} style={inpTime}/>
                    <button onClick={()=>setTime(idx,"min",(it.min-5+60)%60)} style={{...baseBtn,background:T.greenLight,width:44,height:36,borderRadius:8}}><ChevronR size={20} color={T.green} style={{transform:"rotate(90deg)"}}/></button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}

        <Card style={{background:T.greenLight,border:`1px solid #a7d8b8`,marginTop:8,padding:14}}>
          <p style={{margin:0,fontSize:T.fontSub,color:T.green,lineHeight:1.7}}>💡 前回の食事にあわせた内容の通知が届きます。（例：「昨日はお魚でしたね、今日もバランス良く！」）</p>
        </Card>
      </div>
      <div style={{padding:"12px 20px 24px",borderTop:`2px solid ${T.border}`,background:T.card}}>
        <BigButton onClick={()=>onSave(items)}>保存する</BigButton>
      </div>
    </div>
  );
};

// --- Terms of Service ---
const TermsScreen = ({ onBack }) => {
  const S=({children})=>(<h3 style={{fontSize:T.fontLarge,fontWeight:800,color:T.green,margin:"28px 0 8px"}}>{children}</h3>);
  const P=({children})=>(<p style={{fontSize:T.fontBody,color:T.text,margin:"0 0 10px",lineHeight:2}}>{children}</p>);
  const Li=({children})=>(<p style={{fontSize:T.fontBody,color:T.text,margin:"0 0 6px",lineHeight:2,paddingLeft:16}}>・{children}</p>);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Header title="利用規約" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:20}}>
        <P>本利用規約（以下「本規約」）は、NutriLife運営事務局（以下「当社」）が提供するアプリケーション「NutriLife」（以下「本アプリ」）の利用条件を定めるものです。ご利用の前に必ずお読みください。</P>

        <S>第1条（サービスの概要）</S>
        <P>本アプリは、利用者が撮影または選択した食事の写真をAI（人工知能）で解析し、推定カロリー・栄養素の表示、食事に関するアドバイス、およびサプリメントの提案を行うサービスです。</P>

        <S>第2条（利用資格）</S>
        <P>本アプリは、日本国内に居住する方を対象としています。未成年の方がご利用になる場合は、親権者等の法定代理人の同意を得た上でご利用ください。</P>

        <S>第3条（アカウントの管理）</S>
        <P>1. 利用者は、電話番号（SMS認証）等によりアカウントを作成します。</P>
        <P>2. 利用者はご自身のアカウント情報を適切に管理する責任を負い、第三者への譲渡・共有・貸与はできません。</P>
        <P>3. 当社は、登録されたアカウントで行われた一切の行為を、利用者本人による行為とみなします。</P>

        <S>第4条（AI解析および健康情報に関する免責事項）</S>
        <P>1. 本アプリのAI解析結果（カロリー、栄養素、アドバイス等）は、あくまで推定値であり、その完全性、正確性、有用性を保証するものではありません。</P>
        <P>2. 本アプリは医療機器ではなく、提供する情報は医療診断・治療・予防を目的としたものではありません。健康上の判断は必ず医師・管理栄養士等の専門家にご相談ください。</P>
        <P>3. 利用者は、本アプリの情報を参考にするか否かを自己の責任において判断するものとし、当該判断により生じた結果について、当社は故意または重大な過失がない限り責任を負いません。</P>

        <S>第5条（サプリメント提案について）</S>
        <P>1. 本アプリで提案するサプリメント情報は、栄養素の不足傾向に基づく一般的な情報提供であり、特定の効能・効果を保証するものではありません。</P>
        <P>2. サプリメントの購入・服用にあたっては、ご自身の体質、アレルギー、現在服用中のお薬との相互作用等を考慮し、必要に応じて医師・薬剤師にご相談ください。</P>

        <S>第6条（個人情報・プライバシー情報の取り扱い）</S>
        <P>1. 当社は、利用者の個人情報およびプライバシー情報を、別途定める「プライバシーポリシー」に従い、適切に取り扱います。</P>
        <P>2. 当社は、本アプリのサービス提供および改善の目的に限り、以下の情報を取得・利用します。</P>
        <Li>電話番号、ニックネーム、性別、生年月日、身長、体重</Li>
        <Li>食事の撮影画像およびAI解析結果</Li>
        <Li>iOSヘルスケア等の外部サービスから取得したデータ（歩数、心拍数、体重、血圧、睡眠時間等）</Li>
        <P>3. iOSヘルスケア等の外部サービスから取得したデータについて、当社は第三者への販売や、広告配信の目的での利用は行いません。</P>

        <S>第7条（外部サービス連携）</S>
        <P>1. iOSヘルスケア等の外部サービスとの連携は任意であり、利用者はいつでも本アプリの設定から連携を解除できます。</P>
        <P>2. 連携解除後、当社は当該外部サービスから新たなデータの取得を停止します。また、取得済みのデータについては、法令またはプライバシーポリシーの定めに従い、適切に管理または削除します。</P>

        <S>第8条（AIの学習データ利用）</S>
        <P>利用者がアップロードした食事画像を、AIの精度向上を目的とした学習データとして利用する場合があります。この場合、初回利用時等に別途利用者の同意を取得するものとし、利用者はいつでも設定画面等から同意を撤回できます。なお、学習データとして利用する場合は匿名化処理を行い、個人を特定できない形で使用します。</P>

        <S>第9条（有料プラン・課金）</S>
        <P>1. 本アプリの一部機能は、有料（サブスクリプション等）で提供される場合があります。</P>
        <P>2. 有料プランの利用料金、決済方法およびキャンセル条件等は、本アプリ内の購入ページ等の記載に従います。</P>
        <P>3. 法令に基づき認められる場合を除き、一度支払われた利用料金の返金には応じられません。</P>

        <S>第10条（禁止事項）</S>
        <P>利用者は、以下の行為を行ってはなりません。</P>
        <Li>本アプリの不正利用、リバースエンジニアリング</Li>
        <Li>虚偽の情報の登録</Li>
        <Li>他の利用者のアカウントへの不正アクセス</Li>
        <Li>本アプリのサーバーに過度な負荷をかける行為</Li>
        <Li>当社または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利を侵害する行為</Li>
        <Li>法令または公序良俗に反する行為</Li>
        <Li>その他、当社が不適切と判断する行為</Li>

        <S>第11条（退会）</S>
        <P>利用者は、本アプリ内の所定の手続きにより、いつでも本アプリを退会（アカウント削除）することができます。退会した場合、利用者の保有するすべてのデータおよび権利は失効します。</P>

        <S>第12条（サービスの変更・中断・終了）</S>
        <P>当社は、事前の通知により本アプリの内容を変更、または一時的に中断・終了することがあります。緊急の場合は事後の通知とする場合があります。これにより利用者に生じた損害について、当社は故意または重大な過失がない限り責任を負いません。</P>

        <S>第13条（知的財産権）</S>
        <P>本アプリに関するすべての知的財産権（プログラム、デザイン、AIモデル等）は当社に帰属します。利用者がアップロードした画像の著作権は利用者に帰属しますが、第8条に定める範囲および本サービスの提供に必要な範囲で、当社が無償で利用することを許諾するものとします。</P>

        <S>第14条（反社会的勢力の排除）</S>
        <P>利用者は、現在および将来にわたり、暴力団、暴力団員、その他これらに準ずる者（以下「反社会的勢力」といいます）に該当しないこと、および反社会的勢力と関係を持たないことを表明し、保証するものとします。</P>

        <S>第15条（損害賠償の制限）</S>
        <P>本アプリの利用に関して利用者に損害が生じた場合、当社に故意または重大な過失がある場合を除き、当社の賠償責任は、当該損害が発生した月に利用者が当社に支払った利用料金の額（無料プランの場合は1,000円）を上限とします。</P>

        <S>第16条（規約の変更）</S>
        <P>当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、本アプリ内への掲載等の適切な方法で周知した時点から効力を生じます。変更後に本アプリを利用した場合、変更に同意したものとみなします。</P>

        <S>第17条（準拠法・管轄裁判所）</S>
        <P>本規約は日本法に準拠します。本規約に関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</P>

        <div style={{height:24}}/>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [screen,setScreen]=useState("auth");
  const [user,setUser]=useState(null);
  const [analysis,setAnalysis]=useState(null);
  const [logs,setLogs]=useState([]);
  const [lifestyle,setLifestyle]=useState({});
  const [healthData,setHealthData]=useState({connected:false});
  const [detailLog,setDetailLog]=useState(null);

  const [cameraMode,setCameraMode]=useState("camera");

  const [mealGoal,setMealGoal]=useState({cal:"1800",pro:"50"});

  const [notifSettings,setNotifSettings]=useState(null);

  // No demo data - start fresh

  const nav=useCallback((s)=>{setDetailLog(null);setScreen(s);},[]);
  const handleAuth=(u)=>{setUser(u);setScreen("profileSetup");};
  const handleProfileDone=(p)=>{setUser(u=>({...u,...p}));setScreen("home");};
  const handleLogout=()=>{setUser(null);setLogs([]);setLifestyle({});setHealthData({connected:false});setScreen("auth");};

  const handleCapture=async()=>{
    setScreen("analyzing");
    try{
      const result=await mockAnalyze(lifestyle,healthData);
      setAnalysis(result);
      const now=new Date();
      setLogs(prev=>[{...result,time:`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`,date:now.toDateString()},...prev]);
      setScreen("result");
    }catch{setScreen("home");}
  };

  const viewDetail=(log)=>{setDetailLog(log);setScreen("mealDetail");};

  if(screen==="mealDetail"&&detailLog){
    return (
      <div style={{width:"100%",maxWidth:440,margin:"0 auto",height:"100vh",background:T.bg,fontFamily:"'BIZ UDPGothic','Hiragino Sans','Hiragino Kaku Gothic ProN',-apple-system,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden",color:T.text,WebkitFontSmoothing:"antialiased"}}>
        <MealLogDetailScreen log={detailLog} onBack={()=>{setDetailLog(null);setScreen("record");}}/>
      </div>
    );
  }

  const screens={
    auth:<AuthScreen onAuth={handleAuth}/>,
    profileSetup:<ProfileSetupScreen onComplete={handleProfileDone}/>,
    notifPermission:<NotifPermissionScreen onAllow={()=>nav("home")} onSkip={()=>nav("home")}/>,
    home:<HomeScreen user={user||{}} logs={logs} healthData={healthData} onCamera={(m)=>{setCameraMode(m||"camera");setScreen("camera");}} onNav={nav}/>,
    camera:<CameraScreen mode={cameraMode} onCapture={handleCapture} onCancel={()=>setScreen("home")}/>,
    analyzing:<AnalyzingScreen lifestyle={lifestyle} healthData={healthData}/>,
    result:analysis&&<ResultScreen analysis={analysis} onClose={()=>setScreen("home")} onFeedback={t=>console.log("FB:",t)} onNav={nav}/>,
    record:<RecordScreen logs={logs} onNav={nav} onViewDetail={viewDetail}/>,
    settings:<SettingsScreen user={user||{}} healthData={healthData} onNav={nav} onLogout={handleLogout} onEditProfile={()=>setScreen("profileEdit")}/>,
    profileEdit:<ProfileEditScreen user={user||{}} onSave={u=>{setUser(u);setScreen("settings");}} onCancel={()=>setScreen("settings")}/>,
    mealSettings:<MealSettingsScreen mealGoal={mealGoal} onSave={g=>{setMealGoal(g);setScreen("settings");}} onCancel={()=>setScreen("settings")}/>,
    notifSettings:<NotifSettingsScreen notifSettings={notifSettings} onSave={ns=>{setNotifSettings(ns);setScreen("settings");}} onCancel={()=>setScreen("settings")}/>,
    lifestyle:<LifestyleScreen lifestyle={lifestyle} onSave={ls=>{setLifestyle(ls);setScreen("settings");}} onCancel={()=>setScreen("settings")}/>,
    healthKit:<HealthKitScreen healthData={healthData} onConnect={d=>setHealthData(d)} onDisconnect={()=>setHealthData({connected:false})} onCancel={()=>setScreen("settings")}/>,
    terms:<TermsScreen onBack={()=>setScreen("settings")}/>,
  };

  return (
    <div style={{width:"100%",maxWidth:440,margin:"0 auto",height:"100vh",background:T.bg,fontFamily:"'BIZ UDPGothic','Hiragino Sans','Hiragino Kaku Gothic ProN',-apple-system,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden",color:T.text,WebkitFontSmoothing:"antialiased"}}>
      {screens[screen]||screens.home}
    </div>
  );
}
