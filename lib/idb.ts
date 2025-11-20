import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Note, SyncQueueItem } from './types';

interface ZenNotesDB extends DBSchema {
    notes: {
        key: string;
        value: Note;
        indexes: { 'by-updated': string };
    };
    syncQueue: {
        key: string;
        value: SyncQueueItem;
    };
}

let dbPromise: Promise<IDBPDatabase<ZenNotesDB>> | null = null;

export const getDB = () => {
    if (!dbPromise) {
        dbPromise = openDB<ZenNotesDB>('zennotes-db', 1, {
            upgrade(db) {
                // Notes store
                if (!db.objectStoreNames.contains('notes')) {
                    const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
                    notesStore.createIndex('by-updated', 'updated_at');
                }

                // Sync queue store
                if (!db.objectStoreNames.contains('syncQueue')) {
                    db.createObjectStore('syncQueue', { keyPath: 'id' });
                }
            },
        });
    }
    return dbPromise;
};

// Notes operations
export const getAllNotes = async (): Promise<Note[]> => {
    const db = await getDB();
    return db.getAll('notes');
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
    const db = await getDB();
    return db.get('notes', id);
};

export const saveNote = async (note: Note): Promise<void> => {
    const db = await getDB();
    await db.put('notes', note);
};

export const deleteNote = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.delete('notes', id);
};

export const clearAllNotes = async (): Promise<void> => {
    const db = await getDB();
    const tx = db.transaction('notes', 'readwrite');
    await tx.store.clear();
    await tx.done;
};

// Sync queue operations
export const getAllSyncItems = async (): Promise<SyncQueueItem[]> => {
    const db = await getDB();
    return db.getAll('syncQueue');
};

export const addSyncItem = async (item: SyncQueueItem): Promise<void> => {
    const db = await getDB();
    await db.put('syncQueue', item);
};

export const removeSyncItem = async (id: string): Promise<void> => {
    const db = await getDB();
    await db.delete('syncQueue', id);
};

export const clearSyncQueue = async (): Promise<void> => {
    const db = await getDB();
    const tx = db.transaction('syncQueue', 'readwrite');
    await tx.store.clear();
    await tx.done;
};
