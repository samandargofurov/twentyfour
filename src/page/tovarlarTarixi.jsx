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
        const sana = card.sana?.split(" ")[0] || new Date(card.sana).toISOString().split("T")[0];
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
        const cardDate = card.sana?.split(" ")[0];
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

      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {Object.keys(cardsByDate).sort((a, b) => b.localeCompare(a)).map((sana) => (
          <button
            key={sana}
            onClick={() => handleDateClick(sana)}
            className="px-3 py-2 rounded text-sm sm:text-base text-white bg-gray-600 hover:bg-blue-600 transition duration-200"
          >
            {sana}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TovarlarPage;
