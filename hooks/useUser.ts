import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js'; // Assuming this is the correct import for User type

// Define a type for the hook's return value
interface UseUserReturnValue {
  userId: string;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

// Custom hook to fetch user data
export default function useUser(): UseUserReturnValue {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error, userId: user?.id || ''};
}
