'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useNotesStore } from '@/store/notes-store';
import Editor from '@/components/Editor';
import Toolbar from '@/components/Toolbar';

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { notes, updateNote } = useNotesStore();
    const [note, setNote] = useState(notes.find((n) => n.id === params.id));
    const [status, setStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

    useEffect(() => {
        const foundNote = notes.find((n) => n.id === params.id);

        if (!note || note.deleted) {
            return null;
        }

        return (
            <div className="h-full flex flex-col">
                <div className="p-8 border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-4xl mx-auto">
                        <Toolbar
                            isFavorite={note.favorite}
                            tag={note.tag}
                            onToggleFavorite={() => setNote({ ...note, favorite: !note.favorite })}
                            onTagChange={(tag) => setNote({ ...note, tag })}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <Editor
                            title={note.title}
                            content={note.content}
                            onTitleChange={(title) => setNote({ ...note, title })}
                            onContentChange={(content) => setNote({ ...note, content })}
                        />

                        {status !== 'idle' && (
                            <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                                {status === 'saving' ? 'saving...' : 'saved'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
