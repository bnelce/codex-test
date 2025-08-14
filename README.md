# CBMCE Diárias — Next.js + Fastify + Prisma

Kickstart gerado via ChatGPT. Estrutura mínima para evoluir o sistema de gestão de diárias.

## Como rodar (dev)

```bash
# 1) Subir serviços com Postgres
docker compose -f docker-compose.dev.yml up -d

# 2) Instalar deps
pnpm i

# 3) Migrações e seed
pnpm -w dlx prisma migrate dev --schema packages/prisma/schema.prisma
pnpm -w tsx packages/prisma/seed.ts

# 4) Subir API e Web
pnpm --filter @cbmce/api dev
pnpm --filter @cbmce/web dev
```

## Pastas

- apps/api — Fastify + Prisma
- apps/web — Next.js (App Router)
- packages/prisma — schema.prisma + seed
- docs — docs de arquitetura

## Próximos passos
- Completar modelos/tabelas conforme necessidade.
- Implementar fluxos (OM → validação → portaria → PDFs).
- Adicionar CI/CD, testes e observabilidade.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
