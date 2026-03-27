/** 
 * Muestra un mensaje desde el output con el estado de la conversion, usando el toast como contenedor
 */

let toastTimer;
let countdownInterval; 

export function showStatus(message) {
    const toastContainer = document.querySelector(".toast");
    const toastBody = document.querySelector(".toast-body");
    const closeBtn = document.querySelector(".toast-close");
    const toastPasteCounter = document.getElementById("toast-timer");

    if (toastBody) toastBody.textContent = message;

    // 1. Reiniciamos todo antes de empezar
    toastContainer.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    if (countdownInterval) clearInterval(countdownInterval);

    // 2. Lógica del Contador Visual (Cada 1 segundo)
    let timeLeft = 5;
    toastPasteCounter.textContent = timeLeft;

    countdownInterval = setInterval(() => {
        timeLeft--;
        toastPasteCounter.textContent = timeLeft;
        if (timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    // 3. Ocultar el toast tras 5 segundos (sincronizado con el contador)
    toastTimer = setTimeout(() => {
        toastContainer.classList.remove("show");
    }, 5000);

    // 4. Botón de cierre manual
    if (closeBtn) {
        closeBtn.onclick = () => {
            toastContainer.classList.remove("show");
            clearTimeout(toastTimer);
            clearInterval(countdownInterval); // Detenemos el reloj si se cierra antes
        };
    }
}