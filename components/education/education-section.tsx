"use client"

import React from "react"
import { Timeline } from "@/components/ui/timeline"
import { GraduationCap, BookOpen, Award } from "lucide-react"

export default function EducationSection() {
  const data = [
    {
      title: "2020 - 2022",
      content: (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
              <GraduationCap className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Licence en Informatique de Gestion
              </h4>
              <p className="text-sm text-neutral-400">
                Institut Prive Smart (IPSMART)
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">
            Formation en developpement logiciel, gestion de bases de donnees,
            et conception de systemes d{"'"}information pour les entreprises.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Algorithmique", "Bases de donnees", "Gestion de projet", "Programmation"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 ring-1 ring-white/10"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      ),
    },
    {
      title: "2016 - 2018",
      content: (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
              <BookOpen className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Licence en Comptabilite et Finance
              </h4>
              <p className="text-sm text-neutral-400">
                Faculte des Sciences Economiques et de Gestion (FSEG)
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">
            Formation approfondie en comptabilite, finance et gestion
            d{"'"}entreprise, combinant theorie economique et pratique
            professionnelle.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Comptabilite", "Finance", "Gestion", "Economie"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 ring-1 ring-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Award className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">
                Baccalaureat Malien - Terminale TSECO
              </h4>
              <p className="text-sm text-neutral-400">
                Lycee Prive &laquo; Les Savoirs &raquo;
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">
            Baccalaureat en Sciences Economiques, avec une solide base en
            mathematiques, economie et gestion.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Sciences Economiques", "Mathematiques", "Gestion"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 ring-1 ring-white/10"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="relative bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">
          FORMATION
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Parcours academique
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-lg mb-8">
          De la finance a l{"'"}informatique, un parcours qui combine vision
          business et expertise technique.
        </p>
      </div>
      <Timeline data={data} />
    </section>
  )
}
