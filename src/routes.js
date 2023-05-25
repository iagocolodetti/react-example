import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Listar from './pages/listar';
import Cadastrar from './pages/cadastrar';
import Editar from './pages/editar';

export default function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Listar/>} />
                <Route path="/cadastrar" element={<Cadastrar/>} />
                <Route path="/editar" element={<Editar/>} />
            </Routes>
        </BrowserRouter>
    );
}
