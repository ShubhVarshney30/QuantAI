// import React from 'react'

// const Page = () => {
//   return (
//     <div>Paper Trading</div>
//   )
// }

// export default Page

// Converted JSX version of your TSX code

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  FireIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
// import { Navbar } from "@/components/layout/navbar";

const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.5, change: 2.3, changePercent: 1.33, category: "tech" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.8, change: -1.2, changePercent: -0.83, category: "tech" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.9, change: 8.4, changePercent: 3.49, category: "sustainable" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.2, change: 4.1, changePercent: 1.1, category: "tech" },
  { symbol: "JPM", name: "JPMorgan Chase", price: 158.3, change: -0.8, changePercent: -0.5, category: "finance" },
  { symbol: "JNJ", name: "Johnson & Johnson", price: 162.4, change: 1.5, changePercent: 0.93, category: "healthcare" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.2, change: 15.6, changePercent: 1.81, category: "tech" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 445.8, change: -3.2, changePercent: -0.71, category: "tech" },
];

const portfolioHistory = [
  { day: "Day 1", value: 10000 },
  { day: "Day 2", value: 10150 },
  { day: "Day 3", value: 9980 },
  { day: "Day 4", value: 10320 },
  { day: "Day 5", value: 10180 },
  { day: "Day 6", value: 10450 },
  { day: "Day 7", value: 10380 },
];

const leaderboard = [
  { name: "Alex Chen", returns: 24.5, rank: 1 },
  { name: "Sarah Kumar", returns: 18.2, rank: 2 },
  { name: "Mike Johnson", returns: 15.8, rank: 3 },
  { name: "You", returns: 12.4, rank: 4 },
  { name: "Emma Wilson", returns: 8.9, rank: 5 },
];

