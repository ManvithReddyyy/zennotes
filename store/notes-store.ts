import { create } from 'zustand';
import { Note, NoteInput, NoteUpdate } from '@/lib/types';
import { getAllNotes, saveNote, deleteNote } from '@/lib/idb';
import { getSyncEngine } from '@/lib/sync-engine';

interface NotesState {
    notes: Note[];
    isLoading: boolean;
    isOffline: boolean;
    searchQuery: string;
    selectedTag: string | null;

    // Actions
    setNotes: (notes: Note[]) => void;
    setIsOffline: (offline: boolean) => void;
    setSearchQuery: (query: string) => void;
    setSelectedTag: (tag: string | null) => void;

    // CRUD
    fetchNotes: () => Promise<void>;
    createNote: (input: NoteInput) => Promise<Note | null>;
    updateNote: (id: string, update: NoteUpdate) => Promise<void>;
    deleteNoteById: (id: string) => Promise<void>;
    toggleFavorite: (id: string) => Promise<void>;
    restoreNote: (id: string) => Promise<void>;

    // Filters
    getFilteredNotes: () => Note[];
}

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: [],
    isLoading: false,
    isOffline: false,
    searchQuery: '',
    selectedTag: null,

    setNotes: (notes) => set({ notes }),
    setIsOffline: (offline) => set({ isOffline: offline }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),

    fetchNotes: async () => {
        set({ isLoading: true });
        try {
            const notes = await getAllNotes();
            set({ notes });
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    createNote: async (input) => {
        const newNote: Note = {
            id: `local-${Date.now()}`,
            user_id: '', // Will be set by server
            title: input.title,
            content: input.content,
            tag: input.tag || null,
            favorite: input.favorite || false,
            deleted: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        try {
            // Save to IndexedDB
            await saveNote(newNote);

            // Queue for sync
            const syncEngine = getSyncEngine();
            if (syncEngine) {
                await syncEngine.queueChange('create', newNote.id, newNote);
            }

            // Update state
            set((state) => ({ notes: [newNote, ...state.notes] }));

            return newNote;
        } catch (error) {
            console.error('Failed to create note:', error);
            return null;
        }
    },

    updateNote: async (id, update) => {
        try {
            const notes = get().notes;
            const noteIndex = notes.findIndex((n) => n.id === id);
            if (noteIndex === -1) return;

            const updatedNote = {
                ...notes[noteIndex],
                ...update,
                updated_at: new Date().toISOString(),
            };

            // Save to IndexedDB
            await saveNote(updatedNote);

            // Queue for sync
            const syncEngine = getSyncEngine();
            if (syncEngine) {
                await syncEngine.queueChange('update', id, updatedNote);
            }

            // Update state
            set((state) => ({
                notes: state.notes.map((n) => (n.id === id ? updatedNote : n)),
            }));
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    },

    deleteNoteById: async (id) => {
        await get().updateNote(id, { deleted: true });
    },

    toggleFavorite: async (id) => {
        const note = get().notes.find((n) => n.id === id);
        if (note) {
            await get().updateNote(id, { favorite: !note.favorite });
        }
    },

    restoreNote: async (id) => {
        await get().updateNote(id, { deleted: false });
    },

    getFilteredNotes: () => {
        const { notes, searchQuery, selectedTag } = get();

        return notes.filter((note) => {
            // Filter deleted notes (shown only in trash)
            if (note.deleted) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = note.title.toLowerCase().includes(query);
                const matchesContent = note.content.toLowerCase().includes(query);
                if (!matchesTitle && !matchesContent) return false;
            }

            // Tag filter
            if (selectedTag && note.tag !== selectedTag) return false;

            return true;
        });
    },
}));
