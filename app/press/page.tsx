import { Button } from "@/components/ui/Button";
import { Mail, Clock, MapPin } from "lucide-react";

export default function PressPage() {
  return (
    <div className="flex flex-col min-h-screen bg-pearl">
      <div className="max-w-[1400px] mx-auto px-6 py-32 md:py-48 w-full">
        <div className="max-w-3xl mb-24">
          <h1 className="text-display-md md:text-display-lg text-obsidian mb-8">Press & Media</h1>
          <p className="text-body-lg text-muted leading-relaxed">
            For press enquiries, interview requests, and media assets, please contact our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 border border-border/40 shadow-sm space-y-8">
            <h3 className="text-display-sm font-display text-obsidian">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-forest/5 flex items-center justify-center text-forest">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Email</p>
                  <p className="text-body-md font-bold text-obsidian">press@nestiq.co.uk</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-forest/5 flex items-center justify-center text-forest">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Response Time</p>
                  <p className="text-body-md font-bold text-obsidian">We aim to respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-8 border border-border/40 shadow-sm">
              <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-2">Founded</p>
              <p className="text-body-lg font-display text-obsidian">2026</p>
            </div>
            <div className="bg-white p-8 border border-border/40 shadow-sm">
              <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-2">Headquarters</p>
              <p className="text-body-lg font-display text-obsidian">Chesterfield, Derbyshire</p>
            </div>
            <div className="bg-white p-8 border border-border/40 shadow-sm">
              <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-2">Focus</p>
              <p className="text-body-lg font-display text-obsidian">UK residential and commercial property portal</p>
            </div>
          </div>
        </div>

        <div className="bg-obsidian p-12 md:p-16 text-center text-silk">
          <h2 className="text-display-sm mb-8">Asset Library</h2>
          <p className="text-silk/60 mb-10 max-w-xl mx-auto">
            Download our brand guidelines, high-resolution logos, and executive photography.
          </p>
          <Button variant="secondary" className="border-silk/20 text-silk hover:bg-silk hover:text-obsidian">
            Press kit available on request
          </Button>
        </div>
      </div>
    </div>
  );
}
