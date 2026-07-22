const API_URL = 'https://api-netflix-phi.vercel.app';

async function obtenerPeliculas() {
    const res = await fetch(`${API_URL}/peliculas`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al obtener películas');
    }
    return res.json();
}

async function obtenerSeries() {
    const res = await fetch(`${API_URL}/series`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al obtener series');
    }
    return res.json();
}

async function obtenerPelicula(id) {
    const res = await fetch(`${API_URL}/peliculas/${id}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al obtener la película');
    }
    return res.json();
}

async function agregarPelicula(datos) {
    const res = await fetch(`${API_URL}/peliculas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al crear película');
    }
    return res.json();
}

async function obtenerSerie(id) {
    const res = await fetch(`${API_URL}/series/${id}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al obtener la serie');
    }
    return res.json();
}

async function agregarSerie(datos) {
    const res = await fetch(`${API_URL}/series`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al crear serie');
    }
    return res.json();
}

async function actualizarPelicula(id, datos) {
    const res = await fetch(`${API_URL}/peliculas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al actualizar película');
    }
    return res.json();
}

async function actualizarSerie(id, datos) {
    const res = await fetch(`${API_URL}/series/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al actualizar serie');
    }
    return res.json();
}

async function eliminarSerie(id) {
    const res = await fetch(`${API_URL}/series/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al eliminar serie');
    }
    return res.json();
}

async function eliminarPelicula(id) {
    const res = await fetch(`${API_URL}/peliculas/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al eliminar película');
    }
    return res.json();
}
