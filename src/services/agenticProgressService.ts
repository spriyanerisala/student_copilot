import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { CodingProblem } from './agenticDataService';

const STORAGE_KEY = 'agentic_solved_problems';

export const agenticProgressService = {
  // Local fallback (synchronous)
  getLocalSolvedProblems(userId: string = 'guest'): string[] {
    const key = `${STORAGE_KEY}_${userId}`;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  // Supabase (asynchronous)
  async getSolvedProblems(userId?: string): Promise<string[]> {
    const uid = userId || 'guest';
    const key = `${STORAGE_KEY}_${uid}`;

    if (!isSupabaseConfigured || !userId) {
      return this.getLocalSolvedProblems(uid);
    }

    try {
      const { data, error } = await supabase
        .from('user_solved_problems')
        .select('solved_problems')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('Error fetching solved problems:', error);
        return this.getLocalSolvedProblems(uid);
      }

      // Handle both string[] (old format) and object[] (new format)
      const rawProblems = data?.solved_problems || [];
      const remoteProblems: string[] = rawProblems.map((p: any) => typeof p === 'string' ? p : p.id);
      
      const localProblems = this.getLocalSolvedProblems(uid);
      
      // Merge remote and local to prevent data loss if sync failed earlier
      const mergedProblems = Array.from(new Set([...remoteProblems, ...localProblems]));
      
      if (mergedProblems.length > remoteProblems.length) {
        // We could trigger a full sync here if needed
      }

      // Sync merged state to local storage
      localStorage.setItem(key, JSON.stringify(mergedProblems));
      return mergedProblems;
    } catch (e) {
      return this.getLocalSolvedProblems(uid);
    }
  },

  async markProblemSolved(userId: string | undefined, userName: string | undefined, problem: CodingProblem | string): Promise<void> {
    const uid = userId || 'guest';
    const key = `${STORAGE_KEY}_${uid}`;
    const problemId = typeof problem === 'string' ? problem : problem.id;

    // Always update local storage first for immediate UI feedback
    const localSolved = this.getLocalSolvedProblems(uid);
    if (!localSolved.includes(problemId)) {
      localSolved.push(problemId);
      localStorage.setItem(key, JSON.stringify(localSolved));
    }

    if (!isSupabaseConfigured || !userId || !userName) {
      return;
    }

    try {
      // Fetch the FULL rows first to append to them without losing data
      const { data: existingData } = await supabase
        .from('user_solved_problems')
        .select('solved_problems')
        .eq('user_id', uid)
        .single();
        
      let newSolvedArray = existingData?.solved_problems || [];
      
      // Prevent duplicates
      if (!newSolvedArray.some((p: any) => (typeof p === 'string' ? p : p.id) === problemId)) {
        // If problem is a full object, store it, else just store ID
        newSolvedArray.push(typeof problem === 'string' ? { id: problemId } : problem);
      }
        
      const { error: upsertError } = await supabase
        .from('user_solved_problems')
          .upsert({
            user_id: uid,
            user_name: userName,
            solved_problems: newSolvedArray,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });
          
        if (upsertError) {
          console.error('Supabase Upsert Error:', upsertError);
        } else {
          console.log('Successfully saved to Supabase user_solved_problems for user:', userId);
        }
    } catch (error) {
      console.error('Failed to sync solved problem to Supabase:', error);
    }
  }
};
