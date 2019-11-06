import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../graphql/user/user.model';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const { uid } = await this.firebaseService
        .auth()
        .verifyIdToken(token, true);

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
