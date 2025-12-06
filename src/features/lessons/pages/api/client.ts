// src/features/lessons/api/client.ts
import { supabase } from "@infra/external/http/supabase";

export const lessonsClient = {
 
  async fetchVideoBlob(url: string): Promise<string> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { 
      method: "GET",
      headers: headers 
    });

    if (!response.ok) {
      throw new Error(`Error al cargar el video: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
};