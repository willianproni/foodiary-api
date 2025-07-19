import { z } from "zod";

import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok } from "../utils/http";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export class SingInController {
  static async handler({
    body,
    params,
    queryParams,
  }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);

    if (!success) return badRequest({ errors: error.issues });

    return ok({
      data,
    });
  }
}
