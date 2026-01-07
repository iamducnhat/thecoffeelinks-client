"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mock Data
const PRODUCTS = [
    { id: 1, name: "Espresso", price: 3.50, category: "Coffee", image: "https://placehold.co/400x400/2E4A33/F5F5F0?text=Espresso" },
    { id: 2, name: "Latte", price: 4.50, category: "Coffee", image: "https://placehold.co/400x400/A67B5B/F5F5F0?text=Latte" },
    { id: 3, name: "Cappuccino", price: 4.50, category: "Coffee", image: "https://placehold.co/400x400/2E4A33/F5F5F0?text=Cappuccino" },
    { id: 4, name: "Matcha", price: 5.00, category: "Tea", image: "https://placehold.co/400x400/2E4A33/F5F5F0?text=Matcha" },
    { id: 5, name: "Croissant", price: 3.00, category: "Pastry", image: "https://placehold.co/400x400/A67B5B/F5F5F0?text=Croissant" },
    { id: 6, name: "Bagel", price: 2.50, category: "Pastry", image: "https://placehold.co/400x400/2E4A33/F5F5F0?text=Bagel" },
];

export default function MenuPage() {
    const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
    const [size, setSize] = useState("M");
    const [sugar, setSugar] = useState("50%");

    // Simple cart state (in a real app, use Context/Zustand)
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        setSelectedProduct(null);
        // Logic to actually add to cart storage...
        const cartItem = { ...selectedProduct, size, sugar, quantity: 1 };
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...currentCart, cartItem]));
    };

    return (
        <div className="min-h-screen bg-cream pb-24">
            <header className="fixed top-0 left-0 right-0 z-10 bg-cream/90 backdrop-blur-md p-4 flex justify-between items-center border-b-2 border-moss/10 max-w-md mx-auto">
                <Link href="/" className="text-moss font-bold uppercase tracking-widest text-sm">Esc</Link>
                <span className="text-moss font-black uppercase tracking-widest text-lg">Menu</span>
                <Link href="/cart" className="relative text-moss">
                    <ShoppingBag size={24} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-bronze text-cream text-[10px] w-5 h-5 flex items-center justify-center font-bold rounded-none">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </header>

            <div className="pt-20 px-4 grid grid-cols-2 gap-4">
                {PRODUCTS.map((product) => (
                    <motion.div
                        key={product.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white aspect-square relative group cursor-pointer border-2 border-transparent hover:border-bronze transition-colors"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-moss/90 text-cream p-2">
                            <h3 className="text-sm font-bold uppercase truncate">{product.name}</h3>
                            <span className="text-xs text-bronze font-mono">${product.price.toFixed(2)}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Product Drawer */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end justify-center bg-moss/60 backdrop-blur-sm"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-cream w-full max-w-md border-t-4 border-bronze p-6 relative max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 text-moss p-2 hover:bg-moss/10"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex gap-4 mb-6">
                                <div className="w-24 h-24 bg-moss flex-shrink-0 relative">
                                    <Image
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase text-moss tracking-tighter">{selectedProduct.name}</h2>
                                    <p className="text-bronze font-mono text-xl mt-1">${selectedProduct.price.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs uppercase font-bold text-moss/50 tracking-widest mb-3 block">Size</label>
                                    <div className="flex gap-2">
                                        {["S", "M", "L"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSize(s)}
                                                className={cn(
                                                    "flex-1 py-3 text-sm font-bold border-2 transition-colors uppercase",
                                                    size === s
                                                        ? "bg-moss text-cream border-moss"
                                                        : "bg-transparent text-moss border-moss/20 hover:border-moss"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs uppercase font-bold text-moss/50 tracking-widest mb-3 block">Sugar Level</label>
                                    <div className="flex gap-2">
                                        {["0%", "50%", "100%"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSugar(s)}
                                                className={cn(
                                                    "flex-1 py-3 text-sm font-bold border-2 transition-colors uppercase",
                                                    sugar === s
                                                        ? "bg-bronze text-cream border-bronze"
                                                        : "bg-transparent text-moss border-bronze/20 hover:border-bronze"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-moss/10">
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-moss text-cream py-4 font-bold uppercase tracking-widest hover:bg-moss/90 flex justify-between px-6"
                                >
                                    <span>Add to Order</span>
                                    <span>${selectedProduct.price.toFixed(2)}</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
