import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../graphql/user/user.model';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const { uid } = await admin.auth().verifyIdToken(token, true);
      const {
        email,
        emailVerified,
        displayName,
        photoURL,
        phoneNumber,
      } = await admin.auth().getUser(uid);

      const user = await this.userRepository.findOne({ where: { fid: uid } });

      return {
        ...user,
        fid: uid,
        email,
        verified: emailVerified,
        name: displayName,
        image: photoURL,
        phone: phoneNumber,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
