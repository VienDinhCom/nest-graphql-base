import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

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
}
