import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Download, CheckCircle, Clock, Eye, AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminFoundingPage() {
  const supabase = await createClient();
  
  // Note: Add proper admin auth check here later (e.g. email = pete@nestiq.co.uk)
  const { data: user } = await supabase.auth.getUser();
  // if (!user.user) redirect('/login');

  const { data: recipients, error } = await supabase
    .from("founding_recipients")
    .select(`
      *,
      bookings (
        start_time,
        visit_type
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch recipients:", error);
    return <div>Error loading data</div>;
  }

  const getStatusIcon = (state: string) => {
    switch(state) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-emerald" />;
      case 'booked': return <CheckCircle className="w-4 h-4 text-emerald/60" />;
      case 'viewed': return <Eye className="w-4 h-4 text-blue-400" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-silk/30" />;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-silk font-sans p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-silk/50 hover:text-emerald mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to main site
            </Link>
            <h1 className="text-display-sm font-display text-white">Founding Partner Campaign</h1>
            <p className="text-body-sm text-silk/60 mt-2">Internal operations dashboard. {recipients?.length || 0}/100 active tokens.</p>
          </div>
          <button className="flex items-center gap-2 bg-silk/10 hover:bg-silk/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors rounded">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="bg-obsidian border border-silk/20 rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-silk/20 bg-silk/5">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Agency / Principal</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">District</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Token</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Days Left</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Engagement</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-silk/50">Booking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silk/10">
              {recipients?.map((r) => {
                const daysLeft = r.held_until ? Math.ceil((new Date(r.held_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : '-';
                const isExpired = r.state === 'expired' || (typeof daysLeft === 'number' && daysLeft < 0 && !['booked', 'confirmed'].includes(r.state));
                
                const views = Array.isArray(r.view_log) ? r.view_log : [];
                const latestView = views.length > 0 ? views[views.length - 1] : null;

                return (
                  <tr key={r.token} className="hover:bg-silk/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(isExpired ? 'expired' : r.state)}
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${isExpired ? 'text-red-400' : 'text-silk/80'}`}>
                          {isExpired ? 'Expired' : r.state}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-body-sm font-bold text-white">{r.agency_name}</div>
                      <div className="text-[11px] text-silk/50">{r.principal_name} · {r.principal_email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-body-sm text-silk/80">{r.postcode_district}</div>
                      <div className="text-[10px] text-silk/40">{r.region_label}</div>
                    </td>
                    <td className="p-4">
                      <Link href={`/f/${r.token}`} target="_blank" className="text-[11px] font-mono bg-silk/10 px-2 py-1 rounded text-emerald hover:bg-emerald/20 transition-colors">
                        {r.token}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className={`text-body-sm ${typeof daysLeft === 'number' && daysLeft <= 3 ? 'text-red-400 font-bold' : 'text-silk/60'}`}>
                        {daysLeft}
                      </span>
                    </td>
                    <td className="p-4">
                      {views.length > 0 ? (
                        <div>
                          <div className="text-[11px] text-silk/80">{views.length} sessions</div>
                          {latestView && (
                            <div className="text-[10px] text-silk/40">Last depth: {latestView.scroll_depth}%</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-silk/30">No views</span>
                      )}
                    </td>
                    <td className="p-4">
                      {r.bookings?.[0] ? (
                        <div>
                          <div className="text-[11px] font-bold text-emerald">
                            {new Date(r.bookings[0].start_time).toLocaleString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-[10px] text-silk/50 uppercase">{r.bookings[0].visit_type.replace('_', ' ')}</div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-silk/30">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              
              {(!recipients || recipients.length === 0) && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-silk/40 text-[11px] uppercase tracking-widest">
                    No recipients found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
