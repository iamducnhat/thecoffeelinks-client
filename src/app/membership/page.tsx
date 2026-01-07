"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

export default function MembershipPage() {
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            alert("Table #12 Scanned! Added to your order.");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <header className="p-4 flex items-center mb-6">
                <Link href="/" className="text-moss p-2 -ml-2 hover:bg-moss/5">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="ml-2 font-black uppercase tracking-widest text-lg text-moss">Membership</h1>
            </header>

            <div className="px-6 flex-1">
                {/* Digital Member Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-moss text-gold aspect-[1.6/1] relative p-6 flex flex-col justify-between shadow-xl mb-8 border-2 border-bronze"
                    style={{ background: 'linear-gradient(135deg, #2E4A33 0%, #1a2f20 100%)' }}
                >
                    <div className="flex justify-between items-start">
                        <h2 className="text-cream/80 text-xs uppercase tracking-[0.3em]">Forest Member</h2>
                        <div className="text-bronze font-black text-2xl tracking-tighter">GOLD</div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-cream/50 text-[10px] uppercase tracking-wider mb-1">Total Points</div>
                            <div className="text-cream font-mono text-4xl font-bold">2,450</div>
                        </div>

                        {/* Mock QR Code */}
                        <div className="w-16 h-16 bg-cream p-1">
                            <div className="w-full h-full bg-black flex items-center justify-center text-[5px] text-white text-center leading-none overflow-hidden">
                                [QR CODE]
                            </div>
                        </div>
                    </div>

                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/10 rounded-full blur-3xl -mr-10 -mt-10" />
                </motion.div>

                {/* Table Scan Action */}
                <div className="text-center">
                    <button
                        onClick={handleScan}
                        className="w-full aspect-square max-w-[200px] mx-auto bg-transparent border-4 border-bronze text-bronze hover:bg-bronze hover:text-cream transition-all flex flex-col items-center justify-center gap-4 group"
                    >
                        <div className={`transition-transform duration-700 ${isScanning ? 'scale-110' : 'group-hover:scale-110'}`}>
                            <ScanLine size={48} className={isScanning ? "animate-pulse" : ""} />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-sm">
                            {isScanning ? "Scanning..." : "Scan Table QR"}
                        </span>
                    </button>
                    <p className="mt-4 text-xs text-moss/50 uppercase tracking-wider">
                        Scan the code on your table to auto-fill your location.
                    </p>
                </div>
            </div>
        </div>
    );
}
