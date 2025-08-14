export type Ctx = {
  classe: { valorNoEstado: number, valorForaEstado: number, valorExteriorUSD: number },
  destino: { uf: string, percentual?: number },
  origemUF: string,
  exterior?: boolean,
  cotacaoDolar?: number,
  meia?: { semPernoite?: boolean, retorno?: boolean, hospedagemFornecida?: boolean },
  dias: number,
  ajudaCustoCidades?: number,
};

export function valorBase(ctx: Ctx) {
  if (ctx.exterior) return (ctx.classe.valorExteriorUSD) * (ctx.cotacaoDolar ?? 1);
  const fora = ctx.destino.uf !== ctx.origemUF;
  return fora ? ctx.classe.valorForaEstado : ctx.classe.valorNoEstado;
}

export function aplicarPercentual(base: number, percentual?: number) {
  return percentual ? base * (1 + percentual/100) : base;
}

export function aplicarMeia(vDia: number, meia?: Ctx['meia']) {
  const half = !!(meia?.semPernoite || meia?.retorno || meia?.hospedagemFornecida);
  return half ? vDia/2 : vDia;
}

export function calcularItem(ctx: Ctx) {
  const base = valorBase(ctx);
  const ajustado = aplicarPercentual(base, ctx.destino.percentual);
  const valorDia = aplicarMeia(ajustado, ctx.meia);
  const subtotalDiarias = valorDia * ctx.dias;
  const ajudaCusto = (ctx.exterior || ctx.destino.uf !== ctx.origemUF) ? ajustado * (ctx.ajudaCustoCidades ?? 1) : 0;
  return {
    diariaUnit: Number(ajustado.toFixed(2)),
    subtotal: Number((subtotalDiarias + ajudaCusto).toFixed(2)),
    ajudaCusto: Number(ajudaCusto.toFixed(2))
  };
}
