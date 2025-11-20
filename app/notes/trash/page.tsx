'use client';

import { useNotesStore } from '@/store/notes-store';
import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';

export default function TrashPage() {
    const { notes, updateNote, deleteNoteById } = useNotesStore();
    const router = useRouter();
    const deletedNotes = notes.filter((n) => n.deleted);

    const handleRestore = async (id: string) => {
        await updateNote(id, { deleted: false });
    };

    const handlePermanentDelete = async (id: string) => {
        if (!confirm('permanently delete this note? this cannot be undone.')) return;
        await deleteNoteById(id);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        trash
                    </h2>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto">
                    {deletedNotes.length === 0 ? (
                        <EmptyState
                            title="trash is empty"
                            description="deleted notes will appear here"
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            {deletedNotes.map((note) => (
                                <div
                                    key={note.id}
                                    className="p-4 bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-800"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                                {note.title || 'untitled'}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {note.content.substring(0, 100)}
                                                {note.content.length > 100 ? '...' : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleRestore(note.id)}
                                                className="px-3 py-1.5 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                            >
                                                restore
                                            </button>
                                            <button
                                                onClick={() => handlePermanentDelete(note.id)}
                                                className="px-3 py-1.5 text-sm border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
