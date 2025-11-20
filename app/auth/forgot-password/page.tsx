'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-charcoal">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Reset password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Enter your email to receive a password reset link
                    </p>

                    {success ? (
                        <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-800 dark:text-green-200 mb-6">
                            Check your email for a password reset link.
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            {error && (
                                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-800 dark:text-red-200">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send reset link'}
                            </motion.button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        <Link
                            href="/auth/login"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                            Back to sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
