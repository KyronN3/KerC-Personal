import React, { useState } from 'react';
import './OrderHistory.css';

export default function OrderHistory(){
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const orders = [
    {
      id: 42,
      date: '11/03/2022 09:26',
      deliveryDate: '11/18/2022',
      total: '$210.50',
      quantity: 11,
      status: 'SUBMITTED',
    },
    {
      id: 36,
      date: '11/01/2022 12:51',
      deliveryDate: '12/10/2022',
      total: '$65.00',
      quantity: 5,
      status: 'INVOICED',
    },
    {
      id: 35,
      date: '11/01/2022 12:40',
      deliveryDate: '12/07/2022',
      total: '$65.00',
      quantity: 5,
      status: 'SUBMITTED',
    },
    {
      id: 24,
      date: '11/02/2022 08:15',
      deliveryDate: '11/04/2022',
      total: '$82.50',
      quantity: 10,
      status: 'SUBMITTED',
    }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', { toDate });
  };

  const handleClear = () => {
    setToDate('');
  };

  return (
    <div className="order-history-container">

      <div className="header">
        <h1>Order History</h1>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label>FROM DATE</label>
          <div className="select-wrapper">
            <select value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
              <option value="">Select Date</option>
              <option value="2022-11-01">Nov 1, 2022</option>
              <option value="2022-11-02">Nov 2, 2022</option>
              <option value="2022-11-03">Nov 3, 2022</option>
            </select>
          </div>
        </div>


        <button className="clear-btn" onClick={handleClear}>CLEAR</button>
        <button className="search-btn" onClick={handleSearch}>SEARCH</button>
      </div>

      <div className="order-table">
        <div className="table-header">
          <div className="col id">ID</div>
          <div className="col total">NAME</div>
          <div className="col date">DATE</div>
          <div className="col delivery-date">DUE DATE</div>
          <div className="col total">TOTAL</div>
          <div className="col quantity">QUANTITY</div>
        </div>

        {orders.map(order => (
          <div className="table-row" key={order.id}>
            <div className="col id">{order.id}</div>
            <div className="col total">CAAMPED</div>
            <div className="col date">{order.date}</div>
            <div className="col delivery-date">{order.deliveryDate}</div>
            <div className="col total">{order.total}</div>
            <div className="col quantity">{order.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
