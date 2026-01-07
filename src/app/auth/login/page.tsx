'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Coffee, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error } = await signIn(email, password)

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/staff/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E4A33] text-[#F5F5F0] mb-4">
                        <Coffee size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-[#F5F5F0] uppercase tracking-widest">
                        The Coffee Links
                    </h1>
                    <p className="text-[#8B7355] mt-2 uppercase tracking-wider text-sm">
                        Staff Portal
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-[#F5F5F0] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6 text-center border-b-2 border-black pb-4">
                        Sign In
                    </h2>

                    {error && (
                        <div className="bg-red-100 border-2 border-red-800 text-red-800 p-3 mb-4 text-sm font-mono">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-black bg-white font-mono focus:outline-none focus:ring-2 focus:ring-[#2E4A33]"
                                placeholder="staff@coffeelinks.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-black bg-white font-mono focus:outline-none focus:ring-2 focus:ring-[#2E4A33]"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-[#2E4A33] text-[#F5F5F0] py-4 font-bold uppercase tracking-widest hover:bg-[#1E3A23] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center mt-6 text-[#8B7355] text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/signup" className="text-[#F5F5F0] font-bold hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    )
}
