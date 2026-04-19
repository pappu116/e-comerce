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
  address?: string;
  profileImage?: string;
  addresses?: Array<{
    id: string;
    type: "Home" | "Office" | "Other";
    label: string;
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    area?: string;
    postalCode?: string;
    country?: string;
    isDefault: boolean;
  }>;
  notificationPreferences?: {
    emailOrders: boolean;
    emailPromotions: boolean;
    smsAlerts: boolean;
    pushAlerts: boolean;
  };
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
  updateProfile: (payload: {
    name?: string;
    phone?: string;
    address?: string;
    profileImage?: string;
    addresses?: Array<{
      id?: string;
      type?: "Home" | "Office" | "Other";
      label: string;
      fullName: string;
      phone: string;
      addressLine: string;
      city: string;
      area?: string;
      postalCode?: string;
      country?: string;
      isDefault?: boolean;
    }>;
    notificationPreferences?: {
      emailOrders?: boolean;
      emailPromotions?: boolean;
      smsAlerts?: boolean;
      pushAlerts?: boolean;
    };
  }) => Promise<AuthResult>;
  uploadAvatar: (formData: FormData) => Promise<AuthResult>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<AuthResult>;
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

const hasAccessToken = () => {
  if (!isBrowser()) return false;
  return Boolean(localStorage.getItem("token"));
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

          if (!hasAccessToken()) {
            set({
              user: null,
              isLoggedIn: false,
              loading: false,
            });
            return;
          }

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

        updateProfile: async (payload) => {
          set({ loading: true, error: null });
          try {
            const data = await authService.updateMe(payload);
            const userData = data?.user || null;
            if (!data?.success || !userData) {
              const message = data?.message || "Failed to update profile";
              set({ loading: false, error: message });
              return { success: false, message };
            }

            set({
              user: userData,
              isLoggedIn: true,
              loading: false,
              error: null,
            });
            return { success: true, message: data?.message };
          } catch (error: any) {
            const message = handleApiError(error);
            set({ loading: false, error: message });
            return { success: false, message };
          }
        },

        uploadAvatar: async (formData) => {
          set({ loading: true, error: null });
          try {
            const data = await authService.uploadAvatar(formData);
            const userData = data?.user || null;
            if (!data?.success || !userData) {
              const message = data?.message || "Failed to upload avatar";
              set({ loading: false, error: message });
              return { success: false, message };
            }

            set({
              user: userData,
              isLoggedIn: true,
              loading: false,
              error: null,
            });
            return { success: true, message: data?.message };
          } catch (error: any) {
            const message = handleApiError(error);
            set({ loading: false, error: message });
            return { success: false, message };
          }
        },

        changePassword: async (currentPassword, newPassword) => {
          set({ loading: true, error: null });
          try {
            const data = await authService.changePassword({ currentPassword, newPassword });
            if (!data?.success) {
              const message = data?.message || "Failed to change password";
              set({ loading: false, error: message });
              return { success: false, message };
            }
            set({ loading: false, error: null });
            return { success: true, message: data?.message };
          } catch (error: any) {
            const message = handleApiError(error);
            set({ loading: false, error: message });
            return { success: false, message };
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
