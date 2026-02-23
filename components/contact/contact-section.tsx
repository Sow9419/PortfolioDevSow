
import React, { useState, useEffect, useRef } from "react"
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Terminal, 
  ChevronRight, 
  Copy, 
  Check,
  Layout,
  Cpu,
  Workflow,
  Code2
} from "lucide-react"
import ContributionGraph from "./contribution-graph"
import { cn } from "../../lib/utils"

const CONTACT_LINKS = [
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/dramane-sow-06b766246", color: "hover:text-blue-400" },
  { name: "GitHub", icon: Github, url: "https://github.com/Sow9419", color: "hover:text-neutral-400" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/22394231814", color: "hover:text-green-400" },
  { name: "Email", icon: Mail, url: "mailto:dramanesow20@gmail.com", color: "hover:text-red-400" }
]

const SERVICES = [
  { title: "Développement Fullstack", icon: Layout, desc: "Applications web & mobiles sur mesure" },
  { title: "Solutions AI & Agents", icon: Cpu, desc: "Agentic AI & Automatisation intelligente" },
  { title: "Automatisation de Processus", icon: Workflow, desc: "Flux n8n & intégrations API complexes" }
]

const TECH_STACK = [
  "React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Genkit", "Gemini AI", "n8n", "Docker"
]

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [showServices, setShowServices] = useState(false)
  const [showStack, setShowStack] = useState(false)
  const [currentInput, setCurrentInput] = useState("")
  const [activeStackIdx, setActiveStackIdx] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)

  const command1 = "get-services --all"
  const command2 = "init-stack --verbose"

  useEffect(() => {
    // Séquence d'animation
    const runSequence = async () => {
      // 1. Taper commande services
      for (let i = 0; i <= command1.length; i++) {
        setCurrentInput(command1.slice(0, i))
        await new Promise(r => setTimeout(r, 70))
      }
      await new Promise(r => setTimeout(r, 400))
      setTerminalLines(prev => [...prev, `> ${command1}`])
      setCurrentInput("")
      setShowServices(true)
      
      await new Promise(r => setTimeout(r, 1000))

      // 2. Taper commande stack
      for (let i = 0; i <= command2.length; i++) {
        setCurrentInput(command2.slice(0, i))
        await new Promise(r => setTimeout(r, 70))
      }
      await new Promise(r => setTimeout(r, 400))
      setTerminalLines(prev => [...prev, `> ${command2}`])
      setCurrentInput("")
      setShowStack(true)

      // 3. Animation staggered de la stack
      for (let i = 0; i < TECH_STACK.length; i++) {
        setActiveStackIdx(i)
        await new Promise(r => setTimeout(r, 150))
      }
    }

    runSequence()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines, showServices, showStack, activeStackIdx])

  const copyEmail = () => {
    navigator.clipboard.writeText("dramanesow20@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="bg-neutral-950 pt-16 pb-12 px-4 overflow-hidden relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight uppercase italic">READY TO BUILD?</h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto uppercase tracking-[0.1em]">
            Parlons de vos idées les plus folles.
          </p>
        </div>

        <div className="bg-[#080808] rounded-2xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Header */}
          <div className="bg-[#121212] px-5 py-3.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <div className="flex items-center gap-2 ml-4 text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
                <Terminal className="w-3 h-3" />
                <span>dramane@terminal</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {CONTACT_LINKS.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" 
                   className={cn("text-neutral-600 transition-all duration-300 hover:scale-110", link.color)}>
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 font-mono text-sm leading-relaxed">
            <div ref={terminalRef} className="min-h-[300px] space-y-4 mb-6">
              {/* Historique des commandes */}
              {terminalLines.map((line, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-2 text-emerald-500/80 italic font-bold">
                    <span className="shrink-0 opacity-50">$</span>
                    <span>{line.startsWith('> ') ? line.substring(2) : line}</span>
                  </div>
                  
                  {/* Affichage des services si c'est la commande 1 */}
                  {line.includes(command1) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                      {SERVICES.map((s, idx) => (
                        <div key={idx} className="group relative p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                          <div className="mb-2 p-1.5 w-fit rounded-lg bg-emerald-500/5 text-emerald-500">
                            <s.icon className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="text-white text-[10px] font-black uppercase mb-1">{s.title}</h4>
                          <p className="text-[9px] text-neutral-600 leading-tight">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Affichage de la stack si c'est la commande 2 */}
                  {line.includes(command2) && (
                    <div className="flex flex-wrap gap-2 py-2">
                      {TECH_STACK.map((tech, idx) => (
                        <div key={tech} className={cn(
                          "px-2 py-1 rounded border text-[9px] font-bold transition-all duration-300",
                          idx <= activeStackIdx 
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-100 translate-y-0" 
                            : "bg-transparent border-transparent text-transparent opacity-0 translate-y-2"
                        )}>
                          [OK] {tech}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Input en cours */}
              <div className="flex items-center gap-2 text-neutral-400 italic">
                <span className="shrink-0 opacity-50">$</span>
                <span className="flex items-center">
                  {currentInput}
                  <span className="w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-neutral-400" />
                  <div>
                    <h3 className="text-white text-xs font-black uppercase tracking-widest">Github Pulse</h3>
                    <p className="text-[9px] text-neutral-600 font-mono">Activity in the last 12 months</p>
                  </div>
                </div>
                <button onClick={copyEmail} className="flex items-center gap-2 p-2 px-4 rounded-full bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all group">
                  <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300">dramanesow20@gmail.com</span>
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400" />}
                </button>
              </div>
              <ContributionGraph />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-[9px] text-neutral-700 font-mono uppercase tracking-[0.4em]">
          Dramane Sow // 2026 // Design & Engineering
        </div>
      </div>
    </section>
  )
}
