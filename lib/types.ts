export interface Note {
    id: string;
    user_id: string;
    title: string;
    content: string;
    tag: string | null;
    favorite: boolean;
    deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface NoteInput {
    title: string;
    content: string;
    tag?: string | null;
    favorite?: boolean;
}

export interface NoteUpdate {
    title?: string;
    content?: string;
    tag?: string | null;
    favorite?: boolean;
    deleted?: boolean;
}

export interface SyncQueueItem {
    id: string;
    noteId: string;
    action: 'create' | 'update' | 'delete';
    data: Partial<Note>;
    timestamp: number;
}

export const TAG_COLORS: Record<string, string> = {
    personal: '#3b82f6', // blue
    work: '#8b5cf6', // purple
    ideas: '#eab308', // yellow
    todo: '#ef4444', // red
    archive: '#6b7280', // gray
};

export const DEFAULT_TAGS = Object.keys(TAG_COLORS);
