'use client'

import { LayoutDashboard, ShoppingBag, Users, Menu, LogOut, Coffee } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const navItems = [
        { name: 'KDS Board', href: '/staff/dashboard', icon: LayoutDashboard },
        { name: 'Menu & Stock', href: '/staff/manager', icon: Menu },
        { name: 'Sales Report', href: '/staff/sales', icon: ShoppingBag },
        { name: 'Social Admin', href: '/staff/admin', icon: Users },
    ]

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-black">
            {/* Top Navigation Bar */}
            <header className="h-16 bg-black text-white flex items-center justify-between px-6 border-b-4 border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xl rounded-sm">
                        <Coffee size={20} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">THE CONTROL CENTER</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Logged in as</p>
                        <p className="font-bold">STAFF USER</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm transition-colors" title="Log Out">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar Navigation */}
                <aside className="w-64 bg-white border-r-2 border-black hidden md:flex flex-col">
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 font-bold transition-all border-2 ${isActive
                                            ? 'bg-black text-white border-black translate-x-1 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]'
                                            : 'bg-white text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t-2 border-black">
                        <div className="bg-green-100 border border-green-800 p-3 text-xs text-green-900 font-mono">
                            <span className="font-bold block mb-1">SYSTEM STATUS</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Running Normal
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-hidden relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
