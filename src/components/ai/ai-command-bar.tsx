import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ArrowUp,
  FileText,
  Code2,
  Presentation,
  ClipboardCheck,
  Paperclip,
} from 'lucide-react'
import { aiSuggestions } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const suggestionIcons: Record<string, typeof FileText> = {
  'Generate Abstract': FileText,
  'Improve Documentation': ClipboardCheck,
  'Explain Code': Code2,
  'Generate Presentation': Presentation,
  'Review Proposal': ClipboardCheck,
}

interface AICommandBarProps {
  variant?: 'home' | 'compact'
  className?: string
}

export function AICommandBar({ variant = 'home', className }: AICommandBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/ai', { state: { query } })
  }

  const handleSuggestion = (suggestion: string) => {
    navigate('/ai', { state: { query: suggestion } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn('w-full', className)}
    >
      <div className="rounded-3xl border border-border bg-card p-1 shadow-soft-lg">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask InnovateX AI anything..."
              aria-label="Ask InnovateX AI"
              className="flex-1 bg-transparent text-base placeholder:text-muted-foreground focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-soft transition-colors hover:bg-emerald-600"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </form>

        {variant === 'home' && (
          <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
            {aiSuggestions.map((suggestion) => {
              const Icon = suggestionIcons[suggestion] ?? FileText
              return (
                <motion.button
                  key={suggestion}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestion(suggestion)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {suggestion}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
