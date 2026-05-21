// app/admin/page.tsx

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center">NestIQ Admin</h1>
      <p className="mb-4 text-center max-w-2xl">
        Use the tools below to manage data, run scrapers, and perform administrative tasks.
      </p>
      <a
        href="/admin/scrape"
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded transition"
      >
        Rightmove Demo Scraper
      </a>
    </div>
  );
}
