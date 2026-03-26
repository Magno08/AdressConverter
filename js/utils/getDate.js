/** 
 * Genera el fromato local de la hora
 */

export function getDate()
{
    const today = new Date()
    const todayOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const todayIs = new Intl.DateTimeFormat('en-GB', todayOptions).format(today);
    return todayIs;
}