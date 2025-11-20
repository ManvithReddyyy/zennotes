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

export interface TagColor {
    bg: string;
    text: string;
}

export const TAG_COLORS: Record<string, string> = {
    personal: '#FFB5E8', // Pastel Pink
    work: '#B5EAD7',     // Pastel Mint
    ideas: '#C7CEEA',    // Pastel Purple
};

export const DEFAULT_TAGS = ['personal', 'work', 'ideas'];
