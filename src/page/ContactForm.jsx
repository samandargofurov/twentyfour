import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    }
  };

  return (
    <>
      <Link to="/" className="text-blue-600 hover:underline block mb-4">⬅ Orqaga</Link>
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Biz bilan bog‘laning</h2>
      {success && <p style={{ color: "green" }}>✅ Xabaringiz yuborildi!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ismingiz"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefon raqamingiz"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <textarea
          name="message"
          placeholder="Xabaringiz"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        ></textarea>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Yuborish
        </button>
      </form>
    </div>
    </>
  );
};

export default ContactForm;
