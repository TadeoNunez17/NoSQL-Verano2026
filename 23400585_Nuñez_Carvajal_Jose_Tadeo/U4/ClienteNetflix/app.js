const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#222222',
    color: '#ffffff',
    iconColor: '#46d369'
});

const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const temporadas = document.getElementById("temporadas");
const episodios = document.getElementById("episodios");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");
const nc = document.getElementById("nc");
const portada = document.getElementById("portada");

const campoDuracion = document.getElementById("campoDuracion");
const campoTemporadas = document.getElementById("campoTemporadas");
const campoEpisodios = document.getElementById("campoEpisodios");
const btnGuardar = document.getElementById("btnGuardar");
const tituloLista = document.getElementById("tituloLista");
const tituloFormulario = document.getElementById("tituloFormulario");
const statTotal = document.getElementById("statTotal");
const statPromedio = document.getElementById("statPromedio");
const listaPeliculas = document.getElementById("listaPeliculas");
const formIcono = document.getElementById("formIcono");
const formSideTitulo = document.getElementById("formSideTitulo");
const formSideDesc = document.getElementById("formSideDesc");
const formSideLista = document.getElementById("formSideLista");
const inputBusqueda = document.getElementById("inputBusqueda");

const modalEditar = document.getElementById("modalEditar");
const formularioEditar = document.getElementById("formularioEditar");
const tituloModal = document.getElementById("tituloModal");
const btnCancelarEditar = document.getElementById("btnCancelarEditar");
const editId = document.getElementById("editId");
const editTitulo = document.getElementById("editTitulo");
const editGenero = document.getElementById("editGenero");
const editAnio = document.getElementById("editAnio");
const editDuracion = document.getElementById("editDuracion");
const editTemporadas = document.getElementById("editTemporadas");
const editEpisodios = document.getElementById("editEpisodios");
const editIdioma = document.getElementById("editIdioma");
const editCalificacion = document.getElementById("editCalificacion");
const editNc = document.getElementById("editNc");
const editPortada = document.getElementById("editPortada");
const campoEditDuracion = document.getElementById("campoEditDuracion");
const campoEditTemporadas = document.getElementById("campoEditTemporadas");
const campoEditEpisodios = document.getElementById("campoEditEpisodios");

let tabActivo = "peliculas";
let datosOriginales = [];

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => {
            t.classList.remove("active");
            t.classList.add("inactivo");
        });
        tab.classList.remove("inactivo");
        tab.classList.add("active");
        tabActivo = tab.dataset.type;
        actualizarFormulario();
        inputBusqueda.value = "";
        cargarLista();
    });
});

inputBusqueda.addEventListener("input", () => {
    filtrarYRenderizar();
});

function actualizarFormulario() {
    const esPelicula = tabActivo === "peliculas";
    campoDuracion.style.display = esPelicula ? "" : "none";
    campoTemporadas.style.display = esPelicula ? "none" : "";
    campoEpisodios.style.display = esPelicula ? "none" : "";
    duracion.required = esPelicula;
    temporadas.required = !esPelicula;
    episodios.required = !esPelicula;

    tituloFormulario.textContent = esPelicula ? "Registrar película" : "Registrar serie";
    btnGuardar.textContent = esPelicula ? "Guardar película" : "Guardar serie";
    tituloLista.textContent = esPelicula ? "Películas registradas" : "Series registradas";

    formIcono.textContent = esPelicula ? "\uD83C\uDFAC" : "\uD83D\uDCFA";
    formSideTitulo.textContent = esPelicula ? "Nueva película" : "Nueva serie";
    formSideDesc.textContent = esPelicula
        ? "Registra los datos de tu catálogo para mantenerlo siempre actualizado."
        : "Agrega una nueva serie con todos sus datos al catálogo.";
    formSideLista.innerHTML = esPelicula
        ? '<li>Usa el No. Control como identificador único</li><li>La calificación va de 0 a 10</li><li>Puedes editar o eliminar después</li>'
        : '<li>Especifica temporadas y episodios</li><li>La calificación va de 0 a 10</li><li>Puedes editar o eliminar después</li>';
}

function filtrarYRenderizar() {
    const texto = inputBusqueda.value.toLowerCase().trim();
    const filtrados = texto === ""
        ? datosOriginales
        : datosOriginales.filter((item) => {
            return (
                (item.titulo || "").toLowerCase().includes(texto) ||
                (item.genero || "").toLowerCase().includes(texto) ||
                (item.idioma || "").toLowerCase().includes(texto) ||
                (item.nc || "").toLowerCase().includes(texto) ||
                String(item.año || "").includes(texto)
            );
        });
    renderizarLista(filtrados);
}

