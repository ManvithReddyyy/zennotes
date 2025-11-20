import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createServerSupabaseClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: note, error } = await supabase
            .from('notes')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (error) throw error;

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json({ note });
    } catch (error) {
        console.error('Error fetching note:', error);
        return NextResponse.json(
            { error: 'Failed to fetch note' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createServerSupabaseClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const updates: Record<string, any> = {
            updated_at: new Date().toISOString(),
        };

        // Only update fields that are provided
        if (body.title !== undefined) updates.title = body.title;
        if (body.content !== undefined) updates.content = body.content;
        if (body.tag !== undefined) updates.tag = body.tag;
        if (body.favorite !== undefined) updates.favorite = body.favorite;
        if (body.deleted !== undefined) updates.deleted = body.deleted;

        const { data: note, error } = await supabase
            .from('notes')
            .update(updates)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ note });
    } catch (error) {
        console.error('Error updating note:', error);
        return NextResponse.json(
            { error: 'Failed to update note' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createServerSupabaseClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Permanent delete
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json(
            { error: 'Failed to delete note' },
            { status: 500 }
        );
    }
}
