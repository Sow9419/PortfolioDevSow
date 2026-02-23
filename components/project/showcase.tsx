
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
      title: "Outils Data & Automatisation",
      subtitle: "IABOC | Guinée Conakry",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      tags: ["React.js", "Supabase", "n8n", "Data"],
      href: "#project-1",
      priority: true,
      gradientFrom: "#0f172a",
      gradientTo: "#6d28d9",
    },
    {
      title: "Gestion de Boutique (POS)",
      subtitle: "Système complet inspiré de Shopify",
      imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1470&auto=format&fit=crop",
      tags: ["React", "Next.js", "Supabase", "E-commerce"],
      href: "#project-2",
      priority: false,
      gradientFrom: "#111827",
      gradientTo: "#2563eb",
    },
    {
      title: "Suivi de Livraison d'Essence",
      subtitle: "Application logistique temps réel",
      imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
      tags: ["Logistique", "Temps Réel", "Architecture Événementielle"],
      href: "#project-3",
      priority: false,
      gradientFrom: "#0b132b",
      gradientTo: "#5bc0be",
    },
    {
      title: "Cleansheet AI",
      subtitle: "Moteur de transformation de données",
      imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
      tags: ["IA", "Gemini", "Genkit", "Next.js"],
      href: "#project-4",
      priority: false,
      gradientFrom: "#0f172a",
      gradientTo: "#10b981",
    },
  ]

  return (
    <section id="showcase" className="bg-neutral-950 text-white min-h-screen">
      {/* HERO: full-viewport row. Left is sticky; right scrolls internally. */}
      <div className="px-4 pt-16 pb-16 lg:pt-4 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] lg:gap-4">
          {/* LEFT: sticky on desktop, normal flow on mobile */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView
              as="div"
              intensity="hero"
              // Removed border/bg on mobile (default), added on lg screen to distinguish from top hero
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-none lg:rounded-3xl lg:border lg:border-white/10 lg:bg-neutral-900/60 p-2 lg:p-8"
              staggerChildren
            >
              {/* Texture background only on desktop */}
              <div className="hidden lg:block pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light">
                <DotGrid />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  {/* Wordmark */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className="text-xl font-extrabold tracking-tight">Dramane</div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
                  </div>

                  {/* Headline with intro blur effect */}
                  <AnimatedHeading
                    className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl"
                    lines={["Full-Stack Developer", "& AI Specialist"]}
                  />

                  <p className="mt-3 max-w-[42ch] text-xs text-white/70 leading-relaxed">
                    Je crée des applications web et mobiles intelligentes qui automatisent des tâches et boostent l'efficacité des entreprises. Spécialisé en IA générative et Agentic AI.
                  </p>

                  {/* CTAs */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button asChild className="rounded-full bg-white text-black hover:bg-white/90">
                      <a href="mailto:dramanesow20@gmail.com">
                        Me contacter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Trusted by */}
                <div className="mt-6 lg:mt-auto pt-6">
                  <p className="mb-2 text-[10px] font-semibold tracking-widest text-white/50">COMPÉTENCES CLÉS</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-base font-bold text-white/40 sm:grid-cols-2">
                    <li>React & Next.js</li>
                    <li>Supabase</li>
                    <li>Genkit AI</li>
                    <li>n8n & API</li>
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
                containerClassName="lg:h-[calc(100svh-2rem)]"
                revealDelay={idx * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
