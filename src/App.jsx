import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://fnztvlbywgkddbggesli.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuenR2bGJ5d2drZGRiYmdlc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2Mjk1MTYsImV4cCI6MjA4ODIwNTUxNn0.M2zNwF8qWjV3CN9mf-Dv-rLr4OxJAkH1ui_MKS2GwII";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOGO_B64 = "data:image/png;base64,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53nndvB57lyq5VNVU6zLaI0AGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=";

// ─── THEME ─────────────────────────────────────────────────────────────────────
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const GlobalStyle = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;background:${dark?"#111116":"#f5f4f0"};color:${dark?"#e4e2dc":"#181714"};transition:background .3s,color .3s;-webkit-font-smoothing:antialiased}
    input,textarea,button,select{font-family:inherit}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${dark?"#2e2e38":"#ddd"};border-radius:2px}
    @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .fade-in{animation:fadeIn .22s ease both}
    .slide-up{animation:slideUp .28s cubic-bezier(.16,1,.3,1) both}
  `}</style>
);

const tk = (dark) => ({
  bg: dark?"#111116":"#f5f4f0",
  surface: dark?"#1c1c23":"#ffffff",
  surfaceAlt: dark?"#242430":"#eeecea",
  border: dark?"#2c2c38":"#e2dfd8",
  text: dark?"#e4e2dc":"#181714",
  textMuted: dark?"#7a7888":"#8a8678",
  textFaint: dark?"#42424e":"#bbb9b0",
  accent: "#4d3bcc",
  accentLight: dark?"#2a2250":"#ebe8fb",
  rose: dark?"#c4706a":"#b85450",
  roseBg: dark?"#2b1c1c":"#fdf0ef",
  sky: dark?"#7aafc4":"#4a8faa",
  skyBg: dark?"#192530":"#eaf3f8",
  amber: dark?"#c4a462":"#9e7a20",
  amberBg: dark?"#2a2110":"#fdf5e0",
  green: dark?"#7db87a":"#4a8f48",
  greenBg: dark?"#192318":"#edf7ec",
  shadow: dark?"0 2px 12px rgba(0,0,0,.4)":"0 2px 12px rgba(0,0,0,.06)",
  shadowLg: dark?"0 8px 32px rgba(0,0,0,.55)":"0 8px 32px rgba(0,0,0,.1)",
  r: "12px", rSm: "7px", rLg: "18px",
});

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const genId = () => Math.random().toString(36).slice(2)+Date.now().toString(36);
const todayStr = () => new Date().toISOString().slice(0,10);
const isOverdue = (d,tm) => {
  if(!d) return false;
  const dt = tm ? new Date(`${d}T${tm}`) : new Date(d+"T23:59:59");
  return dt < new Date();
};
const isDueToday = (d) => d === todayStr();
const fmtDateTime = (date, time) => {
  if(!date) return "";
  const dt = new Date(`${date}T${time||"00:00"}`);
  const opts = { month:"short", day:"numeric" };
  if(time) { opts.hour="2-digit"; opts.minute="2-digit"; }
  return dt.toLocaleDateString("en-US", opts);
};

// ─── SMALL UI ──────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant="ghost", size="md", style:s={}, disabled, full }) => {
  const {dark}=useTheme(); const t=tk(dark);
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,fontWeight:600,cursor:disabled?"not-allowed":"pointer",border:"none",borderRadius:t.rSm,transition:"all .15s",opacity:disabled?.5:1,whiteSpace:"nowrap",width:full?"100%":undefined,userSelect:"none"};
  const sizes={sm:{padding:"5px 12px",fontSize:12},md:{padding:"8px 16px",fontSize:13},lg:{padding:"11px 22px",fontSize:14}};
  const variants={
    primary:{background:t.accent,color:"#fff"},
    danger:{background:t.rose,color:"#fff"},
    ghost:{background:"transparent",color:t.text,border:`1px solid ${t.border}`},
    subtle:{background:t.surfaceAlt,color:t.text},
  };
  return <button style={{...base,...sizes[size],...variants[variant],...s}} onClick={disabled?undefined:onClick}>{children}</button>;
};

const Input = ({value,onChange,placeholder,type="text",style:s={},multiline,rows=3,autoFocus,min,max}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const base={width:"100%",padding:"9px 12px",borderRadius:t.rSm,border:`1px solid ${t.border}`,background:t.surfaceAlt,color:t.text,fontSize:13,outline:"none",resize:"none",...s};
  const props={value,onChange:e=>onChange(e.target.value),placeholder,style:base,autoFocus,min,max};
  return multiline?<textarea rows={rows} {...props}/>:<input type={type} {...props}/>;
};

const Badge = ({count}) => {
  if(!count) return null;
  return <span style={{minWidth:17,height:17,borderRadius:9,background:"#b85450",color:"#fff",fontSize:10,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{count>99?"99+":count}</span>;
};

const Tag = ({label,color="accent"}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const map={accent:[t.accentLight,t.accent],sky:[t.skyBg,t.sky],amber:[t.amberBg,t.amber],rose:[t.roseBg,t.rose],green:[t.greenBg,t.green]};
  const [bg,fg]=map[color]||map.accent;
  return <span style={{padding:"2px 8px",borderRadius:20,background:bg,color:fg,fontSize:11,fontWeight:600}}>{label}</span>;
};

const Modal = ({open,onClose,children,title,width=500}) => {
  const {dark}=useTheme(); const t=tk(dark);
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} className="slide-up" style={{background:t.surface,borderRadius:t.rLg,width:"100%",maxWidth:width,maxHeight:"90vh",overflowY:"auto",boxShadow:t.shadowLg}}>
        <div style={{padding:"18px 22px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${t.border}`}}>
          <span style={{fontWeight:700,fontSize:15}}>{title}</span>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.textMuted,fontSize:18}}>✕</button>
        </div>
        <div style={{padding:"18px 22px 22px"}}>{children}</div>
      </div>
    </div>
  );
};

const Field = ({label,children,hint}) => {
  const {dark}=useTheme(); const t=tk(dark);
  return (
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:600,color:t.textMuted,marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
      {children}
      {hint&&<p style={{fontSize:11,color:t.textFaint,marginTop:3}}>{hint}</p>}
    </div>
  );
};

