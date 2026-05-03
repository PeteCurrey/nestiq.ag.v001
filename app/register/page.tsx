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
      setSuccess(true);
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
           {success ? (
             <div className="text-center py-8">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-8 h-8" />
               </div>
               <h2 className="text-display-xs font-display font-bold text-obsidian mb-4">Verify Your Email</h2>
               <p className="text-body-md text-muted mb-8">
                 We've sent a verification link to your email address. Please check your inbox to activate your account.
               </p>
               <Button variant="outline" fullWidth onClick={() => setSuccess(false)}>
                 Back to Sign Up
               </Button>
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
                 <Input name="password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} required />
               </div>

            <Button variant={role === 'agent' ? 'secondary' : 'primary'} fullWidth size="lg" loading={loading}>
              {role === 'agent' ? 'Apply as Agent' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
           </form>
           )}
           {role === 'agent' && !success && (
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
