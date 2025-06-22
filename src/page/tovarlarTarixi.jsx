// TovarlarPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TovarlarPage() {
  const [cardsByDate, setCardsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || null
  );

  useEffect(() => {
    const stored = localStorage.getItem("cards");
    const grouped = {};
    const today = new Date();

    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach(card => {
        const sana = new Date(card.sana).toISOString().split("T")[0];
        if (!grouped[sana]) grouped[sana] = [];
        grouped[sana].push(card);
      });
    }

    for (let i = 0; i < 90; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const isoDate = date.toISOString().split("T")[0];
      if (!grouped[isoDate]) grouped[isoDate] = [];
    }

    setCardsByDate(grouped);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  const calculateTotal = (mahsulotlar) => {
    return mahsulotlar.reduce((sum, m) => sum + parseFloat(m.narx) * parseFloat(m.miqdor), 0);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
     
     <Link to="/" className="text-blue-600 hover:underline">Tovar kiritish</Link>
      <h2 className="text-2xl font-bold mb-4">Tovarlar Tarixi</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(cardsByDate).sort((a, b) => b.localeCompare(a)).map((sana) => (
          <button
            key={sana}
            onClick={() => setSelectedDate(sana)}
            className={`px-4 py-2 rounded text-white ${selectedDate === sana ? "bg-blue-600" : "bg-gray-500"}`}
          >
            {sana}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-2">{selectedDate} kunidagi tovarlar:</h3>
          {cardsByDate[selectedDate]?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cardsByDate[selectedDate].map((card) => (
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
          ) : (
            <p className="text-gray-500 italic">Bu kunda hech qanday tovar kiritilmagan.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TovarlarPage;
