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
    <Widget padding_bottom="pb-[3vh]">
      {!data ? (
        <Loader />
      ) : (
        <>
          <div className="h-[90%] overflow-y-auto">
            {data.length
              ? data.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <SingleList
                        id={item.id}
                        text={item.text}
                        is_edit={false}
                      />
                    </Fragment>
                  );
                })
              : null}
            {isAdd ? (
              <AddList
                setText={setText}
                text={text}
                setIsAdd={setIsAdd}
                isAdd={isAdd}
              />
            ) : null}
            {!data.length && !isAdd ? (
              <div className="flex justify-center items-center py-2">
                <p className="text-[5.5vw] opacity-70">No reminders yet</p>
              </div>
            ) : null}
          </div>
          <button
            className="h-[10%] flex items-center gap-1 cursor-pointer shade"
            onClick={() => setIsAdd(true)}
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

  function cancelText() {
    setIsAdd(false);
    setText("");
  }

  const createReminder = async () => {
    try {
      setLoading(true);
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

      setText("");
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        text.length >= 70 ? "bg-red-500/20" : "bg-transparent"
      } py-1.5 px-2 rounded-md border-b flex items-start gap-1.5`}
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
          <Check strokeWidth={1.4} className="w-[7vw] h-[7vw]" />
        )}
      </button>
      <div className="flex-[1]">
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          autoFocus
          rows={1}
          maxLength={70}
          className="bg-transparent py-0.5 outline-none border-none leading-[1] text-[6vw] w-full resize-none"
        ></textarea>
      </div>
      <button className="cursor-pointer shade" onClick={cancelText}>
        <X strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
      </button>
    </div>
  );
}

function SingleList({ id, text, is_edit }: Readonly<List>) {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);

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

  return (
    <div
      className="py-1.5 px-2 border-b flex items-center gap-1.5"
      style={{
        borderBottomColor: userData
          ? userData.secondary_color + "15"
          : "#2D292915",
      }}
    >
      <button
        className="cursor-pointer shade opacity-80"
        disabled={loading}
        onClick={deleteReminder}
      >
        {loading ? (
          <Loading className="w-[7vw] h-[7vw]" />
        ) : (
          <X strokeWidth={1.5} className="w-[7vw] h-[7vw]" />
        )}
      </button>
      <div>
        <p className="text-[6vw]">{text}</p>
      </div>
    </div>
  );
}
