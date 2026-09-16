"use client";

import { useApp } from "../context/AppContext";

type Page = "home" | "dashboard" | "chart" | "reading" | "learn" | "profile" | "onboarding" | "login" | "signup" | "timeline" | "relationships" | "askai" | "wellness" | "palm";
interface NavigationProps { currentPage: Page; onNavigate: (page: Page) => void; }
const items:{id:Page;label:string}[]=[
 {id:"home",label:"Salon"},{id:"chart",label:"Wheel"},{id:"dashboard",label:"Today"},
 {id:"timeline",label:"Shifts"},{id:"relationships",label:"Bonds"},
 {id:"wellness",label:"Wellness"},{id:"learn",label:"Library"},{id:"askai",label:"Ask AstroFindings"},{id:"profile",label:"Me"}
];
export default function Navigation({currentPage,onNavigate}:NavigationProps){
 const { isLoggedIn } = useApp();
 if(["home","onboarding","login","signup"].includes(currentPage)) return null;

 const handleNavClick = (id: Page) => {
   if (id === "chart" && !isLoggedIn) {
     onNavigate("login");
     return;
   }
   onNavigate(id);
 };

 return <header className="site-header app-header">
   <button className="brand" onClick={()=>onNavigate("home")} aria-label="AstroFindings home"><span className="brand-mark">AF</span><span className="brand-name">AstroFindings</span></button>
   <nav className="site-nav">{items.filter(x=>x.id!=="home").map(x=><button key={x.id} className="button-quiet cursor-pointer" onClick={()=>handleNavClick(x.id)} style={{color:currentPage===x.id?"var(--rust)":"var(--paper-dim)"}}>{x.label}</button>)}</nav>
   <div className="app-status"><span>●</span> Moon phase / live sky</div>
 </header>;
}
