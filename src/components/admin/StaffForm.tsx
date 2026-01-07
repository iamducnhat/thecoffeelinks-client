'use client'

import { useState } from 'react'
import { UserPlus, Trash2, Shield, Coffee } from 'lucide-react'

interface StaffMember {
    id: string
    name: string
    email: string
    role: 'barista' | 'manager'
    createdAt: Date
}

const mockStaff: StaffMember[] = [
    { id: '1', name: 'Nguyen Van A', email: 'a.nguyen@coffeelinks.vn', role: 'manager', createdAt: new Date('2024-01-15') },
    { id: '2', name: 'Tran Thi B', email: 'b.tran@coffeelinks.vn', role: 'barista', createdAt: new Date('2024-03-20') },
    { id: '3', name: 'Le Van C', email: 'c.le@coffeelinks.vn', role: 'barista', createdAt: new Date('2024-05-10') },
]

export function StaffForm() {
    const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
    const [showForm, setShowForm] = useState(false)
    const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'barista' as 'barista' | 'manager' })

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault()
        const newMember: StaffMember = {
            id: Date.now().toString(),
            ...newStaff,
            createdAt: new Date()
        }
        setStaff(prev => [...prev, newMember])
        setNewStaff({ name: '', email: '', role: 'barista' })
        setShowForm(false)
    }

    const handleDelete = (id: string) => {
        setStaff(prev => prev.filter(s => s.id !== id))
    }

    return (
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg uppercase tracking-tight">Staff Access Control</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 font-bold text-sm hover:bg-gray-100 transition-colors"
                >
                    <UserPlus size={16} />
                    {showForm ? 'Cancel' : 'Add Staff'}
                </button>
            </div>

            {/* Add Staff Form */}
            {showForm && (
                <form onSubmit={handleAddStaff} className="p-4 border-b-2 border-black bg-yellow-50">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                            className="p-2 border-2 border-black font-medium"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newStaff.email}
                            onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                            className="p-2 border-2 border-black font-medium"
                            required
                        />
                        <select
                            value={newStaff.role}
                            onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value as 'barista' | 'manager' }))}
                            className="p-2 border-2 border-black font-bold"
                        >
                            <option value="barista">Barista</option>
                            <option value="manager">Manager</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            )}

            {/* Staff List */}
            <div className="divide-y divide-gray-200">
                {staff.map((member) => (
                    <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 flex items-center justify-center border-2 border-black ${member.role === 'manager' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                                {member.role === 'manager' ? <Shield size={20} /> : <Coffee size={20} />}
                            </div>
                            <div>
                                <p className="font-bold">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-2 py-1 text-xs font-bold uppercase border-2 ${member.role === 'manager'
                                    ? 'bg-purple-100 border-purple-600 text-purple-800'
                                    : 'bg-blue-100 border-blue-600 text-blue-800'
                                }`}>
                                {member.role}
                            </span>
                            <button
                                onClick={() => handleDelete(member.id)}
                                className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
