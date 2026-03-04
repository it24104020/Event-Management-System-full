const API_URL = "http://localhost:8080/events";

export const getEvents = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addEvent = async (event) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return res.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};