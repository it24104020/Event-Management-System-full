const API_URL = "http://localhost:8080/api/participants";

/* ✅ GET ALL PARTICIPANTS */
export const getParticipants = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch participants");
  }

  return await res.json();
};

/* ✅ ADD PARTICIPANT (FIXED FOR VALIDATION) */
export const addParticipant = async (participant) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });

  const data = await res.json();

  if (!res.ok) {
    // 🔥 send backend validation errors to UI
    throw data;
  }

  return data;
};

/* ✅ SOFT DELETE */
export const deleteParticipant = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete participant");
  }
};

/* ✅ MARK ATTENDANCE */
export const markAttendance = async (id) => {
  const res = await fetch(`${API_URL}/${id}/attend`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to mark attendance");
  }

  return await res.json();
};