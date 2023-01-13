import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {

  async validatePassword(password): Promise<Boolean> {
    //code from https://stackoverflow.com/a/17152963 by Devin Lynch
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if (password.length < 8) {
      throw new HttpException('Password too short', HttpStatus.CONFLICT)
    }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for (var i = 0; i < password.length; i++) {
      if (anUpperCase.test(password[i])) numUpper++;
      else if (aLowerCase.test(password[i])) numLower++;
      else if (aNumber.test(password[i])) numNums++;
      else if (aSpecial.test(password[i])) numSpecials++;
    }

    if (numUpper < 1) {
      throw new HttpException('Password must contain at least one uppercase Letter', HttpStatus.CONFLICT);
    }

    if (numLower < 1) {
      throw new HttpException('Password must contain at least one lowercase Letter', HttpStatus.CONFLICT);
    }

    if (numNums < 1) {
      throw new HttpException('Password must contain at least one number', HttpStatus.CONFLICT)
    }

    if (numSpecials < 1) {
      throw new HttpException('Password must contain at least one special character (!,@,#,$,%,^,&,*,(,),-,_', HttpStatus.CONFLICT);
    }
    return true
  }
}
