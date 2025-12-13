import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store.ts";
import { useSessionAuthStore } from "@/store/auth-session-store";
import apiClientSession from "@/query/apiClientSession";
import { ENDPOINTS } from "./endpoints";

export async function ProtectedRoute({ request }: LoaderFunctionArgs) {
  const token = useAuthStore.getState().token;
  const isTokenExpired = useAuthStore.getState().isTokenExpired;

  // If token exists but is expired, try to refresh
  if (token && isTokenExpired()) {
    console.log("Token expired, attempting refresh...");
    await useAuthStore.getState().refreshUserToken();
  }

  // If we have a valid token, allow access (even if email not verified yet)
  // The app can handle email verification after login
  if (token && !isTokenExpired()) {
    console.log("Access granted - valid token found");
    return null;
  }

  // No valid token, redirect to sign-in
  const url = new URL(request.url);
  console.log("Access denied - redirecting to sign-in from:", url.pathname);
  return redirect(`/auth/sign-in?from=${url.pathname}`);
}

export async function ProtectedRouteWithSession({
  request,
}: LoaderFunctionArgs) {
  const { isAuthenticated, setAuthenticated } = useSessionAuthStore.getState();

  /**
   * 1️⃣ Fast-path: already authenticated in memory
   */
  if (isAuthenticated) {
    return null;
  }

  /**
   * 2️⃣ Ask backend if session cookie is valid
   * (HTTP-only cookie is sent automatically)
   */
  try {
    await apiClientSession.get(ENDPOINTS.checkAuthSession);

    setAuthenticated(true);
    return null;
  } catch (error) {
    /**
     * 3️⃣ Session invalid → redirect
     */
    const url = new URL(request.url);
    setAuthenticated(false);

    const endpoint = ENDPOINTS.login + `?from=${url.pathname}`;

    return redirect(endpoint);
  }
}
