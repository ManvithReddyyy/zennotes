'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import OfflineIndicator from '@/components/OfflineIndicator';
import { useNotesStore } from '@/store/notes-store';
import { getSyncEngine } from '@/lib/sync-engine';

export default function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { fetchNotes, setIsOffline } = useNotesStore();

    useEffect(() => {
        // Initial sync and fetch
        const syncEngine = getSyncEngine();
        if (syncEngine) {
            syncEngine.initialSync().then(() => {
                fetchNotes();
            });

            // Update offline status
            const updateStatus = () => {
                setIsOffline(!syncEngine.getOnlineStatus());
            };

            updateStatus();
            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);

            return () => {
                window.removeEventListener('online', updateStatus);
                window.removeEventListener('offline', updateStatus);
            };
        } else {
            fetchNotes();
        }
    }, [fetchNotes, setIsOffline]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-charcoal">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <OfflineIndicator />
                {children}
            </main>
        </div>
    );
}
