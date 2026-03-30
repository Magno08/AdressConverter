import { hardwareSkus } from "../data/hardwareList.js";

/**
 * Agrega los SKUS en el select, donde el usuario
 * puede seleccionar cada SKU
 */
export function putHardwareOnList ()
{
    const selectOption = document.getElementById("sku-select");
    //Con inner borramos todo el contenido que pueda tener el select
    selectOption.innerHTML = '';
    //Agregamos cada elemento de la lista al select
    hardwareSkus.forEach(product =>
    {
        const hardwareOption = document.createElement('option');
        hardwareOption.value = product.sku;
        hardwareOption.textContent = product.name;
        selectOption.appendChild(hardwareOption);
    }
    );
}

/**
 * Añade el SKU seleccionado a la lista del hardwarte que se va a solicitar
 */
export function addHardware(hwSelected, amSelected)
{
    const amountNumber = Number(amSelected.value);
    console.log(amountNumber);

    if (!amountNumber)
    {
        console.log("There's no amount, please select an amount");
        return null;
    }
    else
    {
        hardwareSkus.push(
            {
                sku: hwSelected.value,
                amount: amountNumber
            }
        );
        skus_added.textContent = "";
        skus.forEach(item =>
        {
            skus_added.innerHTML += `${item.sku} - ${item.amount}<br>`;
        }
        )
    }
}