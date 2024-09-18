const readline = require("readline");
const {
  calcularHorasTrabalhadas,
  subtrairIntervalo,
  validarHorario,
} = require("./CalcularHoras");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function obterHorario(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (input) => {
      if (validarHorario(input)) {
        resolve(input);
      } else {
        console.error("Formato de horário inválido. Use H:mm ou HHmm.");
        obterHorario(pergunta).then(resolve);
      }
    });
  });
}

function obterIntervalo() {
  return new Promise((resolve) => {
    rl.question("Digite o intervalo (HH:mm ou HHmm): ", (input) => {
      if (validarHorario(input)) {
        resolve(input);
      } else {
        console.error("Formato de intervalo inválido. Use HH:mm ou HHmm.");
        obterIntervalo().then(resolve);
      }
    });
  });
}

async function main() {
  console.log("Bem-vindo ao sistema de cálculo de horas trabalhadas!");

  try {
    const entrada = await obterHorario(
      "Digite o horário de início (H:mm ou HHmm): "
    );
    const saida = await obterHorario(
      "Digite o horário de término (H:mm ou HHmm): "
    );
    const intervalo = await obterIntervalo();

    const totalHoras = calcularHorasTrabalhadas(entrada, saida);
    const totalComDesconto = subtrairIntervalo(totalHoras, intervalo);

    console.log(
      `Horas trabalhadas: ${totalHoras.horas}h ${totalHoras.minutos}m`
    );
    console.log(
      `Horas trabalhadas após desconto do intervalo: ${totalComDesconto.horas}h ${totalComDesconto.minutos}m`
    );
  } catch (error) {
    console.error("Ocorreu um erro: ", error);
  } finally {
    rl.close();
  }
}

main();
