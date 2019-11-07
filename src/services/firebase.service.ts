import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { User } from '../graphql/user/user.model';

dotenv.config();

const { FIREBASE_SERVICE_ACCOUNT, FIREBASE_DATABASE_URL } = process.env;
const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
});

@Injectable()
export class FirebaseService {
  auth = admin.auth;

  async getUser(fid: string) {
    const {
      email,
      emailVerified,
      displayName,
      photoURL,
      phoneNumber,
    } = await this.auth().getUser(fid);

    return {
      fid,
      email,
      verified: emailVerified,
      name: displayName,
      image: photoURL,
      phone: phoneNumber,
    };
  }

  async updateUser(fid: string, { name, image, phone }: Partial<User>) {
    await this.auth().updateUser(fid, {
      displayName: name,
      photoURL: image,
      phoneNumber: phone,
    });

    return this.getUser(fid);
  }
}
