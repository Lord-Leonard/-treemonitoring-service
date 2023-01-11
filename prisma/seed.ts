import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      username: 'John Doe',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johnyd@mail.de',
      password_hash: await bcrypt.hash('changeMe', 10),
      admin: false,
      deactivated: false
    }
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