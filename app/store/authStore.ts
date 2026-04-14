import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService, handleApiError } from "@/app/lib/apiClient";

type UserRole = "admin" | "user" | "customer";

export interface AuthUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  status?: "active" | "suspended";
  phone?: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  isHydrated: boolean;
  error: string | null;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setHydrated: () => void;
}

const isBrowser = () => typeof window !== "undefined";

const setAccessToken = (token?: string) => {
  if (!isBrowser()) return;
  if (token) localStorage.setItem("token", token);
};

const removeAccessToken = () => {
  if (!isBrowser()) return;
  localStorage.removeItem("token");
};

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        loading: false,
        isHydrated: false,
        error: null,

        setHydrated: () => set({ isHydrated: true }),
        clearError: () => set({ error: null }),

        register: async (payload) => {
          set({ loading: true, error: null });
          try {
            const data = await authService.register(payload);
            const userData = data?.user || null;
            const token = data?.token as string | undefined;

            if (!data?.success || !userData) {
              const message = data?.message || "Registration failed";
              set({ loading: false, error: message });
              return { success: false, message };
            }

            setAccessToken(token);
            set({
              user: userData,
              isLoggedIn: true,
              loading: false,
              error: null,
            });
            return { success: true };
          } catch (error: any) {
            const message = handleApiError(error);
            set({ loading: false, error: message });
            return { success: false, message };
          }
        },

        login: async (email, password) => {
          set({ loading: true, error: null });
          try {
            const data = await authService.login({ email, password });
            const userData = data?.user || null;
            const token = data?.token as string | undefined;

            if (!data?.success || !userData) {
              const message = data?.message || "Invalid email or password";
              set({ loading: false, error: message });
              return { success: false, message };
            }

            setAccessToken(token);
            set({
              user: userData,
              isLoggedIn: true,
              loading: false,
              error: null,
            });
            return { success: true };
          } catch (error: any) {
            const message = handleApiError(error);
            set({ loading: false, error: message });
            return { success: false, message };
          }
        },

        logout: async () => {
          set({ loading: true });
          try {
            await authService.logout();
          } catch {
            // Keep local cleanup if remote logout fails.
          } finally {
            removeAccessToken();
            set({
              user: null,
              isLoggedIn: false,
              loading: false,
              error: null,
            });
          }
        },

        checkAuth: async () => {
          set({ loading: true, error: null });
          try {
            const data = await authService.getMe();
            const userData = data?.user || null;
            if (!userData) {
              removeAccessToken();
              set({ user: null, isLoggedIn: false, loading: false });
              return;
            }

            set({
              user: userData,
              isLoggedIn: true,
              loading: false,
            });
          } catch {
            removeAccessToken();
            set({
              user: null,
              isLoggedIn: false,
              loading: false,
            });
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
        }),
        onRehydrateStorage: (state) => () => {
          state?.setHydrated();
        },
      }
    ),
    { name: "auth-store" }
  )
);

