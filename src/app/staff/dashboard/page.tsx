'use client'

import { useState, useEffect } from 'react'
import { KanbanColumn } from '@/components/admin/KanbanColumn'
import { OrderTicket, type Order, type OrderStatus } from '@/components/admin/OrderTicket'

// Mock data generator
const generateMockOrders = (): Order[] => [
    {
        id: 'ORD-1001-mock',
        tableNo: '05',
        status: 'new',
        createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
        items: [
            { id: '1', name: 'Latte', quantity: 2, customizations: ['Oat Milk', 'Extra Hot'] },
            { id: '2', name: 'Croissant', quantity: 1 }
        ]
    },
    {
        id: 'ORD-1002-mock',
        tableNo: '12',
        status: 'new',
        createdAt: new Date(Date.now() - 1000 * 60 * 12), // 12 mins ago (Late!)
        items: [
            { id: '3', name: 'Cappuccino', quantity: 1 },
            { id: '4', name: 'Avocado Toast', quantity: 1, customizations: ['No Chili Flakes'] }
        ],
        note: 'Allergy: Peanuts'
    },
    {
        id: 'ORD-1003-mock',
        tableNo: '08',
        status: 'making',
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        items: [
            { id: '5', name: 'Iced Americano', quantity: 3 }
        ]
    },
    {
        id: 'ORD-1004-mock',
        tableNo: '02',
        status: 'ready',
        createdAt: new Date(Date.now() - 1000 * 60 * 25),
        items: [
            { id: '6', name: 'Matcha Latte', quantity: 1 }
        ]
    }
]

export default function StaffDashboard() {
    const [orders, setOrders] = useState<Order[]>([])

    // Load mock data on mount
    // Load mock data on mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrders(generateMockOrders())
    }, [])

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ))
    }

    const newOrders = orders.filter(o => o.status === 'new')
    const makingOrders = orders.filter(o => o.status === 'making')
    const readyOrders = orders.filter(o => o.status === 'ready')
    const historyOrders = orders.filter(o => o.status === 'history')

    return (
        <div className="h-[calc(100vh-64px)] w-full overflow-x-auto bg-gray-50 flex">
            <KanbanColumn title="New Orders" count={newOrders.length} color="bg-white">
                {newOrders.map(order => (
                    <OrderTicket key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
            </KanbanColumn>

            <KanbanColumn title="In Progress" count={makingOrders.length} color="bg-orange-50">
                {makingOrders.map(order => (
                    <OrderTicket key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
            </KanbanColumn>

            <KanbanColumn title="Ready" count={readyOrders.length} color="bg-green-50">
                {readyOrders.map(order => (
                    <OrderTicket key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
            </KanbanColumn>

            <KanbanColumn title="History (Last 10)" count={historyOrders.length} color="bg-gray-200">
                {historyOrders.map(order => (
                    <OrderTicket key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
            </KanbanColumn>
        </div>
    )
}
