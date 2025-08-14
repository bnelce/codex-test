import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { calcularItem } from '../services/calculo.js';

const createOmSchema = z.object({
  unidadeId: z.string(),
  finalidade: z.string().min(3),
  objetivo: z.string().min(3),
  periodoInicio: z.string(),
  periodoFim: z.string(),
  destinoId: z.string(),
  transporte: z.enum(['oficial','coletivo','aereo','proprio']),
  itens: z.array(z.object({
    pessoaId: z.string(),
    dias: z.number().positive(),
    meia: z.object({
      semPernoite: z.boolean().optional(),
      retorno: z.boolean().optional(),
      hospedagemFornecida: z.boolean().optional(),
    }).optional()
  })).min(1)
});

const omsRoutes: FastifyPluginAsync = async (app) => {
  app.post('/', async (req, reply) => {
    const body = createOmSchema.parse(req.body);
    // Stub simplificado: apenas ecoa payload e cálculo falso
    const fakeClasse = { valorNoEstado: 61.33, valorForaEstado: 141.95, valorExteriorUSD: 349 };
    const fakeDestino = { uf: 'SP', percentual: 50 };
    const resultados = body.itens.map(it => calcularItem({
      classe: fakeClasse,
      destino: fakeDestino,
      origemUF: 'CE',
      dias: it.dias,
      meia: it.meia
    }));
    return reply.code(201).send({ id: 'om-stub', resultados });
  });

  app.get('/', async () => ({ items: [] }));
};

export default omsRoutes;
