// ---------- VARIABLES ----------
const ESTANDAR_CALI = 14;
let registros = []; // aquí se guardan todos los registros

// ---------- 1. LOGIN ----------
function iniciarSesion() {
  let usuario = document.getElementById('usuario').value;
  let clave = document.getElementById('clave').value;

  if (usuario === 'Carlos' && clave === '1234') {
    document.getElementById('login').classList.add('oculto');
    document.getElementById('panel').classList.remove('oculto');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

// ---------- 2. REGISTRAR ----------
function registrar() {
  let direccion = document.getElementById('direccion').value;
  let inicio = document.getElementById('inicio').value;
  let fin = document.getElementById('fin').value;
  let mm = Number(document.getElementById('mm').value);
  let nombre = document.getElementById('nombre').value;

  if (direccion === '' || inicio === '' || fin === '' || mm <= 0 || nombre === '') {
    alert('Completa todos los campos');
    return;
  }

  // Horas de inicio y fin (ej: "15:30" -> 15.5)
  let horaInicio = Number(inicio.split(':')[0]) + Number(inicio.split(':')[1]) / 60;
  let horaFin = Number(fin.split(':')[0]) + Number(fin.split(':')[1]) / 60;
  let tiempoTotal = horaFin - horaInicio;

  if (tiempoTotal <= 0) {
    alert('La hora de fin debe ser mayor a la de inicio');
    return;
  }

  // Cálculo: precipitación * estándar * tiempo total
  let total = mm * ESTANDAR_CALI * tiempoTotal;

  // 4. Ajuste del 5.3% si inicia entre 3:00 p.m. y 6:00 p.m.
  let mensajeAjuste = '';
  if (horaInicio >= 15 && horaInicio < 18) {
    total = total * 1.053;
    mensajeAjuste = ' (con ajuste del 5.3%)';
  }

  // Comparación con el estándar
  let comparacion;
  if (mm > ESTANDAR_CALI) {
    comparacion = 'Está POR ENCIMA del estándar de 14 mm';
  } else if (mm < ESTANDAR_CALI) {
    comparacion = 'Está POR DEBAJO del estándar de 14 mm';
  } else {
    comparacion = 'Es IGUAL al estándar de 14 mm';
  }

  // Efecto de reloj antes de mostrar el dato
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('reloj').innerHTML = '🕐 Calculando...';

  setTimeout(function () {
    document.getElementById('reloj').innerHTML = '';
    document.getElementById('resultado').innerHTML =
      'Resultado: ' + total.toFixed(2) + mensajeAjuste + '<br>' + comparacion;

    registros.push({ direccion: direccion, mm: mm });
    dibujarGrafica();
    pedirClave();
  }, 2000);
}

// ---------- 3. CLAVE 'CLIMA' ----------
function pedirClave() {
  let palabra = prompt('Escribe la palabra clave para registrar otra zona:');

  if (palabra === 'CLIMA') {
    // Limpiar los campos
    document.getElementById('direccion').value = '';
    document.getElementById('inicio').value = '';
    document.getElementById('fin').value = '';
    document.getElementById('mm').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('resultado').innerHTML = '';
  } else {
    alert('Palabra incorrecta. Volverás al login.');
    document.getElementById('panel').classList.add('oculto');
    document.getElementById('login').classList.remove('oculto');
    document.getElementById('usuario').value = '';
    document.getElementById('clave').value = '';
  }
}

// ---------- 5. GRÁFICA DE BARRAS ----------
function dibujarGrafica() {
  let canvas = document.getElementById('grafica');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let maximo = ESTANDAR_CALI;
  for (let r of registros) {
    if (r.mm > maximo) maximo = r.mm;
  }

  let ancho = 40;
  let espacio = 20;

  for (let i = 0; i < registros.length; i++) {
    let altura = (registros[i].mm / maximo) * 180;
    let x = 20 + i * (ancho + espacio);
    let y = 210 - altura;

    ctx.fillStyle = registros[i].mm > ESTANDAR_CALI ? '#d9722b' : '#0b6e7f';
    ctx.fillRect(x, y, ancho, altura);

    ctx.fillStyle = 'black';
    ctx.fillText(registros[i].mm + ' mm', x, y - 5);
    ctx.fillText(registros[i].direccion.substring(0, 6), x, 225);
  }
}
