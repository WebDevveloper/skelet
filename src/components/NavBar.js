import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function NavBar({ role }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (['/', '/login', '/registration'].includes(pathname)) return null;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/orders">История</Link>
      <Link to="/create-orders" style={{ marginLeft: 8 }}>Новая</Link>
      {role === 'admin' && (
        <Link to="/admin" style={{ marginLeft: 8 }}>Админка</Link>
      )}
      <button onClick={logout} style={{ marginLeft: 16 }}>Выход</button>
    </nav>
  );
}
