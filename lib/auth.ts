import { createServerSupabaseClient } from './supabase';

export async function getCurrentUser() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

export async function getSession() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session;
}
