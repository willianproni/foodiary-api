import { HttpRequest, HttpResponse } from "../types/Http";

export class SingUpController {
  static async handler(request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 201,
      body: {
        accessToken: "signup: token de acesso",
      },
    };
  }
}
