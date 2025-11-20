import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const favorite = searchParams.get('favorite');
        const deleted = searchParams.get('deleted');
        const search = searchParams.get('search');
        const tag = searchParams.get('tag');

        let query = supabase
            .from('notes')
            .select('*')
            .eq('user_id', user.id);

        // Apply filters
        if (favorite === 'true') {
            query = query.eq('favorite', true);
        }

        if (deleted === 'true') {
            query = query.eq('deleted', true);
        } else {
            query = query.eq('deleted', false);
        }

        if (tag) {
            query = query.eq('tag', tag);
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
        }

        const { data: notes, error } = await query.order('updated_at', {
            ascending: false,
        });

        if (error) throw error;

        return NextResponse.json({ notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notes' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, content, tag, favorite } = body;

        const { data: note, error } = await supabase
            .from('notes')
            .insert({
                user_id: user.id,
                title: title || '',
                content: content || '',
                tag: tag || null,
                favorite: favorite || false,
                deleted: false,
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ note }, { status: 201 });
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json(
            { error: 'Failed to create note' },
            { status: 500 }
        );
    }
}
