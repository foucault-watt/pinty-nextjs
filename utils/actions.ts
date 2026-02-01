"use server";

import { createClient } from "@/utils/supabase/server"; // 1. Utiliser le bon nom (createClient)
import { Provider } from "@supabase/supabase-js"; // Pour typer le provider
import { redirect } from "next/navigation"; // Nécessaire pour rediriger vers Google

const signInWith = (provider: Provider) => async () => {
    // 2. Ajouter des parenthèses () pour exécuter la fonction et obtenir l'instance
    const supabase = await createClient(); 
    
    const auth_callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`; 

    // 3. Récupérer l'URL de redirection fournie par Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: auth_callback_url,
        },
    });

    if (error) {
        console.error("Erreur d'authentification:", error.message);
        return;
    }

    // 4. Rediriger l'utilisateur vers l'URL de Google (important en Server Actions)
    if (data?.url) {
        redirect(data.url);
    }
};

export const signInWithGoogle = signInWith("google");