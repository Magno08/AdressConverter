import { mexicoStates } from "../data/states.js"; 

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
    console. log(parsed);
    return parsed;
}