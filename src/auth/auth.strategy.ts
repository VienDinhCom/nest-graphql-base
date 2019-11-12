import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../graphql/user/models';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<User | { fid: string }> {
    try {
      const { uid } = await this.firebaseService
        .auth()
        .verifyIdToken(token, true);

      const user = await this.userRepository.findOne({ where: { fid: uid } });

      return user || { fid: uid };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
