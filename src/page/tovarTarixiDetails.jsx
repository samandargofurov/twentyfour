import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TovarTarixiDetail() {
  const { sana } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCards");
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, [sana]);

  const calculateTotal = (mahsulotlar) =>
    mahsulotlar.reduce((sum, m) => sum + parseFloat(m.narx) * parseFloat(m.miqdor), 0);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto font-sans">
        <Link to="/tovarlar" className="text-blue-600 underline mb-4 block">⬅ Ortga qaytish</Link>
        <p className="text-red-600">Ma‘lumot topilmadi</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <Link to="/tovarlar" className="text-blue-600 underline mb-4 block">⬅ Ortga qaytish</Link>
      <h2 className="text-xl font-bold text-center mb-6">{sana} sanasidagi mahsulotlar</h2>

      {cards.map((card, i) => (
        <div key={i} className="border rounded bg-white shadow-md mb-6 p-4">
          {card.ism && <p className="mb-2"><strong>Ism:</strong> {card.ism}</p>}

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-t">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2">Tovar</th>
                  <th className="px-2 py-2">Miqdor</th>
                  <th className="px-2 py-2">Narx</th>
                  <th className="px-2 py-2 text-right">Umumiy</th>
                </tr>
              </thead>
              <tbody>
                {card.mahsulotlar.map((m, j) => (
                  <tr key={j} className="border-b">
                    <td className="px-2 py-2">{m.tovar}</td>
                    <td className="px-2 py-2">{m.miqdor} {m.birlik}</td>
                    <td className="px-2 py-2">{parseFloat(m.narx).toLocaleString()} so‘m</td>
                    <td className="px-2 py-2 text-right font-semibold">{(parseFloat(m.narx) * parseFloat(m.miqdor)).toLocaleString()} so‘m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right font-bold text-gray-800">
            Jami: {calculateTotal(card.mahsulotlar).toLocaleString()} so‘m
          </div>
        </div>
      ))}
    </div>
  );
}

export default TovarTarixiDetail;
