"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  Calendar,
  Rocket,
  Sparkles,
  Activity,
  DollarSign,
  Target,
} from "lucide-react"

export function WhisperingWillow() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <section id="willow" className="relative py-24 px-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[180px] animate-[float_12s_ease-in-out_infinite]" />

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Activity className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-sm font-medium">Enterprise Portal • Event Organizers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Whispering Willow
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your premium dashboard for managing events, tracking engagement, and growing your audience with AI-powered
            insights.
          </p>
        </div>

        {/* Main dashboard */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="glass-strong p-1 w-full max-w-2xl mx-auto grid grid-cols-3">
              <TabsTrigger value="dashboard" className="data-[state=active]:glass-strong">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:glass-strong">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="promote" className="data-[state=active]:glass-strong">
                <Rocket className="w-4 h-4 mr-2" />
                Promote
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12%
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold mb-1">45.2K</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>

                <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +24%
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold mb-1">12.8K</p>
                  <p className="text-sm text-muted-foreground">Ticket Sales</p>
                </div>

                <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18%
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold mb-1">$342K</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>

                <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +32%
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold mb-1">8.9K</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
              </div>

              {/* Active events */}
              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Your Active Events</h3>
                    <p className="text-sm text-muted-foreground">Events currently live on the platform</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Summer Music Festival 2026",
                      sales: 2847,
                      capacity: 5000,
                      trend: "+156 today",
                    },
                    {
                      name: "Tech Innovation Summit",
                      sales: 1234,
                      capacity: 2000,
                      trend: "+89 today",
                    },
                    {
                      name: "Food & Wine Gala",
                      sales: 456,
                      capacity: 800,
                      trend: "+23 today",
                    },
                  ].map((event, i) => (
                    <div key={i} className="glass rounded-xl p-4 hover:glass-strong transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{event.name}</h4>
                        <Badge variant="outline" className="glass border-0">
                          {event.trend}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {event.sales} / {event.capacity} sold
                            </span>
                            <span className="font-semibold">{Math.round((event.sales / event.capacity) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                              style={{ width: `${(event.sales / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="glass bg-transparent">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Engagement heatmap */}
              <div className="glass-strong rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-2">Real-Time Engagement Heatmap</h3>
                <p className="text-sm text-muted-foreground mb-6">User activity across your events</p>

                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 84 }).map((_, i) => {
                    const intensity = Math.random()
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded transition-all hover:scale-125 cursor-pointer"
                        style={{
                          background:
                            intensity > 0.7
                              ? "oklch(0.55 0.25 290)"
                              : intensity > 0.5
                                ? "oklch(0.45 0.2 290)"
                                : intensity > 0.3
                                  ? "oklch(0.35 0.15 290)"
                                  : "oklch(0.25 0.1 250)",
                          opacity: 0.4 + intensity * 0.6,
                        }}
                        title={`${Math.floor(intensity * 1000)} interactions`}
                      />
                    )
                  })}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Less</span>
                    <div className="flex gap-1">
                      {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded"
                          style={{
                            background: "oklch(0.55 0.25 290)",
                            opacity: opacity,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">More</span>
                  </div>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Growing tree visualization */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { metric: "Audience Growth", value: "324%", icon: Users, color: "primary" },
                  { metric: "Social Shares", value: "8.9K", icon: Share2, color: "secondary" },
                  { metric: "Conversion Rate", value: "12.8%", icon: Target, color: "accent" },
                ].map((stat, i) => (
                  <div key={i} className="glass-strong rounded-2xl p-6 text-center hover:scale-105 transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                      <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.metric}</p>
                    <div className="mt-4 h-1 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary animate-[shimmer_2s_ease-in-out_infinite]"
                        style={{
                          width: "100%",
                          backgroundSize: "200% 100%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="promote" className="space-y-6">
              {/* One-click promotion */}
              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">AI-Powered Event Promotion</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimize reach and boost ticket sales with intelligent targeting
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="glass rounded-xl p-6 text-center">
                    <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                    <p className="font-semibold mb-1">Smart Targeting</p>
                    <p className="text-sm text-muted-foreground">AI identifies ideal audience segments</p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold mb-1">Boost Visibility</p>
                    <p className="text-sm text-muted-foreground">Appear in trending and recommendations</p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <p className="font-semibold mb-1">Reach 10x More</p>
                    <p className="text-sm text-muted-foreground">Expand to matched user profiles</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 bg-gradient-to-r from-primary to-secondary">
                    <Rocket className="w-4 h-4 mr-2" />
                    Launch Promotion Campaign
                  </Button>
                  <Button variant="outline" size="lg" className="glass bg-transparent">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Brand story canvas */}
              <div className="glass-strong rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-2">Brand Story Canvas</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Create an interactive timeline for your event storytelling
                </p>

                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                      { phase: "Announcement", date: "Week 1", status: "complete" },
                      { phase: "Early Bird", date: "Week 2-3", status: "complete" },
                      { phase: "Main Campaign", date: "Week 4-6", status: "active" },
                      { phase: "Final Push", date: "Week 7", status: "upcoming" },
                      { phase: "Event Day", date: "Week 8", status: "upcoming" },
                    ].map((milestone, i) => (
                      <div key={i} className="flex-shrink-0 w-48">
                        <div
                          className={`glass rounded-xl p-4 ${
                            milestone.status === "active" ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                              milestone.status === "complete"
                                ? "bg-green-500/20 text-green-400"
                                : milestone.status === "active"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted/20 text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <p className="font-semibold mb-1">{milestone.phase}</p>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
