import { get, isUndefined } from 'lodash';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const { uid } = await admin.auth().verifyIdToken(token, true);
      const user = await admin.auth().getUser(uid);

      const id = get(user, 'uid');
      const email = get(user, 'email');
      const verified = get(user, 'emailVerified');
      const name = get(user, 'displayName');
      const image = get(user, 'photoURL');
      const phone = get(user, 'phoneNumber');

      return {
        id,
        email,
        verified,
        name,
        image,
        phone,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
