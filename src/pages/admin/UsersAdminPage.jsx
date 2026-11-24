// src/pages/admin/UsersAdminPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../data/dataService';
import { useAuth } from '../../context/AuthContext';
import { PageTitle } from '../../components/common/PageTitle';
import { Alert } from '../../components/common/Alert';

export const UsersAdminPage = () => {
  const { user: current } = useAuth();
  const [users, setUsers] = useState(() => userService.getAll());
  const [mensaje, setMensaje] = useState('');

  const handleDelete = (u) => {
    if (!window.confirm(`¿Eliminar la cuenta de ${u.email}?`)) return;
    userService.remove(u.id);
    setUsers(userService.getAll());
    setMensaje(`Usuario ${u.email} eliminado.`);
  };

  return (
    <>
      <PageTitle title="Usuarios" subtitle={`${users.length} cuentas registradas`}>
        <Link to="/admin/usuarios/nuevo" className="btn btn-success btn-sm">Nuevo usuario</Link>
      </PageTitle>
      <Alert message={mensaje} variant="success" onClose={() => setMensaje('')} />
      <div className="table-responsive admin-panel">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Rol</th><th className="text-end">Acciones</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="text-nowrap">{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.rol === 'admin' ? 'text-bg-warning' : 'text-bg-secondary'}`}>{u.rol}</span></td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/usuarios/${u.id}`} className="btn btn-sm btn-outline-light me-1">Ver</Link>
                  <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-info me-1">Editar</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" disabled={u.id === current?.id}
                    title={u.id === current?.id ? 'No puedes eliminar tu propia cuenta' : undefined}
                    onClick={() => handleDelete(u)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
