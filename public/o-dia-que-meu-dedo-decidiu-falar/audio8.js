document.addEventListener("DOMContentLoaded", () => {
    
    // === Seletores ===
    const btnPlayPause = document.getElementById("btnPlayPause");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    const currentTimeEl = document.getElementById("currentTime");
    const totalTimeEl = document.getElementById("totalTime");
    const waveformContainer = document.getElementById("waveform");



    // === Inicializa Wavesurfer ===
    const wavesurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: "#FFA844",   // onda futura
        progressColor: "#0E6430", // onda tocada
        barWidth: 3,
        barGap: 2,
        height: 60,
        responsive: true,
        cursorWidth: 0,
    });



    // === Carrega o áudio da página ===
    wavesurfer.load("./audios/pagina08.mp3");
    



    // === Troca Play/Pause pelo botão ===
    btnPlayPause.addEventListener("click", () => {

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


    // === Navegação entre páginas ===
document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "pagina7.html";
});

document.getElementById("btnAvancar").addEventListener("click", () => {
    window.location.href = "pagina9.html"; 
});




    // === Quando o áudio estiver pronto ===
    wavesurfer.on("ready", () => {
        const duration = wavesurfer.getDuration();
        totalTimeEl.textContent = formatTime(duration);
    });



    // === Atualiza o tempo atual ===
    wavesurfer.on("audioprocess", () => {
        const current = wavesurfer.getCurrentTime();
        currentTimeEl.textContent = formatTime(current);
    });



    // === Quando terminar, volta o ícone para Play ===
    wavesurfer.on("finish", () => {
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
    });




    // === Formata tempo (segundos → 0:00) ===
    function formatTime(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

});
