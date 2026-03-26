//**
// Divide una direcccion en partes si sigue el fromato
// Calle, colonia, Ciudad, Estado */


export function parseAddress (address)
{
    //Pedimos que lo divida por cada coma que encuentre
    const parts = address.split(",").map(p => p.trim()).filter(p => p.length > 0);
    //Si el formato no esta completo, lo indica y habra que revisar
    if (parts.length !== 5)
    {
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