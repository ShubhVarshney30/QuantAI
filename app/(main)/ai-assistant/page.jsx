// import React from 'react'




// const Page = () => {
//   return (
//     <div>ai-assistanting</div>
//   )
// }

// export default Page

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  PaperAirplaneIcon,
  SparklesIcon,
  LightBulbIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

const quickActions = [
  { text: "How can I save more money?", icon: CurrencyDollarIcon },
  { text: "Analyze my spending patterns", icon: ChartBarIcon },
  { text: "Investment advice for beginners", icon: LightBulbIcon },
  { text: "Create a budget plan", icon: SparklesIcon },
]

const aiResponses = {
  "How can I save more money?": {
    content:
      "Great question! Based on your spending patterns, I see a few opportunities:\n\n\ud83d\udca1 **Coffee & Dining**: You spent \u20b91,200 on food this month. Try meal prepping - you could save \u20b9400-500!\n\n\ud83d\ude97 **Transportation**: Consider carpooling or public transport 2-3 days a week to save \u20b9200-300.\n\n\ud83d\udcbc **Shopping**: You have some impulse purchases. Try the 24-hour rule before buying non-essentials.\n\nWould you like me to create a personalized savings plan?",
    mood: "excited",
    suggestions: ["Create savings plan", "Set spending alerts", "Track daily expenses"],
  },
  "Analyze my spending patterns": {
    content:
      "I've analyzed your last 3 months of spending! Here's what I found:\n\n\ud83d\udcca **Spending Trends**:\n\u2022 Food & Dining: 36% (\u20b91,200/month)\n\u2022 Transportation: 24% (\u20b9800/month)\n\u2022 Entertainment: 12% (\u20b9400/month)\n\n\ud83c\udf1f **Key Insights**:\n\u2022 You spend 40% more on weekends\n\u2022 Highest spending day: Friday (\u20b9180 avg)\n\u2022 You're doing great with utilities - 15% below average!\n\n\u26a0\ufe0f **Watch Out**: Food delivery increased 25% this month.",
    mood: "neutral",
    suggestions: ["Set weekend budget", "Find cheaper alternatives", "Track daily spending"],
  },
  "Investment advice for beginners": {
    content:
      "Perfect timing to start investing! \ud83d\ude80\n\n**For Beginners, I recommend**:\n\n1. **Emergency Fund First**: Save 6 months of expenses (you're at 3 months - great start!)\n\n2. **Start Small**: Begin with \u20b91,000-2,000/month in mutual funds\n\n3. **Diversify**: 60% equity funds, 30% debt funds, 10% gold\n\n4. **SIP is King**: Systematic Investment Plans reduce risk\n\n\ud83d\udca1 **Pro Tip**: Start with index funds - they're simple and have low fees!\n\nWant to try our Investment Simulator first?",
    mood: "excited",
    suggestions: ["Try Investment Simulator", "Calculate SIP returns", "Learn about mutual funds"],
  },
  "Create a budget plan": {
    content:
      "Let's create a personalized budget! \ud83d\udccb\n\n**Based on your \u20b95,700 monthly income**:\n\n\ud83c\udfe0 **Fixed Expenses (50%)**:\n\u2022 Rent/EMI: \u20b92,000\n\u2022 Utilities: \u20b9400\n\u2022 Insurance: \u20b9450\n\n\ud83c\udf55 **Variable Expenses (30%)**:\n\u2022 Food: \u20b91,000\n\u2022 Transportation: \u20b9600\n\u2022 Entertainment: \u20b9110\n\n\ud83d\udcb0 **Savings & Investments (20%)**:\n\u2022 Emergency Fund: \u20b9570\n\u2022 Investments: \u20b9570\n\nThis follows the 50-30-20 rule. Should I adjust based on your goals?",
    mood: "happy",
    suggestions: ["Adjust budget categories", "Set spending alerts", "Track progress"],
  },
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hi Alex! \ud83d\udc4b I'm your AI financial assistant. I can help you understand your spending, create budgets, give investment advice, and answer any money questions you have!\n\nWhat would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
      mood: "happy",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content) => {
    if (!content.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const response = aiResponses[content] || {
        content:
          "That's an interesting question! I'm still learning about that topic. In the meantime, you can explore your dashboard for insights about your spending patterns, or try our Investment Simulator to practice with virtual money! \ud83e\udd16\u2728",
        mood: "neutral",
        suggestions: ["Check Dashboard", "Try Investment Simulator", "Learn about budgeting"],
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        mood: response.mood,
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action)
  }

  const handleSuggestion = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* UI content omitted for brevity */}
        {/* The full UI remains unchanged, except TypeScript removed */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">AI Financial</span>
            <span className="handwritten text-purple-600"> Assistant</span> 🤖
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized financial advice that understands your mood and goals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <motion.button
                  key={action.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleQuickAction(action.text)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-left border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg group"
                >
                  <ActionIcon className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{action.text}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Chat Window */}
        <Card className="glass-card border-0 mb-6">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.isUser ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isUser
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white ml-4"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-4"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        {message.mood && (
                          <Badge
                            variant="secondary"
                            className={`mt-2 ${
                              message.mood === "happy"
                                ? "bg-green-100 text-green-800"
                                : message.mood === "excited"
                                ? "bg-purple-100 text-purple-800"
                                : message.mood === "concerned"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.mood === "happy"
                              ? "😊"
                              : message.mood === "excited"
                              ? "🚀"
                              : message.mood === "concerned"
                              ? "🤔"
                              : "💭"}{" "}
                            {message.mood}
                          </Badge>
                        )}
                      </div>

                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestion(suggestion)}
                              className="text-xs hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your finances..."
                  className="flex-1 border-0 bg-transparent focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </div>
  )
}

ChatPage.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.string,
      isUser: PropTypes.bool,
      timestamp: PropTypes.instanceOf(Date),
      mood: PropTypes.oneOf(["happy", "concerned", "excited", "neutral"]),
      suggestions: PropTypes.arrayOf(PropTypes.string),
    })
  ),
}
