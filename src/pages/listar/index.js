import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import DivAlert from '../../components/DivAlert';

function Listar() {
    const history = useHistory();
    const [contatos, setContatos] = useState([]);
    const [mensagem, setMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const carregar = useCallback(() => {
        setContatos(null);
        setMensagem(null);
        setCarregando(true);
        api.get('/contatos')
        .then((response) => {
            if (Array.isArray(response.data) && response.data.length > 0) {
                setContatos(response.data);
            } else {
                setMensagem(divAlert('Não há contatos cadastrados', 'alert-danger'));
            }
        })
        .catch((error) => {
            setMensagem(divAlert(error.response ? error.response.data.message : 'Não foi possível carregar os contatos', 'alert-danger'));
        })
        .finally(() => setCarregando(false));
    }, []);

    useEffect(() => {
        carregar();
    }, [carregar]);

    function handleAtualizar(contato) {
        history.push('/editar', { contato });
    }

    function handleExcluir(contato) {
        setMensagem(null);
        api.delete(`/contatos/${contato.id}`)
        .then((response) => {
            setContatos(contatos.filter(_contato => _contato.id !== contato.id));
            setMensagem(divAlert(response.data.message, 'alert-success'));
        })
        .catch((error) => {
            setMensagem(divAlert(error.response ? error.response.data.message : 'Não foi possível excluir o contato', 'alert-danger'));
        });
    }

    function divAlert(message, alert) {
        return (<DivAlert message={message} alert={alert} />);
    }

    function carregarTabela() {
        return contatos && contatos.length > 0 ? (
            <div className="table-responsive">
                <table id="tabelaHeroi" className="table table-bordered table-sm mx-auto w-auto">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map(contato => (
                            <tr key={contato.id}>
                                <td>{contato.nome}</td>
                                <td>{contato.telefone}</td>
                                <td>{contato.email}</td>
                                <td>
                                    <button className="btn btn-primary" style={{ height: '1.5em' }}>
                                        <span style={{ position: 'relative', bottom: '8px' }} onClick={() => handleAtualizar(contato)}>Editar</span>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" style={{ height: '1.5em' }}>
                                        <span style={{ position: 'relative', bottom: '8px' }} onClick={() => handleExcluir(contato)}>Excluir</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : null;
    }

    return (
        <>
            <nav className="navbar navbar-expand py-0">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cadastrar">Cadastrar</Link>
                    </li>
                </ul>
            </nav>
            <h3>Contatos</h3>
            {carregarTabela()}
            {mensagem}
            <div className="form-row mb-4 justify-content-center">
                <button className="btn btn-success btn-fix" onClick={carregar} disabled={carregando}>Atualizar</button>
            </div>
        </>
    );
}

export default Listar;
