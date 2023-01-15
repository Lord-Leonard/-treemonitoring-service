import { faker } from '@faker-js/faker';
import { Plot, PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { Polygon, Position } from "geojson";

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

  const position_one: Position = [faker.datatype.number({ min: 0, max: 100 }), faker.datatype.number({ min: 0, max: 100 })]
  const position_two: Position = [faker.datatype.number({ min: 0, max: 100 }), faker.datatype.number({ min: 0, max: 100 })]

  const polygonJson: Polygon = {
    type: 'Polygon',
    coordinates: [
      [
        position_one,
        position_two,
        position_two,
        position_one
      ]
    ]
  }


  await prisma.$executeRaw`
    INSERT INTO "plot" (
    "name",
    "polygon",
    "owner",
    "care_state",
    "care",
    "cost_cut_sqm",
    "cost_mulch_sqm",
    "selected_maehen",
    "selected_mulchen",
    "description_plot",
    "deactivated") VALUES (
       'name test',
       (ST_GeomFromGeoJSON(${JSON.stringify(polygonJson)})),
       'owner test',
       'care_state test',
       false,
       15.5,
       67.8,
       1,
       5,
       'test',
       false
   )`


  const plot: Plot = (await prisma.$queryRaw<Plot>`
    SELECT
      id,
      polygon::Json,
      name,
      owner,
      care_state,
      care,
      cost_cut_sqm,
      cost_mulch_sqm,
      selected_mulchen,
      selected_maehen,
      description_plot,
      deactivated,
      "createdAt"
    FROM plot
    ORDER BY "createdAt" DESC
    LIMIT 1
  `)[0]

  console.log(plot);
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