import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        <AccountSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
