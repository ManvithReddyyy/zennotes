'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Note, TAG_COLORS } from '@/lib/types';

interface NoteItemProps {
    note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
    const pathname = usePathname();
    const isActive = pathname === `/notes/${note.id}`;

    const previewContent =
        note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

    return (
        <Link href={`/notes/${note.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-xl bg-white dark:bg-charcoal border transition-all cursor-pointer ${isActive
                        ? 'border-gray-300 dark:border-gray-700 shadow-soft-lg'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:shadow-soft'
                    }`}
            >
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                        {note.title || 'Untitled'}
                    </h3>
                    {note.favorite && (
                        <svg
                            className="w-4 h-4 text-yellow-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {previewContent || 'No content'}
                </p>

                <div className="flex items-center justify-between">
                    {note.tag && (
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: TAG_COLORS[note.tag] }}
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                                {note.tag}
                            </span>
                        </div>
                    )}
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                        {new Date(note.updated_at).toLocaleDateString()}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
