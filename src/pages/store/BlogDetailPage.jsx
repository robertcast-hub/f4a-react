// src/pages/store/BlogDetailPage.jsx
import { Link, useParams } from 'react-router-dom';
import { blogService } from '../../data/dataService';
import { formatDate } from '../../utils/format';
import { EmptyState } from '../../components/common/EmptyState';

export const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogService.getById(id);

  if (!blog) {
    return <div className="container"><EmptyState title="Artículo no encontrado" actionTo="/blogs" actionLabel="Ver el blog" /></div>;
  }

  return (
    <article className="container" style={{ maxWidth: 760 }}>
      <Link to="/blogs" className="small">Volver al blog</Link>
      <h1 className="fw-bold mt-2">{blog.titulo}</h1>
      <p className="small text-secondary-emphasis">{formatDate(blog.fecha)} · {blog.autor}</p>
      <img src={blog.imagen} alt="" className="img-fluid rounded-3 mb-4 w-100" />
      {blog.contenido.map((p) => <p key={p.slice(0, 24)} className="fs-5">{p}</p>)}
    </article>
  );
};
