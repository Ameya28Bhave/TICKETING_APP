import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51PBKS1LM49LUW6NEbxcfU9SnXBI2Cw6T3beek3Uf7FlY3LARjyg6pmNo6BhkwyS1RSTJMsSHFKOT2HvLlLlSTICy00xcbY4ZPz';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload . {id , payload}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // Create the JWT !
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {jwt : MY_JWT}
  const session = { jwt: token };

  //turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string that the cookie with the encoded data
  return [`session=${base64}`];
};
