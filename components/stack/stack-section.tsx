import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Server, BrainCircuit, Wrench, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Données des Nœuds par Catégorie ---
const FRONTEND_NODES = [
  { id: 'react', icon: 'react', cx: 50, cy: 50, color: '#61DAFB', path: 'M 70,50 H 90 L 105,65 V 115' },
  { id: 'next', icon: 'nextdotjs', cx: 250, cy: 50, color: '#ffffff', path: 'M 230,50 H 210 L 195,65 V 115' },
  { id: 'flutter', icon: 'flutter', cx: 50, cy: 210, color: '#02569B', path: 'M 70,210 H 90 L 105,195 V 155' },
  { id: 'vite', icon: 'vite', cx: 250, cy: 210, color: '#646CFF', path: 'M 230,210 H 210 L 195,195 V 155' },
];

const BACKEND_NODES = [
  { id: 'node', icon: 'nodedotjs', cx: 50, cy: 50, color: '#339933', path: 'M 70,50 H 90 L 105,65 V 115' },
  { id: 'docker', icon: 'docker', cx: 250, cy: 50, color: '#2496ED', path: 'M 230,50 H 210 L 195,65 V 115' },
  { id: 'supabase', icon: 'supabase', cx: 50, cy: 210, color: '#3ECF8E', path: 'M 70,210 H 90 L 105,195 V 155' },
  { id: 'firebase', icon: 'firebase', cx: 250, cy: 210, color: '#FFCA28', path: 'M 230,210 H 210 L 195,195 V 155' },
];

const AI_NODES = [
  { id: 'n8n', icon: 'n8n', cx: 50, cy: 50, color: '#FF6C37', path: 'M 70,50 H 90 L 105,65 V 115' },
  { id: 'gemini', icon: 'googlegemini', cx: 250, cy: 50, color: '#8E75B2', path: 'M 230,50 H 210 L 195,65 V 115' },
  { id: 'huggingface', icon: 'huggingface', cx: 50, cy: 210, color: '#FFD21E', path: 'M 70,210 H 90 L 105,195 V 155' },
  { id: 'genkit', icon: 'firebase', cx: 250, cy: 210, color: '#FFCA28', path: 'M 230,210 H 210 L 195,195 V 155' },
];

