import { useState, useEffect } from "react";
import PracticeForm from "./PracticeForm";

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
        <div key={practice.id}>
          <p>Date: {practice.date}</p>
          <p>Total Yards: {practice.total_yards}</p>
          <p>Duration (min): {practice.duration_min}</p>
          <p>Feel: {practice.feel}</p>
          <p>Notes: {practice.notes}</p>
          <button onClick={() => handleDelete(practice.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
