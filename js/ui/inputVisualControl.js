/**
 * Aplica un contorno rojo al input con valor obligatorio cuando no se escribe nada
 */
export function  whenUserDontWrite()
{
    let requiredInputs = document.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
    // Generamos un blur para identificar cuando el usuario sale del input
    input.addEventListener('blur', () => {
        // Primero, limpiamos cualaquier estado anteriormente hecho
        input.classList.remove('input-text');
        input.classList.remove('input-error');

        //Verificamos si hay algun caracter en los inputs
        if (input.value.trim() === "")
        {
            input.classList.add('input-error');
        }
        else
        {
            input.classList.add('input-text');
        }
    });
    });
}

/**
 * Cuando el boton de borrar hace click, elimina cualquier cambio de color de los inputs
 */
export function cleanStyleForms()
{
    let form = document.getElementById('converter-form');
    let input = document.querySelectorAll('input');

    form.addEventListener('reset', () =>{
        input.forEach(input =>{
            input.classList.remove('input-error');
            input.classList.remove('input-text');
        });
    });
}