import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {

  checkPasswordToPolicy(password) {
    //code from https://stackoverflow.com/a/17152963 by Devin Lynch
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj: {
      result: boolean | undefined,
      error: string | undefined
    } = {
      result: false,
      error: ''
    };
    obj.result = true;

    if (password.length < 8) {
      obj.result = false;
      obj.error = 'not long enough';
      return obj;
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

    if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
      obj.result = false;
      obj.error = 'wrong format';
      return obj;
    }
    return obj;
  }
}
