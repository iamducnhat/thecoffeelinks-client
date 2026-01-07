'use client'

import { MenuTable } from '@/components/admin/MenuTable'
import { SalesReport } from '@/components/admin/SalesReport'
import { StaffForm } from '@/components/admin/StaffForm'

export default function ManagerPage() {
    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-100">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight uppercase">Manager Dashboard</h1>
                    <p className="text-gray-600">Manage menu, view sales, and control staff access.</p>
                </header>

                {/* Grid layout for Manager components */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Menu Editor - Full width on mobile, half on desktop */}
                    <div className="lg:col-span-1">
                        <MenuTable />
                    </div>

                    {/* Sales Report */}
                    <div className="lg:col-span-1">
                        <SalesReport />
                    </div>
                </div>

                {/* Staff Form - Full width */}
                <StaffForm />
            </div>
        </div>
    )
}
