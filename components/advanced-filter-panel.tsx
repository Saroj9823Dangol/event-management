"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  X,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Sparkles,
  Music,
  Palette,
  Trophy,
  Utensils,
  Laptop,
  Heart,
  Filter,
  Zap,
} from "lucide-react"

const categories = [
  { id: "music", name: "Music", icon: Music, color: "primary" },
  { id: "art", name: "Art", icon: Palette, color: "secondary" },
  { id: "sports", name: "Sports", icon: Trophy, color: "accent" },
  { id: "food", name: "Food & Drink", icon: Utensils, color: "primary" },
  { id: "tech", name: "Tech", icon: Laptop, color: "secondary" },
  { id: "wellness", name: "Wellness", icon: Heart, color: "accent" },
]

const moods = [
  { id: "energetic", name: "Energetic", emoji: "⚡", gradient: "from-amber-500 to-orange-600" },
  { id: "chill", name: "Chill", emoji: "🌊", gradient: "from-blue-500 to-cyan-600" },
  { id: "intellectual", name: "Intellectual", emoji: "🧠", gradient: "from-purple-500 to-pink-600" },
  { id: "social", name: "Social", emoji: "🎉", gradient: "from-green-500 to-emerald-600" },
]

interface AdvancedFilterPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdvancedFilterPanel({ isOpen, onClose }: AdvancedFilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [distance, setDistance] = useState([25])
  const [aiSuggestEnabled, setAiSuggestEnabled] = useState(true)

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setSelectedMood(null)
    setPriceRange([0, 500])
    setDistance([25])
    setAiSuggestEnabled(true)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Filter panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full md:w-[480px] glass-strong z-50 transition-transform duration-500 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Advanced Filters</h2>
              <p className="text-sm text-muted-foreground">Discover events that match your vibe</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="glass">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* AI Suggest Toggle */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    aiSuggestEnabled ? "bg-primary/20 scale-110" : "bg-muted/20"
                  }`}
                >
                  <Sparkles className={`w-6 h-6 ${aiSuggestEnabled ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-semibold">AI Suggest</p>
                  <p className="text-xs text-muted-foreground">Magically rearrange results</p>
                </div>
              </div>
              <button
                onClick={() => setAiSuggestEnabled(!aiSuggestEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  aiSuggestEnabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    aiSuggestEnabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 block">Select Your Mood</label>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id === selectedMood ? null : mood.id)}
                  className={`glass rounded-xl p-4 text-center transition-all hover:scale-105 ${
                    selectedMood === mood.id ? "ring-2 ring-primary scale-105" : ""
                  }`}
                >
                  <div className={`text-4xl mb-2 transition-transform ${selectedMood === mood.id ? "scale-125" : ""}`}>
                    {mood.emoji}
                  </div>
                  <p className="font-semibold text-sm">{mood.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector - Honeycomb Grid */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 block">Event Categories</label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = selectedCategories.has(category.id)
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`glass rounded-xl p-4 text-center transition-all hover:scale-105 ${
                      isSelected ? "ring-2 ring-primary scale-105 glass-strong" : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all ${
                        isSelected ? "bg-primary/20" : "bg-muted/20"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <p className="text-xs font-semibold">{category.name}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <div className="glass rounded-xl p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 glass bg-transparent">
                  Today
                </Button>
                <Button variant="outline" size="sm" className="flex-1 glass bg-transparent">
                  This Week
                </Button>
                <Button variant="outline" size="sm" className="flex-1 glass bg-transparent">
                  This Month
                </Button>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 glass bg-transparent">
                  Custom
                </Button>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Range
            </label>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">${priceRange[0]}</span>
                <span className="text-sm font-semibold">${priceRange[1]}+</span>
              </div>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mb-3" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 text-accent" />
                <span>Value Score: AI calculates quality/price ratio</span>
              </div>
            </div>
          </div>

          {/* Location/Distance */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Distance Radius
            </label>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Within {distance[0]} miles</span>
                <Badge variant="outline" className="glass border-0">
                  ~15 min drive
                </Badge>
              </div>
              <Slider value={distance} onValueChange={setDistance} max={100} step={5} className="mb-3" />
              <Button variant="outline" size="sm" className="w-full glass bg-transparent">
                <MapPin className="w-3 h-3 mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>

          {/* Audience Filter */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Audience
            </label>
            <div className="glass rounded-xl p-4 space-y-2">
              {[
                { label: "Family Friendly", icon: "👨‍👩‍👧‍👦" },
                { label: "Adults Only (21+)", icon: "🔞" },
                { label: "Accessible Events", icon: "♿" },
                { label: "Pet Friendly", icon: "🐕" },
              ].map((option) => (
                <button
                  key={option.label}
                  className="w-full glass rounded-lg p-3 text-left hover:glass-strong transition-all flex items-center gap-3"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.size > 0 || selectedMood) && (
            <div className="mb-6">
              <label className="text-sm font-semibold mb-3 block">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedCategories).map((cat) => {
                  const category = categories.find((c) => c.id === cat)
                  return (
                    <Badge key={cat} variant="outline" className="glass border-0 pr-1">
                      {category?.name}
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="ml-2 w-4 h-4 rounded-full hover:bg-muted flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )
                })}
                {selectedMood && (
                  <Badge variant="outline" className="glass border-0 pr-1">
                    {moods.find((m) => m.id === selectedMood)?.name}
                    <button
                      onClick={() => setSelectedMood(null)}
                      className="ml-2 w-4 h-4 rounded-full hover:bg-muted flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 glass bg-transparent" onClick={clearFilters}>
              Clear All
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary" onClick={onClose}>
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
