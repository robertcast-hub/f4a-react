// src/pages/admin/UserFormPage.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../data/dataService';
import { UserForm } from '../../components/admin/UserForm';
import { PageTitle } from '../../components/common/PageTitle';
import { EmptyState } from '../../components/common/EmptyState';

export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const user = isEdit ? userService.getById(id) : undefined;

  if (isEdit && !user) return <EmptyState title="Usuario no encontrado" actionTo="/admin/usuarios" actionLabel="Volver" />;

  const handleSubmit = (data, setErrors) => {
    if (userService.emailExists(data.email, user?.id ?? null)) {
      setErrors({ email: 'Ya existe otro usuario con ese correo.' });
      return;
    }
    const saved = isEdit ? userService.update(id, data) : userService.create(data);
    navigate(`/admin/usuarios/${saved.id}`);
  };

  return (
    <>
      <PageTitle title={isEdit ? 'Editar usuario' : 'Nuevo usuario'} />
      <div className="admin-panel p-3 p-md-4">
        <UserForm initialValues={user} isEdit={isEdit} onSubmit={handleSubmit} onCancel={() => navigate('/admin/usuarios')} />
      </div>
    </>
  );
};
