import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserActivation } from '@prisma/client';
import { LinkService } from 'src/link/link.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ActivationService {
  constructor(
    private prisma: PrismaService,
    private linkService: LinkService,
    private userService: UserService
  ) { }

  async findUserActivation(id: number): Promise<UserActivation | null> {
    return this.prisma.userActivation.findUnique({
      where: {
        id
      }
    });
  }

  async createUserActivation(userId: number): Promise<{ activationLink: string }> {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)

    const userActivation = await this.prisma.userActivation.create({
      data: {
        expires: expirationDate,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    const activationLink = this.linkService.constructUrl([
      'activation',
      String(userActivation.id)
    ]);

    return { activationLink }
    // TODO: Mailservice implementieren.
    // var text = `Hallo ${user.firstname}, \n hier ist dein Aktivierungslink: ${activationLink} \n Dieser Link ist 24 Stunden gültig.`;
    // var to = user.email;
    // var subject = 'Streuobstportal - Kontoaktivierung';
    // await MailFacade.send(to, subject, text);
  };

  async activateUser(userActivationId) {
    const userActivation = await this.findUserActivation(userActivationId)

    if (!userActivation) {
      throw new HttpException('Unable to find useractivation', HttpStatus.NOT_FOUND);
    }

    if (new Date() > userActivation.expires) {
      throw new HttpException('userActivation Expired', HttpStatus.GONE)
    }

    this.userService.activateUser(
      userActivation.user_id
    );
  }
}
