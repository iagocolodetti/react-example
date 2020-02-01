import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import DivAlert from '../../components/DivAlert';

function Cadastrar() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState(null);
    const [cadastrando, setCadastrando] = useState(false);

    function cadastrar(e) {
        e.preventDefault();
        setMensagem(null);
        setCadastrando(true);
        api.post('/contatos', { nome, telefone, email })
        .then(() => {
            setNome('');
            setTelefone('');
            setEmail('');
            setMensagem(divAlert('Contato cadastrado com sucesso', 'alert-success'));
        })
        .catch((error) => {
            setMensagem(divAlert(error.response ? error.response.data.message : 'Não foi possível cadastrar o contato', 'alert-danger'));
        })
        .finally(() => setCadastrando(false));
    }

    function divAlert(message, alert) {
        return (<DivAlert message={message} alert={alert} />);
    }

    return (
        <>
            <nav className="navbar navbar-expand py-0">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Listar</Link>
                    </li>
                </ul>
            </nav>
            <h3>Cadastrar Contato</h3>
            <form onSubmit={cadastrar}>
                <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                        <span className="floating-label">Nome</span>
                    </div>
                </div>
                <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="telefone" name="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                        <span className="floating-label">Telefone</span>
                    </div>
                </div>
                <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <span className="floating-label">Email</span>
                    </div>
                </div>
                {mensagem}
                <div className="form-row mb-4 justify-content-center">
                    <button type="submit" className="btn btn-success btn-fix" disabled={cadastrando || !nome || !telefone || !email}>Cadastrar</button>
                </div>
            </form>
        </>
    );
}

export default Cadastrar;
