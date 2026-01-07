"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    size: string;
    sugar: string;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Load mock cart (local storage handling would be here)
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const res = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart, total }),
            });

            if (res.ok) {
                setOrderComplete(true);
                localStorage.removeItem('cart');
                setCart([]);
            } else {
                alert("Checkout failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error processing order");
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-moss text-cream flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                </div>
                <h1 className="text-2xl font-black uppercase text-moss mb-2">Order Confirmed</h1>
                <p className="text-moss/70 mb-8 max-w-xs">Your order has been sent to the kitchen. Please wait for your number.</p>
                <Link href="/" className="px-8 py-3 bg-bronze text-cream uppercase font-bold tracking-widest text-sm hover:bg-bronze/90">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <header className="p-4 border-b border-moss/10 flex items-center">
                <Link href="/menu" className="text-moss p-2 -ml-2 hover:bg-moss/5 rounded-none">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="ml-2 font-black uppercase tracking-widest text-lg text-moss">Your Bill</h1>
            </header>

            <div className="flex-1 p-6 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-moss/40">
                        <p className="uppercase tracking-widest font-bold">Cart is empty</p>
                        <Link href="/menu" className="mt-4 text-bronze underline uppercase text-sm font-bold">Start Ordering</Link>
                    </div>
                ) : (
                    <div className="bg-white border text-sm font-mono p-6 shadow-sm relative">
                        {/* Receipt styling */}
                        <div className="text-center mb-6 border-b-2 border-dashed border-moss/20 pb-4">
                            <h2 className="font-bold uppercase tracking-widest text-lg">The Coffee Links</h2>
                            <p className="text-xs uppercase mt-1">Table Order</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start group">
                                    <div>
                                        <div className="font-bold uppercase text-moss">{item.name}</div>
                                        <div className="text-xs text-moss/60 uppercase">Size: {item.size} | Sugar: {item.sugar}</div>
                                    </div>
                                    <div className="text-right font-bold text-moss">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-dashed border-moss/20 pt-4 mt-auto">
                            <div className="flex justify-between items-center text-lg font-bold text-moss">
                                <span className="uppercase">Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Jagged edge visual at bottom using CSS mask would be cool, but simplistic for now */}
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-4 bg-white border-t border-moss/10">
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-moss text-cream py-4 uppercase font-bold tracking-[0.2em] hover:bg-moss/90 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isCheckingOut ? <Loader2 className="animate-spin" /> : "Confirm & Pay"}
                    </button>
                </div>
            )}
        </div>
    );
}
