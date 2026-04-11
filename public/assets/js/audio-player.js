/* ============================================================================
   AUDIO-PLAYER.JS - Reprodutor Universal para Todas as Paginas de Audio

   Este arquivo substitui os 12 audio.js antigos.
   Ele le a configuracao do config.json e adapta-se automaticamente.
   ============================================================================ */

document.addEventListener("DOMContentLoaded", async () => {
    // =========================================================================
    // 1. CARREGAR CONFIG.JSON
    // =========================================================================
    let config;
    try {
        const configPath = document.currentScript?.dataset.configPath || "../config.json";
        const response = await fetch(configPath);
        config = await response.json();
    } catch (error) {
        console.error("Erro ao carregar config.json:", error);
        return;
    }

    // =========================================================================
    // 2. DETECTAR PAGINA ATUAL
    // =========================================================================
    const currentPageSlug = document.body.getAttribute("data-page");
    if (!currentPageSlug) {
        console.error("Pagina nao possui atributo data-page");
        return;
    }

    const pageConfig = config.pages.find((page) => page.slug === currentPageSlug);
    if (!pageConfig) {
        console.error(`Pagina ${currentPageSlug} nao encontrada no config.json`);
        return;
    }

    // =========================================================================
    // 3. SELETORES DO DOM
    // =========================================================================
    const btnPlayPause = document.getElementById("btnPlayPause");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    const currentTimeEl = document.getElementById("currentTime");
    const totalTimeEl = document.getElementById("totalTime");
    const waveformContainer = document.getElementById("waveform");
    const btnVoltar = document.getElementById("btnVoltar");
    const btnAvancar = document.getElementById("btnAvancar");

    const hasAudioPlayerUi = Boolean(
        waveformContainer && btnPlayPause && playIcon && pauseIcon && currentTimeEl && totalTimeEl
    );
    const shouldInitAudio = Boolean(pageConfig.audio && hasAudioPlayerUi);

    // =========================================================================
    // 4. INICIALIZAR WAVESURFER COM CONFIG
    // =========================================================================
    let wavesurfer = null;

    if (shouldInitAudio) {
        wavesurfer = WaveSurfer.create({
            container: waveformContainer,
            waveColor: config.audio.waveColor,
            progressColor: config.audio.progressColor,
            barWidth: config.audio.barWidth,
            barGap: config.audio.barGap,
            height: config.audio.height,
            responsive: config.audio.responsive,
            cursorWidth: config.audio.cursorWidth,
        });
    }

    // =========================================================================
    // 5. CARREGAR AUDIO (se a pagina tiver um)
    // =========================================================================
    if (shouldInitAudio) {
        const audioPath = `../${pageConfig.audio}`;
        wavesurfer.load(audioPath);
    } else {
        if (waveformContainer) {
            waveformContainer.style.display = "none";
        }
        if (btnPlayPause) {
            btnPlayPause.style.display = "none";
        }
        if (currentTimeEl) {
            currentTimeEl.style.display = "none";
        }
        if (totalTimeEl) {
            totalTimeEl.style.display = "none";
        }
    }

    // =========================================================================
    // 6. CONTROLE: PLAY / PAUSE
    // =========================================================================
    if (btnPlayPause) {
        btnPlayPause.addEventListener("click", () => {
            if (!wavesurfer) {
                return;
            }

            if (!wavesurfer.isPlaying()) {
                wavesurfer.play();
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            } else {
                wavesurfer.pause();
                pauseIcon.style.display = "none";
                playIcon.style.display = "block";
            }
        });
    }

    // =========================================================================
    // 7. NAVEGACAO: VOLTAR
    // =========================================================================
    if (btnVoltar) {
        if (!pageConfig.showBackBtn) {
            btnVoltar.style.opacity = "0";
            btnVoltar.style.pointerEvents = "none";
        } else {
            btnVoltar.addEventListener("click", () => {
                if (pageConfig.prevPage) {
                    window.location.href = `${pageConfig.prevPage}.html`;
                }
            });
        }
    }

    // =========================================================================
    // 8. NAVEGACAO: AVANCAR
    // =========================================================================
    if (btnAvancar) {
        btnAvancar.addEventListener("click", () => {
            if (pageConfig.nextPage) {
                window.location.href = `${pageConfig.nextPage}.html`;
            }
        });
    }

    // =========================================================================
    // 9. EVENTOS DO AUDIO
    // =========================================================================
    if (wavesurfer) {
        wavesurfer.on("ready", () => {
            const duration = wavesurfer.getDuration();
            if (totalTimeEl) {
                totalTimeEl.textContent = formatTime(duration);
            }
        });

        wavesurfer.on("audioprocess", () => {
            const current = wavesurfer.getCurrentTime();
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(current);
            }
        });

        wavesurfer.on("finish", () => {
            pauseIcon.style.display = "none";
            playIcon.style.display = "block";
        });
    }

    // =========================================================================
    // 10. UTILITARIOS
    // =========================================================================
    function formatTime(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
});
