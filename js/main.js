// ============ MENÚ MÓVIL ============
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                menu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });
}

// ============ SISTEMA DE PROGRESO ============
function guardarProgreso(modulo, completado) {
    let progreso = JSON.parse(localStorage.getItem('progresoEstudiante')) || {};
    progreso[modulo] = completado;
    localStorage.setItem('progresoEstudiante', JSON.stringify(progreso));
    actualizarBarraProgreso();
}

function obtenerProgreso() {
    return JSON.parse(localStorage.getItem('progresoEstudiante')) || {};
}

function actualizarBarraProgreso() {
    const progreso = obtenerProgreso();
    const totalModulos = 3; // Módulos activos: 1, 2, 3
    const completados = Object.keys(progreso).filter(k => progreso[k]).length;
    const porcentaje = Math.round((completados / totalModulos) * 100);
    
    const barra = document.getElementById('barra-progreso');
    const texto = document.getElementById('texto-progreso');
    
    if (barra && texto) {
        barra.style.width = porcentaje + '%';
        texto.textContent = `${completados} de ${totalModulos} módulos (${porcentaje}%)`;
    }
}

// Mostrar mensaje de bienvenida
window.addEventListener('load', () => {
    actualizarBarraProgreso();
    const progreso = obtenerProgreso();
    const totalModulos = Object.keys(progreso).length;
    if (totalModulos > 0) {
        console.log(`👋 ¡Bienvenido de nuevo! Has completado ${totalModulos} módulos.`);
    } else {
        console.log('🚀 ¡Bienvenido a ElectroLearn! Comienza tu primer módulo.');
    }
});