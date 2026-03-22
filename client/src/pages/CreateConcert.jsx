import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './CreateConcert.styles';

export default function CreateConcert() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', venue: '', date: '', time: '', price: '', capacity: '', description: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.back} onClick={() => navigate('/')}>← Back</button>
        <h1 style={styles.title}>🎤 Create a Concert</h1>
      </div>

      {submitted ? (
        <div style={styles.success}>
          ✅ Concert <strong>"{form.title}"</strong> created successfully! Tickets are now on sale.
        </div>
      ) : (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Concert Title</label>
            <input style={styles.input} name="title" placeholder="e.g. Rock Night Live" value={form.title} onChange={handleChange} required />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Venue</label>
            <input style={styles.input} name="venue" placeholder="e.g. Madison Square Garden" value={form.venue} onChange={handleChange} required />
          </div>

          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Date</label>
              <input style={styles.input} type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Time</label>
              <input style={styles.input} type="time" name="time" value={form.time} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Ticket Price ($)</label>
              <input style={styles.input} type="number" name="price" placeholder="e.g. 50" min="0" value={form.price} onChange={handleChange} required />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Capacity</label>
              <input style={styles.input} type="number" name="capacity" placeholder="e.g. 500" min="1" value={form.capacity} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            <input style={styles.input} name="description" placeholder="Brief description of the event..." value={form.description} onChange={handleChange} />
          </div>

          <button style={styles.submitBtn} type="submit">Publish Concert</button>
        </form>
      )}
    </div>
  );
}
