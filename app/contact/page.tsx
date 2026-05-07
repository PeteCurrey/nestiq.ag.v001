"use client";

import { useState } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Thanks, we'll be in touch within 24 hours.");
        setFormData({ name: "", email: "", subject: "General enquiry", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pearl min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          {/* Left Column */}
          <div className="space-y-12">
            <div>
              <h1 className="text-display-md md:text-display-lg text-obsidian mb-8">Get in Touch</h1>
              <p className="text-body-lg text-muted leading-relaxed">
                Whether you're an estate agent exploring a partnership, a buyer with a question, or press looking for a comment — we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                   <div>
                     <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">General</p>
                     <p className="text-body-md font-bold text-obsidian">hello@nestiq.co.uk</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Agents</p>
                     <p className="text-body-md font-bold text-obsidian">agents@nestiq.co.uk</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Press</p>
                     <p className="text-body-md font-bold text-obsidian">press@nestiq.co.uk</p>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Location</p>
                  <p className="text-body-md font-bold text-obsidian">Chesterfield, Derbyshire</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-8 md:p-12 border border-border/40 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-border/60 py-4 focus:border-forest focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-border/60 py-4 focus:border-forest focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border-b border-border/60 py-4 focus:border-forest focus:outline-none bg-transparent appearance-none cursor-pointer"
                >
                  <option>General enquiry</option>
                  <option>I'm an estate agent interested in partnering</option>
                  <option>I have a question about a property</option>
                  <option>Press enquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-border/40 p-4 focus:border-forest focus:outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-emerald text-white hover:bg-forest transition-all font-bold uppercase tracking-widest"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-3" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
