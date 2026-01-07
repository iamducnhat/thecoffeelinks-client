import { formatDistanceToNow } from 'date-fns'
import { Clock, CheckCircle, XCircle, ChevronRight, AlertCircle } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type OrderStatus = 'new' | 'making' | 'ready' | 'history'

export interface OrderItem {
    id: string
    name: string
    quantity: number
    customizations?: string[]
}

export interface Order {
    id: string
    tableNo: string
    items: OrderItem[]
    status: OrderStatus
    createdAt: Date
    note?: string
}

interface OrderTicketProps {
    order: Order
    onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

export function OrderTicket({ order, onStatusChange }: OrderTicketProps) {
    const elapsedMinutes = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 60000)
    const isLate = elapsedMinutes > 10

    return (
        <div className="bg-white border-2 border-black p-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col w-full max-w-[300px]">
            {/* Header */}
            <div className="bg-black text-white p-3 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg leading-none">#{order.id.slice(0, 4)}</h3>
                    <span className="text-sm font-mono">TABLE {order.tableNo}</span>
                </div>
                {order.status === 'new' && <span className="animate-pulse bg-red-500 text-white text-[10px] px-2 py-0.5 border border-white font-bold tracking-wider">NEW</span>}
            </div>

            {/* Body */}
            <div className="p-4 flex-grow font-mono text-sm space-y-3">
                {order.items.map((item) => (
                    <div key={item.id} className="border-b border-dashed border-gray-300 pb-2 last:border-0">
                        <div className="flex justify-between font-bold">
                            <span>{item.quantity}x {item.name}</span>
                        </div>
                        {item.customizations && item.customizations.length > 0 && (
                            <ul className="text-gray-600 ml-4 mt-1 list-disc text-xs">
                                {item.customizations.map((cust, idx) => (
                                    <li key={idx}>{cust}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
                {order.note && (
                    <div className="mt-4 bg-yellow-100 p-2 border border-black text-xs italic">
                        <span className="font-bold not-italic">NOTE:</span> {order.note}
                    </div>
                )}
            </div>

            {/* Footer info */}
            <div className={cn("px-4 py-2 border-t-2 border-black flex items-center justify-between text-xs font-bold", isLate ? "text-red-600" : "text-gray-600")}>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(order.createdAt, { addSuffix: true })}</span>
                </div>
                {isLate && <AlertCircle className="w-4 h-4 text-red-600" />}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 border-t-2 border-black divide-x-2 divide-black">
                {order.status === 'new' && (
                    <>
                        <button
                            onClick={() => onStatusChange(order.id, 'history')} // Reject behaves like archive for now or we can add a 'rejected' status
                            className="p-3 hover:bg-red-100 flex items-center justify-center gap-2 font-bold transition-colors group"
                        >
                            <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" /> REJECT
                        </button>
                        <button
                            onClick={() => onStatusChange(order.id, 'making')}
                            className="p-3 hover:bg-green-100 flex items-center justify-center gap-2 font-bold transition-colors group"
                        >
                            START <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </>
                )}
                {order.status === 'making' && (
                    <button
                        onClick={() => onStatusChange(order.id, 'ready')}
                        className="col-span-2 p-3 hover:bg-green-100 flex items-center justify-center gap-2 font-bold transition-colors group"
                    >
                        READY TO SERVE <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                )}
                {order.status === 'ready' && (
                    <button
                        onClick={() => onStatusChange(order.id, 'history')}
                        className="col-span-2 p-3 hover:bg-gray-100 flex items-center justify-center gap-2 font-bold text-gray-500 transition-colors"
                    >
                        ARCHIVE
                    </button>
                )}
            </div>
        </div>
    )
}
