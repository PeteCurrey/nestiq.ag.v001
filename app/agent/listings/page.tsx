"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ExternalLink, 
  Edit3, 
  Copy, 
  Trash2,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";

const mockListings = [
  { id: "1", title: "The Ash Manor", price: "£1,450,000", status: "for-sale", views: 1240, leads: 12, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200" },
  { id: "2", title: "Vanguard Penthouse", price: "£3,250 pcm", status: "to-rent", views: 890, leads: 4, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200" },
  { id: "3", title: "The Old Rectory", price: "£875,000", status: "sold", views: 4500, leads: 28, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=200" },
  { id: "4", title: "Riverside Apartment", price: "£450,000", status: "for-sale", views: 1100, leads: 6, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=200" },
];

export default function MyListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-display-sm font-display font-black text-obsidian mb-2">My Listings</h1>
            <p className="text-body-md text-muted">Manage your active, pending, and archived properties.</p>
         </div>
         <Button variant="primary" href="/agent/listings/new">
            <Plus className="w-4 h-4 mr-2" /> Create Listing
         </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" />
              <input 
                type="text" 
                placeholder="Search by title, price, or ID..." 
                className="w-full h-10 pl-10 pr-4 bg-warm border-none rounded-md text-body-sm focus:ring-2 focus:ring-forest"
              />
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-white">
                 <Filter className="w-3 h-3 mr-2" /> Filters
              </Button>
              <select className="h-10 bg-warm border-none rounded-md px-4 text-xs font-bold uppercase tracking-widest text-muted focus:ring-2 focus:ring-forest">
                 <option>All Statuses</option>
                 <option>Active</option>
                 <option>Pending</option>
                 <option>Archived</option>
              </select>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-warm/50 border-b border-border">
                <th className="p-6 text-label font-bold uppercase tracking-widest text-muted">Property</th>
                <th className="p-6 text-label font-bold uppercase tracking-widest text-muted">Status</th>
                <th className="p-6 text-label font-bold uppercase tracking-widest text-muted">Views</th>
                <th className="p-6 text-label font-bold uppercase tracking-widest text-muted">Leads</th>
                <th className="p-6 text-label font-bold uppercase tracking-widest text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-pearl/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                          <Image src={listing.img} fill className="object-cover" alt="" />
                       </div>
                       <div>
                          <p className="text-body-sm font-bold text-obsidian group-hover:text-forest transition-colors">{listing.title}</p>
                          <p className="text-xs font-medium text-muted">{listing.price}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                     <Badge status={listing.status as any}>{listing.status.replace("-", " ")}</Badge>
                  </td>
                  <td className="p-6 text-body-sm font-mono font-bold text-obsidian">{listing.views}</td>
                  <td className="p-6">
                     <div className="flex items-center gap-2">
                        <span className="text-body-sm font-mono font-bold text-obsidian">{listing.leads}</span>
                        <span className="text-[10px] font-bold text-emerald uppercase tracking-widest bg-emerald/10 px-1.5 py-0.5 rounded">New</span>
                     </div>
                  </td>
                  <td className="p-6">
                     <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="p-2"><Edit3 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="p-2"><Copy className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                        <div className="h-8 w-px bg-border mx-1" />
                        <Button variant="ghost" size="sm" className="p-2"><ExternalLink className="w-4 h-4" /></Button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-border flex justify-between items-center bg-warm/20">
           <p className="text-xs font-medium text-muted">Showing 4 of 24 listings</p>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
