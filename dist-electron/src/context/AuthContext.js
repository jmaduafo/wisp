import { jsx as _jsx } from "react/jsx-runtime";
import { db } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState, } from "react";
const AuthContext = createContext(undefined);
const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
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
                setUserData(snap.data());
            }
            else {
                setUserData(undefined);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const memoizedUser = useMemo(() => userData, [userData]);
    const value = useMemo(() => ({ userData: memoizedUser, loading }), [memoizedUser, loading]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
export { AuthProvider, useAuth };
