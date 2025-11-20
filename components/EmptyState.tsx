'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    icon,
    action,
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full min-h-[400px] p-8"
        >
            {icon && (
                <div className="mb-4 text-gray-300 dark:text-gray-700">{icon}</div>
            )}
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6 text-center max-w-md">
                {description}
            </p>
            {action && <div>{action}</div>}
        </motion.div>
    );
}
