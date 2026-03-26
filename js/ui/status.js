/** 
 * Muestra un mensaje desde el output con el estado de la conversion
 */

export function showStatus(message)
{
    const progress_status = document.getElementById("convert-status");
    progress_status.textContent = message;
}