import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Plus,
  ArrowUp,
  Paperclip,
  Code2,
  FileText,
  AlertCircle,
  MessageSquarePlus,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useConversations } from '@/hooks/use-data'
import { useAIStore } from '@/stores'
import { aiWorkspaceSuggestions } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Can you help me generate an abstract for my Neural Network Optimizer project?',
    timestamp: '2026-07-03T09:55:00Z',
  },
  {
    id: '2',
    role: 'assistant',
    content:
      'Of course! Based on your project description about adaptive quantization for edge devices, here\'s a draft abstract:\n\n"This paper presents a novel approach to optimizing deep neural networks for deployment on resource-constrained edge devices. We introduce an adaptive quantization framework that dynamically adjusts precision levels based on layer sensitivity analysis, achieving up to 4.2× speedup with less than 1% accuracy degradation on standard benchmarks."',
    timestamp: '2026-07-03T09:56:00Z',
  },
]

const suggestionIcons = [Code2, FileText, AlertCircle, MessageSquarePlus, Sparkles]

export default function AIWorkspacePage() {
  const location = useLocation()
  const { data: conversations } = useConversations()
  const { activeConversationId, setActiveConversation } = useAIStore()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = (location.state as { query?: string })?.query
    if (query) {
      setInput(query)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'd be happy to help with that. Let me analyze your request and provide a detailed response tailored to your academic project needs.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside
        className="hidden w-72 shrink-0 flex-col border-r border-border bg-card md:flex"
        aria-label="Conversation history"
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold">Conversations</h2>
          <button
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent"
            aria-label="New conversation"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations?.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={cn(
                  'w-full rounded-xl px-3 py-3 text-left transition-colors',
                  activeConversationId === conv.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/30'
                    : 'hover:bg-accent',
                )}
              >
                <p className="truncate text-sm font-medium">{conv.title}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {conv.lastMessage}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <div className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50">
                  <Sparkles className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight">InnovateX AI</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Your intelligent academic assistant for code, documentation, and project guidance.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {aiWorkspaceSuggestions.map((suggestion, i) => {
                    const Icon = suggestionIcons[i % suggestionIcons.length]
                    return (
                      <button
                        key={suggestion}
                        onClick={() => setInput(suggestion)}
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {suggestion}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex gap-4', msg.role === 'user' && 'flex-row-reverse')}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold',
                        msg.role === 'assistant'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-secondary text-muted-foreground',
                      )}
                    >
                      {msg.role === 'assistant' ? 'AI' : 'You'}
                    </div>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed',
                        msg.role === 'assistant'
                          ? 'bg-card border border-border'
                          : 'bg-emerald-500 text-white',
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border bg-background p-4 md:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-soft">
              <div className="flex items-end gap-2">
                <button
                  className="mb-1 rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-accent"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Message InnovateX AI..."
                  rows={1}
                  aria-label="Message input"
                  className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-3 text-sm focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition-colors hover:bg-emerald-600 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              InnovateX AI can make mistakes. Verify important academic information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
