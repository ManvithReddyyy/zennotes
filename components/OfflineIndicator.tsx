'use client';

import { useEffect, useState } from 'react';
import { getSyncEngine } from '@/lib/sync-engine';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const syncEngine = getSyncEngine();
        if (!syncEngine) return;

        const updateStatus = () => {
            setIsOnline(syncEngine.getOnlineStatus());
        };

        updateStatus();

        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);

        return () => {
            window.removeEventListener('online', updateStatus);
            window.removeEventListener('offline', updateStatus);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl shadow-soft">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Offline mode
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
