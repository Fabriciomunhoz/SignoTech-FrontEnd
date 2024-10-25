import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnqueteList from './components/EnqueteList';
import EnqueteDetalhe from './components/EnqueteDetalhe';
import CriarEnquete from './components/CriarEnquete';
import EditarEnquete from './components/EditarEnquete';
import './App.css';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<EnqueteList />} />
                    <Route path="/enquetes/:id" element={<EnqueteDetalhe />} />
                    <Route path="/criar-enquete" element={<CriarEnquete />} />
                    <Route path="/enquetes/:id/editar" element={<EditarEnquete />} />
                </Routes>
            </div>
        </Router>
    );
};
export default App;
