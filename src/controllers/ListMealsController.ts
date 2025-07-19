import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { z } from "zod";
import { badRequest, ok } from "../utils/http";
import { db } from "../db";
import { and, eq, gte, lte } from "drizzle-orm";
import { mealsTable } from "../db/schema";

const schema = z.object({
  date: z.iso.date().transform((dateStr) => new Date(dateStr)),
});
export class ListMealsController {
  static async handle({
    queryParams,
    userId,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, data, error } = schema.safeParse(queryParams);

    if (!success) {
      return badRequest({ error: error.issues });
    }

    const endDate = new Date(data.date);
    endDate.setUTCHours(23, 59, 59, 59);

    const meals = await db.query.mealsTable.findFirst({
      columns: {
        id: true,
        foods: true,
        createdAt: true,
        icon: true,
        name: true,
      },
      where: and(
        eq(mealsTable.userId, userId),
        eq(mealsTable.status, "success"),
        gte(mealsTable.createdAt, data.date),
        lte(mealsTable.createdAt, endDate)
      ),
    });

    return ok({ meals: meals });
  }
}
