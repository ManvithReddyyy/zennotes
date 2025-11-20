'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/notes');
            router.refresh();
        } catch (error: any) {
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-charcoal">
            <div className="w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                        sign in
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        zennotes
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="px-3 py-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-xs text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="email"
                        />
                    </div>

                    <div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="password"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <Link
                            href="/auth/forgot-password"
                            className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                            forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'signing in...' : 'sign in'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
                    don't have an account?{' '}
                    <Link
                        href="/auth/register"
                        className="text-gray-900 dark:text-gray-100 hover:underline"
                    >
                        sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