function renderizarLista(datos) {
    listaPeliculas.innerHTML = "";

    if (datos.length === 0) {
        listaPeliculas.innerHTML = `<li class="vacio">No se encontraron resultados</li>`;
        statTotal.textContent = "0";
        statPromedio.textContent = "0";
        return;
    }

    const promedio = datos.reduce((sum, item) => sum + item.calificacion, 0) / datos.length;
    statTotal.textContent = datos.length;
    statPromedio.textContent = promedio.toFixed(1);

    const tipo = tabActivo === "peliculas" ? "pelicula" : "serie";

    datos.forEach((item) => {
        const li = document.createElement("li");
        li.className = "peli-card";

        let infoExtra = "";
        if (tabActivo === "peliculas") {
            infoExtra = `
                <div><b>Duración</b>${item.duracion ? item.duracion + " min" : "—"}</div>
                <div><b>Año</b>${item.año}</div>
            `;
        } else {
            infoExtra = `
                <div><b>Temporadas</b>${item.temporadas || "—"}</div>
                <div><b>Episodios</b>${item.episodios || "—"}</div>
                <div><b>Año</b>${item.año}</div>
                <div><b>Duración</b>—</div>
            `;
        }

        li.innerHTML = `
            <div class="peli-poster">
                ${item.portada ? `<img src="${item.portada}" alt="${item.titulo}" onerror="this.style.display='none'">` : ""}
                <span class="peli-label">${tabActivo === "peliculas" ? "\uD83C\uDFAC PELÍCULA" : "\uD83D\uDCFA SERIE"}</span>
                <span class="peli-rating">★ ${item.calificacion}</span>
            </div>
            <div class="peli-body">
                <div class="peli-genero">${item.genero}</div>
                <div class="peli-titulo">${item.titulo}</div>
                <div class="peli-info">
                    ${infoExtra}
                    <div><b>Idioma</b>${item.idioma}</div>
                    <div><b>No. Control</b>${item.nc}</div>
                </div>
                <div class="peli-actions">
                    <button class="btn-editar" onclick="abrirEditar('${item._id}', '${tipo}')">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarRegistro('${item._id}', '${tipo}')">Eliminar</button>
                </div>
            </div>
        `;
        listaPeliculas.appendChild(li);
    });
}

async function cargarLista() {
    try {
        datosOriginales = tabActivo === "peliculas" ? await obtenerPeliculas() : await obtenerSeries();
        filtrarYRenderizar();
    } catch (error) {
        Toast.fire({ icon: 'error', title: error.message });
    }
}

async function eliminarRegistro(id, tipo) {
    const nombre = tipo === "pelicula" ? "película" : "serie";
    const result = await Swal.fire({
        title: `¿Eliminar ${nombre}?`,
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        background: '#1f1f1f',
        color: '#fff',
        iconColor: '#e50914',
        showCancelButton: true,
        confirmButtonColor: '#e50914',
        cancelButtonColor: '#333333',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;

    try {
        const respuesta = tipo === "pelicula" ? await eliminarPelicula(id) : await eliminarSerie(id);
        Toast.fire({ icon: 'success', title: respuesta.mensaje });
        cargarLista();
    } catch (error) {
        Toast.fire({ icon: 'error', title: error.message });
    }
}

async function abrirEditar(id, tipo) {
    try {
        const item = tipo === "pelicula" ? await obtenerPelicula(id) : await obtenerSerie(id);

        tituloModal.textContent = tipo === "pelicula" ? "Editar película" : "Editar serie";
        editId.value = item._id;
        editTitulo.value = item.titulo;
        editGenero.value = item.genero;
        editAnio.value = item.año;
        editIdioma.value = item.idioma;
        editCalificacion.value = item.calificacion;
        editNc.value = item.nc;
        editPortada.value = item.portada || "";

        if (tipo === "pelicula") {
            campoEditDuracion.style.display = "";
            campoEditTemporadas.style.display = "none";
            campoEditEpisodios.style.display = "none";
            editDuracion.value = item.duracion || "";
        } else {
            campoEditDuracion.style.display = "none";
            campoEditTemporadas.style.display = "";
            campoEditEpisodios.style.display = "";
            editTemporadas.value = item.temporadas || "";
            editEpisodios.value = item.episodios || "";
        }

        modalEditar.classList.add("active");
        modalEditar.dataset.tipo = tipo;
    } catch (error) {
        Toast.fire({ icon: 'error', title: error.message });
    }
}

function cerrarModal() {
    modalEditar.classList.remove("active");
    formularioEditar.reset();
}

btnCancelarEditar.addEventListener("click", cerrarModal);

modalEditar.addEventListener("click", (e) => {
    if (e.target === modalEditar) cerrarModal();
});

formularioEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tipo = modalEditar.dataset.tipo;
    const id = editId.value;

    const datos = {
        titulo: editTitulo.value,
        genero: editGenero.value,
        año: Number(editAnio.value),
        idioma: editIdioma.value,
        calificacion: Number(editCalificacion.value),
        nc: editNc.value,
        portada: editPortada.value
    };

    if (tipo === "pelicula") {
        datos.duracion = Number(editDuracion.value);
    } else {
        datos.temporadas = Number(editTemporadas.value);
        datos.episodios = Number(editEpisodios.value);
    }

    try {
        const respuesta = tipo === "pelicula" ? await actualizarPelicula(id, datos) : await actualizarSerie(id, datos);
        Toast.fire({ icon: 'success', title: respuesta.mensaje });
        cerrarModal();
        cargarLista();
    } catch (error) {
        Toast.fire({ icon: 'error', title: error.message });
    }
});

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const esPelicula = tabActivo === "peliculas";
    const datos = esPelicula
        ? {
              titulo: titulo.value,
              genero: genero.value,
              año: Number(año.value),
              duracion: Number(duracion.value),
              idioma: idioma.value,
              calificacion: Number(calificacion.value),
              nc: nc.value,
              portada: portada.value
          }
        : {
              titulo: titulo.value,
              genero: genero.value,
              año: Number(año.value),
              temporadas: Number(temporadas.value),
              episodios: Number(episodios.value),
              idioma: idioma.value,
              calificacion: Number(calificacion.value),
              nc: nc.value,
              portada: portada.value
          };

    try {
        const respuesta = esPelicula ? await agregarPelicula(datos) : await agregarSerie(datos);
        Toast.fire({ icon: 'success', title: respuesta.mensaje });
        formulario.reset();
        cargarLista();
    } catch (error) {
        Toast.fire({ icon: 'error', title: error.message });
    }
});

actualizarFormulario();
cargarLista();
