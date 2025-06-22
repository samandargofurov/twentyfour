import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Order() {
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("cards");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentBuyer, setCurrentBuyer] = useState(() => {
    const storedBuyer = localStorage.getItem("currentBuyer");
    return storedBuyer ? JSON.parse(storedBuyer) : { ism: "", mahsulotlar: [] };
  });

  const [tovarForm, setTovarForm] = useState(() => {
    const storedForm = localStorage.getItem("tovarForm");
    return storedForm
      ? JSON.parse(storedForm)
      : { tovar: "", kategoriya: "", miqdor: "", birlik: "kg", narx: "" };
  });

  const [editIndex, setEditIndex] = useState(null);

  const birliklar = ["kg", "dona", "metr", "sm", "kv"];

  const kategoriyalar = [
    "Sement 400", "Sement 450", "Sement 550",
    "Gips", "Taxta", "Gofra truba", "Armatura",
    "Gipskarton", "Fanera", "DSP rangli", "DSP rangsiz katta", "DSP rangsiz kichik",
    "Boshqa"
  ];

  const getFormattedDateTime = () => {
    const now = new Date();
    return now.toLocaleString("uz-UZ");
  };

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("currentBuyer", JSON.stringify(currentBuyer));
  }, [currentBuyer]);

  useEffect(() => {
    localStorage.setItem("tovarForm", JSON.stringify(tovarForm));
  }, [tovarForm]);

  const handleBuyerChange = (e) => {
    setCurrentBuyer({ ...currentBuyer, [e.target.name]: e.target.value });
  };

  const handleTovarChange = (e) => {
    const { name, value } = e.target;
    setTovarForm({ ...tovarForm, [name]: value });
  };

  const addTovar = (e) => {
    e.preventDefault();
    const yangi = { ...tovarForm };
    if (!yangi.tovar || !yangi.miqdor || !yangi.narx) return;

    const updatedMahsulotlar = [...currentBuyer.mahsulotlar];

    if (editIndex !== null) {
      updatedMahsulotlar[editIndex] = yangi;
      setEditIndex(null);
    } else {
      updatedMahsulotlar.push(yangi);
    }

    setCurrentBuyer({ ...currentBuyer, mahsulotlar: updatedMahsulotlar });
    setTovarForm({ tovar: "", kategoriya: "", miqdor: "", birlik: "kg", narx: "" });
  };

  const handleEdit = (index) => {
    setTovarForm(currentBuyer.mahsulotlar[index]);
    setEditIndex(index);
  };

  const saveCard = () => {
    const newCard = {
      ...currentBuyer,
      sana: getFormattedDateTime(),
      id: Date.now(),
    };
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setCurrentBuyer({ ism: "", mahsulotlar: [] });
    setTovarForm({ tovar: "", kategoriya: "", miqdor: "", birlik: "kg", narx: "" });
    localStorage.removeItem("currentBuyer");
    localStorage.removeItem("tovarForm");
  };

  const calculateTotal = (mahsulotlar) => {
    return mahsulotlar.reduce((sum, m) => {
      return sum + parseFloat(m.narx) * parseFloat(m.miqdor);
    }, 0);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <Link to="/tovarlar" className="text-blue-600 hover:underline block mb-4">Tovarlar Tarixi</Link>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Yangi Xaridor Uchun Mahsulotlar</h2>

      <div className="mb-4">
        <label className="block mb-1">Ism (ixtiyoriy):</label>
        <input
          type="text"
          name="ism"
          value={currentBuyer.ism}
          onChange={handleBuyerChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <form onSubmit={addTovar} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-4">
        <select
          name="kategoriya"
          value={tovarForm.kategoriya}
          onChange={handleTovarChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Kategoriya tanlang</option>
          {kategoriyalar.map((kat) => (
            <option key={kat} value={kat}>{kat}</option>
          ))}
        </select>
        <input
          type="text"
          name="tovar"
          placeholder="Tovar nomi"
          value={tovarForm.tovar}
          onChange={handleTovarChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="miqdor"
          placeholder="Miqdori"
          value={tovarForm.miqdor}
          onChange={handleTovarChange}
          required
          className="border px-3 py-2 rounded"
        />
        <select
          name="birlik"
          value={tovarForm.birlik}
          onChange={handleTovarChange}
          className="border px-3 py-2 rounded"
        >
          {birliklar.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input
          type="number"
          name="narx"
          placeholder="Narxi"
          value={tovarForm.narx}
          onChange={handleTovarChange}
          required
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editIndex !== null ? "Tahrirlash" : "+ Qo‘shish"}
        </button>
      </form>

      {currentBuyer.mahsulotlar.length > 0 && (
        <>
          <h4 className="font-semibold mb-2">Qo‘shilgan mahsulotlar:</h4>
          <ul className="mb-4 space-y-1">
            {currentBuyer.mahsulotlar.map((m, i) => (
              <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-2 rounded">
                <span>
                  <strong>{m.kategoriya ? `${m.kategoriya}: ` : ""}</strong>
                  {m.tovar} - {m.miqdor} {m.birlik}, {m.narx} so‘m,
                  <strong> {(parseFloat(m.narx) * parseFloat(m.miqdor)).toLocaleString()} so‘m</strong>
                </span>
                <button
                  className="text-blue-500 text-sm mt-1 sm:mt-0"
                  onClick={() => handleEdit(i)}
                >
                  Tahrirlash
                </button>
              </li>
            ))}
          </ul>
          <button onClick={saveCard} className="bg-green-600 text-white px-4 py-2 rounded">
            Card yaratish
          </button>
        </>
      )}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">Bugungi Tovarlar Ro‘yxati</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border rounded p-4 bg-white shadow">
            <p><strong>Sana:</strong> {card.sana}</p>
            {card.ism && <p><strong>Ism:</strong> {card.ism}</p>}
            <p className="font-semibold mt-2">Mahsulotlar:</p>
            <ul className="list-disc list-inside">
              {card.mahsulotlar.map((m, i) => (
                <li key={i}>
                  <strong>{m.kategoriya ? `${m.kategoriya}: ` : ""}</strong>
                  {m.tovar} - {m.miqdor} {m.birlik}, {m.narx} so‘m,
                  <strong> {(parseFloat(m.narx) * parseFloat(m.miqdor)).toLocaleString()} so‘m</strong>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold text-right">Jami: {calculateTotal(card.mahsulotlar).toLocaleString()} so‘m</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
