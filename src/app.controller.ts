import { get } from 'lodash';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Controller, Get, Req, Res, HttpService } from '@nestjs/common';

dotenv.config();

const { FIREBASE_API_KEY } = process.env;

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/signup')
  async signUpToGetToken(@Req() req: Request, @Res() res: Response) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

    this.httpService
      .post(url, {
        email: get(req, 'query.email'),
        password: get(req, 'query.password'),
        returnSecureToken: true,
      })
      .subscribe(response => {
        const token = get(response, 'data.idToken');
        res.json({ Authorization: `Bearer ${token}` });
      });
  }

  @Get('/signin')
  async signInToGetToken(@Req() req: Request, @Res() res: Response) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    this.httpService
      .post(url, {
        email: get(req, 'query.email'),
        password: get(req, 'query.password'),
        returnSecureToken: true,
      })
      .subscribe(response => {
        const token = get(response, 'data.idToken');
        res.json({ Authorization: `Bearer ${token}` });
      });
  }
}
