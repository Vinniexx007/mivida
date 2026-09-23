"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  isConsentState,
  type ConsentState,
} from "@/lib/analytics";

type ConsentContextValue = {
  /** Current consent state. Starts "unknown" until a choice is loaded/made. */
  consent: ConsentState;
  /** Whether the persisted choice has been read from storage yet (SSR-safe). */
  hydrated: boolean;
  /** Grant analytics consent (loads GA). */
  accept: () => void;
  /** Deny analytics consent (keeps GA off). */
  reject: () => void;
  /** Re-open the choice (used by the "Cookie settings" control). */
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return isConsentState(stored) ? stored : "unknown";
  } catch {
    // Storage can throw in private mode / when blocked. Fail open to "unknown".
    return "unknown";
  }
}

function persistConsent(value: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    if (value === "unknown") {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } else {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    }
  } catch {
    // Best-effort persistence; ignore storage failures.
  }
}

type State = { consent: ConsentState; hydrated: boolean };

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Always start "unknown" (not hydrated) on the server and first client render
  // so markup matches; read the persisted value in an effect to avoid an SSR
  // hydration mismatch. Both fields update together in a single setState.
  const [state, setState] = useState<State>({
    consent: "unknown",
    hydrated: false,
  });

  useEffect(() => {
    // Hydrate the persisted choice after mount. Reading localStorage during
    // render would break SSR, so this one-time post-mount setState is the
    // intended pattern here (runs once, not a cascading render loop).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ consent: readStoredConsent(), hydrated: true });
  }, []);

  const update = useCallback((value: ConsentState) => {
    persistConsent(value);
    setState((prev) => ({ ...prev, consent: value }));
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent: state.consent,
      hydrated: state.hydrated,
      accept: () => update("granted"),
      reject: () => update("denied"),
      reopen: () => update("unknown"),
    }),
    [state.consent, state.hydrated, update],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return ctx;
}
