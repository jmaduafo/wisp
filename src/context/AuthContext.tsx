import { db } from "@/firebase/config";
import { User } from "@/types/types";
import { doc, onSnapshot } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  userData: User | undefined;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const uid = localStorage.getItem("wisp_uid");
    if (!uid) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setUserData(snap.data() as User);
      } else {
        setUserData(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const memoizedUser = useMemo(() => userData, [userData]);

  const value = useMemo(
    () => ({ userData: memoizedUser, loading }),
    [memoizedUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
