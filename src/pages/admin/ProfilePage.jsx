// src/pages/admin/ProfilePage.jsx
import { useState } from 'react';
import { userService } from '../../data/dataService';
import { useAuth } from '../../context/AuthContext';
import { UserForm } from '../../components/admin/UserForm';
import { PageTitle } from '../../components/common/PageTitle';
import { Alert } from '../../components/common/Alert';

export const ProfilePage = () => {
  const { user, refresh } = useAuth();
  const [ok, setOk] = useState('');
  const full = userService.getById(user.id) ?? user;

  const handleSubmit = (data, setErrors) => {
    if (userService.emailExists(data.email, user.id)) {
      setErrors({ email: 'Ya existe otro usuario con ese correo.' });
      return;
    }
    const saved = userService.update(user.id, { ...data, rol: full.rol });
    refresh(saved);
    setOk('Perfil actualizado.');
  };

  return (
    <>
      <PageTitle title="Mi perfil" subtitle="Datos de tu cuenta de administrador" />
      <Alert message={ok} variant="success" onClose={() => setOk('')} />
      <div className="admin-panel p-3 p-md-4">
        <UserForm initialValues={full} isEdit lockRole onSubmit={handleSubmit} />
      </div>
    </>
  );
};
