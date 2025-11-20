import { createClient } from './supabase';
import {
    getAllNotes,
    saveNote,
    deleteNote,
    getAllSyncItems,
    addSyncItem,
    removeSyncItem,
    clearAllNotes,
} from './idb';
import { Note, SyncQueueItem } from './types';

class SyncEngine {
    private isOnline = true;
    private isSyncing = false;
    private supabase = createClient();

    constructor() {
        if (typeof window !== 'undefined') {
            this.isOnline = navigator.onLine;
            this.setupListeners();
        }
    }

    private setupListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.sync();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    getOnlineStatus() {
        return this.isOnline;
    }

    async queueChange(
        action: 'create' | 'update' | 'delete',
        noteId: string,
        data: Partial<Note>
    ) {
        const item: SyncQueueItem = {
            id: `${Date.now()}-${Math.random()}`,
            noteId,
            action,
            data,
            timestamp: Date.now(),
        };

        await addSyncItem(item);

        // Try to sync immediately if online
        if (this.isOnline) {
            this.sync();
        }
    }

    async sync() {
        if (this.isSyncing || !this.isOnline) return;

        this.isSyncing = true;

        try {
            // Step 1: Get all sync queue items
            const queueItems = await getAllSyncItems();

            // Step 2: Process each item
            for (const item of queueItems) {
                try {
                    switch (item.action) {
                        case 'create':
                        case 'update':
                            await this.supabase
                                .from('notes')
                                .upsert(item.data as Note, { onConflict: 'id' });
                            break;
                        case 'delete':
                            await this.supabase.from('notes').delete().eq('id', item.noteId);
                            break;
                    }

                    // Remove from queue on success
                    await removeSyncItem(item.id);
                } catch (error) {
                    console.error('Failed to sync item:', item, error);
                    // Keep in queue for retry
                }
            }

            // Step 3: Fetch latest from server (server wins)
            await this.fetchAndMerge();
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    async fetchAndMerge() {
        try {
            const {
                data: { user },
            } = await this.supabase.auth.getUser();
            if (!user) return;

            // Fetch all notes from Supabase
            const { data: serverNotes, error } = await this.supabase
                .from('notes')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (error) throw error;

            // Clear local notes and replace with server data (server wins)
            await clearAllNotes();

            if (serverNotes) {
                for (const note of serverNotes) {
                    await saveNote(note as Note);
                }
            }
        } catch (error) {
            console.error('Fetch and merge failed:', error);
        }
    }

    async initialSync() {
        if (this.isOnline) {
            await this.fetchAndMerge();
        }
    }
}

// Singleton instance
let syncEngineInstance: SyncEngine | null = null;

export const getSyncEngine = () => {
    if (typeof window === 'undefined') return null;

    if (!syncEngineInstance) {
        syncEngineInstance = new SyncEngine();
    }
    return syncEngineInstance;
};
