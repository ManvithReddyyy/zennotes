'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface EditorProps {
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    placeholder?: string;
}

export default function Editor({
    title,
    content,
    onTitleChange,
    onContentChange,
    placeholder = 'Start writing...',
}: EditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [content]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full"
        >
            <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Untitled"
                className="text-3xl font-bold mb-4 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />

            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none resize-none text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 leading-relaxed"
                style={{ minHeight: '200px' }}
            />
        </motion.div>
    );
}
