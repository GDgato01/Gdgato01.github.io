function mostrarSeccion(id) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach((seccion) => seccion.classList.remove("visible"));

  // Mostrar la sección seleccionada
  const seccionSeleccionada = document.getElementById(id);
  seccionSeleccionada.classList.add("visible");
}

// Inicializar la primera sección (opcional)
document.addEventListener("DOMContentLoaded", () => mostrarSeccion("inicio"));

// Inicializar el mapa
const map = L.map("map", {
  center: [7.661397, -76.666652],
  zoom: 16,
  zoomControl: false, // Ocultar los controles de zoom
});

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      '&copy; <a href="https://www.esri.com/en-us/arcgis/products/arcgis-online/overview">Esri</a> contributors',
  },
).addTo(map);

// Agregar marcador en las coordenadas proporcionadas
L.marker([7.661397, -76.666652]).addTo(map).openPopup();

// Panel superior
document.getElementById("menuApiario").addEventListener("change", function () {
  const selectedOption = this.value;
  const buttons = document.querySelectorAll(".barra-superior button");

  // Opciones que activan los botones (modifica estos valores según tus opciones activas)
  const opcionesActivas = ["opcion1", "opcion2"];
  const colors = ["#555555", "#555555", "#555555", "#555555", "#555555"]; // Colores distintos para cada botón

  // Comprobar si la opción seleccionada está en la lista de opciones activas
  if (opcionesActivas.includes(selectedOption)) {
    // Habilitar los botones y asignarles los colores
    buttons.forEach((button, index) => {
      button.disabled = false;
      button.style.backgroundColor = colors[index];
    });

    // Configurar el comportamiento específico según la opción seleccionada
    if (selectedOption === "opcion1") {
      // Para opcion1, el botón A muestra la sección A, el botón B muestra la sección A, el botón C muestra la sección C, el botón D muestra la sección D, y el botón E muestra la sección E
      document.querySelector(".botonA").onclick = () =>
        mostrarSeccion("seccionA");
      document.querySelector(".botonB").onclick = () =>
        mostrarSeccion("seccionB");
      document.querySelector(".botonC").onclick = () =>
        mostrarSeccion("seccionC");
      document.querySelector(".botonD").onclick = () =>
        mostrarSeccion("seccionD");
      document.querySelector(".botonE").onclick = () =>
        mostrarSeccion("seccionE");
    } else if (selectedOption === "opcion2") {
      // Para opcion2, el botón A muestra la sección F, el botón B muestra la sección G, el botón C muestra la sección H, el botón D muestra la sección I, y el botón E muestra la sección J
      document.querySelector(".botonA").onclick = () =>
        mostrarSeccion("seccionF");
      document.querySelector(".botonB").onclick = () =>
        mostrarSeccion("seccionG");
      document.querySelector(".botonC").onclick = () =>
        mostrarSeccion("seccionH");
      document.querySelector(".botonD").onclick = () =>
        mostrarSeccion("seccionI");
      document.querySelector(".botonE").onclick = () =>
        mostrarSeccion("seccionJ");
    }
  } else {
    // Deshabilitar botones si la opción no está en la lista de opciones activas
    buttons.forEach((button) => {
      button.disabled = true;
      button.style.backgroundColor = "#A9A9A9"; // Color gris para los botones deshabilitados
    });
  }
});

//tabla
//

// Inicializar variables para las tablas
let tablaInicializada = false; // Variable para la tabla en la sección A
let tabla2Inicializada = false; // Variable para la tabla en la sección F
let tablaBInicializada = false; // Variable para la tabla en la sección B
let tablaGInicializada = false; // Variable para la tabla en la sección G
let tablaHInicializada = false; // Variable para la tabla en la sección H
let tablaIInicializada = false; // Variable para la tabla en la sección I
let tablaDInicializada = false; // Variable para la tabla en la sección D
let tablaCInicializada = false; // Variable para la tabla en la sección C

// Mostrar la sección correspondiente
function mostrarSeccion(id) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach((seccion) => seccion.classList.remove("visible"));

  // Mostrar la sección seleccionada
  const seccionSeleccionada = document.getElementById(id);
  seccionSeleccionada.classList.add("visible");

  // Inicializar Handsontable solo si se muestra la sección A
  if (id === "seccionA" && !tablaInicializada) {
    inicializarPrimeraTabla();
  }

  // Inicializar la segunda tabla solo si se muestra la sección F
  if (id === "seccionF" && !tabla2Inicializada) {
    inicializarSegundaTabla();
  }

  // Inicializar la tabla en la sección B si no ha sido inicializada
  if (id === "seccionB" && !tablaBInicializada) {
    inicializarTablaB();
  }

  // Inicializar la tabla en la sección G si no ha sido inicializada
  if (id === "seccionG" && !tablaGInicializada) {
    inicializarTablaG();
  }

  // Inicializar la tabla en la sección H si no ha sido inicializada
  if (id === "seccionH" && !tablaHInicializada) {
    inicializarTablaH();
  }

  // Inicializar la tabla en la sección I si no ha sido inicializada
  if (id === "seccionI" && !tablaIInicializada) {
    inicializarTablaI();
  }

  // Inicializar la tabla en la sección D si no ha sido inicializada
  if (id === "seccionD" && !tablaDInicializada) {
    inicializarTablaD();
  }

  // Inicializar la tabla en la sección C si no ha sido inicializada
  if (id === "seccionC" && !tablaCInicializada) {
    inicializarTablaC();
  }
}

