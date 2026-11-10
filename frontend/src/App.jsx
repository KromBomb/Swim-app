import { useState, useEffect } from "react";
import PracticeForm from "./PracticeForm";
import PracticeCard from "./PracticeCard";

function App() {
  const [practices, setPractices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/practices")
      .then((response) => response.json())
      .then((data) => setPractices(data))
      .catch((error) => console.error("Error fetching practices:", error));
  }, []);

  function handleAdd(newPractice) {
    setPractices((prev) => [...prev, newPractice]);
  }

  function handleUpdate(updated) {
    setPractices((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  function handleDelete(id) {
    fetch(`http://localhost:8000/practices/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setPractices((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((error) => console.error("Error deleting practice:", error));
  }

  return (
    <div>
      <h1>My Practices</h1>
      <PracticeForm onAdd={handleAdd} />
      {practices.map((practice) => (
        <PracticeCard
          key={practice.id}
          practice={practice}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;
