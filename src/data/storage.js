// src/data/storage.js
// Capa de persistencia: envuelve localStorage y crea "repositorios" CRUD genéricos.
// Cada repositorio funciona como una tabla de una base de datos.

export const storage = {
  read(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      // Dato corrupto: se restaura el valor por defecto
      return fallback;
    }
  },
  write(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
};

/**
 * Crea un repositorio con operaciones CRUD sobre una colección persistida.
 * @param {string} key   clave de localStorage
 * @param {Array}  seed  datos iniciales si la colección no existe
 * @param {string} prefix prefijo para generar ids nuevos
 */
export const createRepository = (key, seed, prefix) => ({
  // READ
  getAll() {
    const data = storage.read(key, null);
    if (!Array.isArray(data)) {
      return storage.write(key, structuredClone(seed));
    }
    return data;
  },
  getById(id) {
    return this.getAll().find((item) => String(item.id) === String(id)) ?? null;
  },
  // CREATE
  create(data) {
    const item = { ...data, id: data.id ?? `${prefix}${Date.now().toString(36).toUpperCase()}` };
    storage.write(key, [...this.getAll(), item]);
    return item;
  },
  // UPDATE
  update(id, changes) {
    let updated = null;
    const list = this.getAll().map((item) => {
      if (String(item.id) !== String(id)) return item;
      updated = { ...item, ...changes, id: item.id };
      return updated;
    });
    if (!updated) return null;
    storage.write(key, list);
    return updated;
  },
  // DELETE
  remove(id) {
    const list = this.getAll();
    const next = list.filter((item) => String(item.id) !== String(id));
    storage.write(key, next);
    return next.length < list.length;
  },
  reset() {
    return storage.write(key, structuredClone(seed));
  },
});
