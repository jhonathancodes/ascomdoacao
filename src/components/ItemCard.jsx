import React from 'react';

export default function ItemCard({ item, onApprove, onReject, isDoadorPanel = false }) {
    const getStatusClassName = (status) => {
        switch (status) {
            case 'pendente':
                return 'status-pending';
            case 'aprovado':
                return 'status-approved';
            default:
                return 'status-unknown';
        }
    };

    return (
        <div className="item-card">
            <div className="item-header">
                <h4>{item.title}</h4>
                <span className={`item-status ${getStatusClassName(item.status)}`}>{item.status.toUpperCase()}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <p className="item-contact">Contato: {item.phone}</p>
            {item.status === 'pendente' && !isDoadorPanel && (
                <div className="item-actions">
                    <button className="approve-button" onClick={onApprove}>Aprovar</button>
                    <button className="reject-button" onClick={onReject}>Rejeitar</button>
                </div>
            )}
            {isDoadorPanel && (
                <div className="item-actions">
                    <button className="delete-button" onClick={onReject}>Excluir</button>
                </div>
            )}
        </div>
    );
}