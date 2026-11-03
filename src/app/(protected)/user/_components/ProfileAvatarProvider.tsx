"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type ProfileAvatarContextValue = {
  avatarSrc: string | null;
  setAvatarSrc: (src: string) => void;
};

const avatarStorageKey = "mr-int-user-profile-avatar";
const ProfileAvatarContext = createContext<ProfileAvatarContextValue | null>(null);
const avatarSubscribers = new Set<() => void>();

function getAvatarSnapshot() {
  try {
    const savedAvatar = window.localStorage.getItem(avatarStorageKey);
    return savedAvatar?.startsWith("data:image/") ? savedAvatar : null;
  } catch {
    return null;
  }
}

function subscribeToAvatar(onChange: () => void) {
  avatarSubscribers.add(onChange);
  window.addEventListener("storage", onChange);

  return () => {
    avatarSubscribers.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ProfileAvatarProvider({ children }: { children: ReactNode }) {
  const avatarSrc = useSyncExternalStore(
    subscribeToAvatar,
    getAvatarSnapshot,
    () => null,
  );

  const setAvatarSrc = (src: string) => {
    try {
      window.localStorage.setItem(avatarStorageKey, src);
    } catch {
      // Keep the preview available for the current session if storage is unavailable.
    }
    avatarSubscribers.forEach((subscriber) => subscriber());
  };

  return (
    <ProfileAvatarContext.Provider value={{ avatarSrc, setAvatarSrc }}>
      {children}
    </ProfileAvatarContext.Provider>
  );
}

export function useProfileAvatar() {
  const context = useContext(ProfileAvatarContext);
  if (!context) {
    throw new Error("useProfileAvatar must be used within ProfileAvatarProvider");
  }
  return context;
}