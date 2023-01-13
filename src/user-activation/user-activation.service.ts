import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { LinkService } from 'src/link/link.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserActivationService {
  constructor(
    private prisma: PrismaService,
    private linkService: LinkService
  ) { }

  async createUserActivation(user: User): Promise<{ activationLink: string }> {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)

    const userActivation = await this.prisma.userActivation.create({
      data: {
        expires: expirationDate,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    const activationLink = this.linkService.constructUrl([
      'activation',
      String(user.id)
    ]);

    return { activationLink }
    // TODO: Mailservice implementieren.
    // var text = `Hallo ${user.firstname}, \n hier ist dein Aktivierungslink: ${activationLink} \n Dieser Link ist 24 Stunden gültig.`;
    // var to = user.email;
    // var subject = 'Streuobstportal - Kontoaktivierung';
    // await MailFacade.send(to, subject, text);
  };
}
