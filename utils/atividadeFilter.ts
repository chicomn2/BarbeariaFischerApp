import GlobalVars from '../utils/GlobalVars';

export const filtrarAtividades = (atividades: any[]) => {
  let atividadesFiltradas = atividades;

  if (GlobalVars.dataInicial) {
    atividadesFiltradas = atividadesFiltradas.filter((atividade: any) =>
      new Date(atividade.data) >= new Date(GlobalVars.dataInicial!.split('/').reverse().join('-') + 'T00:00:01')
    );
  } else {
    const dataMaisAntiga = new Date(Math.min(...atividades.map((atividade: any) => new Date(atividade.data).getTime())));
    atividadesFiltradas = atividadesFiltradas.filter((atividade: any) =>
      new Date(atividade.data) >= dataMaisAntiga
    );
  }

  if (GlobalVars.dataFinal) {
    atividadesFiltradas = atividadesFiltradas.filter((atividade: any) =>
      new Date(atividade.data) <= new Date(GlobalVars.dataFinal!.split('/').reverse().join('-') + 'T23:59:59')
    );
  } else {
    const dataMaisRecente = new Date(Math.max(...atividades.map((atividade: any) => new Date(atividade.data).getTime())));
    atividadesFiltradas = atividadesFiltradas.filter((atividade: any) =>
      new Date(atividade.data) <= dataMaisRecente
    );
  }

  if (GlobalVars.tipoServico !== 3) {
    atividadesFiltradas = atividadesFiltradas.filter(
      (atividade: any) => atividade.tipoAtividade === GlobalVars.tipoServico
    );
  }

  if (GlobalVars.statusPagamento !== 3) {
    atividadesFiltradas = atividadesFiltradas.filter(
      (atividade: any) => atividade.pago === (GlobalVars.statusPagamento === 1)
    );
  }

  if (GlobalVars.nomeCliente) {
    atividadesFiltradas = atividadesFiltradas.filter((atividade: any) =>
      atividade.nomeCliente.toLowerCase().includes(GlobalVars.nomeCliente.toLowerCase())
    );
  }

  atividadesFiltradas.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return atividadesFiltradas;
};
