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