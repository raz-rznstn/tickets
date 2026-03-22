import { useState } from 'react';
import { styles } from './ConcertForm.styles';

export default function ConcertForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', venue: '', date: '', time: '', price: '', capacity: '', description: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div style={styles.success}>
        🎉 <strong>"{form.title}"</strong> is live! Tickets are now on sale.
      </div>
    );
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Concert Title</label>
        <input style={styles.input} className="input-glow" name="title" placeholder="e.g. Rock Night Live" value={form.title} onChange={handleChange} required />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Venue</label>
        <input style={styles.input} className="input-glow" name="venue" placeholder="e.g. Madison Square Garden" value={form.venue} onChange={handleChange} required />
      </div>
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Date</label>
          <input style={styles.input} className="input-glow" type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Time</label>
          <input style={styles.input} className="input-glow" type="time" name="time" value={form.time} onChange={handleChange} required />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Ticket Price ($)</label>
          <input style={styles.input} className="input-glow" type="number" name="price" placeholder="e.g. 50" min="0" value={form.price} onChange={handleChange} required />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Capacity</label>
          <input style={styles.input} className="input-glow" type="number" name="capacity" placeholder="e.g. 500" min="1" value={form.capacity} onChange={handleChange} required />
        </div>
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Description</label>
        <input style={styles.input} className="input-glow" name="description" placeholder="Brief description of the event..." value={form.description} onChange={handleChange} />
      </div>
      <button style={styles.submitBtn} className="btn-primary" type="submit">
        🎟️ Publish Concert
      </button>
    </form>
  );
}
