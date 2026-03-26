/** Copia un texto al portapeles */

export async function copyText(text) 
{
    if(!text) return false;   

try 
    {
        await navigator.clipboard.writeText(text);
        console.log("Text copied");
        return true;
    } catch (error) {
        console.error("Error to copy text", error);
        return false; 
    }
}