// ─── AUTH ──────────────────────────────────────────────────────────────────────
const AuthScreen = ({onLogin}) => {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const {dark}=useTheme(); const t=tk(dark);

  const submit = async () => {
    setErr(""); setLoading(true);
    try {
      if(mode==="signup"){
        if(!name.trim()) { setErr("Name is required."); setLoading(false); return; }
        if(!email.includes("@")) { setErr("Enter a valid email."); setLoading(false); return; }
        if(pw.length<6) { setErr("Password must be at least 6 characters."); setLoading(false); return; }

        // Supabase Auth signup
        const {data:authData, error:authErr} = await sb.auth.signUp({email:email.toLowerCase(),password:pw});
        if(authErr) { setErr(authErr.message); setLoading(false); return; }

        // Save profile to users table
        const user = {id:authData.user.id, name:name.trim(), email:email.toLowerCase()};
        await sb.from("users").upsert(user);
        onLogin(user);
      } else {
        const {data:authData, error:authErr} = await sb.auth.signInWithPassword({email:email.toLowerCase(),password:pw});
        if(authErr) { setErr("Invalid email or password."); setLoading(false); return; }

        // Fetch profile
        const {data:profile} = await sb.from("users").select("*").eq("id",authData.user.id).single();
        onLogin(profile || {id:authData.user.id, name:email.split("@")[0], email:email.toLowerCase()});
      }
    } catch(e) {
      setErr("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:t.bg}}>
      <div className="fade-in" style={{width:"100%",maxWidth:360}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <img src={LOGO_B64} alt="PlanMy" style={{width:72,height:72,objectFit:"contain",marginBottom:14,mixBlendMode:dark?"screen":"multiply",filter:dark?"brightness(0.85) contrast(1.2)":"none"}}/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:30,fontWeight:400,color:t.text,marginBottom:6}}>PlanMy</h1>
          <p style={{color:t.textMuted,fontSize:14}}>{mode==="login"?"Welcome back":"Create your account"}</p>
        </div>
        <div style={{background:t.surface,borderRadius:t.rLg,padding:26,boxShadow:t.shadow}}>
          {mode==="signup"&&<Field label="Full name"><Input value={name} onChange={setName} placeholder="Your name" autoFocus/></Field>}
          <Field label="Email"><Input value={email} onChange={setEmail} placeholder="you@email.com" type="email" autoFocus={mode==="login"}/></Field>
          <Field label="Password"><Input value={pw} onChange={setPw} placeholder="••••••••" type="password"/></Field>
          {err&&<p style={{color:t.rose,fontSize:13,marginBottom:14,padding:"8px 12px",background:t.roseBg,borderRadius:t.rSm}}>{err}</p>}
          <Btn variant="primary" size="lg" full onClick={submit} disabled={loading}>{loading?"…":mode==="login"?"Sign in":"Create account"}</Btn>
          <p style={{textAlign:"center",marginTop:14,fontSize:13,color:t.textMuted}}>
            {mode==="login"?"No account? ":"Already have one? "}
            <span style={{color:t.accent,cursor:"pointer",fontWeight:600}} onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("");}}>
              {mode==="login"?"Sign up":"Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── TASK FORM ─────────────────────────────────────────────────────────────────
const TaskForm = ({initial={},onSave,onCancel,currentUser}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const [title,setTitle]=useState(initial.title||"");
  const [desc,setDesc]=useState(initial.description||"");
  const [due,setDue]=useState(initial.due_date||"");
  const [time,setTime]=useState(initial.due_time||"");
  const [useTime,setUseTime]=useState(!!initial.due_time);
  const [collabEmail,setCollabEmail]=useState("");
  const [collabs,setCollabs]=useState(initial.collaborators||[]);
  const [files,setFiles]=useState(initial.files||[]);
  const [err,setErr]=useState("");
  const [searching,setSearching]=useState(false);
  const fileRef=useRef();

  const nowLocal = new Date();
  const localDate = nowLocal.toISOString().slice(0,10);
  const localTime = nowLocal.toTimeString().slice(0,5);

  const addCollab = async () => {
    setErr(""); setSearching(true);
    const em=collabEmail.trim().toLowerCase();
    if(!em) { setSearching(false); return; }
    if(em===currentUser.email) { setErr("Du kan ikke legge til deg selv."); setSearching(false); return; }
    if(collabs.find(c=>c.email===em)) { setErr("Allerede lagt til."); setSearching(false); return; }

    const {data,error} = await sb.from("users").select("*").eq("email",em).single();
    setSearching(false);
    if(error||!data) { setErr("Fant ingen konto med denne e-postadressen."); return; }
    setCollabs([...collabs,{id:data.id,email:data.email,name:data.name,status:"pending"}]);
    setCollabEmail("");
  };

  const handleFiles = e => {
    Array.from(e.target.files).forEach(f=>{
      const reader=new FileReader();
      reader.onload=ev=>setFiles(prev=>[...prev,{id:genId(),name:f.name,size:f.size,type:f.type,data:ev.target.result,uploaded_at:new Date().toISOString()}]);
      reader.readAsDataURL(f);
    });
  };

  const save = () => {
    if(!title.trim()) return setErr("Title is required.");
    onSave({title:title.trim(),description:desc,due_date:due,due_time:useTime?time:"",collaborators:collabs,files});
  };

  return (
    <div>
      <Field label="Title *"><Input value={title} onChange={setTitle} placeholder="Task title" autoFocus/></Field>
      <Field label="Description"><Input value={desc} onChange={setDesc} placeholder="Optional details…" multiline rows={2}/></Field>
      <Field label="Due date"><Input value={due} onChange={setDue} type="date" min={localDate}/></Field>
      {due && (
        <Field label="Due time (optional)">
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:t.textMuted,cursor:"pointer"}}>
              <input type="checkbox" checked={useTime} onChange={e=>setUseTime(e.target.checked)} style={{accentColor:t.accent}}/>
              Set specific time
            </label>
            {useTime && <Input value={time||localTime} onChange={setTime} type="time" style={{width:130}}/>}
          </div>
        </Field>
      )}
      <Field label="Collaborators">
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <Input value={collabEmail} onChange={setCollabEmail} placeholder="Email address" style={{flex:1}}/>
          <Btn onClick={addCollab} variant="subtle" size="sm" disabled={searching}>{searching?"…":"Add"}</Btn>
        </div>
        {collabs.map(c=>(
          <div key={c.email} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:t.surfaceAlt,borderRadius:t.rSm,marginBottom:4,fontSize:13}}>
            <span>{c.name} <span style={{color:t.textMuted}}>({c.email})</span></span>
            <span onClick={()=>setCollabs(collabs.filter(x=>x.email!==c.email))} style={{cursor:"pointer",color:t.rose,fontSize:18}}>×</span>
          </div>
        ))}
      </Field>
      <Field label="Attachments" hint="Files are deleted permanently when task is completed or deleted.">
        <div onClick={()=>fileRef.current.click()} style={{border:`1.5px dashed ${t.border}`,borderRadius:t.rSm,padding:"11px 16px",textAlign:"center",cursor:"pointer",color:t.textMuted,fontSize:13}}>
          📎 Click to attach files
        </div>
        <input ref={fileRef} type="file" multiple onChange={handleFiles} style={{display:"none"}} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,.txt"/>
        {files.map(f=>(
          <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",background:t.surfaceAlt,borderRadius:t.rSm,marginTop:4,fontSize:12}}>
            <span>📄 {f.name} <span style={{color:t.textMuted}}>({(f.size/1024).toFixed(1)}kb)</span></span>
            <span onClick={()=>setFiles(files.filter(x=>x.id!==f.id))} style={{cursor:"pointer",color:t.rose}}>×</span>
          </div>
        ))}
      </Field>
      {err&&<p style={{color:t.rose,fontSize:13,marginBottom:12}}>{err}</p>}
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
        <Btn onClick={save} variant="primary">Save task</Btn>
      </div>
    </div>
  );
};

