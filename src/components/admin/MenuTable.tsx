'use client'

import { useState } from 'react'
import { Save, XCircle, Check, AlertTriangle } from 'lucide-react'

// Mock product data
interface Product {
    id: string
    name: string
    category: string
    price: number
    inStock: boolean
}

const mockProducts: Product[] = [
    { id: '1', name: 'Latte', category: 'Coffee', price: 45000, inStock: true },
    { id: '2', name: 'Cappuccino', category: 'Coffee', price: 42000, inStock: true },
    { id: '3', name: 'Americano', category: 'Coffee', price: 35000, inStock: true },
    { id: '4', name: 'Matcha Latte', category: 'Specialty', price: 55000, inStock: false },
    { id: '5', name: 'Iced Mocha', category: 'Coffee', price: 52000, inStock: true },
    { id: '6', name: 'Croissant', category: 'Food', price: 35000, inStock: true },
    { id: '7', name: 'Avocado Toast', category: 'Food', price: 65000, inStock: true },
    { id: '8', name: 'Cheesecake', category: 'Food', price: 48000, inStock: false },
]

export function MenuTable() {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState<number>(0)

    const handlePriceEdit = (id: string, currentPrice: number) => {
        setEditingId(id)
        setEditValue(currentPrice)
    }

    const handlePriceSave = (id: string) => {
        setProducts(prev => prev.map(p =>
            p.id === id ? { ...p, price: editValue } : p
        ))
        setEditingId(null)
    }

    const handleStockToggle = (id: string) => {
        setProducts(prev => prev.map(p =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
        ))
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }

    return (
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg uppercase tracking-tight">Menu Editor</h2>
                <span className="text-xs text-gray-400">{products.length} items</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b-2 border-black">
                        <tr>
                            <th className="p-3 text-left font-bold uppercase tracking-widest text-xs">Product</th>
                            <th className="p-3 text-left font-bold uppercase tracking-widest text-xs">Category</th>
                            <th className="p-3 text-right font-bold uppercase tracking-widest text-xs">Price</th>
                            <th className="p-3 text-center font-bold uppercase tracking-widest text-xs">Stock</th>
                            <th className="p-3 text-center font-bold uppercase tracking-widest text-xs">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, idx) => (
                            <tr
                                key={product.id}
                                className={`border-b border-gray-200 hover:bg-gray-50 ${!product.inStock ? 'bg-red-50' : ''}`}
                            >
                                <td className="p-3 font-medium">{product.name}</td>
                                <td className="p-3 text-gray-600">{product.category}</td>
                                <td className="p-3 text-right font-mono">
                                    {editingId === product.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <input
                                                type="number"
                                                value={editValue}
                                                onChange={(e) => setEditValue(Number(e.target.value))}
                                                className="w-24 p-1 border-2 border-black text-right font-mono"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handlePriceSave(product.id)}
                                                className="p-1 bg-green-500 text-white hover:bg-green-600"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="p-1 bg-gray-300 text-black hover:bg-gray-400"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handlePriceEdit(product.id, product.price)}
                                            className="hover:underline hover:text-blue-600"
                                        >
                                            {formatPrice(product.price)}
                                        </button>
                                    )}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleStockToggle(product.id)}
                                        className={`px-3 py-1 font-bold text-xs uppercase border-2 transition-all ${product.inStock
                                                ? 'bg-green-100 border-green-600 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 border-red-600 text-red-800 hover:bg-red-200'
                                            }`}
                                    >
                                        {product.inStock ? 'In Stock' : 'Out'}
                                    </button>
                                </td>
                                <td className="p-3 text-center">
                                    <button className="p-1 hover:bg-gray-100 text-gray-500 hover:text-black transition-colors">
                                        <Save size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
