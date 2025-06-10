import React, { useEffect, useState } from 'react';
import './css/FormStyles.css';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/orders/admin-all-orders', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const onChange = (id, field, value) => {
    setEditing(e => ({
      ...e,
      [id]: { ...e[id], [field]: value }
    }));
  };

  const save = async id => {
    const { status, reason } = editing[id] || {};
    if (!status) return alert('Выберите статус');
    if (status === 'услуга отменена' && !reason) {
      return alert('Укажите причину отмены');
    }

    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/orders/update-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ id, status, reason })
    });

    setOrders(orders.map(o =>
      o.id === id ? { ...o, status, reason } : o
    ));
    setEditing(e => {
      const copy = { ...e };
      delete copy[id];
      return copy;
    });
  };

  return (
    <div className="admin-container">
      <h2>Панель администратора</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th><th>ФИО</th><th>Телефон</th><th>Email</th>
            <th>Услуга</th><th>Иная услуга</th><th>Дата</th>
            <th>Время</th><th>Оплата</th><th>Статус</th>
            <th>Причина</th><th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => {
            const edit = editing[o.id] || {};
            return (
              <tr key={o.id}>
                <td>{i+1}</td>
                <td>{o.fio}</td>
                <td>{o.phone_number}</td>
                <td>{o.email}</td>
                <td>{o.service}</td>
                <td>{o.custom_service||'—'}</td>
                <td>{o.order_date}</td>
                <td>{o.order_time}</td>
                <td>{o.pay_method}</td>
                <td className="admin-controls">
                  <select
                    value={edit.status ?? o.status}
                    onChange={e => onChange(o.id, 'status', e.target.value)}
                  >
                    <option value="новая заявка">новая заявка</option>
                    <option value="услуга оказана">услуга оказана</option>
                    <option value="услуга отменена">услуга отменена</option>
                  </select>
                </td>
                <td className="admin-controls">
                  <input
                    type="text"
                    value={edit.reason ?? o.reason ?? ''}
                    placeholder="Причина отмены"
                    onChange={e => onChange(o.id, 'reason', e.target.value)}
                    disabled={ (edit.status ?? o.status) !== 'услуга отменена' }
                  />
                </td>
                <td className="admin-controls">
                  <button onClick={() => save(o.id)}>Сохранить</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
