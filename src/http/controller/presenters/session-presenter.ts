import type { Session } from "@/@types/prisma/client.js"

type HTTPSession = {
    id: string,
    startTime: Date,
    createdAt: Date,
    updatedAt: Date
}

export class SessionPresenter {
    static toHTTP(Session: Session): HTTPSession
    static toHTTP(Sessions: Session[]): HTTPSession[]
    static toHTTP(input: Session | Session[]): HTTPSession | HTTPSession[] {
        if (Array.isArray(input)) {
            return input.map((session) => this.toHTTP(session))
        }
        return {
            id: input.publicID,
            startTime: input.startTime,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        }
    }
}