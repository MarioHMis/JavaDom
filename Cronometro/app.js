const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

let [horas, minutos, segundos] = [0, 0, 0];

let intervaloDeTiempo;
let estadoCronometro = 'pausado';

// logica del cronometro
function actualizarCronometro() {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  const cronometro = document.getElementById('cronometro');
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

// boton de inicio pausa
botonInicioPausa.addEventListener('click', function () {
  if (estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
  } else {
    window.clearInterval(intervaloDeTiempo);
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});

// boton de reiniciar

botonReiniciar.addEventListener('click', function () {
  window.clearInterval(intervaloDeTiempo);

  horas = 0;
  minutos = 0;
  segundos = 0;

  // Reinciio de cronometro
  cronometro.innerText = '00:00:00';

  // actualizacion boton play cronometro
  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');
});
