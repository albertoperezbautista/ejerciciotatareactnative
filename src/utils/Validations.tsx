/* eslint-disable no-useless-escape */
export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateLengthPassword(password: string) {
  return !(password.length < 5);
}

export function convertirMayusculas(text: string) {
  return text.toUpperCase();
}

 // Validar Cedula 
 export const validarCedula = (cedula) => {
  // Verificar si la cédula tiene 10 dígitos
  if (cedula.length !== 10 || isNaN(cedula)) {
    return false;
  }

  const digitos = cedula.split('').map(Number);
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const referencia = 9;

  let suma = 0;
  let verificador = 0;

  for (let i = 0; i < referencia; i++) {
    let multiplicacion = digitos[i] * coeficientes[i];

    // Restar 9 si el resultado es mayor a 9
    if (multiplicacion > 9) {
      multiplicacion -= 9;
    }

    suma += multiplicacion;
  }

  verificador = suma % 10 !== 0 ? 10 - (suma % 10) : 0;

  // Verificar si el dígito verificador calculado coincide con el último dígito de la cédula
  if (verificador === digitos[referencia]) {
    return true;
  }

  return false;
};

export function validateLengthText(text: string) {
  return !(text.length < 2);
}

export function validateLenghtPhone(phone: string) {
  return !(phone.length < 10);
}

export function validateLengthDirección(direccion: string) {
  return !(direccion.length < 5);
}

export function validateLenghtCedula(phone: string) {
  return !(phone.length < 10);
}


export const handleNumbersOnly = (value) => {
  // Filtrar caracteres no numéricos y convertir a cadena
  const numericValue = value.replace(/[^0-9]/g, '');

  return numericValue;
};


export const handleUpperCaseLettersOnly = (value) => {
  // Filtrar caracteres no alfabéticos y convertir a mayúsculas
  // const upperCaseValue = value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
  const upperCaseValue = value.replace(/[^A-Za-zñÑ\s]/g, '').toUpperCase();


  return upperCaseValue;
};

export const handleUpperCaseLetterNumbers = (value) => {
  // Filtrar caracteres no alfabéticos y convertir a mayúsculas
  // const upperCaseValue = value.replace(/[^A-Za-z0-9\s]/g, '').toUpperCase();
  const upperCaseValue = value.replace(/[^A-Za-z0-9\sñÑ]/g, '').toUpperCase();


  return upperCaseValue;
};



export const handleNumberText = (onChange, value, input) => {
  const regex = /^\d+$/;
  let valorMayusculas = convertirMayusculas(value);

  // Verificar si hay caracteres antes de intentar eliminar el primer carácter
  if (valorMayusculas.length > 0) {
    // Obtener todos los caracteres excepto el primero
    valorMayusculas = valorMayusculas.slice(1);
  }

  // Verificar si los caracteres restantes son válidos según la expresión regular o si el valor está vacío
  if (regex.test(valorMayusculas) || valorMayusculas === '') {
    // Actualizar el estado del campo
    onChange(valorMayusculas, input);
  }
};


export const calcularEdadActual = (fechaCalcular) => {
  // Este metodo funciona cuando la edad viene en DIA-MES-AÑO
  if(fechaCalcular){
    const partesFechaNacimiento = fechaCalcular.split('-');
    const fechaNacimiento = new Date(partesFechaNacimiento[2], partesFechaNacimiento[1] - 1, partesFechaNacimiento[0]);
    
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Calcular la diferencia en años entre la fecha actual y la fecha de nacimiento
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    
    // Verificar si el cumpleaños ya pasó este año
    const mesCumpleaños = fechaNacimiento.getMonth();
    const diaCumpleaños = fechaNacimiento.getDate();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    
    if (mesActual < mesCumpleaños || (mesActual === mesCumpleaños && diaActual < diaCumpleaños)) {
        // Si el cumpleaños aún no ha pasado este año, restamos 1 a la edad
        edad--;
    }

    return edad
  }
  
}
