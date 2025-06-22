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
  }, []);

  const calculateTotal = (mahsulotlar) => {
    return mahsulotlar.reduce(
      (sum, m) => sum + parseFloat(m.narx) * parseFloat(m.miqdor),
      0
    );
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto font-sans">
        <Link to="/tovarlar" className="text-blue-600 underline mb-4 block">⬅ Ortga qaytish</Link>
        <p className="text-red-600 text-lg">Ma‘lumot topilmadi</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <Link to="/tovarlar" className="text-blue-600 underline mb-4 block">⬅ Ortga qaytish</Link>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{sana} sanasidagi mahsulotlar</h2>

      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-lg bg-white shadow-md mb-6 p-4 sm:p-6"
        >
          {card.ism && (
            <p className="text-base sm:text-lg mb-2">
              <span className="font-semibold text-gray-700">Ism:</span> {card.ism}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-t border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">Tovar</th>
                  <th className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">Miqdor</th>
                  <th className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">Narx</th>
                  <th className="py-2 px-2 sm:px-3 border-b text-right whitespace-nowrap">Umumiy</th>
                </tr>
              </thead>
              <tbody>
                {card.mahsulotlar.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">{m.tovar}</td>
                    <td className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">{m.miqdor} {m.birlik}</td>
                    <td className="py-2 px-2 sm:px-3 border-b whitespace-nowrap">{parseFloat(m.narx).toLocaleString()} so‘m</td>
                    <td className="py-2 px-2 sm:px-3 border-b text-right font-semibold whitespace-nowrap">
                      {(parseFloat(m.narx) * parseFloat(m.miqdor)).toLocaleString()} so‘m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right text-base sm:text-lg font-bold text-gray-800">
            Jami: {calculateTotal(card.mahsulotlar).toLocaleString()} so‘m
          </div>
        </div>
      ))}
    </div>
  );
}

export default TovarTarixiDetail;
