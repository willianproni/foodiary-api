import { HttpRequest, HttpResponse } from "../types/Http";

export class SingInController {
  static async handler(request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        accessToken: "token de acesso",
      },
    };
  }
}
