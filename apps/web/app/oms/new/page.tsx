'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { omFormSchema, type OmForm } from '@/app/../lib/validators/om';

export default function NovaOM() {
  const { register, handleSubmit, formState: { errors } } = useForm<OmForm>({ resolver: zodResolver(omFormSchema) });
  const onSubmit = async (data: OmForm) => {
    const payload = {
      ...data,
      periodoInicio: data.periodo.inicio.toISOString(),
      periodoFim: data.periodo.fim.toISOString()
    };
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/oms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    alert('Status: ' + res.status + ' ' + (await res.text()));
  };

  return (
    <main>
      <h2>Nova OM (stub)</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap: 8, maxWidth: 480 }}>
        <input placeholder="Unidade ID" {...register('unidadeId')} />
        <input placeholder="Finalidade" {...register('finalidade')} />
        <input placeholder="Objetivo" {...register('objetivo')} />
        <input type="date" {...register('periodo.inicio')} />
        <input type="date" {...register('periodo.fim')} />
        <input placeholder="Destino ID" {...register('destinoId')} />
        <select {...register('transporte')}>
          <option value="oficial">oficial</option>
          <option value="coletivo">coletivo</option>
          <option value="aereo">aereo</option>
          <option value="proprio">proprio</option>
        </select>
        <input placeholder="Pessoa ID" {...register('itens.0.pessoaId')} />
        <input placeholder="Dias" type="number" step="0.5" {...register('itens.0.dias', { valueAsNumber: true })} />
        <label><input type="checkbox" {...register('itens.0.meia.retorno')} /> meia no retorno</label>
        <button type="submit">Criar OM</button>
      </form>
      {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
    </main>
  );
}
