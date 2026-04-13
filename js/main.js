//Importamos las funciones derivadas de otras carpetas
import { showStatus } from "./ui/status.js";
import { generateAplinFormat, generateQuickFormat, parseAddress } from "./utils/convertionManagement.js";
import { copyText } from "./utils/clipboard.js";
import { getDate } from "./utils/getDate.js";
import { putHardwareOnList } from "./ui/hardwareManagement.js";
import { whenUserDontWrite, cleanStyleForms } from "./ui/inputVisualControl.js";

//Verfificamos que el js este enlazado al html
console.log("Sync complete");

//-------------------------Generacion de variables----------------------------------------------
//generamos constante donde leera si se ha hecho click en el boton
const button = document.getElementById("generate-Button");

//Generamos constante para leer si se ha hecho click el botón de borrado
const delete_button = document.getElementById("delete-Button");

//Generamos la variable para leer el clikc del boton de agregar y eliminar Hardware

const add_sku = document.getElementById("add-sku");
const delete_sku = document.getElementById("delete-sku");

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

//Agregamos un SKU a la lista si se ha hecho click
const skus = [];

//-------------------------Click EventListener----------------------------------------------

//Boton de agregar hardware, si hace click, agrega el SKU a la lista
add_sku.addEventListener("click", add_hardware);


//Si queremos solamente eliminar los skus, el boton de eliminar skus nos ayuda con eso
delete_sku.addEventListener("click", delete_only_skus);

//si el boton ha hecho click, comenzamos a realizar la conversion
button.addEventListener("click", goToConvert);

//Obtenemos la fecha actual, esto para completar el formato QUICK.
const today = getDate();

//Codigo para hacer el copiado de los elemetos al portapapeles
//Detectamos que el boton de copiar haya hecho click
copy_Aplin_Button.addEventListener("click", async function() 
{
    const copySuccess = await copyText(aplin_Form.textContent);
    if (copySuccess)
    {
        showStatus("Texto copiado correctamente");
    } else
    {
        showStatus("Aún no hay nada para copiar");
    }
    
});

copy_Quick_Button.addEventListener("click", async function()
{
        const copySuccess = await copyText(quick_Form.textContent);
    if (copySuccess)
    {
        showStatus("Texto copiado correctamente");
    } else
    {
        showStatus("Aún no hay nada para copiar");
    }
});

//Limpiamos los inputs, y mostramos mensaje
delete_button.addEventListener("click", show_delete);

//-------------------------Funcion Main----------------------------------------------
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
        
        const dataQuick =
        {
            restaurantName: r_name.value.trim(),
            fullName: f_name.value.trim() + " " + l_name.value.trim(),
            phoneNumber: phone.value.trim(),
            mail: email.value.trim(),
            address: address.value.trim(),
            ref: references.value.trim()            
        };

        const dataAplin =
        {
            restaurantName: r_name.value.trim(),
            firstName: f_name.value.trim(),
            lastName: l_name.value.trim(),
            phoneNumber: phone.value.trim(),
            address: parseAddress(address.value),
            mail: email.value.trim(),
            ref: references.value.trim()
        };

        //Dividimos la direccion para encajarla con el formato APLIN
        const address_Divided = parseAddress(address.value);
        //Si falta algun dato, dejamos que el programa siga corriendo
        if(!address_Divided) 
        {
            showStatus("El formato de la dirección debe ser: Calle, Colonia, Ciudad, Estado, CP");
            console.log("Address fromat invalid: must be Address, Colonia, City, State, Zip");
            return;
        }

        //Tomamos el SKU generado
        //Primero validamos que haya al menos un elemento
        if (skus.length === 0)
        {
            showStatus("Debes agregar al menos 1 pieza de Hardware a Enviar");
            return;
        } 
        //Si es asi, comenzamos a agregar el sku al formato
        const textFinaleQuick = generateQuickFormat(skus, dataQuick,today);
        quick_Form.textContent = textFinaleQuick;

        const textFinaleAplin = generateAplinFormat(skus,dataAplin);
        aplin_Form.textContent = textFinaleAplin;

        showStatus("Formatos generados correctamente");
    } 
    else 
    {
        //Si por alguna razón falta algún dato obligatorio, se indica y termina la ejecución
        console.log("Failed, some data is missing");
        showStatus("Falta algún dato obligatorio por completar")
    }
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

    //Eliminamos el estilo visual de los inputs
    cleanStyleForms();

    //Mensaje que muesta que todo se ha limpiado correctamente
    showStatus("Texto Borrado correctamente");
    console.log("Clean process completed");
}

//Usamos una función para llenar el listado con todos los SKUs
putHardwareOnList();

function add_hardware()
{
    console.log(skus);

    //Leemos el Harware que se va a agregar al pedido
    const hw = document.getElementById("sku-select");
    const amount = document.getElementById("sku-amount");

    //Como la cantidad es obligatoria, agregamos una condicional para verificar que haya alguna
    const amount_Value = Number(amount.value);
    if (!amount_Value || amount_Value <= 0)
    {
        //Si no hay cantidad, indica que debe haber alguna para continuar.
        console.log("There's no amount, please select an amount");
        showStatus("Selecciona una cantidad a agregar de Hardware")
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

//Lista de funciones que controlan partes visuales del HTML
whenUserDontWrite();

//Debbuging

const DEV_MODE = true;

function fillData()
{
    document.getElementById("Restaurant-Name").value = "Parrot Cafe";
    document.getElementById("full-name").value = "Omar";
    document.getElementById("last-name").value = "Magno";
    document.getElementById("phone-number").value = "55 39 24 29 00";
    document.getElementById("email").value = "omar@parrotsoftware.io";
    document.getElementById("address").value = "Londres 253,Juarez,Cuauthemoc,CDMX,06000";
    document.getElementById("references").value = "Al lado del oxxo";
}

if(DEV_MODE)
{
    fillData();
}