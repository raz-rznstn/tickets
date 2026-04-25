import { useState } from 'react';
import { styles } from './ConcertForm.styles';
import { styles as common } from '../../styles/common.styles';
import { useCreateConcert } from '../../services/api/hooks/useCreateConcert';
import { useUpdateConcert } from '../../services/api/hooks/useUpdateConcert';

const EMPTY_FORM = {
  title: '',
  imageUrl: '',
  venue: '',
  date: '',
  doorsOpen: '',
  price: '',
  description: '',
  genre: '',
  capacity: '',
  ageLimit: '',
  photography: '',
};

function normalizeInitialValues(values) {
  if (!values) return EMPTY_FORM;
  return {
    ...values,
    price: values.price ? String(values.price).replace(/[^0-9.]/g, '') : '',
    capacity: values.capacity ?? '',
  };
}

export default function ConcertForm({ initialValues, concertId, submitLabel = '🎟️ Publish Concert' }) {
  const [form, setForm] = useState(() => normalizeInitialValues(initialValues));
  const [submitted, setSubmitted] = useState(false);

  const createMutation = useCreateConcert();
  const updateMutation = useUpdateConcert(concertId);
  const mutation = concertId ? updateMutation : createMutation;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: form.price ? `$${form.price}` : form.price,
      capacity: form.capacity ? Number(form.capacity) : undefined,
    };
    mutation.mutate(payload, { onSuccess: () => setSubmitted(true) });
  };

  if (submitted) {
    return (
      <div style={styles.success}>
        <div style={styles.successIcon}>🎉</div>
        <div style={styles.successTitle}>"{form.title}" is live!</div>
        <div style={styles.successSub}>Your concert has been published. Tickets are now on sale.</div>
        <button style={styles.successBtn} onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}>
          Create Another
        </button>
      </div>
    );
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>

      {/* Section: Basic Info */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>Basic Info</p>
        <div style={common.fieldGroup}>
          <label style={common.label}>Concert Title</label>
          <input style={common.input} name="title" placeholder="e.g. Rock Night Live" value={form.title} onChange={handleChange} required />
        </div>
        <div style={common.fieldGroup}>
          <label style={common.label}>Cover Image URL</label>
          <input style={common.input} name="imageUrl" placeholder="https://..." value={form.imageUrl} onChange={handleChange} required />
        </div>
        {form.imageUrl && (
          <img src={form.imageUrl} alt="preview" style={styles.imagePreview} onError={(e) => { e.target.style.display = 'none'; }} />
        )}
      </div>

      <div style={styles.divider} />

      {/* Section: When & Where */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>When & Where</p>
        <div style={common.fieldGroup}>
          <label style={common.label}>Venue</label>
          <input style={common.input} name="venue" placeholder="e.g. Madison Square Garden" value={form.venue} onChange={handleChange} required />
        </div>
        <div style={styles.row}>
          <div style={common.fieldGroup}>
            <label style={common.label}>Date</label>
            <input style={common.input} type="text" name="date" placeholder="e.g. Apr 12, 2026" value={form.date} onChange={handleChange} required />
          </div>
          <div style={common.fieldGroup}>
            <label style={common.label}>Doors Open</label>
            <input style={common.input} type="text" name="doorsOpen" placeholder="e.g. 7:00 PM" value={form.doorsOpen} onChange={handleChange} required />
          </div>
        </div>
        <div style={common.fieldGroup}>
          <label style={common.label}>Ticket Price ($)</label>
          <input style={common.input} type="number" name="price" placeholder="e.g. 49" min="0" value={form.price} onChange={handleChange} required />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Section: About */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>About the Event</p>
        <div style={common.fieldGroup}>
          <label style={common.label}>Description</label>
          <textarea style={styles.textarea} name="description" placeholder="Describe the experience, lineup, and what makes this event special..." value={form.description} onChange={handleChange} required rows={4} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Section: Details */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>Event Details</p>
        <div style={styles.row}>
          <div style={common.fieldGroup}>
            <label style={common.label}>Genre</label>
            <select style={common.input} name="genre" value={form.genre} onChange={handleChange} required>
              <option value="">Select genre</option>
              <option>Rock</option>
              <option>Pop</option>
              <option>Jazz</option>
              <option>Classical</option>
              <option>Symphony</option>
              <option>Drum & Bass</option>
              <option>Hip-Hop</option>
              <option>Electronic</option>
              <option>R&B</option>
              <option>Other</option>
            </select>
          </div>
          <div style={common.fieldGroup}>
            <label style={common.label}>Capacity</label>
            <input style={common.input} type="number" name="capacity" placeholder="e.g. 5000" min="1" value={form.capacity} onChange={handleChange} required />
          </div>
        </div>
        <div style={styles.row}>
          <div style={common.fieldGroup}>
            <label style={common.label}>Age Limit</label>
            <select style={common.input} name="ageLimit" value={form.ageLimit} onChange={handleChange} required>
              <option value="">Select</option>
              <option>All Ages</option>
              <option>16+</option>
              <option>18+</option>
              <option>21+</option>
            </select>
          </div>
          <div style={common.fieldGroup}>
            <label style={common.label}>Photography</label>
            <select style={common.input} name="photography" value={form.photography} onChange={handleChange} required>
              <option value="">Select</option>
              <option>Allowed</option>
              <option>Not Allowed</option>
            </select>
          </div>
        </div>
      </div>

      {mutation.isError && (
        <p style={{ color: '#FF2E63', margin: '0 0 1rem' }}>
          Failed to save: {mutation.error?.message}
        </p>
      )}

      <button style={styles.submitBtn} className="btn-primary" type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving…' : submitLabel}
      </button>

    </form>
  );
}
