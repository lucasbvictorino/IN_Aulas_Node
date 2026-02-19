import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './libs/prisma.js'
import { appRoutes } from './http/controller/routes.js'

export const app = fastify()

app.register(appRoutes)