import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TovarlarPage() {
  const [cardsByDate, setCardsByDate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cards");
    const grouped = {};
    const today = new Date();

    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach(card => {
        let sana = "";
        if (card.sana) {
          const parts = card.sana.split(" ");
          if (parts.length > 0 && parts[0].includes(".")) {
            // Format: dd.mm.yyyy
            const [dd, mm, yyyy] = parts[0].split(".");
            sana = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
          } else {
            sana = new Date(card.sana).toISOString().split("T")[0];
          }
        } else {
          sana = new Date().toISOString().split("T")[0];
        }
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

  const handleDateClick = (sana) => {
    const stored = localStorage.getItem("cards");
    if (stored) {
      const parsed = JSON.parse(stored);
      const sanaCards = parsed.filter(card => {
        let cardDate = "";
        if (card.sana) {
          const parts = card.sana.split(" ");
          if (parts.length > 0 && parts[0].includes(".")) {
            const [dd, mm, yyyy] = parts[0].split(".");
            cardDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
          } else {
            cardDate = new Date(card.sana).toISOString().split("T")[0];
          }
        }
        return cardDate === sana;
      });

      if (sanaCards.length > 0) {
        localStorage.setItem("selectedCards", JSON.stringify(sanaCards));
      } else {
        localStorage.removeItem("selectedCards");
      }
    }
    navigate(`/tovardetails/${sana}`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <Link to="/" className="text-blue-600 hover:underline block mb-4">⬅ Orqaga</Link>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">Tovarlar Tarixi</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.keys(cardsByDate).sort((a, b) => b.localeCompare(a)).map((sana) => (
          <button
            key={sana}
            onClick={() => handleDateClick(sana)}
            className="px-3 py-2 rounded text-sm text-white bg-gray-600 hover:bg-blue-600 transition duration-200 w-full"
          >
            {sana}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TovarlarPage;
