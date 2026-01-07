'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Eye, MessageSquare, User } from 'lucide-react'

interface ReportedUser {
    id: string
    name: string
    email: string
    reportCount: number
    reportedFor: string
    lastReportDate: Date
    status: 'pending' | 'reviewed' | 'banned'
}

const mockReportedUsers: ReportedUser[] = [
    {
        id: '1',
        name: 'SpammerUser123',
        email: 'spam@fake.com',
        reportCount: 15,
        reportedFor: 'Spam / Promotional Content',
        lastReportDate: new Date('2026-01-07'),
        status: 'pending'
    },
    {
        id: '2',
        name: 'RudeCommenter',
        email: 'rude@example.com',
        reportCount: 8,
        reportedFor: 'Harassment / Inappropriate Language',
        lastReportDate: new Date('2026-01-06'),
        status: 'pending'
    },
    {
        id: '3',
        name: 'FakeProfileUser',
        email: 'fake@scam.com',
        reportCount: 3,
        reportedFor: 'Impersonation / Fake Profile',
        lastReportDate: new Date('2026-01-05'),
        status: 'reviewed'
    },
    {
        id: '4',
        name: 'BannedUser001',
        email: 'banned@gone.com',
        reportCount: 25,
        reportedFor: 'Multiple Violations',
        lastReportDate: new Date('2026-01-01'),
        status: 'banned'
    },
]

export function ModerationTable() {
    const [users, setUsers] = useState<ReportedUser[]>(mockReportedUsers)
    const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'banned'>('all')

    const handleStatusChange = (id: string, newStatus: 'reviewed' | 'banned') => {
        setUsers(prev => prev.map(u =>
            u.id === id ? { ...u, status: newStatus } : u
        ))
    }

    const filteredUsers = filter === 'all' ? users : users.filter(u => u.status === filter)

    const getStatusBadge = (status: ReportedUser['status']) => {
        switch (status) {
            case 'pending':
                return <span className="px-2 py-1 text-xs font-bold uppercase bg-yellow-100 border-2 border-yellow-600 text-yellow-800">Pending</span>
            case 'reviewed':
                return <span className="px-2 py-1 text-xs font-bold uppercase bg-blue-100 border-2 border-blue-600 text-blue-800">Reviewed</span>
            case 'banned':
                return <span className="px-2 py-1 text-xs font-bold uppercase bg-red-100 border-2 border-red-600 text-red-800">Banned</span>
        }
    }

    return (
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Content Moderation
                </h2>
                <span className="text-xs text-gray-400">{filteredUsers.length} reports</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b-2 border-black">
                {(['all', 'pending', 'reviewed', 'banned'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`flex-1 p-3 font-bold uppercase text-sm transition-colors ${filter === tab
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Reported Users List */}
            <div className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
                        <p className="font-bold">No reports in this category</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div key={user.id} className={`p-4 hover:bg-gray-50 ${user.status === 'banned' ? 'bg-red-50 opacity-60' : ''}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 flex items-center justify-center border-2 border-black ${user.status === 'banned' ? 'bg-red-200' : 'bg-gray-100'
                                        }`}>
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold">{user.name}</p>
                                            {getStatusBadge(user.status)}
                                        </div>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        <div className="mt-2 flex items-center gap-4 text-xs">
                                            <span className="flex items-center gap-1 text-red-600 font-bold">
                                                <AlertTriangle size={12} />
                                                {user.reportCount} reports
                                            </span>
                                            <span className="text-gray-500">
                                                Last: {user.lastReportDate.toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm bg-yellow-50 border border-yellow-300 px-2 py-1 inline-block">
                                            <strong>Reason:</strong> {user.reportedFor}
                                        </p>
                                    </div>
                                </div>

                                {user.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusChange(user.id, 'reviewed')}
                                            className="px-3 py-2 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 flex items-center gap-1"
                                            title="Mark as Reviewed"
                                        >
                                            <Eye size={16} /> Review
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(user.id, 'banned')}
                                            className="px-3 py-2 bg-red-600 text-white font-bold text-sm hover:bg-red-700 flex items-center gap-1"
                                            title="Ban User"
                                        >
                                            <XCircle size={16} /> Ban
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
