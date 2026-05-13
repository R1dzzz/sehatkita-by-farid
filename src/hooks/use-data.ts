"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";

export function useData<T>(table: string, options?: { order?: string; limit?: number; filter?: Record<string, unknown> }) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from(table).select("*");

      if (options?.order) {
        const [column, direction] = options.order.split(".");
        query = query.order(column, { ascending: direction !== "desc" });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data: result, error: queryError } = await query;

      if (queryError) throw queryError;
      setData((result as T[]) || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [table, options?.order, options?.limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}

export function useFamilyMembers() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: members, error } = await supabase
      .from("family_members")
      .select("*");
    if (!error && members) setData(members);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refresh: fetchData };
}
