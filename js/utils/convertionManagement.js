import { mexicoStates } from "../data/states.js"; 

/**
 * Genera el formato QUICK para pegado
 */
export function generateQuickFormat (skuList, clientData, today)
{
    const skuQuick = [];
    //Con un array, agregamos cada elemento de los skus seleccionados
    skuList.forEach(item=> {
        skuQuick.push(`${item.amount}-${item.sku}`);
    });
    //Finalmente, agregamos el formato para Quick
    const quickText = 
    `${today}\t \t \t${clientData.restaurantName}\t${clientData.fullName}\t${clientData.phoneNumber}\t${clientData.mail}\t${clientData.address}\t${clientData.ref}\t \t \t${skuQuick.join(",")}`;
    return quickText;
}

/**
 * Genera el formato APLIN para pegado
 */
export function generateAplinFormat(skuList, clientData)
{
    const aplinText = skuList.map(item =>
    {
        return `${clientData.firstName}\t${clientData.lastName}\t${clientData.mail}\t${clientData.phoneNumber}\t${item.sku}\t${item.amount}\t${clientData.firstName}\t${clientData.lastName}\t${clientData.phoneNumber}\t${clientData.restaurantName}\t${clientData.address.address_1}\t${clientData.address.address_2}\t${clientData.ref}\t${clientData.address.city}\t${clientData.address.state}\t${clientData.address.cp}`;
    });
    return aplinText.join("\n");
}

/**
 * Divide una direcccion en partes si sigue el fromato Calle, colonia, Ciudad, Estado
 */
export function parseAddress (address)
{
    //Pedimos que lo divida por cada coma que encuentre
    const parts = address.split(",").map(p => p.trim()).filter(p => p.length > 0);
    //Si el formato no esta completo, lo indica y habra que revisar
    if (parts.length !== 5)
    {
        return null;
    }
    //Generamos el objeto que va a devolver la función
    let parsed = {address_1: "", address_2: "", city: "", state: "", cp: ""};


    //Como el primer elemento siempre será la calle, lo guardamos de forma inmediata
    parsed.address_1 = parts.shift();


    //Obtenemos el código postal
    const cpIndex = parts.findIndex(part => /^\d{5}$/.test(part)); //Buscamos una cadena cpn exactamente 5 números
    if (cpIndex !== -1)
    {
        //Agregamos al parsed el valor encontrado de la expresión regular
        parsed.cp = parts[cpIndex];
        //Sacamos del arreglo el valor
        parts.splice(cpIndex, 1);
    }


    //Obtenemos el estado en el que se encuentra la dirección
    //Leemos todo el arreglo de mexicoStates, e identificamos los estados
    const stateNames = mexicoStates.map(s => `${s.state}|${s.abr}`).join('|');
    //Generamos expresion regular que idetnfique el estado
    const stateRegex = new RegExp(`^(${stateNames})$`, 'i');

    //Buscamos en el array de la direccion el estado
    const stateIndex = parts.findIndex(part => stateRegex.test(part));
    if (stateIndex !== -1)
    {
        parsed.state = parts[stateIndex];
        parts.splice(stateIndex, 1);
    }

    //Se va a sumir que el la clonia y la ciudad aparecen en ese orden, entonces rellenamos los espacios vacíos
    parsed.address_2 = parts[0];
    parsed.city = parts[1];
    return parsed;
}