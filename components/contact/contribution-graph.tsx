import React, { useMemo } from "react"
import { cn } from "../../lib/utils"

interface Contribution {
  date: string
  count: number
}

// Generate mock data for 52 weeks (364 days)
const generateMockData = (): Contribution[] => {
  const data: Contribution[] = []
  const today = new Date()
  for (let i = 363; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    // Randomize contribution count (0-15)
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 15) : 0
    data.push({
      date: date.toISOString().split('T')[0],
      count,
    })
  }
  return data
}

const getColorLevel = (count: number) => {
  if (count === 0) return "bg-neutral-900"
  if (count < 4) return "bg-emerald-900/40"
  if (count < 8) return "bg-emerald-700/60"
  if (count < 12) return "bg-emerald-500/80"
  return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
}

export default function ContributionGraph() {
  const data = useMemo(() => generateMockData(), [])
  
  // Group data into weeks (7 days each)
  const weeks = useMemo(() => {
    const w: Contribution[][] = []
    for (let i = 0; i < data.length; i += 7) {
      w.push(data.slice(i, i + 7))
    }
    return w
  }, [data])

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"]

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="inline-flex flex-col gap-2 min-w-[700px]">
        {/* Months Label */}
        <div className="flex text-[10px] text-neutral-500 ml-8 mb-1 font-mono uppercase tracking-tighter">
          {months.map((month, i) => (
            <div key={month} style={{ width: `${100 / 12}%` }}>
              {month}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {/* Days Label */}
          <div className="flex flex-col justify-between text-[9px] text-neutral-600 pr-2 h-[84px] py-1 font-mono uppercase">
            <span>Lun</span>
            <span>Mer</span>
            <span>Ven</span>
          </div>

          {/* The Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={cn(
                      "w-[11px] h-[11px] rounded-[2px] transition-all duration-200 cursor-crosshair relative group",
                      "hover:scale-150 hover:z-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:ring-1 hover:ring-white/50",
                      getColorLevel(day.count)
                    )}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-neutral-900 text-white text-[10px] rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-2xl border border-white/10 scale-75 group-hover:scale-100">
                      <div className="font-bold mb-0.5">{day.count} contributions</div>
                      <div className="text-neutral-400">{new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-neutral-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-end gap-3 mt-4 text-[10px] text-neutral-500 font-mono">
          <span>Moins</span>
          <div className="flex gap-[3px]">
            <div className="w-[10px] h-[10px] rounded-[2px] bg-neutral-900" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-900/40" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-700/60" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/80" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400" />
          </div>
          <span>Plus</span>
        </div>
      </div>
    </div>
  )
}