// ─── TASK CARD ─────────────────────────────────────────────────────────────────
const TaskCard = ({task,onToggle,onDelete,onEdit,projectName,showProject}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const [expanded,setExpanded]=useState(false);
  const over = isOverdue(task.due_date, task.due_time) && !task.completed;
  const dToday = isDueToday(task.due_date) && !task.completed;
  const accepted=(task.collaborators||[]).filter(c=>c.status==="accepted");

  return (
    <div className="fade-in" style={{background:t.surface,borderRadius:t.r,border:`1px solid ${t.border}`,marginBottom:8,opacity:task.completed?.6:1}}>
      <div style={{padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer"}} onClick={()=>setExpanded(!expanded)}>
        <div onClick={e=>{e.stopPropagation();onToggle(task.id);}} style={{width:20,height:20,borderRadius:6,border:`2px solid ${task.completed?t.accent:t.border}`,background:task.completed?t.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,cursor:"pointer"}}>
          {task.completed&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
            <span style={{fontWeight:600,fontSize:14,textDecoration:task.completed?"line-through":"none",color:task.completed?t.textMuted:t.text,wordBreak:"break-word"}}>{task.title}</span>
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              {accepted.length>0&&<span title="Shared" style={{fontSize:13}}>👥</span>}
              {(task.files||[]).length>0&&!task.completed&&<span title="Attachments" style={{fontSize:13}}>📎</span>}
              <span style={{fontSize:12,color:t.textMuted}}>{expanded?"▲":"▼"}</span>
            </div>
          </div>
          <div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}>
            {task.due_date&&(
              <span style={{fontSize:11,fontWeight:600,color:over?t.rose:dToday?t.amber:t.textMuted,background:over?t.roseBg:dToday?t.amberBg:t.surfaceAlt,padding:"2px 7px",borderRadius:20}}>
                {over?"⚠ ":dToday?"● ":""}{fmtDateTime(task.due_date, task.due_time)}
              </span>
            )}
            {showProject&&projectName&&<Tag label={projectName} color="sky"/>}
            {task.completed&&<Tag label="Done" color="green"/>}
          </div>
        </div>
      </div>
      {expanded&&(
        <div style={{padding:"0 14px 14px 46px",borderTop:`1px solid ${t.border}`}}>
          {task.description&&<p style={{fontSize:13,color:t.textMuted,marginTop:10,marginBottom:10,lineHeight:1.5}}>{task.description}</p>}
          {(task.files||[]).length>0&&!task.completed&&(
            <div style={{marginBottom:10}}>
              {task.files.map(f=>(
                <a key={f.id} href={f.data} download={f.name} style={{display:"flex",gap:6,alignItems:"center",padding:"5px 8px",background:t.surfaceAlt,borderRadius:t.rSm,marginBottom:3,fontSize:12,color:t.sky,textDecoration:"none"}}>📄 {f.name}</a>
              ))}
            </div>
          )}
          {accepted.length>0&&(
            <div style={{marginBottom:10}}>
              {accepted.map(c=><div key={c.id} style={{fontSize:12,color:t.textMuted,marginBottom:2}}>👤 {c.name}</div>)}
            </div>
          )}
          {!task.completed&&(
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <Btn size="sm" variant="subtle" onClick={()=>onEdit(task)}>Edit</Btn>
              <Btn size="sm" variant="ghost" style={{color:t.rose,borderColor:t.rose}} onClick={()=>onDelete(task.id)}>Delete</Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── HOME TAB ──────────────────────────────────────────────────────────────────
const HomeTab = ({currentUser,tasks,projects,onAddTask,onToggleTask,onDeleteTask,onEditTask}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);

  const visible=tasks.filter(tk=>
    tk.owner_id===currentUser.id ||
    (tk.collaborators||[]).some(c=>c.id===currentUser.id&&c.status==="accepted")
  );
  const dueToday=visible.filter(tk=>isDueToday(tk.due_date)&&!tk.completed);
  const completedToday=visible.filter(tk=>tk.completed&&tk.completed_at&&tk.completed_at.slice(0,10)===todayStr());
  const overdue=visible.filter(tk=>isOverdue(tk.due_date,tk.due_time)&&!tk.completed);

  const sorted=[...visible].sort((a,b)=>{
    if(a.completed&&!b.completed) return 1;
    if(!a.completed&&b.completed) return -1;
    if(isOverdue(a.due_date,a.due_time)&&!isOverdue(b.due_date,b.due_time)) return -1;
    if(!isOverdue(a.due_date,a.due_time)&&isOverdue(b.due_date,b.due_time)) return 1;
    const da=(a.due_date||"9999")+(a.due_time||"");
    const db2=(b.due_date||"9999")+(b.due_time||"");
    return da<db2?-1:1;
  });

  const getProjectName=id=>{const p=projects.find(x=>x.id===id);return p?p.name:null;};
  const total=visible.filter(v=>!v.completed).length;
  const doneCount=visible.filter(v=>v.completed).length;
  const prog=total+doneCount>0?doneCount/(total+doneCount):0;

  return (
    <div style={{padding:"18px 15px"}}>
      <div style={{background:t.surface,borderRadius:t.rLg,padding:20,marginBottom:18,boxShadow:t.shadow}}>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontWeight:400,fontSize:22,marginBottom:16}}>
          Hello, {currentUser.name.split(" ")[0]} 👋
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[
            {label:"Due today",count:dueToday.length,color:t.amber,bg:t.amberBg},
            {label:"Completed",count:completedToday.length,color:t.green,bg:t.greenBg},
            {label:"Overdue",count:overdue.length,color:t.rose,bg:t.roseBg},
          ].map(s=>(
            <div key={s.label} style={{background:s.bg,borderRadius:t.r,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:s.color}}>{s.count}</div>
              <div style={{fontSize:10,color:s.color,fontWeight:600,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:t.textMuted,marginBottom:5}}>
          <span>Progress</span><span>{Math.round(prog*100)}%</span>
        </div>
        <div style={{height:5,background:t.surfaceAlt,borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${prog*100}%`,background:t.accent,borderRadius:3,transition:"width .5s"}}/>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h3 style={{fontWeight:700,fontSize:15}}>All Tasks</h3>
        <Btn variant="primary" size="sm" onClick={()=>{setShowForm(true);setEditing(null);}}>+ New task</Btn>
      </div>

      {sorted.length===0&&!showForm&&(
        <div style={{textAlign:"center",padding:"40px 20px",color:t.textMuted}}>
          <div style={{fontSize:32,marginBottom:10}}>✦</div>
          <p style={{fontSize:14}}>No tasks yet. Add your first!</p>
        </div>
      )}

      {sorted.map(tk=>(
        <TaskCard key={tk.id} task={tk} onToggle={onToggleTask} onDelete={onDeleteTask}
          onEdit={task=>{setEditing(task);setShowForm(false);}} showProject
          projectName={getProjectName(tk.project_id)}/>
      ))}

      <Modal open={showForm||!!editing} onClose={()=>{setShowForm(false);setEditing(null);}} title={editing?"Edit Task":"New Task"}>
        <TaskForm initial={editing||{}} onSave={data=>{
          if(editing){onEditTask({...editing,...data});setEditing(null);}
          else{onAddTask(data);setShowForm(false);}
        }} onCancel={()=>{setShowForm(false);setEditing(null);}} currentUser={currentUser}/>
      </Modal>
    </div>
  );
};

// ─── PROJECT EDIT MODAL ────────────────────────────────────────────────────────
const ProjectEditModal = ({open,onClose,project,currentUser,onSave,onSendNotif}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [memberEmail,setMemberEmail]=useState("");
  const [members,setMembers]=useState([]);
  const [err,setErr]=useState("");
  const [searching,setSearching]=useState(false);

  useEffect(()=>{
    if(project){setName(project.name);setDesc(project.description||"");setMembers(project.members||[]);}
  },[project]);

  const addMember = async () => {
    setErr(""); setSearching(true);
    const em=memberEmail.trim().toLowerCase();
    if(!em) { setSearching(false); return; }
    if(em===currentUser.email) { setErr("Du er allerede eier."); setSearching(false); return; }
    if(members.find(m=>m.email===em)) { setErr("Allerede lagt til."); setSearching(false); return; }
    const {data,error} = await sb.from("users").select("*").eq("email",em).single();
    setSearching(false);
    if(error||!data) { setErr("Fant ingen konto med denne e-postadressen."); return; }
    const newM={id:data.id,email:data.email,name:data.name,status:"pending"};
    setMembers(prev=>[...prev,newM]);
    setMemberEmail("");
    onSendNotif({type:"project",toId:newM.id,resourceId:project.id,resourceName:name||project.name});
  };

  const save = () => {
    if(!name.trim()) return setErr("Name is required.");
    onSave({...project,name:name.trim(),description:desc,members});
    onClose();
  };

  if(!project) return null;
  return (
    <Modal open={open} onClose={onClose} title="Edit Project">
      <Field label="Project name *"><Input value={name} onChange={setName} placeholder="My Project" autoFocus/></Field>
      <Field label="Description"><Input value={desc} onChange={setDesc} placeholder="Optional…" multiline rows={2}/></Field>
      <Field label="Members">
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <Input value={memberEmail} onChange={setMemberEmail} placeholder="Invite by email" style={{flex:1}}/>
          <Btn onClick={addMember} variant="subtle" size="sm" disabled={searching}>{searching?"…":"Invite"}</Btn>
        </div>
        {err&&<p style={{color:t.rose,fontSize:12,marginBottom:6}}>{err}</p>}
        <div style={{background:t.surfaceAlt,borderRadius:t.r,padding:10,marginTop:4}}>
          <div style={{padding:"4px 8px",fontSize:13,marginBottom:4}}>
            <span>👑 {currentUser.name}</span> <span style={{fontSize:11,color:t.textMuted}}>(owner)</span>
          </div>
          {members.map(m=>(
            <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",fontSize:13,borderTop:`1px solid ${t.border}`}}>
              <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                <span>👤 {m.name}</span>
                <span style={{fontSize:11,color:t.textMuted}}>({m.email})</span>
                <Tag label={m.status} color={m.status==="accepted"?"green":m.status==="declined"?"rose":"amber"}/>
              </div>
              <span onClick={()=>setMembers(members.filter(x=>x.id!==m.id))} style={{cursor:"pointer",color:t.rose,fontSize:18}}>×</span>
            </div>
          ))}
        </div>
      </Field>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:4}}>
        <Btn onClick={onClose} variant="ghost">Cancel</Btn>
        <Btn onClick={save} variant="primary">Save changes</Btn>
      </div>
    </Modal>
  );
};

// ─── PROJECTS TAB ──────────────────────────────────────────────────────────────
const ProjectsTab = ({currentUser,projects,tasks,onCreateProject,onUpdateProject,onArchiveProject,onRestoreProject,onAddProjectTask,onToggleTask,onDeleteTask,onEditTask,onSendNotif}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const [showCreate,setShowCreate]=useState(false);
  const [name,setName]=useState(""); const [desc,setDesc]=useState("");
  const [memberEmail,setMemberEmail]=useState(""); const [members,setMembers]=useState([]);
  const [memberErr,setMemberErr]=useState("");
  const [searching,setSearching]=useState(false);
  const [selected,setSelected]=useState(null);
  const [showTaskForm,setShowTaskForm]=useState(false);
  const [editingTask,setEditingTask]=useState(null);
  const [editingProject,setEditingProject]=useState(null);

  useEffect(()=>{
    if(selected){const p=projects.find(x=>x.id===selected.id);if(p)setSelected(p);}
  },[projects]);

  const myProjects=projects.filter(p=>
    p.owner_id===currentUser.id||
    (p.members||[]).some(m=>m.id===currentUser.id&&m.status==="accepted")
  );
  const active=myProjects.filter(p=>!p.archived);
  const archived=myProjects.filter(p=>p.archived);

  const addMember = async () => {
    setMemberErr(""); setSearching(true);
    const em=memberEmail.trim().toLowerCase();
    if(!em) { setSearching(false); return; }
    if(em===currentUser.email) { setMemberErr("Du er allerede eier."); setSearching(false); return; }
    if(members.find(m=>m.email===em)) { setMemberErr("Allerede lagt til."); setSearching(false); return; }
    const {data,error} = await sb.from("users").select("*").eq("email",em).single();
    setSearching(false);
    if(error||!data) { setMemberErr("Fant ingen konto med denne e-postadressen."); return; }
    setMembers([...members,{id:data.id,email:data.email,name:data.name,status:"pending"}]);
    setMemberEmail("");
  };

  const create = () => {
    if(!name.trim()) return;
    onCreateProject({name:name.trim(),description:desc,members});
    setName(""); setDesc(""); setMembers([]); setShowCreate(false);
  };

  const projTasks=selected?tasks.filter(tk=>tk.project_id===selected.id):[];

  return (
    <div style={{padding:"18px 15px"}}>
      {selected ? (
        <div>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:18}}>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",color:t.textMuted,fontSize:20,padding:"0 4px"}}>←</button>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <h2 style={{fontWeight:700,fontSize:18}}>{selected.name}</h2>
                {selected.archived&&<Tag label="Archived" color="amber"/>}
              </div>
              {selected.description&&<p style={{fontSize:13,color:t.textMuted,marginTop:2}}>{selected.description}</p>}
            </div>
            <div style={{display:"flex",gap:6}}>
              {selected.owner_id===currentUser.id&&!selected.archived&&(
                <>
                  <Btn size="sm" variant="subtle" onClick={()=>setEditingProject({...selected})}>Edit</Btn>
                  <Btn size="sm" variant="ghost" onClick={()=>onArchiveProject(selected.id)}>Archive</Btn>
                </>
              )}
              {selected.archived&&selected.owner_id===currentUser.id&&(
                <Btn size="sm" variant="primary" onClick={()=>onRestoreProject(selected.id)}>Restore</Btn>
              )}
            </div>
          </div>

          <div style={{background:t.surface,borderRadius:t.r,padding:14,marginBottom:14,border:`1px solid ${t.border}`}}>
            <p style={{fontSize:11,fontWeight:600,color:t.textFaint,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Members</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {projects.find(p=>p.id===selected.id)?.owner_name&&(
                <span style={{fontSize:12,padding:"3px 10px",background:t.accentLight,color:t.accent,borderRadius:20,fontWeight:600}}>👑 {projects.find(p=>p.id===selected.id).owner_name}</span>
              )}
              {(selected.members||[]).filter(m=>m.status==="accepted").map(m=>(
                <span key={m.id} style={{fontSize:12,padding:"3px 10px",background:t.surfaceAlt,borderRadius:20}}>👤 {m.name}</span>
              ))}
            </div>
          </div>

          {!selected.archived&&(
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <h3 style={{fontWeight:700,fontSize:15}}>Tasks ({projTasks.length})</h3>
              <Btn variant="primary" size="sm" onClick={()=>{setShowTaskForm(true);setEditingTask(null);}}>+ Add task</Btn>
            </div>
          )}

          {projTasks.length===0&&<div style={{textAlign:"center",padding:"30px 20px",color:t.textMuted,fontSize:13}}>No tasks yet.</div>}
          {projTasks.map(tk=>(
            <TaskCard key={tk.id} task={tk} onToggle={onToggleTask} onDelete={onDeleteTask}
              onEdit={task=>{setEditingTask(task);setShowTaskForm(false);}}/>
          ))}

          <Modal open={showTaskForm||!!editingTask} onClose={()=>{setShowTaskForm(false);setEditingTask(null);}} title={editingTask?"Edit Task":"New Project Task"}>
            <TaskForm initial={editingTask||{}} onSave={data=>{
              if(editingTask){onEditTask({...editingTask,...data});setEditingTask(null);}
              else{onAddProjectTask({...data,project_id:selected.id});setShowTaskForm(false);}
            }} onCancel={()=>{setShowTaskForm(false);setEditingTask(null);}} currentUser={currentUser}/>
          </Modal>

          <ProjectEditModal
            open={!!editingProject} onClose={()=>setEditingProject(null)}
            project={editingProject} currentUser={currentUser}
            onSave={onUpdateProject} onSendNotif={onSendNotif}/>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <h2 style={{fontWeight:700,fontSize:18}}>Projects</h2>
            <Btn variant="primary" size="sm" onClick={()=>setShowCreate(true)}>+ New project</Btn>
          </div>

          {active.length===0&&(
            <div style={{textAlign:"center",padding:"40px 20px",color:t.textMuted}}>
              <div style={{fontSize:32,marginBottom:10}}>◇</div>
              <p style={{fontSize:14}}>No projects yet.</p>
            </div>
          )}

          {active.map(p=>{
            const pt=tasks.filter(tk=>tk.project_id===p.id);
            const done=pt.filter(tk=>tk.completed).length;
            const prog=pt.length?done/pt.length:0;
            return (
              <div key={p.id} onClick={()=>setSelected(p)} className="fade-in" style={{background:t.surface,borderRadius:t.r,border:`1px solid ${t.border}`,padding:16,marginBottom:10,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <span style={{fontWeight:700,fontSize:14}}>{p.name}</span>
                    {p.description&&<p style={{fontSize:12,color:t.textMuted,marginTop:2}}>{p.description}</p>}
                  </div>
                  <Tag label={`${pt.length} tasks`} color="sky"/>
                </div>
                <div style={{height:4,background:t.surfaceAlt,borderRadius:2,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${prog*100}%`,background:t.accent,borderRadius:2}}/>
                </div>
                <p style={{fontSize:11,color:t.textMuted,marginTop:5}}>{done}/{pt.length} completed · {(p.members||[]).filter(m=>m.status==="accepted").length+1} members</p>
              </div>
            );
          })}

          {archived.length>0&&(
            <div style={{marginTop:16}}>
              <p style={{fontSize:12,color:t.textMuted,marginBottom:8,fontWeight:600}}>Archived ({archived.length})</p>
              {archived.map(p=>(
                <div key={p.id} onClick={()=>setSelected(p)} style={{background:t.surfaceAlt,borderRadius:t.r,border:`1px solid ${t.border}`,padding:14,marginBottom:8,cursor:"pointer",opacity:.7}}>
                  <span style={{fontWeight:600,fontSize:13}}>{p.name}</span>
                  <Tag label="Archived" color="amber"/>
                </div>
              ))}
            </div>
          )}

          <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="New Project">
            <Field label="Project name *"><Input value={name} onChange={setName} placeholder="My Project" autoFocus/></Field>
            <Field label="Description"><Input value={desc} onChange={setDesc} placeholder="Optional…" multiline rows={2}/></Field>
            <Field label="Invite members">
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <Input value={memberEmail} onChange={setMemberEmail} placeholder="Email address" style={{flex:1}}/>
                <Btn onClick={addMember} variant="subtle" size="sm" disabled={searching}>{searching?"…":"Add"}</Btn>
              </div>
              {memberErr&&<p style={{color:t.rose,fontSize:12,marginBottom:6}}>{memberErr}</p>}
              {members.map(m=>(
                <div key={m.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",background:t.surfaceAlt,borderRadius:t.rSm,marginBottom:3,fontSize:13}}>
                  <span>{m.name} ({m.email})</span>
                  <span onClick={()=>setMembers(members.filter(x=>x.id!==m.id))} style={{cursor:"pointer",color:t.rose}}>×</span>
                </div>
              ))}
            </Field>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <Btn onClick={()=>setShowCreate(false)} variant="ghost">Cancel</Btn>
              <Btn onClick={create} variant="primary">Create project</Btn>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

// ─── NOTIFICATIONS TAB ─────────────────────────────────────────────────────────
const NotificationsTab = ({currentUser,notifications,onAccept,onDecline}) => {
  const {dark}=useTheme(); const t=tk(dark);
  const mine=notifications.filter(n=>n.to_id===currentUser.id);
  const pending=mine.filter(n=>n.status==="pending");
  const history=mine.filter(n=>n.status!=="pending");

  return (
    <div style={{padding:"18px 15px"}}>
      <h2 style={{fontWeight:700,fontSize:18,marginBottom:18}}>Notifications</h2>
      {pending.length===0&&history.length===0&&(
        <div style={{textAlign:"center",padding:"40px 20px",color:t.textMuted}}>
          <div style={{fontSize:32,marginBottom:10}}>🔔</div>
          <p style={{fontSize:14}}>No notifications yet.</p>
        </div>
      )}
      {pending.length>0&&(
        <>
          <p style={{fontSize:12,fontWeight:600,color:t.textMuted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Pending invitations</p>
          {pending.map(n=>(
            <div key={n.id} className="fade-in" style={{background:t.surface,borderRadius:t.r,border:`1px solid ${t.border}`,padding:14,marginBottom:8}}>
              <p style={{fontSize:13,marginBottom:10}}>
                <span style={{fontWeight:600}}>{n.from_name}</span> invited you to {n.type==="task"?"task":"project"} <span style={{color:t.accent,fontWeight:600}}>"{n.resource_name}"</span>
              </p>
              <div style={{display:"flex",gap:8}}>
                <Btn size="sm" variant="primary" onClick={()=>onAccept(n)}>Accept</Btn>
                <Btn size="sm" variant="ghost" onClick={()=>onDecline(n)}>Decline</Btn>
              </div>
            </div>
          ))}
        </>
      )}
      {history.length>0&&(
        <>
          <p style={{fontSize:12,fontWeight:600,color:t.textMuted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10,marginTop:pending.length>0?18:0}}>History</p>
          {history.map(n=>(
            <div key={n.id} style={{background:t.surfaceAlt,borderRadius:t.r,padding:12,marginBottom:6,fontSize:13,opacity:.7}}>
              <span style={{fontWeight:600}}>{n.from_name}</span> — {n.resource_name} <Tag label={n.status} color={n.status==="accepted"?"green":"rose"}/>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

// ─── SETTINGS TAB ──────────────────────────────────────────────────────────────
const SettingsTab = ({currentUser,onLogout,onDeleteAccount,toggleDark,dark}) => {
  const t=tk(dark);
  const [confirmDelete,setConfirmDelete]=useState(false);
  const [delPw,setDelPw]=useState("");
  const [delErr,setDelErr]=useState("");
  const [delLoading,setDelLoading]=useState(false);

  const handleDelete = async () => {
    setDelErr(""); setDelLoading(true);
    const {error} = await sb.auth.signInWithPassword({email:currentUser.email,password:delPw});
    if(error) { setDelErr("Wrong password."); setDelLoading(false); return; }
    await onDeleteAccount();
    setDelLoading(false);
  };

  return (
    <div style={{padding:"18px 15px"}}>
      <h2 style={{fontWeight:700,fontSize:18,marginBottom:18}}>Settings</h2>
      <div style={{background:t.surface,borderRadius:t.rLg,padding:20,marginBottom:14,boxShadow:t.shadow}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
          <img src={LOGO_B64} alt="PlanMy" style={{width:36,height:36,objectFit:"contain",mixBlendMode:dark?"screen":"multiply",filter:dark?"brightness(0.85) contrast(1.2)":"none"}}/>
          <div>
            <p style={{fontWeight:700,fontSize:15}}>{currentUser.name}</p>
            <p style={{fontSize:12,color:t.textMuted}}>{currentUser.email}</p>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderTop:`1px solid ${t.border}`}}>
          <span style={{fontSize:14}}>Dark mode</span>
          <div onClick={toggleDark} style={{width:44,height:24,borderRadius:12,background:dark?t.accent:t.border,cursor:"pointer",transition:"background .2s",position:"relative"}}>
            <div style={{position:"absolute",top:3,left:dark?22:3,width:18,height:18,borderRadius:9,background:"#fff",transition:"left .2s"}}/>
          </div>
        </div>
        <div style={{paddingTop:12,borderTop:`1px solid ${t.border}`,marginTop:4}}>
          <Btn variant="ghost" full onClick={onLogout}>Sign out</Btn>
        </div>
      </div>
      <div style={{background:t.surface,borderRadius:t.rLg,padding:20,border:`1px solid ${t.rose}33`}}>
        <p style={{fontWeight:700,fontSize:14,color:t.rose,marginBottom:6}}>Danger zone</p>
        <p style={{fontSize:12,color:t.textMuted,marginBottom:12}}>Deleting your account is permanent and cannot be undone.</p>
        {!confirmDelete ? (
          <Btn variant="danger" size="sm" onClick={()=>setConfirmDelete(true)}>Delete account</Btn>
        ) : (
          <div>
            <Field label="Confirm password"><Input value={delPw} onChange={setDelPw} type="password" placeholder="Your password"/></Field>
            {delErr&&<p style={{color:t.rose,fontSize:13,marginBottom:8}}>{delErr}</p>}
            <div style={{display:"flex",gap:8}}>
              <Btn variant="danger" size="sm" onClick={handleDelete} disabled={delLoading}>{delLoading?"…":"Confirm delete"}</Btn>
              <Btn variant="ghost" size="sm" onClick={()=>{setConfirmDelete(false);setDelPw("");setDelErr("");}}>Cancel</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── BOTTOM NAV ────────────────────────────────────────────────────────────────
const BottomNav = ({tab,setTab,notifCount,dark}) => {
  const t=tk(dark);
  const tabs=[
    {id:"home",label:"Home",icon:a=><svg width="20" height="20" viewBox="0 0 24 24" fill={a?t.accent:"none"} stroke={a?t.accent:t.textFaint} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},
    {id:"projects",label:"Projects",icon:a=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a?t.accent:t.textFaint} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>},
    {id:"notifications",label:"Alerts",icon:a=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a?t.accent:t.textFaint} strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>},
    {id:"settings",label:"Settings",icon:a=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a?t.accent:t.textFaint} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>},
  ];
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:t.surface,borderTop:`1px solid ${t.border}`,display:"flex",zIndex:50}}>
      {tabs.map(tb=>{
        const active=tab===tb.id;
        return (
          <button key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"10px 0 12px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
            {tb.icon(active)}
            <span style={{fontSize:10,fontWeight:600,color:active?t.accent:t.textFaint}}>{tb.label}</span>
            {tb.id==="notifications"&&notifCount>0&&(
              <span style={{position:"absolute",top:6,right:"calc(50% - 16px)",minWidth:16,height:16,borderRadius:8,background:t.rose,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{notifCount}</span>
            )}
            {active&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:22,height:2.5,borderRadius:2,background:t.accent}}/>}
          </button>
        );
      })}
    </div>
  );
};

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [dark,setDark]=useState(()=>{try{return JSON.parse(localStorage.getItem("darkMode"))||false}catch{return false}});
  const [currentUser,setCurrentUser]=useState(null);
  const [tab,setTab]=useState("home");
  const [tasks,setTasks]=useState([]);
  const [projects,setProjects]=useState([]);
  const [notifications,setNotifications]=useState([]);
  const [loading,setLoading]=useState(true);

  // ── Restore session on load
  useEffect(()=>{
    const init = async () => {
      const {data:{session}} = await sb.auth.getSession();
      if(session){
        const {data:profile} = await sb.from("users").select("*").eq("id",session.user.id).single();
        if(profile) setCurrentUser(profile);
      }
      setLoading(false);
    };
    init();
    const {data:{subscription}} = sb.auth.onAuthStateChange(async (_event,session)=>{
      if(!session){setCurrentUser(null);}
    });
    return ()=>subscription.unsubscribe();
  },[]);

  // ── Load data when user logs in
  useEffect(()=>{
    if(!currentUser) { setTasks([]); setProjects([]); setNotifications([]); return; }
    loadAll();
  },[currentUser]);

  const loadAll = useCallback(async()=>{
    if(!currentUser) return;
    const [t2,p2,n2] = await Promise.all([
      sb.from("tasks").select("*").order("created_at",{ascending:false}),
      sb.from("projects").select("*").order("created_at",{ascending:false}),
      sb.from("notifications").select("*").order("created_at",{ascending:false}),
    ]);
    if(t2.data) setTasks(t2.data);
    if(p2.data) setProjects(p2.data);
    if(n2.data) setNotifications(n2.data);
  },[currentUser]);

  // ── Realtime subscriptions
  useEffect(()=>{
    if(!currentUser) return;
    const ch = sb.channel("realtime-planmy")
      .on("postgres_changes",{event:"*",schema:"public",table:"tasks"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"projects"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"notifications"},()=>loadAll())
      .subscribe();
    return ()=>sb.removeChannel(ch);
  },[currentUser,loadAll]);

  const toggleDark=()=>{const n=!dark;setDark(n);localStorage.setItem("darkMode",JSON.stringify(n));};
  const pendingNotifs=notifications.filter(n=>n.to_id===currentUser?.id&&n.status==="pending").length;

  // ── CRUD helpers
  const sendNotif = async ({type,toId,resourceId,resourceName})=>{
    if(!currentUser||toId===currentUser.id) return;
    const already=notifications.find(n=>n.to_id===toId&&n.resource_id===resourceId&&n.status==="pending");
    if(already) return;
    await sb.from("notifications").insert({
      type,to_id:toId,from_id:currentUser.id,from_name:currentUser.name,
      resource_id:resourceId,resource_name:resourceName,status:"pending"
    });
  };

  const addTask = async (data)=>{
    if(!currentUser) return;
    const {data:row} = await sb.from("tasks").insert({
      owner_id:currentUser.id,completed:false,
      title:data.title,description:data.description,
      due_date:data.due_date||null,due_time:data.due_time||null,
      collaborators:data.collaborators||[],files:data.files||[],
      project_id:data.project_id||null
    }).select().single();
    if(row){
      (data.collaborators||[]).forEach(c=>sendNotif({type:"task",toId:c.id,resourceId:row.id,resourceName:row.title}));
    }
  };

  const editTask = async (updated)=>{
    await sb.from("tasks").update({
      title:updated.title,description:updated.description,
      due_date:updated.due_date||null,due_time:updated.due_time||null,
      collaborators:updated.collaborators||[],files:updated.files||[]
    }).eq("id",updated.id);
  };

  const toggleTask = async (id)=>{
    const task=tasks.find(t=>t.id===id);
    if(!task) return;
    await sb.from("tasks").update(
      task.completed
        ? {completed:false,completed_at:null}
        : {completed:true,completed_at:new Date().toISOString(),files:[]}
    ).eq("id",id);
  };

  const deleteTask = async (id)=>{ await sb.from("tasks").delete().eq("id",id); };

  const createProject = async (data)=>{
    if(!currentUser) return;
    const {data:row} = await sb.from("projects").insert({
      owner_id:currentUser.id,owner_name:currentUser.name,archived:false,
      name:data.name,description:data.description||"",members:data.members||[]
    }).select().single();
    if(row){
      (data.members||[]).forEach(m=>sendNotif({type:"project",toId:m.id,resourceId:row.id,resourceName:row.name}));
    }
  };

  const updateProject = async (updated)=>{
    await sb.from("projects").update({
      name:updated.name,description:updated.description,members:updated.members
    }).eq("id",updated.id);
  };

  const archiveProject = async (id)=>{ await sb.from("projects").update({archived:true}).eq("id",id); };
  const restoreProject = async (id)=>{ await sb.from("projects").update({archived:false}).eq("id",id); };

  const acceptNotif = async (notif)=>{
    await sb.from("notifications").update({status:"accepted"}).eq("id",notif.id);
    if(notif.type==="task"){
      const task=tasks.find(t=>t.id===notif.resource_id);
      if(task){
        const newCollabs=(task.collaborators||[]).map(c=>c.id===currentUser.id?{...c,status:"accepted"}:c);
        await sb.from("tasks").update({collaborators:newCollabs}).eq("id",task.id);
      }
    } else {
      const proj=projects.find(p=>p.id===notif.resource_id);
      if(proj){
        const newMembers=(proj.members||[]).map(m=>m.id===currentUser.id?{...m,status:"accepted"}:m);
        await sb.from("projects").update({members:newMembers}).eq("id",proj.id);
      }
    }
  };

  const declineNotif = async (notif)=>{ await sb.from("notifications").update({status:"declined"}).eq("id",notif.id); };

  const handleLogout = async ()=>{ await sb.auth.signOut(); setCurrentUser(null); setTab("home"); };

  const handleDeleteAccount = async ()=>{
    // Clean up user data
    await sb.from("tasks").delete().eq("owner_id",currentUser.id);
    await sb.from("projects").delete().eq("owner_id",currentUser.id);
    await sb.from("notifications").delete().or(`to_id.eq.${currentUser.id},from_id.eq.${currentUser.id}`);
    await sb.from("users").delete().eq("id",currentUser.id);
    await sb.auth.signOut();
    setCurrentUser(null); setTab("home");
  };

  const t=tk(dark);

  if(loading) return (
    <ThemeCtx.Provider value={{dark}}>
      <GlobalStyle dark={dark}/>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:t.bg}}>
        <div style={{textAlign:"center"}}>
          <img src={LOGO_B64} alt="PlanMy" style={{width:56,height:56,objectFit:"contain",marginBottom:12,mixBlendMode:dark?"screen":"multiply"}}/>
          <p style={{color:t.textMuted,fontSize:14}}>Loading…</p>
        </div>
      </div>
    </ThemeCtx.Provider>
  );

  return (
    <ThemeCtx.Provider value={{dark}}>
      <GlobalStyle dark={dark}/>
      {!currentUser ? (
        <AuthScreen onLogin={setCurrentUser}/>
      ) : (
        <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:t.bg,position:"relative"}}>
          <div style={{position:"sticky",top:0,zIndex:50,background:t.surface,borderBottom:`1px solid ${t.border}`,padding:"11px 16px",display:"flex",alignItems:"center",gap:10}}>
            <img src={LOGO_B64} alt="PlanMy" style={{width:28,height:28,objectFit:"contain",mixBlendMode:dark?"screen":"multiply",filter:dark?"brightness(0.85) contrast(1.2)":"none"}}/>
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,fontWeight:400,color:t.text}}>PlanMy</span>
            <div style={{flex:1}}/>
            {pendingNotifs>0&&<Badge count={pendingNotifs}/>}
            <div title="Live — Supabase realtime" style={{width:7,height:7,borderRadius:"50%",background:t.green,flexShrink:0,animation:"pulse 2s infinite"}}/>
          </div>
          <div style={{paddingBottom:80}}>
            {tab==="home"&&<HomeTab currentUser={currentUser} tasks={tasks} projects={projects} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask}/>}
            {tab==="projects"&&<ProjectsTab currentUser={currentUser} projects={projects} tasks={tasks} onCreateProject={createProject} onUpdateProject={updateProject} onArchiveProject={archiveProject} onRestoreProject={restoreProject} onAddProjectTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask} onSendNotif={sendNotif}/>}
            {tab==="notifications"&&<NotificationsTab currentUser={currentUser} notifications={notifications} onAccept={acceptNotif} onDecline={declineNotif}/>}
            {tab==="settings"&&<SettingsTab currentUser={currentUser} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} toggleDark={toggleDark} dark={dark}/>}
          </div>
          <BottomNav tab={tab} setTab={setTab} notifCount={pendingNotifs} dark={dark}/>
        </div>
      )}
    </ThemeCtx.Provider>
  );
}
