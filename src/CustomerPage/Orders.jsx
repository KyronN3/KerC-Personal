import React, { useContext } from 'react';
import { createData } from './Customer.jsx'
import OrderStatus from './OrderStatus.jsx'
import './OrderTable.css';

export default function OrderTable() {

  const data = useContext(createData);
  const list = data.items;

  return (
    <div className="order-table-container">
      {list.map(element =>
        <div key={element.id} className="order-card">
          <div className="order-header">
            <div className="action-buttons">
              <button className="view-button">VIEW STATUS</button>
              <button className="cancel-button">CANCEL ORDER</button>
            </div>
          </div>
          <div className="customer-info">
              <h2 className="customer-name">{element.customerName}</h2>
              <p className="contact-info">{element.contactInfo}</p>
            </div>
          <div className="order-details">
            <p className="order-description">{element.orderDetails}</p>
            <div className="order-meta">
              <div className="due-date">
                <span className="label">Due Date:</span>
                <span className="date">{element.dueDate}</span>
              </div>
              <p className="additional-info">{element.additionalInfo}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};