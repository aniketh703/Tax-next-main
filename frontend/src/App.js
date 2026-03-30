import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Calculators from "./pages/Calculators";
import CalculatorDetail from "./pages/CalculatorDetail";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import ComplianceCalendar from "./pages/ComplianceCalendar";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import AITaxAssistant from "./pages/AITaxAssistant";
import ClientPortal from "./pages/ClientPortal";
import NoticeHandling from "./pages/NoticeHandling";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="calculators" element={<Calculators />} />
            <Route path="calculators/:id" element={<CalculatorDetail />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<InsightDetail />} />
            <Route path="compliance-calendar" element={<ComplianceCalendar />} />
            <Route path="resources" element={<Resources />} />
            <Route path="contact" element={<Contact />} />
            <Route path="notice-handling" element={<NoticeHandling />} />
            <Route path="ai-tax-assistant" element={<AITaxAssistant />} />
            <Route path="client-portal" element={<ClientPortal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
