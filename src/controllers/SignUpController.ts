import { z } from "zod";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";

const schema = z.object({
  goal: z.enum(["lose", "maintain", "gain"]),
  gender: z.enum(["male", "female"]),
  birthDate: z.iso.date(),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
  }),
});

export class SingUpController {
  static async handler({
    body,
    params,
    queryParams,
  }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);

    if (!success) return badRequest({ errors: error.issues });

    const isUserAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true,
      },
      where: eq(usersTable.email, data.account.email),
    });

    if (isUserAlreadyExists) {
      return conflict({ error: "This email is already in use." });
    }

    const { account, ...rest } = data;

    const [user] = await db
      .insert(usersTable)
      .values({
        ...account,
        ...rest,
        calories: 0,
        carbohydrates: 0,
        fats: 0,
        proteins: 0,
      })
      .returning({
        id: usersTable.id,
      });

    return created({
      userId: user.id,
    });
  }
}
