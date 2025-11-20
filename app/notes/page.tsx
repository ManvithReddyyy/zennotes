'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNotesStore } from '@/store/notes-store';
import NoteItem from '@/components/NoteItem';
import EmptyState from '@/components/EmptyState';

export default function NotesPage() {
    const router = useRouter();
    const { searchQuery, setSearchQuery, getFilteredNotes } = useNotesStore();
    const notes = getFilteredNotes();

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            All Notes
                        </h2>
                        <Link href="/notes/new">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                New note
                            </motion.button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search notes..."
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto">
                    {notes.length === 0 ? (
                        <EmptyState
                            title={searchQuery ? 'No notes found' : 'No notes yet'}
                            description={
                                searchQuery
                                    ? 'Try a different search term'
                                    : 'Create your first note to get started'
                            }
                            icon={
                                <svg
                                    className="w-16 h-16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            }
                            action={
                                !searchQuery && (
                                    <Link href="/notes/new">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                        >
                                            Create your first note
                                        </motion.button>
                                    </Link>
                                )
                            }
                        />
                    ) : (
                        <div className="grid gap-4">
                            {notes.map((note) => (
                                <NoteItem key={note.id} note={note} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
