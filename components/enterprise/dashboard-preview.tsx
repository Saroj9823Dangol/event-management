"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"

const tabs = ["Overview", "Sales", "Audience", "Marketing"]

const recentSales = [
  { name: "VIP Package", qty: 2, amount: 750, time: "2 min ago" },
  { name: "General Admission", qty: 4, amount: 356, time: "5 min ago" },
  { name: "Reserved Seating", qty: 1, amount: 199, time: "8 min ago" },
  { name: "VIP Package", qty: 1, amount: 375, time: "12 min ago" },
]

export function EnterpriseDashboardPreview() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground block mb-4">LIVE DASHBOARD</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Command Center for Your Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor every aspect of your events in real-time with our intuitive dashboard.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold">W</span>
              </div>
              <div>
                <h3 className="font-medium">Whispering Willow Dashboard</h3>
                <p className="text-sm text-muted-foreground">Renaissance World Tour</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === tab ? "border-accent text-foreground" : "border-transparent text-muted-foreground"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      label: "Total Revenue",
                      value: "$847,293",
                      change: "+12.5%",
                      positive: true,
                      icon: DollarSign,
                    },
                    { label: "Tickets Sold", value: "24,847", change: "+8.2%", positive: true, icon: BarChart3 },
                    { label: "Attendance Rate", value: "94.2%", change: "-2.1%", positive: false, icon: Users },
                    {
                      label: "Avg. Order Value",
                      value: "$342",
                      change: "+5.8%",
                      positive: true,
                      icon: TrendingUp,
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-background border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <stat.icon className="w-5 h-5 text-muted-foreground" />
                        <span
                          className={`flex items-center text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}
                        >
                          {stat.positive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-serif mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Charts & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sales Chart */}
                  <div className="lg:col-span-2 p-6 bg-background border border-border">
                    <h4 className="font-medium mb-6">Sales Over Time</h4>
                    <div className="h-64 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.05 }}
                          className="flex-1 bg-accent/20 hover:bg-accent/40 transition-colors cursor-pointer relative group"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ${Math.round(height * 84.7)}K
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="p-6 bg-background border border-border">
                    <h4 className="font-medium mb-6">Recent Sales</h4>
                    <div className="space-y-4">
                      {recentSales.map((sale, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between py-3 border-b border-border last:border-0"
                        >
                          <div>
                            <p className="text-sm font-medium">{sale.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {sale.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${sale.amount}</p>
                            <p className="text-xs text-muted-foreground">{sale.qty} tickets</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="mt-6 p-6 bg-background border border-border">
                  <h4 className="font-medium mb-6">Upcoming Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "London Show",
                        date: "Jul 29, 2025",
                        venue: "Wembley Stadium",
                        sold: 87,
                      },
                      {
                        name: "Paris Show",
                        date: "Aug 5, 2025",
                        venue: "Stade de France",
                        sold: 72,
                      },
                      {
                        name: "Berlin Show",
                        date: "Aug 12, 2025",
                        venue: "Olympiastadion",
                        sold: 58,
                      },
                    ].map((event) => (
                      <div
                        key={event.name}
                        className="p-4 border border-border hover:border-accent/50 transition-colors"
                      >
                        <h5 className="font-medium mb-2">{event.name}</h5>
                        <div className="space-y-1 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sold</span>
                            <span>{event.sold}%</span>
                          </div>
                          <div className="h-2 bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${event.sold}%` }}
                              transition={{ duration: 1 }}
                              className="h-full bg-accent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
