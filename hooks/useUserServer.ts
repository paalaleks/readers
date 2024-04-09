import { createClient } from "@/utils/supabase/server";

export default async function useUserServer() {
    const supabase = createClient();
    const getUser = await supabase.auth.getUser(); 
    const user = getUser.data.user

    return user; 
}