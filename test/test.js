console.log("JavaScript is working!");
const fullName = document.getElementById("fullName");
const button = document.getElementById("submitt");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

//El nombre siempre debe llegar con el fromato: Nombre Apellido.

console.log(firstName.value);
console.log(lastName.value);

button.addEventListener("click", dividFullName );

function dividFullName ()
{
    let nameWitted = fullName;
    let fName = "";
    let lName = "";
    console.log("The full name is: " + nameWitted.value);
    const conectors = ['da', 'de', 'del', 'la', 'las', 'los', 'mac', 'mc', 'van', 'von', 'y', 'i', 'san', 'santa'];


    //Dividimos la palabra en funcion de los espacios que hay
    const nameParts = nameWitted.value.split(" ");

    //Inicio codigo de prueba
    console.log("Length of name: " + nameParts.length);
    for (let i = 0; i < nameParts.length; i++)
    {
        console.log(nameParts[i]);
    }
    console.log("Last word of the array: " + nameParts.at(-1));
    //fin de copdigo de prueba

    //Hacemos cada caso para dividir el nombre
    switch (nameParts.length)
    {
        //Este caso es para cuando el nombre no tiene ni un espacio, es decir, solo tiene un nombre
        case 1:
            console.log("The name has almost first an last name");
            break;
        //Este caso es para cuando el nombre tiene un espacio, es decir, tiene un nombre y un apellido
        case 2:
            fName = nameParts[0];
            lName = nameParts.at(-1);
            break;
        //Si se detecta que el nombre tiene mas de un espacio,
        //Probamos a verificar que tenga algun conector antes del apellido
        case 3:
            //Para este caso, debemos tener una bandera que indique la coinciencia del conector
            let doesMatch = false;
            for (let i = 0; i<conectors.length; i++)    
            {
                if (conectors[i] === nameParts[1])
                {
                    console.log("Match!");
                    fName = `${nameParts[0]}`;
                    lName = `${nameParts[1]} ${nameParts.at(-1)}`;
                    doesMatch = true;
                    break;
                }
            }
            if (doesMatch) break;
            //Si no hay coincidencia, es probable que tenga dos nombres

            console.log("No match ):");
            fName = `${nameParts[0]} ${nameParts [1]}`;
            lName = `${nameParts.at(-1)}`;
            break;
        
        //Puede darse el caso de dos nombres y un apellido compuesto
        case 4:
            //Pirmero detectamos si la segunda palabra es conector
            let theSecondIsConector = false;
            for (let i=0; i<conectors.length; i++)
            {
                if (conectors[i]===nameParts[1])
                {
                    //Si la segunda palabra es conector, entonces
                    //Hablamos de un nombre compuesto, por ende, las 3
                    //Primeras letras deben ser el nombre
                    console.log("The Second word is a conecctor!");
                    fName = `${nameParts[0]} ${nameParts [1]} ${nameParts[2]}`;
                    lName = `${nameParts.at(-1)}`;
                    theSecondIsConector = true;
                    break;
                }
            }
            if (theSecondIsConector) break;
            //Si la segunda palabra no es conector, entonces
            //El conector indica el inicio del apellido
            fName = `${nameParts[0]} ${nameParts[1]}`;
            lName = `${nameParts[2]} ${nameParts.at(-1)}`;
            break;
        
            //Inlcusive, puede darse el extraño caso de un apellido que lleve dos conectores
            //O que el nombre y el apellido tengan un conector
            case 5:
                let theSecondandThirdAreConector = false;
                let theSecondAndFourthAreConector = false;
                for (let i=0; i<conectors.length; i++)
                {
                    //Verificamos si primero existe un conector en la segunda palabra
                    if (conectors[i] === nameParts[1])
                    {
                        //Comprobamos ahora que la tercera palabra sea un conector
                        for (let j = 0; j<conectors.length; j++)
                        {
                            if (conectors[j] == nameParts[2])
                            {
                                fName = `${nameParts[0]} ${nameParts[1]} ${nameParts[2]} ${nameParts[3]}`;
                                lName = `${nameParts.at(-1)}`;
                                theSecondandThirdAreConector = true;
                                break;  
                            }  
                        }
                        if (theSecondandThirdAreConector) break;
                        //Si no hay conector en la tercera palabra, entonces
                        //Por heuristica, la cuarta es un conector
                        fName = `${nameParts[0]} ${nameParts[1]} ${nameParts[2]}`;
                        lName = `${nameParts[3]} ${nameParts.at(-1)}`;
                        theSecondAndFourthAreConector = true;
                        break;
                    }
                }
                if (theSecondAndFourthAreConector) break;
                //Si no hay coincidencia, entonces el apellido lleva dos conectores
                fName = `${nameParts[0]} ${nameParts[1]}`;
                lName = `${nameParts[2]} ${nameParts[3]} ${nameParts.at(-1)}`;
                break;
    }

    console.log("The First name is: " + fName +
    ", and last name is: " + lName);

    firstName.textContent = fName;
    lastName.textContent = lName;
}