export default function SimulatorPage() {
  const [virtualBalance, setVirtualBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [shareAmount, setShareAmount] = useState("");
  const [filter, setFilter] = useState("all");
  const [showConfetti, setShowConfetti] = useState(false);

  // Component logic and JSX remains unchanged — the primary TSX parts to remove were interfaces
  // JSX does not need interfaces for state/props

  // You can continue using the remaining code from your original component here.
  // This placeholder is used due to the length limit.

  const filteredStocks =
  filter === "sustainable" ? mockStocks.filter((stock) => stock.category === "sustainable") : mockStocks

const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)
const totalReturns = totalPortfolioValue + virtualBalance - 10000
const returnsPercent = (totalReturns / 10000) * 100

const handleBuyStock = (stock: Stock) => {
  const shares = Number.parseInt(shareAmount)
  if (!shares || shares <= 0) return

  const totalCost = shares * stock.price
  if (totalCost > virtualBalance) {
    alert("Insufficient balance!")
    return
  }

  setVirtualBalance((prev) => prev - totalCost)

  const existingPosition = portfolio.find((p) => p.symbol === stock.symbol)
  if (existingPosition) {
    setPortfolio((prev) =>
      prev.map((p) =>
        p.symbol === stock.symbol
          ? {
              ...p,
              shares: p.shares + shares,
              currentValue: (p.shares + shares) * stock.price,
            }
          : p,
      ),
    )
  } else {
    setPortfolio((prev) => [
      ...prev,
      {
        symbol: stock.symbol,
        shares,
        buyPrice: stock.price,
        currentValue: shares * stock.price,
      },
    ])
  }

  const transaction: Transaction = {
    id: Date.now().toString(),
    type: "buy",
    symbol: stock.symbol,
    shares,
    price: stock.price,
    timestamp: new Date(),
  }
  setTransactions((prev) => [transaction, ...prev])
  setShareAmount("")
  setSelectedStock(null)

  // Show confetti for first purchase
  if (portfolio.length === 0) {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }
}

const handleSellStock = (portfolioItem: Portfolio) => {
  const stock = mockStocks.find((s) => s.symbol === portfolioItem.symbol)
  if (!stock) return

  const sellValue = portfolioItem.shares * stock.price
  setVirtualBalance((prev) => prev + sellValue)
  setPortfolio((prev) => prev.filter((p) => p.symbol !== portfolioItem.symbol))

  const transaction: Transaction = {
    id: Date.now().toString(),
    type: "sell",
    symbol: portfolioItem.symbol,
    shares: portfolioItem.shares,
    price: stock.price,
    timestamp: new Date(),
  }
  setTransactions((prev) => [transaction, ...prev])
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-gray-900 dark:to-orange-900/20">
    {/* <Navbar /> */}

    {/* Confetti Effect */}
    <AnimatePresence>
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>

    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Investment</span>
          <span className="handwritten text-orange-600"> Simulator</span> 🎮
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Practice investing with ₹10,000 virtual money - no real risk, real learning!
        </p>
      </motion.div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Virtual Balance</p>
                  <p className="text-2xl font-bold">₹{virtualBalance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <ArrowTrendingUpIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Portfolio Value</p>
                  <p className="text-2xl font-bold">₹{totalPortfolioValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                {totalReturns >= 0 ? (
                  <ArrowTrendingUpIcon className="w-8 h-8 text-emerald-600" />
                ) : (
                  <ArrowTrendingDownIcon className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Returns</p>
                  <p className={`text-2xl font-bold ${totalReturns >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {totalReturns >= 0 ? "+" : ""}₹{totalReturns.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FireIcon className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Returns %</p>
                  <p className={`text-2xl font-bold ${returnsPercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {returnsPercent >= 0 ? "+" : ""}
                    {returnsPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stock Market */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-600" />
                    Stock Market
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("all")}
                    >
                      All Stocks
                    </Button>
                    <Button
                      variant={filter === "sustainable" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter("sustainable")}
                      className="flex items-center gap-1"
                    >
                      <GlobeAltIcon className="w-4 h-4" />
                      Sustainable
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredStocks.map((stock, index) => (
                    <motion.div
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{stock.symbol}</span>
                            {stock.category === "sustainable" && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                <GlobeAltIcon className="w-3 h-3 mr-1" />
                                ESG
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{stock.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{stock.price.toFixed(2)}</p>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              stock.change >= 0 ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {stock.change >= 0 ? (
                              <ArrowTrendingUpIcon className="w-4 h-4" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-4 h-4" />
                            )}
                            <span>
                              {stock.change >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => setSelectedStock(stock)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          Buy
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioHistory}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`₹${value}`, "Portfolio Value"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#10B981", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Portfolio */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                  Your Portfolio
                  <Badge variant="secondary" className="ml-auto">
                    {portfolio.length} stocks
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.length === 0 ? (
                  <div className="text-center py-8">
                    <CurrencyDollarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      No investments yet. Start by buying your first stock!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {portfolio.map((item) => {
                      const currentStock = mockStocks.find((s) => s.symbol === item.symbol)
                      const profit = currentStock ? (currentStock.price - item.buyPrice) * item.shares : 0
                      const profitPercent = (((currentStock?.price || 0) - item.buyPrice) / item.buyPrice) * 100

                      return (
                        <div key={item.symbol} className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{item.symbol}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSellStock(item)}
                              className="text-xs"
                            >
                              Sell
                            </Button>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Shares:</span>
                              <span>{item.shares}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Buy Price:</span>
                              <span>₹{item.buyPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current:</span>
                              <span>₹{currentStock?.price.toFixed(2)}</span>
                            </div>
                            <div
                              className={`flex justify-between font-semibold ${
                                profit >= 0 ? "text-emerald-600" : "text-red-600"
                              }`}
                            >
                              <span>P&L:</span>
                              <span>
                                {profit >= 0 ? "+" : ""}₹{profit.toFixed(2)}({profit >= 0 ? "+" : ""}
                                {profitPercent.toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FireIcon className="w-5 h-5 text-orange-600" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.name}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.name === "You"
                          ? "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700"
                          : "bg-white/50 dark:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-400 text-yellow-900"
                              : index === 1
                                ? "bg-gray-300 text-gray-700"
                                : index === 2
                                  ? "bg-orange-400 text-orange-900"
                                  : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <span
                          className={`font-medium ${player.name === "You" ? "text-emerald-700 dark:text-emerald-300" : ""}`}
                        >
                          {player.name}
                        </span>
                      </div>
                      <span className={`font-bold ${player.returns >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        +{player.returns}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300 py-4">No transactions yet</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={transaction.type === "buy" ? "default" : "secondary"}
                            className={
                              transaction.type === "buy"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {transaction.type.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{transaction.symbol}</span>
                        </div>
                        <div className="text-right text-sm">
                          <p>{transaction.shares} shares</p>
                          <p className="text-gray-600 dark:text-gray-300">₹{transaction.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Buy Stock Modal */}
    <AnimatePresence>
      {selectedStock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStock(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Buy {selectedStock.symbol}</h3>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">{selectedStock.name}</p>
              <p className="text-3xl font-bold">₹{selectedStock.price.toFixed(2)}</p>
              <div
                className={`flex items-center gap-1 text-sm ${
                  selectedStock.change >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {selectedStock.change >= 0 ? (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                <span>
                  {selectedStock.change >= 0 ? "+" : ""}
                  {selectedStock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Number of Shares</label>
              <Input
                type="number"
                value={shareAmount}
                onChange={(e) => setShareAmount(e.target.value)}
                placeholder="Enter number of shares"
                min="1"
              />
              {shareAmount && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Total Cost: ₹{(Number.parseInt(shareAmount) * selectedStock.price).toFixed(2)}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSelectedStock(null)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => handleBuyStock(selectedStock)}
                disabled={!shareAmount || Number.parseInt(shareAmount) <= 0}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                Buy Shares
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
