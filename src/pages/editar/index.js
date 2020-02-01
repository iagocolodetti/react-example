import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import DivAlert from '../../components/DivAlert';

function Editar() {
    const history = useHistory();
    const { state } = useLocation();
    let { nome: nomeAtual, telefone: telefoneAtual, email: emailAtual } = state ? state.contato : '';
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState(null);
    const [atualizando, setAtualizando] = useState(false);

    useEffect(() => {
        if (!state) {
            history.push('/');
        }
    }, [state, history]);

    function atualizar(e) {
        e.preventDefault();
        setMensagem(null);
        setAtualizando(true);
        let { contato } = state;
        api.put(`/contatos/${contato.id}`, { nome, telefone, email })
        .then(() => {
            contato = {...contato, nome, telefone, email};
            history.replace({ ...history.location, state: { contato } });
            nomeAtual = nome;
            telefoneAtual = telefone;
            emailAtual = email;
            setNome('');
            setTelefone('');
            setEmail('');
            setMensagem(divAlert('Contato atualizado com sucesso', 'alert-success'));
        })
        .catch((error) => {
            setMensagem(divAlert(error.response ? error.response.data.message : 'Não foi possível atualizar o contato', 'alert-danger'));
        })
        .finally(() => setAtualizando(false));
    }

    function divAlert(message, alert) {
        return (<DivAlert message={message} alert={alert} />);
    }

    return (
        <>
            <nav className="navbar navbar-expand py-0">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cadastrar">Cadastrar</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Listar</Link>
                    </li>
                </ul>
            </nav>
            <h3>Editar Contato</h3>
            <div className="form-row mb-4 justify-content-center">
                <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 disabled-input-wrap">
                    <input type="text" className="form-control" id="nome-atual" name="nome-atual" value={nomeAtual} disabled />
                    <span className="floating-label">Nome Atual</span>
                </div>
            </div>
            <div className="form-row mb-4 justify-content-center">
                <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 disabled-input-wrap">
                    <input type="text" className="form-control" id="telefone-atual" name="telefone-atual" value={telefoneAtual} disabled />
                    <span className="floating-label">Telefone Atual</span>
                </div>
            </div>
            <div className="form-row mb-4 justify-content-center">
                <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 disabled-input-wrap">
                    <input type="email" className="form-control" id="email-atual" name="email-atual" value={emailAtual} disabled />
                    <span className="floating-label">Email Atual</span>
                </div>
            </div>
            <hr />
            <form onSubmit={atualizar}>
            <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                        <span className="floating-label">Novo Nome</span>
                    </div>
                </div>
                <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="telefone" name="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                        <span className="floating-label">Novo Telefone</span>
                    </div>
                </div>
                <div className="form-row mb-4 justify-content-center">
                    <div className="col-xs-12 col-sm-11 col-md-4 col-lg-4 input-wrap">
                        <input type="text" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <span className="floating-label">Novo Email</span>
                    </div>
                </div>
                {mensagem}
                <div className="form-row mb-4 justify-content-center">
                    <button type="submit" className="btn btn-success btn-fix" disabled={atualizando || !nome || !telefone || !email}>Atualizar</button>
                </div>
            </form>
        </>
    );
}

export default Editar;
