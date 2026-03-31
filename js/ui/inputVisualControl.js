/**
 * Aplica un contorno rojo al input con valor obligatorio cuando no se escribe nada
 */
export function  whenUserDontWrite()
{
    let requiredInputs = document.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
    // Generamos un blur para identificar cuando el usuario sale del input
    input.addEventListener('blur', () => {
        // Si el valor es vacío o solo espacios, agregamos el error
        if (input.value.trim() === "") {
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
    });
    });
}

/**
 * Genera un contorno verde cuando los inputs contienen al menos un carácter
 */
export function inputHasText()
{
    let inputsWithText = document.querySelectorAll('input');
    inputsWithText.forEach(input =>
    {
        input.addEventListener('blur', () =>
        {
            if (input.value.trim() !== "")
            {
                input.classList.add('input-text');
            }
            else
            {
            input.classList.remove('input-text');
            }
        });
    }
    );
}