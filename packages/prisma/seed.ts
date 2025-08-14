import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.usuario.upsert({
    where: { email: 'admin@cbm.ce.gov.br' },
    update: {},
    create: { email: 'admin@cbm.ce.gov.br', nome: 'Administrador' }
  });
  console.log('Seed ok');
}
main().finally(async () => prisma.$disconnect());
