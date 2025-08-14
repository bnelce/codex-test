import { z } from 'zod';
export const omFormSchema = z.object({
  unidadeId: z.string(),
  finalidade: z.string().min(3),
  objetivo: z.string().min(3),
  periodo: z.object({
    inicio: z.coerce.date(),
    fim: z.coerce.date()
  }).refine(v => v.fim >= v.inicio, 'Período inválido'),
  destinoId: z.string(),
  transporte: z.enum(['oficial','coletivo','aereo','proprio']),
  itens: z.array(z.object({
    pessoaId: z.string(),
    dias: z.coerce.number().positive(),
    meia: z.object({
      semPernoite: z.boolean().optional(),
      retorno: z.boolean().optional(),
      hospedagemFornecida: z.boolean().optional(),
    }).optional()
  })).min(1)
});
export type OmForm = z.infer<typeof omFormSchema>;
