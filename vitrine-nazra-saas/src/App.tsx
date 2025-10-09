import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SupportContactUs from './components/SupportContactUs';
import GetStarted from './pages/GetStarted';


function App() {
  return (
      <Router>
        <div className="min-h-screen bg-nyanza dark:bg-dark_green ">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/get-started" element={<GetStarted/>} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer/>
          <SupportContactUs/>
        </div>
      </Router>
  );
}

export default App;