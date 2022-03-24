import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/model/user.model';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailservice: MailService,
  ) {}
  /*--------------------------------------------------------------*/
  async signIn(signInUserInput) {
    var user = await this.userService.findOneByEmail(signInUserInput.email);
    if (user) {
      if (user.isActive != true)
        throw new HttpException(
          'this email not active go to your gmail ro activate',
          HttpStatus.FORBIDDEN,
        );
      var isAuth = bcrypt.compareSync(signInUserInput.password, user.password);
      if (isAuth) {
        var tocken = await jwt.sign(
          { userId: user.id, roles: user.roles },
          process.env.SECRET_KEY,
          signInUserInput.expired ? {} : { expiresIn: process.env.EXPIREDIN },
        );
        return tocken;
      } else {
        throw new Error('this password not correct');
      }
    } else {
      throw new Error('this email not registed');
    }
  }
  /*--------------------------------------------------------------*/

  /*--------------------------------------------------------------*/
  async signUp(createUserInput) {
    var user = await this.userService.findOneByEmail(createUserInput.email);
    if (user)
      throw new HttpException('this email is registed', HttpStatus.FORBIDDEN);

    var count = 0;
    var password = createUserInput.password;
    for (var x = 0; x < password.length; x++) {
      if (isNaN(password[x])) {
        count++;
      }
    }

    if (count < 4) {
      throw new HttpException(
        'your password should contains minimum 4 character',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALAT));
    createUserInput.password = hashPassword;
    var text = `hi ${createUserInput.name} welcome hir in our comunity we send this email to mack you active your account and for security else`;
    await this.mailservice.main({
      email: createUserInput.email,
      supject: 'Confirmation Message',
      text: text,
      htmlMessage: `<h2>${createUserInput.email}</h2><p>${text}</p><a style="padding:4px 10px;color:#fff;background:#555" href="activeAcount">Active Account</a>`,
    });
    return await this.userService.create(createUserInput);
  }
  /*--------------------------------------------------------------*/

  async resetPassword(resetPasswordInput) {
    try {
      var count = 0;
      var password = resetPasswordInput.newPassword;
      for (var x = 0; x < password.length; x++) {
        if (isNaN(password[x])) {
          count++;
        }
      }

      if (count < 4) {
        throw new HttpException(
          'your password should contains minimum 4 character',
          HttpStatus.FORBIDDEN,
        );
      }
      var tocken = await this.signIn(resetPasswordInput);
      const { userId }: any = jwt.verify(tocken, '123');
      var newPassword = bcrypt.hashSync(
        resetPasswordInput.newPassword,
        parseInt(process.env.SALAT),
      );
      resetPasswordInput.password = newPassword;
      await this.userService.update(userId, resetPasswordInput);

      return true;
    } catch (error) {
      return error;
    }
  }
}
