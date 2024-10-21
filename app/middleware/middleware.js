// pages/_middleware.js
import { NextResponse } from "next/server";

const isAuthenticated = (req) => {
  // Controlla se l'utente è autenticato. Puoi utilizzare i cookie o il contesto dell'app.
  const token = req.cookies.get("token"); // Modifica in base a come gestisci i token.
  return token !== undefined; // Esegui la logica di verifica del token.
};

const isProtectedRoute = (path) => {
  // Specifica le rotte protette
  return path.startsWith("/dashboard");
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(pathname) && !isAuthenticated(req)) {
    // Reindirizza alla pagina di accesso se non autenticato
    return NextResponse.redirect("/login"); // Modifica in base alla tua rotta di login
  }

  return NextResponse.next(); // Permetti l'accesso se autenticato o se non è una rotta protetta
}

export const config = {
  matcher: [
    // Specifica le rotte per cui eseguire il middleware
    "/dashboard/(.*)", // Proteggi tutte le rotte che iniziano con /dashboard
    "/api/(.*)", // Esegui sempre per le rotte API
  ],
};
