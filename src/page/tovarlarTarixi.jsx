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
        const sana = card.sana?.split(/[T\s]/)[0] || new Date().toISOString().split("T")[0];
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
      const filtered = parsed.filter(card => card.sana?.split(/[T\s]/)[0] === sana);
      if (filtered.length > 0) {
        localStorage.setItem("selectedCards", JSON.stringify(filtered));
      } else {
        localStorage.removeItem("selectedCards");
      }
      navigate(`/tovardetails/${sana}`);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <Link to="/" className="text-blue-600 hover:underline block mb-4">⬅ Orqaga</Link>
      <h2 className="text-xl font-bold mb-4 text-center">Tovarlar Tarixi</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.keys(cardsByDate)
          .filter(sana => cardsByDate[sana].length > 0)
          .sort((a, b) => b.localeCompare(a))
          .map(sana => (
            <button
              key={sana}
              onClick={() => handleDateClick(sana)}
              className="bg-gray-600 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm"
            >
              {sana}
            </button>
          ))}
      </div>
    </div>
  );
}

export default TovarlarPage;
