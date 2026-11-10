import { useState } from "react";

function PracticeCard({ practice, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  function startEditing() {
    setForm({
      date: practice.date,
      total_yards: practice.total_yards,
      duration_min: practice.duration_min ?? "",
      feel: practice.feel ?? "",
      notes: practice.notes,
    });
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const updates = {
      date: form.date,
      total_yards: Number(form.total_yards),
      duration_min: form.duration_min ? Number(form.duration_min) : null,
      feel: form.feel ? Number(form.feel) : null,
      notes: form.notes,
    };

    fetch(`http://localhost:8000/practices/${practice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((saved) => {
        onUpdate(saved);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating practice:", error));
  }

  if (isEditing) {
    return (
      <div>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input type="number" name="total_yards" value={form.total_yards} onChange={handleChange} />
        <input type="number" name="duration_min" placeholder="Duration (min)" value={form.duration_min} onChange={handleChange} />
        <select name="feel" value={form.feel} onChange={handleChange}>
          <option value="">Feel</option>
          <option value="1">1 - Rough</option>
          <option value="2">2</option>
          <option value="3">3 - OK</option>
          <option value="4">4</option>
          <option value="5">5 - Great</option>
        </select>
        <textarea name="notes" value={form.notes} onChange={handleChange} />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <p>Date: {practice.date}</p>
      <p>Total Yards: {practice.total_yards}</p>
      <p>Duration (min): {practice.duration_min}</p>
      <p>Feel: {practice.feel}</p>
      <p>Notes: {practice.notes}</p>
      <button onClick={startEditing}>Edit</button>
      <button onClick={() => onDelete(practice.id)}>Delete</button>
    </div>
  );
}

export default PracticeCard;
