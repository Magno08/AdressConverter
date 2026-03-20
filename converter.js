//Verfificamos que el js este enlazado al html
console.log("Sync complete");

//Generacion de variables
//generamos constante donde leera si se ha hecho click en el boton
const button = document.getElementById("generate-Button");

//Generamos constante para leer si se ha hecho click el botón de borrado
const delete_button = document.getElementById("delete-Button");

//Generamos las variables para leer el click de los botones de copiado
const copy_Aplin_Button = document.getElementById("copy-aplin");
const copy_Quick_Button = document.getElementById("copy-quick");

//Obtenemos el valor del resultado del formato
const quick_Form = document.getElementById("QUICK-format");
const aplin_Form = document.getElementById("APLIN-format");

//Generamos las varaibles para guardar los inputs
//obtenemos los valores de todos los datos
const r_name = document.getElementById("Restaurant-Name");
const f_name = document.getElementById("full-name");
const l_name = document.getElementById("last-name");
const phone = document.getElementById("phone-number");
const email = document.getElementById("email");
const address = document.getElementById("address");
const references = document.getElementById("references");

//Variable para mostrar el estado de la converión, hacicendo que sea visible desde la página
const progress_status = document.getElementById("convert-status");

//si el boton ha hecho click, comenzamos a realizar la conversion
button.addEventListener("click", goToConvert);

//Obtenemos la fecha actual, esto para completar el formato QUICK.
const today = new Date();
console.log(today);
const today_options = {day: '2-digit', month: '2-digit', year: 'numeric'};
const today_is = new Intl.DateTimeFormat('en-GB', today_options).format(today);
console.log(today_is);

//Codigo para hacer el copiado de los elemetos al portapapeles
//Detectamos que el boton de copiar haya hecho click
copy_Aplin_Button.addEventListener("click",function() 
{
    copy_text(aplin_Form.textContent);
});

copy_Quick_Button.addEventListener("click", function()
{
    copy_text(quick_Form.textContent);
});

//Limpiamos los inputs, y mostramos mensaje
delete_button.addEventListener("click", show_delete);

function goToConvert() 
{
    console.log("Start Process:");

    //verificamos que todos los elementos obligatroios tengan al menos un caracter
    if (
        r_name.value &&
        f_name.value &&
        l_name.value &&
        phone.value &&
        email.value &&
        address.value
    ) 
    {
        console.log("Data collected correctly");

        const r_name_input = r_name.value.trim();
        const f_name_input = f_name.value.trim();
        const l_name_input = l_name.value.trim();
        const phone_input = phone.value.trim();
        const email_input = email.value.trim();

        //Eliminamos las comas en las referecnias para evitar malos pegados
        const references_input = references.value
        .trim()
        .replace(/,/g, "");

        //Quitamos las comas en la direccion para evitar malos pegados en google sheets
        const address_input = address.value
        .trim()
        .replace(/,/g, " ")
        .replace(/\s+/g, "  ");

        //Dividimos la direccion para encajarla con el formato APLIN
        const address_Divided = parseAddress(address.value);
        //Si falta algun dato, dejamos que el programa siga corriendo
        if(!address_Divided) return;

        //Generamos el formato para QUICK
        const text_finale_quick = 
        `${today_is}, , ,${r_name_input},${f_name_input} ${l_name_input},${phone_input},${email_input},${address_input},${references_input}`;

        //Generamos el fromato para APLIN
        const text_finale_aplin = 
        `${f_name_input},${l_name_input},${email_input},${phone_input}, , ,${f_name_input},${l_name_input},${phone_input},${r_name_input},${address_Divided.address_1},${address_Divided.address_2},${references_input},${address_Divided.city},${address_Divided.state},${address_Divided.cp}`;

        //Sustituímos la salida del Output con la dirección en el formato que se desee
        quick_Form.textContent = text_finale_quick;
        aplin_Form.textContent = text_finale_aplin;

        progress_status.textContent = "Formatos generados correctamente";

    } 
    else 
    {
        //Si por alguna razón falta algún dato obligatorio, se indica y termina la ejecución
        console.log("Failed, some data is missing");
        progress_status.textContent = "Error: falta algún dato obligatorio por completar";
    }
}

//Función para copiar el contenido al portapapeles
function copy_text (full_format)
{
    //No debe copiar el contenido si aún no se genera el formato
    if (!full_format || full_format ==="Nothing Here... yet")
    {
        console.log("No text aviable to copy");
        progress_status.textContent = "Aún no hay nada para copiar";
        return;
    }
    navigator.clipboard.writeText(full_format)
        .then(() => 
        {
            console.log("Text copied successfully");
            progress_status.textContent = "Texto copiado correctamente";
        })
        .catch(err =>
        {
            console.error("Copy failed:", err);
        }
        );
}

//Funcion para dividir la direccion
function parseAddress (address)
{
    //Pedimos que lo divida por cada coma que encuentre
    const parts = address.split(",").map(p => p.trim());
    //Si el formato no esta completo, lo indica y habra que revisar
    if (parts.length <5)
    {
        console.log("Address fromat invalid: must be Address, Colonia, City, State, Zip");
        progress_status.textContent = "Error: El formato de la direccción debe der: Calle, Colonia, Ciudad, Estado, CP"
        return null;
    }
    return {
        address_1: parts[0] || "",
        address_2: parts[1] || "",
        city: parts[2] || "",
        state: parts[3] || "",
        cp: parts[4] || ""
    };
}

function show_delete()
{
    progress_status.textContent = "Texto borrado corretamente";
}

//Hacemos una función que pondrá los inputs que no están llenos en color rojo
function input_no_wrote() {
    // Seleccionamos los inputs que son obligatorios
    const required_inputs = document.querySelectorAll('input[required]');

    required_inputs.forEach(input => {
        // Generamos un blur para identificar cuando el usuario sale del input
        input.addEventListener('blur', () => {
            // Si el valor es vacío o solo espacios, agregamos el error
            if (input.value.trim() === "") {
                input.classList.add('input-error');
            } else {
                input.classList.remove('input-error');
            }
        });

        // También se elimina el fondo cuando comience a escribir algo válido
        input.addEventListener('input', () => {
            if (input.value.trim() !== "") {
                input.classList.remove('input-error');
            }
        });
    });
}

//Usamos una función para llenar el listado con todos los SKUs
function select_Hardware()
{
    const select = document.getElementById("sku-select");

    //Con un for, agregamos todos los productos a la venta
    select.innerHTML = '';
    hardware_skus.forEach(product =>
    {
        const option = document.createElement('option');
        option.value = product.sku;
        option.textContent = product.name;
        select.appendChild(option);
    }
    );
}

//Lista de funciones a ejecutar cuando se carga el script
input_no_wrote();
select_Hardware();