const TOOL_NODES = [
  { id: 'github', icon: 'github', cx: 50, cy: 50, color: '#ffffff', path: 'M 70,50 H 90 L 105,65 V 115' },
  { id: 'figma', icon: 'figma', cx: 250, cy: 50, color: '#F24E1E', path: 'M 230,50 H 210 L 195,65 V 115' },
  { id: 'adobe', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg', cx: 50, cy: 210, color: '#FF61F6', path: 'M 70,210 H 90 L 105,195 V 155' },
  { id: 'crewai', imgUrl: 'https://avatars.githubusercontent.com/u/161665044?s=200&v=4', cx: 250, cy: 210, color: '#FF4F00', path: 'M 230,210 H 210 L 195,195 V 155' },
];

const StackCard = ({ title, subtitle, nodes, HubIcon, delayOffset, className = "" }) => {
  const [activeNodes, setActiveNodes] = useState([]);
  const filterId = `glow-${title.replace(/\s+/g, '-')}`;

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...nodes].sort(() => 0.5 - Math.random());
      setActiveNodes(shuffled.slice(0, 2).map(n => n.id));
    }, 3000 + delayOffset);
    return () => clearInterval(interval);
  }, [nodes, delayOffset]);

  return (
    <div className={cn(
      "relative w-full h-full min-h-[320px] bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-white/20 transition-all duration-500",
      className
    )}>
      {/* Lumière subtile au sommet de la carte */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.03] blur-[50px] pointer-events-none" />

      {/* Overlay de texture interne */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* --- COUCHE SVG --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-50">
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect x="145" y="20" width="10" height="20" rx="2" className="fill-zinc-900 stroke-zinc-800 stroke-1" />
          <circle cx="150" cy="30" r="2" className="fill-red-500 animate-pulse" />
          {nodes.map((node) => (
            <path key={`bg-${node.id}`} d={node.path} className="stroke-white/[0.03] stroke-[2px] fill-none stroke-linejoin-round" />
          ))}
          {nodes.map((node) => {
            if (!activeNodes.includes(node.id)) return null;
            return (
              <path key={`active-${node.id}`} d={node.path} className="stroke-[3.5px] fill-none stroke-linejoin-round animate-data-flow" stroke={node.color} style={{ filter: `url(#${filterId})` }} />
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0 z-10">
        {nodes.map((node) => {
          const isActive = activeNodes.includes(node.id);
          return (
            <div key={node.id} className={`absolute w-[48px] h-[48px] rounded-2xl flex items-center justify-center transition-all duration-500 pointer-events-auto cursor-pointer ${isActive ? 'bg-zinc-900 z-20 scale-110' : 'bg-black/40 z-10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'}`}
              style={{ left: `${(node.cx / 300) * 100}%`, top: `${(node.cy / 300) * 100}%`, transform: 'translate(-50%, -50%)', boxShadow: isActive ? `0 0 35px -5px ${node.color}60, inset 0 1px 2px rgba(255,255,255,0.1)` : 'none', border: `1px solid ${isActive ? `${node.color}40` : 'rgba(255,255,255,0.05)'}` }}
              onMouseEnter={() => !isActive && setActiveNodes(prev => [...prev, node.id])}>
              <img src={node.imgUrl || `https://cdn.simpleicons.org/${node.icon}/white`} className="w-6 h-6 object-contain" alt={node.id} />
            </div>
          );
        })}

        <div className="absolute w-[80px] h-[80px] bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-500" style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}>
          <div className="absolute inset-2 border border-white/[0.05] rounded-2xl bg-black/50 backdrop-blur-sm" />
          <HubIcon className="text-zinc-300 w-8 h-8 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:text-white transition-colors duration-500" />
        </div>

        <div className="absolute bottom-6 w-full px-6 text-center">
          <h3 className="text-xl font-black text-white tracking-tight mb-1 uppercase italic">{title}</h3>
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default function CircuitGrid() {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center py-24 px-6 font-sans relative overflow-hidden">
      
      {/* --- Grille de Fond Stylisée --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
             backgroundSize: '60px 60px'
           }} />
      
      {/* --- Dégradé Radial Central --- */}
      <div className="absolute inset-0 z-0 pointer-events-none"
           style={{ 
             background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, rgba(2, 2, 2, 1) 70%)'
           }} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes data-flow { 0% { stroke-dashoffset: 140; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        .animate-data-flow { stroke-dasharray: 12 140; animation: data-flow 2.2s linear infinite; }
      `}} />

      {/* --- En-tête --- */}
      <div className="text-center mb-24 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <Cpu className="text-indigo-500" size={32} />
          </div>
          <div className="h-px w-12 bg-indigo-500/20" />
          <span className="text-indigo-500 font-black uppercase tracking-[0.5em] text-xs">Processing Units</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">
          Stack<span className="text-zinc-800">.</span>Grid
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
          Écosystème technologique déployé sur une architecture à haute disponibilité.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Frontend - Wide */}
        <div className="md:col-span-2 md:row-span-1">
          <StackCard title="Frontend" subtitle="Client-Side Systems" nodes={FRONTEND_NODES} HubIcon={LayoutTemplate} delayOffset={0} />
        </div>
        
        {/* Backend - Tall */}
        <div className="md:col-span-1 md:row-span-2">
          <StackCard title="Backend" subtitle="Distributed Services" nodes={BACKEND_NODES} HubIcon={Server} delayOffset={800} />
        </div>
        
        {/* AI Units - Small */}
        <div className="md:col-span-1 md:row-span-1">
          <StackCard title="AI Units" subtitle="Neural Processing" nodes={AI_NODES} HubIcon={BrainCircuit} delayOffset={1600} />
        </div>
        
        {/* Toolchain - Small */}
        <div className="md:col-span-1 md:row-span-1">
          <StackCard title="Toolchain" subtitle="Design & DevOps" nodes={TOOL_NODES} HubIcon={Wrench} delayOffset={2400} />
        </div>
      </div>
      
      {/* Décoration de bas de page */}
      <div className="mt-20 text-zinc-800 font-black text-[120px] leading-none select-none pointer-events-none opacity-5 absolute bottom-0 left-0">
        HARDWARE
      </div>
    </div>
  );
}
