function validarHorario(horario) {
  const regexHora = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  const regexHoraCompacta = /^([01]?\d|2[0-3])([0-5]\d)$/;

  if (regexHora.test(horario)) {
    return true;
  } else if (regexHoraCompacta.test(horario)) {
    return true;
  }
  return false;
}

function formatarHorario(horario) {
  const regexHoraCompacta = /^([01]?\d|2[0-3])([0-5]\d)$/;

  if (regexHoraCompacta.test(horario)) {
    return `${horario.slice(0, -2)}:${horario.slice(-2)}`;
  }
  return horario;
}

function calcularHorasTrabalhadas(entrada, saida) {
  entrada = formatarHorario(entrada);
  saida = formatarHorario(saida);

  const [horaEntrada, minutoEntrada] = entrada.split(":").map(Number);
  const [horaSaida, minutoSaida] = saida.split(":").map(Number);

  const minutosEntrada = horaEntrada * 60 + minutoEntrada;
  const minutosSaida = horaSaida * 60 + minutoSaida;

  let minutosTrabalhados;

  if (minutosSaida >= minutosEntrada) {
    minutosTrabalhados = minutosSaida - minutosEntrada;
  } else {
    minutosTrabalhados = 1440 - minutosEntrada + minutosSaida;
  }

  const horasTrabalhadas = Math.floor(minutosTrabalhados / 60);
  const minutosRestantes = minutosTrabalhados % 60;

  return {
    horas: horasTrabalhadas,
    minutos: minutosRestantes,
  };
}

function subtrairIntervalo(total, intervalo) {
  intervalo = formatarHorario(intervalo);
  const [horaIntervalo, minutoIntervalo] = intervalo.split(":").map(Number);

  let horasRestantes = total.horas - horaIntervalo;
  let minutosRestantes = total.minutos - minutoIntervalo;

  if (minutosRestantes < 0) {
    minutosRestantes += 60;
    horasRestantes -= 1;
  }

  return {
    horas: horasRestantes,
    minutos: minutosRestantes,
  };
}

module.exports = {
  validarHorario,
  calcularHorasTrabalhadas,
  subtrairIntervalo,
};
