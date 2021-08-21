import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import mongoose from 'mongoose';

export const dbConnector = async (fastify: FastifyInstance, options: any) => {
  try {
    await mongoose.connect(process.env.DATABASE_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Db connection successful');
  } catch (error) {
    fastify.log.error(`db:connectionError: ${error}`);
  }
};