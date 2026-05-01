"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

export function EnquiryForm({ propertyId, address }: { propertyId: string, address: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    await new Promise(r => setTimeout(r, 1500));
    
    setLoading(false);
    setSuccess(true);
    toast.success("Enquiry sent successfully!");
  };

  if (success) {
    return (
      <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-body-lg font-bold text-obsidian mb-2">Enquiry Sent!</h3>
        <p className="text-body-sm text-muted mb-6">
          The agent has received your request and will contact you shortly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>Send another message</Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-border shadow-lg">
      <h3 className="text-body-lg font-display font-bold text-obsidian mb-6">Enquire about this property</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Full Name" required />
        <Input type="email" placeholder="Email Address" required />
        <Input type="tel" placeholder="Phone Number (optional)" />
        <textarea
          placeholder="I'm interested in viewing this property..."
          className="w-full h-32 px-4 py-3 bg-white border border-border rounded-md text-body-md focus:ring-2 focus:ring-forest outline-none resize-none"
          required
        />
        
        <div className="space-y-2">
           <label className="text-label font-bold text-muted uppercase tracking-widest block">Preferred Contact Time</label>
           <div className="flex gap-2">
              {['Morning', 'Afternoon', 'Evening'].map(time => (
                <button
                  key={time}
                  type="button"
                  className="flex-1 py-2 border border-border rounded text-label font-bold uppercase tracking-wider hover:border-forest transition-colors"
                >
                  {time}
                </button>
              ))}
           </div>
        </div>

        <Button variant="primary" fullWidth size="lg" loading={loading}>
          <Send className="w-4 h-4 mr-2" />
          Send Enquiry
        </Button>
        
        <p className="text-[10px] text-muted text-center uppercase tracking-widest font-bold">
          By clicking send, you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  );
}
