import RadarGrid from "@/components/radar-grid";
import { Coffee, QrCode } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header / Slogan */}
      <header className="pt-12 pb-6 px-6 bg-moss text-cream">
        <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
          Connect<br />for<br />Success
        </h1>
        <p className="text-bronze text-sm uppercase tracking-[0.2em] font-medium">The Forest Workspace</p>
      </header>

      {/* Radar Section */}
      <section className="mt-6">
        <div className="px-6 mb-4 flex justify-between items-end">
          <h2 className="text-moss text-lg font-bold uppercase tracking-wider border-b-2 border-bronze inline-block pb-1">
            Radar
          </h2>
          <span className="text-xs text-moss/60 uppercase tracking-widest">Live Now</span>
        </div>
        <RadarGrid />
      </section>

      {/* Quick Actions (Mock for Navigation) */}
      <section className="mt-8 px-6 grid grid-cols-2 gap-4">
        <Link href="/menu" className="bg-bronze text-cream p-4 flex flex-col justify-between h-32 hover:bg-bronze/90 transition-colors">
          <Coffee size={24} />
          <span className="font-bold uppercase tracking-wider mt-2">Order<br />Coffee</span>
        </Link>
        <Link href="/membership" className="bg-moss/10 text-moss border-2 border-moss p-4 flex flex-col justify-between h-32 hover:bg-moss/20 transition-colors">
          <QrCode size={24} />
          <span className="font-bold uppercase tracking-wider mt-2">Member<br />Card</span>
        </Link>
      </section>
    </div>
  );
}
