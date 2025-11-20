'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNotesStore } from '@/store/notes-store';
import Editor from '@/components/Editor';
import Toolbar from '@/components/Toolbar';

export default function NewNotePage() {
    const router = useRouter();
    const { createNote, updateNote } = useNotesStore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState<string | null>(null);
    const [favorite, setFavorite] = useState(false);
    const [noteId, setNoteId] = useState<string | null>(null);
    const [status, setStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

    // Auto-save effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (title || content) {
                setStatus('saving');

                if (!noteId) {
                    // Create new note
                    const newNote = await createNote({ title, content, tag, favorite });
                    if (newNote) {
                        setNoteId(newNote.id);
                    }
                } else {
                    // Update existing note
                    await updateNote(noteId, { title, content, tag, favorite });
                }

                setStatus('saved');
                setTimeout(() => setStatus('idle'), 1000);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [title, content, tag, favorite, noteId, createNote, updateNote]);

    const handleDelete = async () => {
        if (!noteId || !confirm('Move this note to trash?')) return;

        await updateNote(noteId, { deleted: true });
        router.push('/notes');
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <Toolbar
                        isFavorite={favorite}
                        tag={tag}
                        onToggleFavorite={() => setFavorite(!favorite)}
                        onTagChange={setTag}
                        onDelete={handleDelete}
                        showDelete={!!noteId}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <Editor
                        title={title}
                        content={content}
                        onTitleChange={setTitle}
                        onContentChange={setContent}
                    />

                    {status !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-sm text-gray-500 dark:text-gray-500"
                        >
                            {status === 'saving' ? 'Saving...' : 'Saved'}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
