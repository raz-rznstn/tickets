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
  ageLimit: '',
  capacity: '',
};

// "Apr 12, 2026" → "2026-04-12"
function toDateInput(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// "2026-04-12" → "Apr 12, 2026"
function fromDateInput(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// "7:00 PM" → "19:00"
function toTimeInput(str) {
  if (!str) return '';
  const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '';
  let h = parseInt(match[1]);
  const min = match[2];
  const period = match[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${min}`;
}

// "19:00" → "7:00 PM"
function fromTimeInput(str) {
  if (!str) return '';
  const [h, min] = str.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${String(min).padStart(2, '0')} ${period}`;
}

function normalizeInitialValues(values) {
  if (!values) return EMPTY_FORM;
  const { photography, highlights, ...rest } = values;
  return {
    ...rest,
    price: values.price ? String(values.price).replace(/[^0-9.]/g, '') : '',
    capacity: values.capacity ?? '',
    date: toDateInput(values.date),
    doorsOpen: toTimeInput(values.doorsOpen),
  };
}

const REQUIRED_FIELDS = {
  title:     'Concert title is required',
  venue:     'Venue is required',
  date:      'Date is required',
  doorsOpen: 'Doors open time is required',
  price:     'Ticket price is required',
  genre:     'Genre is required',
  capacity:  'Capacity is required',
  ageLimit:  'Age limit is required',
};

function validate(form) {
  const errors = {};
  Object.entries(REQUIRED_FIELDS).forEach(([field, message]) => {
    if (!form[field] || String(form[field]).trim() === '') {
      errors[field] = message;
    }
  });
  return errors;
}

const pickerInput = { colorScheme: 'dark' };

const Req = () => <span style={styles.required}>*</span>;

export default function ConcertForm({ initialValues, concertId, submitLabel = '🎟️ Publish Concert' }) {
  const [form, setForm] = useState(() => normalizeInitialValues(initialValues));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const createMutation = useCreateConcert();
  const updateMutation = useUpdateConcert(concertId);
  const mutation = concertId ? updateMutation : createMutation;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      ...form,
      price: form.price ? `$${form.price}` : form.price,
      capacity: form.capacity ? Number(form.capacity) : undefined,
      date: fromDateInput(form.date),
      doorsOpen: fromTimeInput(form.doorsOpen),
    };
    mutation.mutate(payload, { onSuccess: () => setSubmitted(true) });
  };

  const inp = (field) => ({
    ...common.input,
    ...(errors[field] ? styles.inputError : {}),
  });

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
    <form style={styles.form} onSubmit={handleSubmit} noValidate>

      {/* Section: Basic Info */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>Basic Info</p>
        <div style={common.fieldGroup}>
          <label style={common.label}>Concert Title <Req /></label>
          <input style={inp('title')} name="title" placeholder="e.g. Rock Night Live" value={form.title} onChange={handleChange} />
          {errors.title && <span style={styles.errorText}>{errors.title}</span>}
        </div>
        <div style={common.fieldGroup}>
          <label style={common.label}>Cover Image URL</label>
          <input style={common.input} name="imageUrl" placeholder="https://..." value={form.imageUrl} onChange={handleChange} />
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
          <label style={common.label}>Venue <Req /></label>
          <input style={inp('venue')} name="venue" placeholder="e.g. Madison Square Garden" value={form.venue} onChange={handleChange} />
          {errors.venue && <span style={styles.errorText}>{errors.venue}</span>}
        </div>
        <div style={styles.row}>
          <div style={common.fieldGroup}>
            <label style={common.label}>Date <Req /></label>
            <input style={{ ...inp('date'), ...pickerInput }} type="date" name="date" value={form.date} onChange={handleChange} />
            {errors.date && <span style={styles.errorText}>{errors.date}</span>}
          </div>
          <div style={common.fieldGroup}>
            <label style={common.label}>Doors Open <Req /></label>
            <input style={{ ...inp('doorsOpen'), ...pickerInput }} type="time" name="doorsOpen" value={form.doorsOpen} onChange={handleChange} />
            {errors.doorsOpen && <span style={styles.errorText}>{errors.doorsOpen}</span>}
          </div>
        </div>
        <div style={common.fieldGroup}>
          <label style={common.label}>Ticket Price ($) <Req /></label>
          <input style={inp('price')} type="number" name="price" placeholder="e.g. 49" min="0" value={form.price} onChange={handleChange} />
          {errors.price && <span style={styles.errorText}>{errors.price}</span>}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Section: About */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>About the Event</p>
        <div style={common.fieldGroup}>
          <label style={common.label}>Description</label>
          <textarea style={styles.textarea} name="description" placeholder="Describe the experience, lineup, and what makes this event special..." value={form.description} onChange={handleChange} rows={4} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Section: Details */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>Event Details</p>
        <div style={styles.row}>
          <div style={common.fieldGroup}>
            <label style={common.label}>Genre <Req /></label>
            <select style={inp('genre')} name="genre" value={form.genre} onChange={handleChange}>
              <option value="">Select genre</option>
              <option>Rock</option>
              <option>Pop</option>
              <option>Jazz</option>
              <option>Classical</option>
              <option>Symphony</option>
              <option>Country</option>
              <option>Drum & Bass</option>
              <option>Hip-Hop</option>
              <option>Electronic</option>
              <option>R&B</option>
              <option>Other</option>
            </select>
            {errors.genre && <span style={styles.errorText}>{errors.genre}</span>}
          </div>
          <div style={common.fieldGroup}>
            <label style={common.label}>Capacity <Req /></label>
            <input style={inp('capacity')} type="number" name="capacity" placeholder="e.g. 5000" min="1" value={form.capacity} onChange={handleChange} />
            {errors.capacity && <span style={styles.errorText}>{errors.capacity}</span>}
          </div>
        </div>
        <div style={common.fieldGroup}>
          <label style={common.label}>Age Limit <Req /></label>
          <select style={inp('ageLimit')} name="ageLimit" value={form.ageLimit} onChange={handleChange}>
            <option value="">Select</option>
            <option>All Ages</option>
            <option>16+</option>
            <option>18+</option>
            <option>21+</option>
          </select>
          {errors.ageLimit && <span style={styles.errorText}>{errors.ageLimit}</span>}
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