// Inicializar la primera tabla en la sección A
function inicializarPrimeraTabla() {
  fetch("/datos-tabla.json")
    .then((response) => response.json())
    .then((data) => {
      var contenedor = document.getElementById("tabla-handsontable");
      var tabla = new Handsontable(contenedor, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha", "Nombre", "Cargo", "Reporte"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambios(tabla.getData());
          }
        },
      });
      tablaInicializada = true; // Marcar la tabla como inicializada
    })
    .catch((error) => {
      console.error("Error al cargar los datos desde el servidor:", error);
    });
}

// Inicializar la segunda tabla en la sección F
function inicializarSegundaTabla() {
  fetch("/datos-tabla2.json")
    .then((response) => response.json())
    .then((data) => {
      var contenedor2 = document.getElementById("tabla-handsontable-2");
      var tabla2 = new Handsontable(contenedor2, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha", "Nombre", "Cargo", "Reporte"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTabla2(tabla2.getData());
          }
        },
      });
      tabla2Inicializada = true; // Marcar la segunda tabla como inicializada
    })
    .catch((error) => {
      console.error("Error al cargar los datos desde el servidor:", error);
    });
}

// Inicializar la tabla en la sección B
function inicializarTablaB() {
  fetch("/datos-tabla-b.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorB = document.getElementById("tabla-handsontable-b");
      var tablaB = new Handsontable(contenedorB, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha","Colmena", "Cantidad de Miel Extraida","Calidad", "Observaciones"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaB(tablaB.getData());
          }
        },
      });
      tablaBInicializada = true; // Marcar la tabla B como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla B:",
        error,
      );
    });
}

// Inicializar la tabla en la sección G
function inicializarTablaG() {
  fetch("/datos-tabla-g.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorG = document.getElementById("tabla-handsontable-g");
      var tablaG = new Handsontable(contenedorG, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha","Colmena", "Cantidad de Miel Extraida","Calidad", "Observaciones"], 
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaG(tablaG.getData());
          }
        },
      });
      tablaGInicializada = true; // Marcar la tabla G como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla G:",
        error,
      );
    });
}

// Inicializar la tabla en la sección H
function inicializarTablaH() {
  fetch("/datos-tabla-h.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorH = document.getElementById("tabla-handsontable-h");
      var tablaH = new Handsontable(contenedorH, {
        data: data,
        rowHeaders: true,
	
        colHeaders: ["Fecha", "Temperatura", "Precipitacion","Humedad Relativa", "Observaciones"], 
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaH(tablaH.getData());
          }
        },
      });
      tablaHInicializada = true; // Marcar la tabla H como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla H:",
        error,
      );
    });
}

// Inicializar la tabla en la sección I
function inicializarTablaI() {
  fetch("/datos-tabla-i.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorI = document.getElementById("tabla-handsontable-i");
      var tablaI = new Handsontable(contenedorI, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha", "Colmena", "Tratamiento", "Dosis", "Observaciones"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaI(tablaI.getData());
          }
        },
      });
      tablaIInicializada = true; // Marcar la tabla I como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla I:",
        error,
      );
    });
}

// Inicializar la tabla en la sección D
function inicializarTablaD() {
  fetch("/datos-tabla-d.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorD = document.getElementById("tabla-handsontable-d");
      var tablaD = new Handsontable(contenedorD, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha", "Colmena", "Tratamiento", "Dosis", "Observaciones"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaD(tablaD.getData());
          }
        },
      });
      tablaDInicializada = true; // Marcar la tabla D como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla D:",
        error,
      );
    });
}

// Inicializar la tabla en la sección C
function inicializarTablaC() {
  fetch("/datos-tabla-c.json") // Asegúrate de tener este archivo
    .then((response) => response.json())
    .then((data) => {
      var contenedorC = document.getElementById("tabla-handsontable-c");
      var tablaC = new Handsontable(contenedorC, {
        data: data,
        rowHeaders: true,
        colHeaders: ["Fecha", "Temperatura", "Precipitacion","Humedad Relativa", "Observaciones"],
        filters: true,
        dropdownMenu: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: function (changes, source) {
          if (changes) {
            guardarCambiosTablaC(tablaC.getData());
          }
        },
      });
      tablaCInicializada = true; // Marcar la tabla C como inicializada
    })
    .catch((error) => {
      console.error(
        "Error al cargar los datos desde el servidor para la tabla C:",
        error,
      );
    });
}

// Función para guardar los datos de la tabla 1 en el servidor
function guardarCambios(data) {
  fetch("/guardar-datos.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la segunda tabla en el servidor
function guardarCambiosTabla2(data) {
  fetch("/guardar-datos2.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla 2 guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla B en el servidor
function guardarCambiosTablaB(data) {
  fetch("/guardar-datos-b.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla B guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla G en el servidor
function guardarCambiosTablaG(data) {
  fetch("/guardar-datos-g.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla G guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla H en el servidor
function guardarCambiosTablaH(data) {
  fetch("/guardar-datos-h.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla H guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla I en el servidor
function guardarCambiosTablaI(data) {
  fetch("/guardar-datos-i.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla I guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla D en el servidor
function guardarCambiosTablaD(data) {
  fetch("/guardar-datos-d.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla D guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Función para guardar los datos de la tabla C en el servidor
function guardarCambiosTablaC(data) {
  fetch("/guardar-datos-c.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Datos de la tabla C guardados en el servidor:", result);
    })
    .catch((error) => {
      console.error("Error al guardar en el servidor:", error);
    });
}

// Inicializar la primera sección (opcional)
document.addEventListener("DOMContentLoaded", () => mostrarSeccion("inicio"));
