import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BaziPage from './pages/BaziPage';
import FengshuiPage from './pages/FengshuiPage';
import ZuoxiangPage from './pages/ZuoxiangPage';
import ChuweiPage from './pages/ChuweiPage';
import HuxingPage from './pages/HuxingPage';
import ShichenPage from './pages/ShichenPage';
import VipPage from './pages/VipPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import DongxiPage from './pages/DongxiPage';
import PeisePage from './pages/PeisePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bazi" element={<BaziPage />} />
            <Route path="/fengshui" element={<FengshuiPage />} />
            <Route path="/fengshui/zuoxiang" element={<ZuoxiangPage />} />
            <Route path="/fengshui/chuwei" element={<ChuweiPage />} />
            <Route path="/fengshui/huxing" element={<HuxingPage />} />
            <Route path="/shichen" element={<ShichenPage />} />
            <Route path="/vip" element={<VipPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tool/dongxi" element={<DongxiPage />} />
            <Route path="/tool/peise" element={<PeisePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
