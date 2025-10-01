// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  orderBy,
  deleteDoc,
  doc, 
  updateDoc
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Tasks = () => {
  const [user] = useAuthState(auth);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // ✅ RÉCUPÉRATION EN TEMPS RÉEL DES TÂCHES
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("🔥 Tâches récupérées :", loadedTasks); // 👈 Affiche les tâches dans la console
      setTasks(loadedTasks);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ AJOUT DE TÂCHE
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    await addDoc(collection(db, "tasks"), {
      text: task,
      createdAt: new Date(),
      userId: user.uid,
      done: false
    });
    setTask("");
  };

  const handleDelete = async (id) => {
    const ref = doc(db, "tasks", id);
    await deleteDoc(ref);
  };
  
  const handleToggleDone = async (id, currentStatus) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, {
      done: !currentStatus,
    });
  };
  

  return (
    <div>
      <h2>Mes tâches</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          placeholder="Nouvelle tâche"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

    <ul>
        {tasks.map((t) => (
            <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
                <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => handleToggleDone(t.id, t.done)}
                />
                {t.text}
                <button onClick={() => handleDelete(t.id)}>🗑</button>
            </li>
        ))}
    </ul>


    </div>
  );
};

export default Tasks;
