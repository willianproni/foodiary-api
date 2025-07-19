import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { ok } from "../utils/http";

export class MeController {
  static async handler({
    userId,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    return ok({ user });
  }
}
