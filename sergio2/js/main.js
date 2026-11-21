document.addEventListener("DOMContentLoaded", () => {
    // 1. Ocultar / Mostrar barra de navegación al hacer scroll
    let ubicacionPrincipal = window.scrollY;
    const nav = document.querySelector("nav");

    if (nav) {
        window.addEventListener("scroll", () => {
            const desplazamientoActual = window.scrollY;

            if (ubicacionPrincipal >= desplazamientoActual || desplazamientoActual <= 50) {
                nav.style.top = "0px";
            } else {
                nav.style.top = "-100px";
            }

            ubicacionPrincipal = desplazamientoActual;
        });
    }

    // 2. Menú hamburguesa responsive
    const enlacesHeader = document.querySelector(".enlaces-header");
    const hamburguer = document.querySelector(".hamburguer");
    const iconoHamburguer = document.querySelector(".hamburguer i");
    let semaforo = true;

    if (hamburguer && enlacesHeader) {
        hamburguer.addEventListener("click", () => {
            enlacesHeader.classList.toggle("menudos");

            if (iconoHamburguer) {
                if (semaforo) {
                    iconoHamburguer.style.color = "#fff";
                    iconoHamburguer.classList.remove("fa-bars");
                    iconoHamburguer.classList.add("fa-xmark");
                    semaforo = false;
                } else {
                    iconoHamburguer.style.color = "#1d273b";
                    iconoHamburguer.classList.remove("fa-xmark");
                    iconoHamburguer.classList.add("fa-bars");
                    semaforo = true;
                }
            }
        });

        // Cerrar menú móvil al hacer clic en cualquier enlace
        enlacesHeader.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", () => {
                enlacesHeader.classList.remove("menudos");
                if (iconoHamburguer) {
                    iconoHamburguer.style.color = "#1d273b";
                    iconoHamburguer.classList.remove("fa-xmark");
                    iconoHamburguer.classList.add("fa-bars");
                }
                semaforo = true;
            });
        });
    }

    // 3. Animación progresiva de los contadores (+88973) al entrar en pantalla
    const contadores = document.querySelectorAll(".number h4");

    const animarContador = (elemento) => {
        const textoOriginal = elemento.textContent.trim();
        const tieneMas = textoOriginal.startsWith("+");
        const valorFinal = parseInt(textoOriginal.replace(/\D/g, ""), 10);

        if (isNaN(valorFinal)) return;

        const duracion = 1500;
        const inicio = performance.now();

        const actualizar = (tiempoActual) => {
            const progreso = Math.min((tiempoActual - inicio) / duracion, 1);
            const valorActual = Math.floor(progreso * valorFinal);
            elemento.textContent = `${tieneMas ? "+" : ""}${valorActual}`;

            if (progreso < 1) {
                requestAnimationFrame(actualizar);
            } else {
                elemento.textContent = textoOriginal;
            }
        };

        requestAnimationFrame(actualizar);
    };

    if ("IntersectionObserver" in window && contadores.length > 0) {
        const observador = new IntersectionObserver(
            (entradas, obs) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        animarContador(entrada.target);
                        obs.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        contadores.forEach((contador) => observador.observe(contador));
    }

    // 4. Desplazamiento suave para enlaces internos (#)
    document.querySelectorAll('a[href^="#"]').forEach((ancla) => {
        ancla.addEventListener("click", function (e) {
            const destinoId = this.getAttribute("href");
            if (destinoId.length > 1) {
                const destino = document.querySelector(destinoId);
                if (destino) {
                    e.preventDefault();
                    destino.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
});
