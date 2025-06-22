import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./page/order";
import TovarlarPage from "./page/tovarlarTarixi";

function App() {
  return (
    <Router>
      <div className="p-4 max-w-6xl mx-auto font-sans">
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/tovarlar" element={<TovarlarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
