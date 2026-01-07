
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";

// Mock Data
const MOCK_USERS = [
    { id: 1, name: "Sarah Chen", role: "UX Designer", status: "open", image: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Mike Ross", role: "Legal Consultant", status: "focus", image: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Jessica L.", role: "Angel Investor", status: "open", image: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "David Kim", role: "Tech Lead", status: "focus", image: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Ana Silva", role: "Copywriter", status: "open", image: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Tom Baker", role: "Founder", status: "open", image: "https://i.pravatar.cc/150?u=6" },
];

export default function RadarGrid() {
    const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {MOCK_USERS.map((user) => (
                    <motion.div
                        key={user.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedUser(user)}
                        className="group relative aspect-[1.6/1] bg-white border-l-4 border-bronze shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden p-3 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="font-bold uppercase text-sm tracking-wider text-moss truncate max-w-[100px]">
                                    {user.name}
                                </span>
                                <span className="text-[10px] text-moss/70 uppercase tracking-widest">{user.role}</span>
                            </div>
                            <div className={`w - 3 h - 3 ${user.status === 'open' ? 'bg-green-600' : 'bg-red-500'} shadow - sm`} />
                        </div>

                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-moss/5 rounded-full blur-xl group-hover:bg-moss/10 transition-colors" />
                    </motion.div>
                ))}
            </div>

            {/* User Profile Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-moss/80 backdrop-blur-sm p-6"
                        onClick={() => setSelectedUser(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-cream w-full max-w-sm border-2 border-bronze p-6 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute top-4 right-4 text-moss hover:bg-moss/10 p-1"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-24 h-24 bg-moss overflow-hidden border-2 border-bronze relative">
                                    {/* Fallback image */}
                                    <Image
                                        src={selectedUser.image}
                                        alt={selectedUser.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-widest text-moss">{selectedUser.name}</h3>
                                    <p className="text-bronze font-medium uppercase text-sm tracking-wider mt-1">{selectedUser.role}</p>
                                </div>

                                <div className="w-full h-px bg-moss/20 my-4" />

                                <div className="flex items-center gap-2 text-sm text-moss/80">
                                    <div className={`w - 3 h - 3 ${selectedUser.status === 'open' ? 'bg-green-600' : 'bg-red-500'} `} />
                                    <span>{selectedUser.status === 'open' ? 'Open to Chat' : 'Deep Focus Mode'}</span>
                                </div>

                                <button
                                    className="w-full mt-6 bg-moss text-cream py-3 px-4 flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors uppercase tracking-widest text-sm font-bold"
                                    onClick={() => alert(`Invite sent to ${selectedUser.name} !`)}
                                >
                                    <MessageCircle size={18} />
                                    Send Coffee Invite
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
