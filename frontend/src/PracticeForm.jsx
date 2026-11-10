import { useState } from "react";

function PracticeForm({ onAdd }) {
  const [date, setDate] = useState("");
  const [totalYards, setTotalYards] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [feel, setFeel] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading

    const newPractice = {
      date: date,
      total_yards: Number(totalYards),
      duration_min: durationMin ? Number(durationMin) : null,
      feel: feel ? Number(feel) : null,
      notes: notes,
    };

    fetch("http://localhost:8000/practices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPractice),
    })
      .then((res) => res.json())
      .then((saved) => {
        onAdd(saved);
        setDate("");
        setTotalYards("");
        setDurationMin("");
        setFeel("");
        setNotes("");
      })
      .catch((error) => console.error("Error adding practice:", error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total yards"
        value={totalYards}
        onChange={(e) => setTotalYards(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (min)"
        value={durationMin}
        onChange={(e) => setDurationMin(e.target.value)}
      />
      <select value={feel} onChange={(e) => setFeel(e.target.value)}>
        <option value="">Feel</option>
        <option value="1">1 - Rough</option>
        <option value="2">2</option>
        <option value="3">3 - OK</option>
        <option value="4">4</option>
        <option value="5">5 - Great</option>
      </select>
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Add Practice</button>
    </form>
  );
}

export default PracticeForm;