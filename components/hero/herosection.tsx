import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  // État pour la progression du scroll (de 0 à 1)
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // État pour la position de la souris (pour la lueur interactive)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // État pour la taille de l'écran (viewport)
  const [viewport, setViewport] = useState({ w: 1000, h: 800 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  // Gestion de la taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    
    // Initialisation
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calcule le pourcentage de scroll dans le container (de 0 à 1)
      const scrollableHeight = height - windowHeight;
      let progress = scrollableHeight > 0 ? -top / scrollableHeight : 0;
      
      // Borner la valeur entre 0 et 1
      progress = Math.max(0, Math.min(1, progress));
      if (isNaN(progress)) progress = 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // --- Paramètres de l'animation de l'image ---
  
  // Taille initiale du cercle
  const minSize = 200; 
  
  // Taille finale (95% de l'écran)
  const maxW = viewport.w * 0.95;
  const maxH = viewport.h * 0.95;

  // Calculs interpolés en fonction du scroll
  const currentW = minSize + (maxW - minSize) * scrollProgress;
  const currentH = minSize + (maxH - minSize) * scrollProgress;
  
  // Le rayon de bordure commence à la moitié de minSize (cercle parfait)
  // Et se termine à 8px (équivalent de rounded-lg)
  const initialRadius = minSize / 2;
  const finalRadius = 8;
  const currentRadius = initialRadius + (finalRadius - initialRadius) * scrollProgress;

  return (
    <div className="bg-zinc-950 min-h-screen text-white relative font-sans selection:bg-indigo-500/30">
      
      {/* Styles injectés pour l'animation continue de la grille */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveGrid {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        .animate-grid {
          animation: moveGrid 3s linear infinite;
        }
      `}} />

      {/* 1. Arrière-plan sombre avec grille animée en permanence */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-30 animate-grid"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Effet interactif de lumière suivant la souris */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
        }}
      />

      {/* 3. Section Hero principale (avec hauteur virtuelle pour permettre le scroll) */}
      <div ref={containerRef} className="relative z-10 w-full" style={{ height: '300vh' }}>
        
        {/* Le conteneur "Sticky" qui reste à l'écran pendant le scroll de la section */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Textes d'introduction qui disparaissent en scrollant */}
          <div 
            className="absolute top-[15%] text-center px-4 flex flex-col items-center justify-center w-full"
            style={{ 
              opacity: Math.max(0, Math.min(1, 1 - scrollProgress * 2.5)),
              transform: `translateY(${-scrollProgress * 50}px)`,
              pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto'
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              Expérience Visuelle
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto mb-8">
              Défilez vers le bas pour découvrir la transformation et entrer dans notre univers.
            </p>
            <div className="animate-bounce p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <ArrowDown className="text-white/70" size={24} />
            </div>
          </div>

          {/* L'image centrale qui s'anime de cercle à carré 95% */}
          <div
            className="relative overflow-hidden shadow-2xl shadow-indigo-500/10 flex items-center justify-center will-change-transform"
            style={{
              width: `${currentW}px`,
              height: `${currentH}px`,
              borderRadius: `${currentRadius}px`,
            }}
          >
            {/* L'image avec effet parallax */}
            <img
              src="/assets/images/profile.png"
              alt="Espace et technologie"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                transform: `scale(${1 + (1 - scrollProgress) * 0.2})`,
              }}
            />

            {/* Voile sombre qui apparaît quand l'image s'agrandit */}
            <div 
              className="absolute inset-0 bg-black/50"
              style={{ opacity: scrollProgress }}
            />

            {/* Contenu interne de l'image, visible à la fin du scroll */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center"
              style={{ 
                opacity: Math.max(0, Math.min(1, scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0)),
                transform: `translateY(${(1 - scrollProgress) * 20}px)`
              }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-white">
                VOTRE PROJET<br/>SANS LIMITES
              </h2>
              <button 
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 pointer-events-auto"
                style={{ pointerEvents: scrollProgress > 0.9 ? 'auto' : 'none' }}
              >
                Commencer l'exploration
              </button>
            </div>
            
            {/* Bords brillants internes */}
            <div className="absolute inset-0 border border-white/20 rounded-[inherit] pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
