"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Save, Shield } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">
            My Profile
          </h2>
          <p className="text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Status */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
              SD
            </div>
            <h3 className="font-bold text-lg uppercase">Saroj Dangol</h3>
            <p className="text-accent text-sm font-mono mb-4">MEMBER #992-10</p>
            <div className="w-full h-px bg-white/10 my-4" />
            <div className="w-full flex justify-between text-sm">
              <span className="text-muted-foreground">Joined</span>
              <span>Dec 2023</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Saroj"
                  disabled={!isEditing}
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-accent outline-none disabled:opacity-50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Dangol"
                  disabled={!isEditing}
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:border-accent outline-none disabled:opacity-50 transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    defaultValue="saroj@example.com"
                    disabled={!isEditing}
                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-3 text-sm focus:border-accent outline-none disabled:opacity-50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!isEditing}
                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-3 text-sm focus:border-accent outline-none disabled:opacity-50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-end"
              >
                <button className="bg-accent text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent/80 transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Security
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last updated 3 months ago
                </p>
              </div>
              <button className="text-xs font-bold uppercase text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-white transition-colors">
                Change Password
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
