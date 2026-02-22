import type { Prisma, Session } from "@/@types/prisma/client.js";

export interface SessionsRepository {
    create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>;
    
}