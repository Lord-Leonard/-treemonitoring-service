import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [{
      username: 'Abby',
      firstname: 'Abigail Beethoven',
      lastname: 'Sciuto',
      email: 'abs@mail.de',
      password_hash: await bcrypt.hash('Bert', 10),
      admin: false,
      deactivated: false
    },
    {
      username: 'Ziva',
      firstname: 'Ziva',
      lastname: 'David',
      email: 'zd@mail.de',
      password_hash: await bcrypt.hash('Tali', 10),
      admin: true,
      deactivated: false
    }]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  })