'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { createClient } from '@/lib/supabase';
import { DEFAULT_TAGS, TAG_COLORS } from '@/lib/types';
import { useNotesStore } from '@/store/notes-store';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const { notes, selectedTag, setSelectedTag } = useNotesStore();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    const navItems = [
        {
            label: 'All Notes',
            href: '/notes',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'Favorites',
            href: '/notes/favorites',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ),
            count: notes.filter(n => n.favorite && !n.deleted).length,
        },
        {
            label: 'Trash',
            href: '/notes/trash',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            count: notes.filter(n => n.deleted).length,
        },
    ];

    return (
        <div className="w-64 h-screen bg-white dark:bg-charcoal border-r border-gray-200 dark:border-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ZenNotes
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: 2 }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
                                        {item.count}
                                    </span>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}

                {/* Tags section */}
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                        Tags
                    </h3>
                    <div className="space-y-1">
                        {DEFAULT_TAGS.map((tag) => {
                            const count = notes.filter(n => n.tag === tag && !n.deleted).length;
                            const isActive = selectedTag === tag;

                            return (
                                <motion.button
                                    key={tag}
                                    onClick={() => {
                                        setSelectedTag(isActive ? null : tag);
                                        if (pathname !== '/notes') {
                                            router.push('/notes');
                                        }
                                    }}
                                    whileHover={{ x: 2 }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${isActive
                                            ? 'bg-gray-100 dark:bg-gray-800'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                                        }`}
                                >
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: TAG_COLORS[tag] }}
                                    />
                                    <span className={`font-medium capitalize ${isActive
                                            ? 'text-gray-900 dark:text-gray-100'
                                            : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {tag}
                                    </span>
                                    {count > 0 && (
                                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
                                            {count}
                                        </span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                    <ThemeToggle />
                </div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                    Sign out
                </motion.button>
            </div>
        </div>
    );
}
