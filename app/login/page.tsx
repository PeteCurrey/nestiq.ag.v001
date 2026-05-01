"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Supabase auth logic here
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <Link href="/" className="text-display-sm font-display font-extrabold tracking-tighter text-forest mb-8 inline-block">
            NESTIQ
          </Link>
          <h1 className="text-display-md font-display font-bold text-obsidian mb-4">Welcome Back</h1>
          <p className="text-body-md text-muted">Sign in to manage your saved properties and searches.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-border shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Email Address</label>
              <Input type="email" placeholder="name@example.com" icon={<Mail className="w-4 h-4" />} required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-label font-bold text-muted uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-forest hover:text-emerald uppercase tracking-widest">Forgot?</Link>
              </div>
              <Input type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} required />
            </div>

            <Button variant="primary" fullWidth size="lg" loading={loading}>
              Sign In
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" size="md" className="border-border text-obsidian hover:bg-warm">Google</Button>
             <Button variant="outline" size="md" className="border-border text-obsidian hover:bg-warm">Apple</Button>
          </div>
        </div>

        <p className="text-center mt-8 text-body-sm text-muted">
          Don't have an account? <Link href="/register" className="text-forest font-bold hover:text-emerald">Join Nestiq</Link>
        </p>
      </div>
    </div>
  );
}
