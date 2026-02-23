import React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button"
import DotGrid from "./dot-grid"

import ProjectCard from "./project-card"
import AnimatedHeading from "./animated-heading"
import RevealOnView from "./reveal-on-view"

export default function Showcase() {
  const projects = [
    {
      title: "Cleansheet AI",
      subtitle: "Moteur de transformation de données",
      imageSrc: "/assets/images/cleansheet.png",
      tags: ["IA", "Gemini", "Genkit", "Next.js", "Supabase", "En cours de développement"],
      href: "#project-4",
      priority: false,
      gradientFrom: "#0f172a",
      gradientTo: "#10b981",
    },
    {
      title: "DocGraph AI",
      subtitle: "Une IA capable de transformer des rapports de 50 pages en cartes mentales interactives pour faciliter la prise de décision.",
      imageSrc: "/assets/images/screen.png",
      tags: ["IA", "Gemini", "Genkit", "Next.js", "Supabase", "WebGPU", "En cours de développement"],
      href: "#project-4",
      priority: false,
      gradientFrom: "#0f172a",
      gradientTo: "#10b981",
    },
    {
      title: "Gestion de Boutique (POS)",
      subtitle: "Système complet inspiré de Shopify",
      imageSrc: "/assets/images/coumbty.png",
      tags: ["React", "Next.js", "Supabase", "E-commerce", "Projet clients"],
      href: "#project-2",
      priority: false,
      gradientFrom: "#111827",
      gradientTo: "#2563eb",
    },
    {
      title: "Suivi de Livraison d'Essence",
      subtitle: "Application logistique temps réel",
      imageSrc: "/assets/images/niang.png",
      tags: ["Logistique", "Temps Réel", "Architecture Événementielle", "Projet Clients"],
      href: "#project-3",
      priority: false,
      gradientFrom: "#0b132b",
      gradientTo: "#5bc0be",
    },
    
    {
      title: "Plateforme de Data Intelligence en temps réel",
      subtitle: "DÉVELOPPEUR DE SOLUTIONS DATA & AUTOMATISATION | Chez IABOC | Guinée Conakry | 2023-2024" ,
      imageSrc: "/assets/images/IABOC.jpg",
      tags: ["React.js", "Supabase", "n8n", "Outils interne", "PWA Mobile", "Dashboard Real-time"],
      href: "#project-1",
      priority: true,
      gradientFrom: "#0f172a",
      gradientTo: "#6d28d9",
    },
  ]

  return (
    <section id="showcase" className="bg-neutral-950 text-white min-h-screen">
      {/* HERO: full-viewport row. Left is sticky; right scrolls internally. */}
      <div className="px-4 pt-12 pb-12 lg:pt-4 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] lg:gap-4">
          {/* LEFT: sticky on desktop, normal flow on mobile */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-none lg:rounded-3xl lg:border lg:border-white/10 lg:bg-neutral-900/60 p-2 lg:p-8"
              staggerChildren
            >
              <div className="hidden lg:block pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light">
                <DotGrid />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <div className="mb-6 flex items-center gap-2">
                    <div className="text-xl font-extrabold tracking-tight">Dramane</div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
                  </div>

                  <AnimatedHeading
                    className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl"
                    lines={["Full-Stack Developer", "& AI Specialist"]}
                  />

                  <p className="mt-3 max-w-[42ch] text-sm text-white/70 leading-relaxed">
                    En tant que développeur hybride, j'interviens sur tout le cycle de vie de vos projets tech, de l'architecture initiale à l'intégration d'agents d'IA autonomes. Mon objectif : transformer votre stack technique en un levier de croissance.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button asChild className="rounded-full bg-white text-black hover:bg-white/90">
                      <a href="mailto:dramanesow20@gmail.com">
                        Me contacter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 lg:mt-auto pt-6">
                  <p className="mb-2 text-[10px] font-semibold tracking-widest text-white/50">COMPÉTENCES CLÉS</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-base font-bold text-white/40 sm:grid-cols-2 text-lg">
                    <li>AI-Powered SaaS Builder</li>
                    <li>Full-Stack Developer</li>
                    <li> Agent AI </li>
                    <li>LLM Integration</li>
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: projects */}
          <div className="space-y-4 lg:space-y-4">
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                subtitle={p.subtitle}
                imageSrc={p.imageSrc}
                tags={p.tags}
                href={p.href}
                priority={p.priority}
                gradientFrom={p.gradientFrom}
                gradientTo={p.gradientTo}
                imageContainerClassName="lg:h-full"
                containerClassName="sticky top-6 lg:relative lg:top-0 lg:h-[calc(100svh-2rem)]"
                revealDelay={idx * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
