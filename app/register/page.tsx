"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Mail, Lock, User, ArrowRight, Building2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { signUp } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [role, setRole] = useState<"consumer" | "agent">("consumer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    try {
      await signUp(email, password, fullName, role);
      if (role === 'agent') {
        router.push('/agent/onboarding');
      } else {
        setSuccess(true);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      setLoading(false);
    }
  };

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

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setRole("consumer")}
            className={cn(
              "p-6 rounded-2xl border-2 transition-all text-left group",
              role === "consumer" 
                ? "border-emerald bg-emerald/5 shadow-md" 
                : "border-border bg-white hover:border-emerald/30 hover:bg-emerald/5"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
              role === "consumer" ? "bg-emerald text-white" : "bg-warm text-muted group-hover:text-emerald group-hover:bg-emerald/10"
            )}>
              <User className="w-6 h-6" />
            </div>
            <h3 className={cn("text-label font-bold uppercase tracking-widest mb-1", role === "consumer" ? "text-forest" : "text-muted")}>Buyer / Renter</h3>
            <p className="text-[10px] text-muted leading-tight">Find and save your next home</p>
          </button>
          <button
            onClick={() => setRole("agent")}
            className={cn(
              "p-6 rounded-2xl border-2 transition-all text-left group",
              role === "agent" 
                ? "border-forest bg-forest/5 shadow-md" 
                : "border-border bg-white hover:border-forest/30 hover:bg-forest/5"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
              role === "agent" ? "bg-forest text-white" : "bg-warm text-muted group-hover:text-forest group-hover:bg-forest/10"
            )}>
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className={cn("text-label font-bold uppercase tracking-widest mb-1", role === "agent" ? "text-forest" : "text-muted")}>Estate Agent</h3>
            <p className="text-[10px] text-muted leading-tight">List properties and manage leads</p>
          </button>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-border shadow-xl">
           {success ? (
             <div className="text-center py-8">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-8 h-8" />
               </div>
               <h2 className="text-display-xs font-display font-bold text-obsidian mb-4">Check Your Email</h2>
               <p className="text-body-md text-muted mb-8">
                 We've sent a verification link to your email address. Please click it to confirm your account and get started.
               </p>
               <Link href="/login">
                <Button variant="outline" fullWidth>
                  Back to Login
                </Button>
               </Link>
             </div>
           ) : (
             <form onSubmit={handleRegister} className="space-y-6">
               {error && (
                 <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-700 text-body-sm font-medium">
                   <AlertCircle className="w-4 h-4 flex-shrink-0" />
                   {error}
                 </div>
               )}
               <div>
                 <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Full Name</label>
                 <Input name="fullName" placeholder="John Doe" icon={<User className="w-4 h-4" />} required />
               </div>
               <div>
                 <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Email Address</label>
                 <Input name="email" type="email" placeholder="name@example.com" icon={<Mail className="w-4 h-4" />} required />
               </div>
               <div>
                 <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">Password</label>
                 <Input 
                   name="password" 
                   type="password" 
                   placeholder="••••••••" 
                   icon={<Lock className="w-4 h-4" />} 
                   required 
                   minLength={8}
                 />
                 <p className="mt-2 text-[9px] text-muted uppercase tracking-widest font-bold">Minimum 8 characters required</p>
               </div>

            <Button variant={role === 'agent' ? 'secondary' : 'primary'} fullWidth size="lg" loading={loading} className={cn(role === 'agent' ? "bg-forest" : "bg-emerald")}>
              {role === 'agent' ? 'Register as Agent' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
           </form>
           )}
           {role === 'agent' && !success && (
            <p className="mt-6 text-[10px] text-muted text-center uppercase tracking-widest font-bold">
               Nestiq is for verified estate agents only.
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
