import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./page/order";
import TovarlarPage from "./page/tovarlarTarixi";
import TovarTarixiDetail from "./page/tovarTarixiDetails";
import ContactForm from "./page/ContactForm";

function App() {
  return (
    <Router>
      <div className="p-4 max-w-6xl mx-auto font-sans">
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/tovarlar" element={<TovarlarPage />} />
          <Route path="/tovardetails/:sana" element={<TovarTarixiDetail />} />
          <Route path="/contactForm" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
