//Verfificamos que el js este enlazado al html
console.log("Sync complete");

//Generacion de variables
//generamos constante donde leera si se ha hecho click en el boton
const button = document.getElementById("generate-Button");

//Generamos constante para leer si se ha hecho click el botón de borrado
const delete_button = document.getElementById("delete-Button");

//Generamos la variable para leer el clikc del boton de agregar Hardware

const add_sku = document.getElementById("add-sku");
const delete_sku = document.getElementById("delete-sku")

//Generamos las variables para leer el click de los botones de copiado
const copy_Aplin_Button = document.getElementById("copy-aplin");
const copy_Quick_Button = document.getElementById("copy-quick");

//Obtenemos el valor del resultado del formato
const quick_Form = document.getElementById("QUICK-format");
const aplin_Form = document.getElementById("APLIN-format");

//Leemos lo que contiene la salida del hardware seleccionado;

const skus_added = document.getElementById("skus-selected");

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

//Variable para guardar los SKUS
const skus = [];
//Agregamos un SKU a la lista si se ha hecho click
add_sku.addEventListener("click", add_hardware);

//Si queremos solamente eliminar los skus, el boton de eliminar skus nos ayuda con eso
delete_sku.addEventListener("click", delete_only_skus);

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

        //Tomamos el SKU generado
        //Primero validamos que haya al menos un elemento
        if (skus.length === 0)
        {
            progress_status.textContent = "Debes agregar al menos 1 pieza de Hardware a Enviar"
            return;
        }
        //Si es asi, comenzamos a agregar el sku al formato
        //De momento, solamente agregamos un solo sku
        const first_Sku = skus[0];
        //Ahora transfromamos al formato QUICK el pedido del Hardware
        const sku_Quick_Format = 
        `${first_Sku.amount}-${first_Sku.sku}`;

        //Generamos el formato para QUICK
        const text_finale_quick = 
        `${today_is}, , ,${r_name_input},${f_name_input} ${l_name_input},${phone_input},${email_input},${address_input},${references_input}, , ,${sku_Quick_Format}`;
        
        //Transformamos el formato para APLIN
        input_name_sku = first_Sku.sku;
        input_amount_sku = first_Sku.amount;
        //Generamos el fromato para APLIN
        const text_finale_aplin = 
        `${f_name_input},${l_name_input},${email_input},${phone_input},${input_name_sku},${input_amount_sku},${f_name_input},${l_name_input},${phone_input},${r_name_input},${address_Divided.address_1},${address_Divided.address_2},${references_input},${address_Divided.city},${address_Divided.state},${address_Divided.cp}`;

        //Sustituímos la salida del Output con la dirección en el formato que se desee
        quick_Form.textContent = text_finale_quick;
        aplin_Form.textContent = text_finale_aplin;

        progress_status.textContent = "Formatos generados correctamente";

        //----------------------------------------------------------------------------------------
        //Esta seccion debe eliminarse cuando se agregue el colocar mas de 1 sku
        skus.length = 0;
        skus_added.textContent = "SKU agregado al formato";
        //----------------------------------------------------------------------------------------


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
    if (!full_format || full_format ==="Aquí verás el formato completo antes de copiarlo")
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
    const parts = address.split(",").map(p => p.trim()).filter(p => p.length > 0);
    //Si el formato no esta completo, lo indica y habra que revisar
    if (parts.length !== 5)
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
    //Eliminamos los elementos dentro del array de los skus
    skus.length = 0;
    skus_added.textContent = "Aun no has seleccionado hardware";
    console.log("Output Hardware clean");

    //Limpiamos el los formatos de copiado
    aplin_Form.textContent = "Aquí verás el formato completo antes de copiarlo";
    quick_Form.textContent = "Aquí verás el formato completo antes de copiarlo";
    console.log("Forms clean");

    //Mensaje que muesta que todo se ha limpiado correctamente
    progress_status.textContent = "Texto borrado corretamente";
    console.log("Clean process completed");
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

function add_hardware()
{

    //Leemos el Harware que se va a agregar al pedido
    const hw = document.getElementById("sku-select");
    const amount = document.getElementById("sku-amount");
    //Como la cantidad es obligatoria, agregamos una condicional para verificar que haya alguna
    const amount_Value = Number(amount.value);
    if (!amount_Value || amount_Value <= 0)
    {
        //Si no hay acantidad, indica que debe haber alguna para continuar.
        console.log("There's no amount, please select an amount");
        progress_status.textContent = "Error: Por favor, selecciona una cantidad a agregar de Hardware";
        return null;

    } 
    else 
    {
        //Si es asi, agregamos el sku
        skus.push({
            sku: hw.value,
            amount: amount_Value
        });

        skus_added.textContent = "";

        skus.forEach(item => {
            skus_added.innerHTML += `${item.sku} - ${item.amount}<br>`;
        });
        console.log("Si ves esto, entonces el boton debio agregar el valor del select al outuput");
        amount.value = "";
        //Como primera version, hacemos que el usuario genere por cada SKU
    }
}

function delete_only_skus()
{
    skus.length = 0;
    skus_added.textContent = "Aun no has seleccionado hardware";
    console.log("Array clean");
}

//Lista de funciones a ejecutar cuando se carga el script
input_no_wrote();
select_Hardware();