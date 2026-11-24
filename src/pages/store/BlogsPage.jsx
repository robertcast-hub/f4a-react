// src/pages/store/BlogsPage.jsx
import { Link } from 'react-router-dom';
import { blogService } from '../../data/dataService';
import { formatDate } from '../../utils/format';
import { PageTitle } from '../../components/common/PageTitle';

export const BlogsPage = () => (
  <div className="container">
    <PageTitle title="Blog" subtitle="Noticias y guías de la tienda" />
    <div className="row g-4">
      {blogService.getAll().map((b) => (
        <div className="col-md-6" key={b.id}>
          <article className="card blog-card h-100">
            <img src={b.imagen} alt="" className="card-img-top" />
            <div className="card-body">
              <p className="small text-secondary-emphasis mb-1">{formatDate(b.fecha)}</p>
              <h2 className="h5 fw-bold">{b.titulo}</h2>
              <p>{b.resumen}</p>
              <Link to={`/blogs/${b.id}`} className="btn btn-outline-light btn-sm">Leer artículo</Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  </div>
);
