import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Order() {
  const [cards, setCards] = useState(() => JSON.parse(localStorage.getItem("cards")) || []);
  const [currentBuyer, setCurrentBuyer] = useState(() =>
    JSON.parse(localStorage.getItem("currentBuyer")) || { ism: "", mahsulotlar: [] }
  );
  const [tovarForm, setTovarForm] = useState(() =>
    JSON.parse(localStorage.getItem("tovarForm")) || {
      tovar: "", kategoriya: "", miqdor: "", birlik: "kg", narx: ""
    }
  );
  const [editIndex, setEditIndex] = useState(null);

  const birliklar = ["kg", "dona", "metr", "sm", "kv"];
  const kategoriyalar = ["Sement 400", "Gips", "Armatura", "Gipskarton", "Fanera", "Boshqa"];

  useEffect(() => localStorage.setItem("cards", JSON.stringify(cards)), [cards]);
  useEffect(() => localStorage.setItem("currentBuyer", JSON.stringify(currentBuyer)), [currentBuyer]);
  useEffect(() => localStorage.setItem("tovarForm", JSON.stringify(tovarForm)), [tovarForm]);

  const handleBuyerChange = (e) =>
    setCurrentBuyer({ ...currentBuyer, [e.target.name]: e.target.value });

  const handleTovarChange = (e) =>
    setTovarForm({ ...tovarForm, [e.target.name]: e.target.value });

  const addTovar = (e) => {
    e.preventDefault();
    if (!tovarForm.tovar || !tovarForm.miqdor || !tovarForm.narx) return;

    const mahsulotlar = [...currentBuyer.mahsulotlar];
    if (editIndex !== null) {
      mahsulotlar[editIndex] = tovarForm;
      setEditIndex(null);
    } else {
      mahsulotlar.push(tovarForm);
    }

    setCurrentBuyer({ ...currentBuyer, mahsulotlar });
    setTovarForm({ tovar: "", kategoriya: "", miqdor: "", birlik: "kg", narx: "" });
  };

  const saveCard = () => {
    const sana = new Date().toISOString().split("T")[0]; // faqat YYYY-MM-DD qismi
    const newCard = {
      ...currentBuyer,
      sana,
      id: Date.now()
    };
    const updated = [newCard, ...cards];
    setCards(updated);
    setCurrentBuyer({ ism: "", mahsulotlar: [] });
    localStorage.removeItem("currentBuyer");
    localStorage.removeItem("tovarForm");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <div className="flex items-center justify-between">
      <Link to="/tovarlar" className="text-blue-600 underline block mb-4">⬅ Tovarlar Tarixi</Link>
      <Link to="/contactForm" className="text-blue-600 underline block mb-4">⬅ Contact Form</Link>
      </div>
      <h2 className="text-xl font-bold mb-4">Yangi Xaridor Uchun Mahsulotlar</h2>

      <input
        type="text"
        name="ism"
        placeholder="Ism (ixtiyoriy)"
        value={currentBuyer.ism}
        onChange={handleBuyerChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <form onSubmit={addTovar} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-4">
        <select name="kategoriya" value={tovarForm.kategoriya} onChange={handleTovarChange} className="border px-2 py-1 rounded">
          <option value="">Kategoriya</option>
          {kategoriyalar.map(k => <option key={k}>{k}</option>)}
        </select>
        <input name="tovar" value={tovarForm.tovar} onChange={handleTovarChange} placeholder="Tovar" className="border px-2 py-1 rounded" />
        <input name="miqdor" value={tovarForm.miqdor} onChange={handleTovarChange} placeholder="Miqdor" type="number" className="border px-2 py-1 rounded" />
        <select name="birlik" value={tovarForm.birlik} onChange={handleTovarChange} className="border px-2 py-1 rounded">
          {birliklar.map(b => <option key={b}>{b}</option>)}
        </select>
        <input name="narx" value={tovarForm.narx} onChange={handleTovarChange} placeholder="Narx" type="number" className="border px-2 py-1 rounded" />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-1">
          {editIndex !== null ? "Tahrirlash" : "+ Qo‘shish"}
        </button>
      </form>

      {currentBuyer.mahsulotlar.length > 0 && (
        <>
          <ul className="mb-4 space-y-2">
            {currentBuyer.mahsulotlar.map((m, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span>{m.tovar} - {m.miqdor} {m.birlik}, {m.narx} so‘m</span>
                  <button onClick={() => {
                    setEditIndex(i);
                    setTovarForm(m);
                  }} className="text-blue-500 text-sm">Tahrirlash</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={saveCard} className="bg-green-600 text-white px-4 py-2 rounded">
            Card yaratish
          </button>
        </>
      )}
    </div>
  );
}

export default Order;
