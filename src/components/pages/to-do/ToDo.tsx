import Widget from "@/components/ui/widget/Widget";
import { List, Todo } from "@/types/types";
import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Check, X, CirclePlus } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Loader from "@/components/ui/loading/Loader";
import Loading from "@/components/ui/loading/Loading";

function ToDo() {
  const [isAdd, setIsAdd] = useState(false);
  const [text, setText] = useState("");

  const [data, setData] = useState<Todo[] | undefined>();

  const { userData } = useAuth();

  // READ ALL TODOS BY THE CURRENT USER
  const getReminders = async () => {
    if (!userData) {
      return;
    }

    const ref = query(
      collection(db, "todo"),
      where("user_id", "==", userData.id),
      orderBy("created_at", "asc")
    );

    const unsubscribe = onSnapshot(ref, (snap) => {
      const todo: Todo[] = [];

      snap.forEach((item) => {
        todo.push({ ...(item.data() as Todo), id: item.id });
      });

      setData(todo);
      console.log(todo);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getReminders();
  }, [userData?.id ?? "guest"]);

  return (
    <Widget padding="pb-[3vh] px-3 pt-2">
      {!data ? (
        <Loader />
      ) : (
        <>
          <div className="h-[90%] overflow-y-auto verticalScroll">
            {/* RENDER OF ALL TODOS LISTED IN ASCENDING ORDER */}
            {data.length
              ? data.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <SingleList id={item.id} text={item.text} />
                    </Fragment>
                  );
                })
              : null}
            {/* ONCE "ADD REMINDER" IS CLICKED, AN INPUT POPS UP FOR USER */}
            {/* TO INSERT A NEW REMINDER */}
            {isAdd ? (
              <AddList
                setText={setText}
                text={text}
                setIsAdd={setIsAdd}
                isAdd={isAdd}
              />
            ) : null}
            {/* SHOW 'NO REMINDERS' MESSAGE IF THERE'S NO DATA AND IF */}
            {/* 'ADD REMINDER' HAS NOT BEEN SELECTED */}
            {!data.length && !isAdd ? (
              <div className="flex justify-center items-center py-2">
                <p className="text-[5.5vw] opacity-70">No reminders yet</p>
              </div>
            ) : null}
          </div>
          {/* ADD REMINDER BUTTON */}
          <button
            className="h-[10%] flex items-center gap-1 cursor-pointer shade"
            onClick={() => {
              setIsAdd(true);
              setText("");
            }}
          >
            <span>
              <CirclePlus strokeWidth={1.4} className="w-[6vw] h-[6vw]" />
            </span>
            <span className="text-[6vw] font-medium">Add reminder</span>
          </button>
        </>
      )}
    </Widget>
  );
}

export default ToDo;

// POPS UP WHEN "ADD REMINDER" IS SELECTED
function AddList({
  setIsAdd,
  setText,
  text,
  isAdd,
}: {
  readonly setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  readonly isAdd: boolean;
  readonly setText: React.Dispatch<React.SetStateAction<string>>;
  readonly text: string;
}) {
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
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        text.length >= 50 ? "bg-red-500/20" : "bg-transparent"
      } py-1.5 px-2 rounded-sm border-b flex items-center gap-2`}
      style={{
        borderBottomColor: userData
          ? userData.secondary_color + "15"
          : "#2D292915",
      }}
    >
      <button
        className={`${
          text.length ? "visible" : "invisible"
        } cursor-pointer shade`}
        onClick={createReminder}
        disabled={loading}
      >
        {loading ? (
          <Loading className="w-[7vw] h-[7vw]" />
        ) : (
          <Check strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
        )}
      </button>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        autoFocus
        rows={1}
        maxLength={50}
        className="flex-[1] bg-transparent py-0.5 outline-none border-none leading-[1] text-[6vw] resize-none"
      ></textarea>

      <button className="cursor-pointer shade" onClick={cancelText}>
        <X strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
      </button>
    </div>
  );
}

// RENDERS EACH REMINDER IN ASCENDING ORDER
function SingleList({ id, text }: Readonly<List>) {
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
    } catch (err: any) {
      console.log(err.message);
    } finally {
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
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  function loadingState() {
    if (loading || editLoading) {
      return (
        <button>
          <Loading className="w-[7vw] h-[7vw]" />
        </button>
      );
    } else {
      if (isEdit) {
        return (
          <button
            className={`${
              editLoading || !editText.length
                ? "cursor-default opacity-50"
                : "cursor-pointer opacity-80 shade"
            }`}
            disabled={editLoading || !editText.length}
            onClick={updateReminder}
          >
            <Check strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
          </button>
        );
      } else {
        return (
          <button
            className="cursor-pointer shade opacity-80"
            disabled={loading}
            onClick={deleteReminder}
          >
            <X strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
          </button>
        );
      }
    }
  }

  function editChange() {
    setIsEdit(true);
    setEditText(text);
  }

  return (
    <div
      className="py-1.5 px-2 border-b flex items-center gap-2"
      style={{
        borderBottomColor: userData
          ? userData.secondary_color + "15"
          : "#2D292915",
      }}
    >
      {loadingState()}

      {isEdit ? (
        <textarea
          onChange={(e) => setEditText(e.target.value)}
          value={editText}
          autoFocus
          rows={1}
          maxLength={50}
          className="flex-[1] bg-transparent py-0.5 outline-none border-none leading-[1] text-[6vw] resize-none"
        ></textarea>
      ) : (
        <button onClick={editChange}>
          <p className="text-[6vw]">{text}</p>
        </button>
      )}
      {isEdit ? (
        <button
          className="cursor-pointer shade opacity-80"
          disabled={editLoading}
          onClick={() => setIsEdit(false)}
        >
          <X strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
        </button>
      ) : null}
    </div>
  );
}
