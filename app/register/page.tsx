"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Mail, Lock, User, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function RegisterPage() {
  const [role, setRole] = useState<"consumer" | "agent">("consumer");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <Link href="/" className="text-display-sm font-display font-extrabold tracking-tighter text-forest mb-8 inline-block">
            NESTIQ
          </Link>
          <h1 className="text-display-md font-display font-bold text-obsidian mb-4">Create Account</h1>
          <p className="text-body-md text-muted">Join the property challenger. It takes 30 seconds.</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-warm rounded-xl p-1 mb-8 shadow-inner border border-border">
          <button
            onClick={() => setRole("consumer")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-label font-bold uppercase tracking-widest transition-all",
              role === "consumer" ? "bg-white text-forest shadow-md" : "text-muted hover:text-forest"
            )}
          >
            <User className="w-4 h-4" />
            Consumer
          </button>
          <button
            onClick={() => setRole("agent")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-label font-bold uppercase tracking-widest transition-all",
              role === "agent" ? "bg-forest text-white shadow-md" : "text-muted hover:text-forest"
            )}
          >
            <Building2 className="w-4 h-4" />
            Agent
          </button>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-border shadow-xl">
          <form className="space-y-6">
            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Full Name</label>
              <Input placeholder="John Doe" icon={<User className="w-4 h-4" />} required />
            </div>
            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Email Address</label>
              <Input type="email" placeholder="name@example.com" icon={<Mail className="w-4 h-4" />} required />
            </div>
            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Password</label>
              <Input type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} required />
            </div>

            <Button variant={role === 'agent' ? 'secondary' : 'primary'} fullWidth size="lg" loading={loading}>
              {role === 'agent' ? 'Apply as Agent' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {role === 'agent' && (
            <p className="mt-6 text-[10px] text-muted text-center uppercase tracking-widest font-bold">
               Agent applications are manually verified within 24 hours.
            </p>
          )}
        </div>

        <p className="text-center mt-8 text-body-sm text-muted">
          Already have an account? <Link href="/login" className="text-forest font-bold hover:text-emerald">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
