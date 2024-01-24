function validaContrasenas(value, value2){

    value = document.getElementById("Password").value;
    value2 = document.getElementById("Password2").value;

    return value===value2;
}

export {validaContrasenas}