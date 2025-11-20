'use client';

import { useState } from 'react';
import { DEFAULT_TAGS, TAG_COLORS } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface TagSelectorProps {
    value: string | null;
    onChange: (tag: string | null) => void;
}

export default function TagSelector({ value, onChange }: TagSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-150 dark:hover:bg-gray-750 transition-colors flex items-center gap-2"
            >
                {value ? (
                    <>
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: TAG_COLORS[value] }}
                        />
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {value}
                        </span>
                    </>
                ) : (
                    <span className="text-gray-500">Add tag</span>
                )}
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute top-full mt-2 left-0 z-20 bg-white dark:bg-charcoal rounded-xl shadow-soft-lg border border-gray-200 dark:border-gray-800 overflow-hidden min-w-[160px]"
                        >
                            <div className="p-2">
                                {value && (
                                    <>
                                        <button
                                            onClick={() => {
                                                onChange(null);
                                                setIsOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        >
                                            Remove tag
                                        </button>
                                        <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                                    </>
                                )}
                                {DEFAULT_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            onChange(tag);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: TAG_COLORS[tag] }}
                                        />
                                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                                            {tag}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
