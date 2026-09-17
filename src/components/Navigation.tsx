"use client";

import { useState } from "react";
import { useApp } from "../context/AppContext";
import AstroFindingsLogo, { AstroFindingsDarkLogo } from "./AstroFindingsLogo";

type Page = "home" | "dashboard" | "chart" | "reading" | "learn" | "profile" | "onboarding" | "login" | "signup" | "timeline" | "relationships" | "askai" | "wellness" | "palm";
interface NavigationProps { currentPage: Page; onNavigate: (page: Page) => void; }
const items:{id:Page;label:string}[]=[
 {id:"home",label:"Salon"},{id:"chart",label:"Wheel"},{id:"dashboard",label:"Today"},
 {id:"timeline",label:"Shifts"},{id:"relationships",label:"Bonds"},
 {id:"wellness",label:"Wellness"},{id:"learn",label:"Library"},{id:"askai",label:"Ask AstroFindings"},{id:"profile",label:"Me"}
];
export default function Navigation({currentPage,onNavigate}:NavigationProps){
 const { isLoggedIn } = useApp();
 const [mobileOpen, setMobileOpen] = useState(false);
 if(["home","onboarding","login","signup"].includes(currentPage)) return null;

 const handleNavClick = (id: Page) => {
   setMobileOpen(false);
   if (id === "chart" && !isLoggedIn) {
     onNavigate("login");
     return;
   }
   onNavigate(id);
 };

 return (
   <>
     <header className="site-header app-header">
       <div className="cursor-pointer" onClick={()=>{ setMobileOpen(false); onNavigate("home"); }} aria-label="AstroFindings home">
         <AstroFindingsDarkLogo size="sm" showTagline={false} />
       </div>
       <nav className="site-nav">
         {items.filter(x=>x.id!=="home").map(x=>(
           <button
             key={x.id}
             className="button-quiet cursor-pointer"
             onClick={()=>handleNavClick(x.id)}
             style={{
               color: currentPage===x.id ? "var(--gold)" : "var(--paper-dim)",
               fontWeight: currentPage===x.id ? 600 : 500
             }}>
             {x.label}
           </button>
         ))}
       </nav>
       <div className="app-status"><span>●</span> Moon phase / live sky</div>
       <button
         className="menu-toggle"
         onClick={() => setMobileOpen(!mobileOpen)}
         aria-label="Toggle navigation menu"
       >
         {mobileOpen ? "×" : "☰"}
       </button>
     </header>

     {mobileOpen && (
       <nav className="mobile-nav is-open" aria-label="Mobile navigation">
         <div className="pb-3 mb-2 border-b border-[rgba(234,193,87,0.15)] flex justify-between items-center">
           <AstroFindingsDarkLogo size="sm" showTagline={false} onClick={() => { setMobileOpen(false); onNavigate("home"); }} />
         </div>
         {items.filter(x=>x.id!=="home").map(x=>(
           <button
             key={x.id}
             className="text-left py-2.5 font-sans text-sm tracking-wide cursor-pointer transition-colors border-b border-[rgba(234,193,87,0.1)] last:border-0"
             style={{
               color: currentPage===x.id ? "var(--gold)" : "var(--paper)",
               fontWeight: currentPage===x.id ? 600 : 400
             }}
             onClick={()=>handleNavClick(x.id)}>
             {x.label}
           </button>
         ))}
       </nav>
     )}
   </>
 );
}
