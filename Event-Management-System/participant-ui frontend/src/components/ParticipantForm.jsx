import { useState } from "react";
import { addParticipant } from "../services/participantService";

function ParticipantForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ✅ VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    // ✅ Sri Lankan mobile validation
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^07[0-9]{8}$/.test(mobileNumber)) {
      newErrors.mobileNumber =
        "Mobile number must start with 07 and be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ✅ SUBMIT */
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      await addParticipant({
        name: name.trim(),
        email: email.trim(),
        eventName: eventName.trim(),
        mobileNumber: mobileNumber.trim(),
      });

      // RESET
      setName("");
      setEmail("");
      setEventName("");
      setMobileNumber("");
      setErrors({});

      refresh();
    } catch (err) {
      console.error("Backend error:", err);
      alert("Failed to register participant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">

      {/* NAME */}
      <div>
        <input
          type="text"
          placeholder="Participant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* EVENT NAME */}
      <div>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.eventName && (
          <p className="text-red-500 text-sm">{errors.eventName}</p>
        )}
      </div>

      {/* ✅ MOBILE NUMBER – FULLY FIXED */}
      <div>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Mobile Number (07XXXXXXXX)"
          value={mobileNumber}
          onChange={(e) =>
            setMobileNumber(
              e.target.value.replace(/\D/g, "").slice(0, 10)
            )
          }
          className="w-full border p-2 rounded"
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Registering..." : "Add Participant"}
      </button>
    </form>
  );
}

export default ParticipantForm;