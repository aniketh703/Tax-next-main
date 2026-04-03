import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";

function App() {
  return (
    <div className="App">
      <Router>
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
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
