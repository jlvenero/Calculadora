const {
  calcularHorasTrabalhadas,
  subtrairIntervalo,
  validarHorario,
} = require("../Src/CalcularHoras");

function testarCalculoHoras(
  entrada,
  saida,
  intervalo,
  horasEsperadas,
  minutosEsperados
) {
  const totalHoras = calcularHorasTrabalhadas(entrada, saida);
  const totalComDesconto = subtrairIntervalo(totalHoras, intervalo);
  const sucesso =
    totalComDesconto.horas === horasEsperadas &&
    totalComDesconto.minutos === minutosEsperados;

  if (sucesso) {
    console.log(
      `Teste para ${entrada} - ${saida} com intervalo ${intervalo}: SUCESSO`
    );
  } else {
    console.error(
      `Teste para ${entrada} - ${saida} com intervalo ${intervalo}: FALHOU (Esperado: ${horasEsperadas}h ${minutosEsperados}m, Obtido: ${totalComDesconto.horas}h ${totalComDesconto.minutos}m)`
    );
  }
}

function executarTestes() {
  console.log("Executando testes unitários...\n");

  // Testes com horário de término no dia seguinte
  testarCalculoHoras("22:00", "06:00", "01:00", 7, 0);
  testarCalculoHoras("9:00", "23:00", "02:00", 12, 0);
  testarCalculoHoras("15:30", "0300", "00:45", 10, 45);

  // Testes com horário de término no mesmo dia
  testarCalculoHoras("10:00", "14:30", "00:30", 4, 0);
  testarCalculoHoras("08:00", "0859", "00:10", 0, 49);

  console.log("\nTodos os testes concluídos.");
}

// Executa os testes
executarTestes();
