import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Listar from './pages/listar';
import Cadastrar from './pages/cadastrar';
import Editar from './pages/editar';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Listar} />
                <Route path="/cadastrar" component={Cadastrar} />
                <Route path="/editar" component={Editar} />
            </Switch>
        </BrowserRouter>
    );
}
