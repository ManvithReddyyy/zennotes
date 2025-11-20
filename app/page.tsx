'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-charcoal dark:to-gray-900 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        ZenNotes
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        A beautiful, minimalist note-taking app with offline support.
                        Capture your thoughts, stay organized, and sync across devices.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-soft-lg"
                            >
                                Get started
                            </motion.button>
                        </Link>

                        <Link href="/auth/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-soft border border-gray-200 dark:border-gray-700"
                            >
                                Sign in
                            </motion.button>
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg
                                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Lightning fast
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Blazing fast performance with instant search and auto-save
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg
                                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Works offline
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Full offline support with automatic sync when online
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg
                                    className="w-6 h-6 text-green-600 dark:text-green-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Stay organized
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Tag, favorite, and search to keep your notes organized
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
