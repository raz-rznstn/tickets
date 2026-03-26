export const fetchConcerts = () =>
  fetch('/api/concerts').then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });

export const fetchConcertById = (id) =>
  fetch(`/api/concerts/${id}`).then((res) => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });
