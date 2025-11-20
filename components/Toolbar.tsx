'use client';

import { motion } from 'framer-motion';
import TagSelector from './TagSelector';

interface ToolbarProps {
    isFavorite: boolean;
    tag: string | null;
    onToggleFavorite: () => void;
    onTagChange: (tag: string | null) => void;
    onDelete: () => void;
    showDelete?: boolean;
}

export default function Toolbar({
    isFavorite,
    tag,
    onToggleFavorite,
    onTagChange,
    onDelete,
    showDelete = true,
}: ToolbarProps) {
    return (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onToggleFavorite}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <svg
                    className={`w-5 h-5 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'
                        }`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={isFavorite ? 0 : 2}
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>
            </motion.button>

            <TagSelector value={tag} onChange={onTagChange} />

            <div className="flex-1" />

            {showDelete && (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onDelete}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Delete note"
                >
                    <svg
                        className="w-5 h-5 text-gray-400 hover:text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </motion.button>
            )}
        </div>
    );
}
