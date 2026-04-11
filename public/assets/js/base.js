/* ============================================================================
   BASE.JS — Funções globais utilizadas em TODAS as páginas
   ============================================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------------------
       MENU MOBILE (Abrir / Fechar)
       ------------------------------------------------------------------------ */

    const menuBtn = document.querySelector(".menu-btn");
    const menuMobile = document.getElementById("menuMobile");
    const overlay = document.getElementById("overlay");

    if (menuBtn && menuMobile && overlay) {

        // Abrir menu
        menuBtn.addEventListener("click", () => {
            menuMobile.classList.add("open");
            overlay.classList.add("show");
            document.body.style.overflow = "hidden"; // trava o scroll
        });

        // Clicar no overlay fecha menu
        overlay.addEventListener("click", fecharMenu);

        function fecharMenu() {
            menuMobile.classList.remove("open");
            overlay.classList.remove("show");
            document.body.style.overflow = ""; // libera o scroll
        }

        // Fecha menu ao redimensionar para desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                fecharMenu();
            }
        });
    }

    /* ------------------------------------------------------------------------
       FUTURAS FUNÇÕES GLOBAIS
       (funções comuns para todas as páginas)
       ------------------------------------------------------------------------ */

});
