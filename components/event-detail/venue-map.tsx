"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Car, Train, ExternalLink } from "lucide-react"

interface VenueMapProps {
  venue: string
  address: string
}

export function VenueMap({ venue, address }: VenueMapProps) {
  const [activeTab, setActiveTab] = useState<"map" | "directions" | "parking">("map")

  return (
    <div>
      <h2 className="text-2xl font-serif mb-6">Venue & Location</h2>

      {/* Venue Info */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-accent/20 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">{venue}</h3>
          <p className="text-muted-foreground">{address}</p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-accent mt-2 hover:underline">
            Get Directions <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {[
          { id: "map", label: "Map", icon: MapPin },
          { id: "directions", label: "Directions", icon: Navigation },
          { id: "parking", label: "Parking", icon: Car },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as "map" | "directions" | "parking")}
            className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 -mb-px transition-colors ${
              activeTab === id ? "border-white text-white" : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[300px]"
      >
        {activeTab === "map" && (
          <div className="relative aspect-video bg-card border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.2936636887827!2d-0.28047892301655883!3d51.555772871813456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876100e6c7c8853%3A0x46fdd45b01d6969b!2sWembley%20Stadium!5e0!3m2!1sen!2sus!4v1702500000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
          </div>
        )}

        {activeTab === "directions" && (
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-card border border-border">
              <Train className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">By Train</h4>
                <p className="text-sm text-muted-foreground">
                  Wembley Stadium station (Chiltern Railways) is a 5-minute walk. Wembley Park station (Metropolitan &
                  Jubilee lines) is a 10-minute walk.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-card border border-border">
              <Car className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">By Car</h4>
                <p className="text-sm text-muted-foreground">
                  Exit the M1 at Junction 1 or the M40 at Junction 1A and follow signs for Wembley Stadium. Event Day
                  parking must be pre-booked.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parking" && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Limited parking is available at Wembley Stadium. We strongly recommend using public transport or
              pre-booking parking in advance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Yellow Car Park", distance: "2 min walk", price: "£30", available: true },
                { name: "Red Car Park", distance: "5 min walk", price: "£25", available: true },
                { name: "Green Car Park", distance: "8 min walk", price: "£20", available: false },
                { name: "Blue Car Park", distance: "10 min walk", price: "£15", available: true },
              ].map((lot) => (
                <div
                  key={lot.name}
                  className={`p-4 border ${lot.available ? "border-border" : "border-border/50 opacity-50"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{lot.name}</h4>
                    <span className="text-accent">{lot.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lot.distance}</p>
                  {!lot.available && <p className="text-xs text-destructive mt-2">Sold Out</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
