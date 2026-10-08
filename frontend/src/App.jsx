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

  return (
    <div>
      <h1>My Practices</h1>
      <PracticeForm onAdd={(newPractice) => setPractices([...practices, newPractice])} />
      {practices.map((practice) => (
        <div key={practice.id}>
          <p>Date: {practice.date}</p>
          <p>Total Yards: {practice.total_yards}</p>
          <p>Duration (min): {practice.duration_min}</p>
          <p>Feel: {practice.feel}</p>
          <p>Notes: {practice.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default App;