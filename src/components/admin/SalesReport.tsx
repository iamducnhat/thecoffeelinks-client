'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock sales data
const salesData = [
    { name: 'Mon', revenue: 1200000, points: 45000 },
    { name: 'Tue', revenue: 980000, points: 32000 },
    { name: 'Wed', revenue: 1450000, points: 58000 },
    { name: 'Thu', revenue: 1100000, points: 41000 },
    { name: 'Fri', revenue: 1680000, points: 72000 },
    { name: 'Sat', revenue: 2100000, points: 95000 },
    { name: 'Sun', revenue: 1850000, points: 81000 },
]

const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(value)
}

export function SalesReport() {
    const totalRevenue = salesData.reduce((acc, day) => acc + day.revenue, 0)
    const totalPoints = salesData.reduce((acc, day) => acc + day.points, 0)

    return (
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg uppercase tracking-tight">Weekly Sales Report</h2>
                <span className="text-xs text-gray-400">Last 7 Days</span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 border-b-2 border-black">
                <div className="p-4 border-r-2 border-black">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold font-mono text-green-600">{formatVND(totalRevenue)}</p>
                </div>
                <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Points Redeemed</p>
                    <p className="text-2xl font-bold font-mono text-orange-600">{formatVND(totalPoints)}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                        <YAxis tickFormatter={formatVND} tick={{ fontSize: 10 }} />
                        <Tooltip
                            formatter={(value: number) => formatVND(value)}
                            contentStyle={{ border: '2px solid black', borderRadius: 0 }}
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue (VND)" fill="#16a34a" />
                        <Bar dataKey="points" name="Points Redeemed" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
