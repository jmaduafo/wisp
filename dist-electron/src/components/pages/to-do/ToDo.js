import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Widget from "@/components/ui/widget/Widget";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Check, X, CirclePlus } from "lucide-react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, } from "firebase/firestore";
import { db } from "@/firebase/config";
import Loader from "@/components/ui/loading/Loader";
import Loading from "@/components/ui/loading/Loading";
function ToDo() {
    const [isAdd, setIsAdd] = useState(false);
    const [text, setText] = useState("");
    const [data, setData] = useState();
    const { userData } = useAuth();
    // READ ALL TODOS BY THE CURRENT USER
    const getReminders = async () => {
        if (!userData) {
            return;
        }
        const ref = query(collection(db, "todo"), where("user_id", "==", userData.id), orderBy("created_at", "asc"));
        const unsubscribe = onSnapshot(ref, (snap) => {
            const todo = [];
            snap.forEach((item) => {
                todo.push({ ...item.data(), id: item.id });
            });
            setData(todo);
            console.log(todo);
        });
        return () => unsubscribe();
    };
    useEffect(() => {
        getReminders();
    }, [userData?.id ?? "guest"]);
    return (_jsx(Widget, { padding: "pb-[3vh] px-3 pt-2", children: !data ? (_jsx(Loader, {})) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "h-[90%] overflow-y-auto verticalScroll", children: [data.length
                            ? data.map((item) => {
                                return (_jsx(Fragment, { children: _jsx(SingleList, { id: item.id, text: item.text }) }, item.id));
                            })
                            : null, isAdd ? (_jsx(AddList, { setText: setText, text: text, setIsAdd: setIsAdd, isAdd: isAdd })) : null, !data.length && !isAdd ? (_jsx("div", { className: "flex justify-center items-center py-2", children: _jsx("p", { className: "text-[5.5vw] opacity-70", children: "No reminders yet" }) })) : null] }), _jsxs("button", { className: "h-[10%] flex items-center gap-1 cursor-pointer shade", onClick: () => {
                        setIsAdd(true);
                        setText("");
                    }, children: [_jsx("span", { children: _jsx(CirclePlus, { strokeWidth: 1.4, className: "w-[6vw] h-[6vw]" }) }), _jsx("span", { className: "text-[6vw] font-medium", children: "Add reminder" })] })] })) }));
}
export default ToDo;
// POPS UP WHEN "ADD REMINDER" IS SELECTED
function AddList({ setIsAdd, setText, text, isAdd, }) {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    // REMOVE INPUT ROW WHEN X BUTTON IS CLICKED
    function cancelText() {
        setIsAdd(false);
        setText("");
    }
    // CREATE A NEW TO-DO
    const createReminder = async () => {
        try {
            setLoading(true);
            setText("");
            if (!userData) {
                return;
            }
            const addRef = collection(db, "todo");
            await addDoc(addRef, {
                text,
                user_id: userData.id,
                created_at: serverTimestamp(),
                updated_at: null,
            });
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: `${text.length >= 50 ? "bg-red-500/20" : "bg-transparent"} py-1.5 px-2 rounded-sm border-b flex items-center gap-2`, style: {
            borderBottomColor: userData
                ? userData.secondary_color + "15"
                : "#2D292915",
        }, children: [_jsx("button", { className: `${text.length ? "visible" : "invisible"} cursor-pointer shade`, onClick: createReminder, disabled: loading, children: loading ? (_jsx(Loading, { className: "w-[7vw] h-[7vw]" })) : (_jsx(Check, { strokeWidth: 1.5, className: "w-[7vw] h-[7vw]" })) }), _jsx("textarea", { onChange: (e) => setText(e.target.value), value: text, autoFocus: true, rows: 1, maxLength: 50, className: "flex-[1] bg-transparent py-0.5 outline-none border-none leading-[1] text-[6vw] resize-none" }), _jsx("button", { className: "cursor-pointer shade", onClick: cancelText, children: _jsx(X, { strokeWidth: 1.5, className: "w-[7vw] h-[7vw]" }) })] }));
}
// RENDERS EACH REMINDER IN ASCENDING ORDER
function SingleList({ id, text }) {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState("");
    // DELETE TO-DO
    const deleteReminder = async () => {
        try {
            setLoading(true);
            const deleteRef = doc(db, "todo", id);
            await deleteDoc(deleteRef);
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    // UPDATE TO-DO
    const updateReminder = async () => {
        try {
            setEditLoading(true);
            const updateRef = doc(db, "todo", id);
            await updateDoc(updateRef, {
                text: editText,
                updated_at: serverTimestamp(),
            });
            setIsEdit(false);
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setEditLoading(false);
        }
    };
    function loadingState() {
        if (loading || editLoading) {
            return (_jsx("button", { children: _jsx(Loading, { className: "w-[7vw] h-[7vw]" }) }));
        }
        else {
            if (isEdit) {
                return (_jsx("button", { className: `${editLoading || !editText.length
                        ? "cursor-default opacity-50"
                        : "cursor-pointer opacity-80 shade"}`, disabled: editLoading || !editText.length, onClick: updateReminder, children: _jsx(Check, { strokeWidth: 1.5, className: "w-[7vw] h-[7vw]" }) }));
            }
            else {
                return (_jsx("button", { className: "cursor-pointer shade opacity-80", disabled: loading, onClick: deleteReminder, children: _jsx(X, { strokeWidth: 1.5, className: "w-[7vw] h-[7vw]" }) }));
            }
        }
    }
    function editChange() {
        setIsEdit(true);
        setEditText(text);
    }
    return (_jsxs("div", { className: "py-1.5 px-2 border-b flex items-center gap-2", style: {
            borderBottomColor: userData
                ? userData.secondary_color + "15"
                : "#2D292915",
        }, children: [loadingState(), isEdit ? (_jsx("textarea", { onChange: (e) => setEditText(e.target.value), value: editText, autoFocus: true, rows: 1, maxLength: 50, className: "flex-[1] bg-transparent py-0.5 outline-none border-none leading-[1] text-[6vw] resize-none" })) : (_jsx("button", { onClick: editChange, children: _jsx("p", { className: "text-[6vw]", children: text }) })), isEdit ? (_jsx("button", { className: "cursor-pointer shade opacity-80", disabled: editLoading, onClick: () => setIsEdit(false), children: _jsx(X, { strokeWidth: 1.5, className: "w-[7vw] h-[7vw]" }) })) : null] }));
}
