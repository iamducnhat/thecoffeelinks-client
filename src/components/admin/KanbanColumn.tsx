import { ReactNode } from 'react'

interface KanbanColumnProps {
    title: string
    count: number
    children: ReactNode
    color?: string
}

export function KanbanColumn({ title, count, children, color = "bg-gray-100" }: KanbanColumnProps) {
    return (
        <div className={`flex flex-col h-full flex-1 min-w-[280px] ${color} border-r-2 border-black last:border-r-0`}>
            <div className="p-4 border-b-2 border-black bg-white sticky top-0 z-10 flex justify-between items-center shadow-sm">
                <h2 className="font-bold text-xl uppercase tracking-tighter">{title}</h2>
                <span className="bg-black text-white px-2 py-0.5 text-sm font-mono font-bold">{count}</span>
            </div>
            <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full pb-20">
                {children}
            </div>
        </div>
    )
}
