import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import mongo from 'fastify-mongodb';

export const dbConnector = fastifyPlugin(async (fastify: FastifyInstance, options: any) => {
  fastify.register(mongo, {
    url: process.env.DATABASE_URI
  })
});