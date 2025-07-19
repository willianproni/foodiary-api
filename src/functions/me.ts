import { APIGatewayProxyEventV2 } from "aws-lambda";
import { MeController } from "../controllers/MeController";
import { parseEvent } from "../utils/parseEvent";
import { parseResponse } from "../utils/parseResponse";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { unauthorized } from "../utils/http";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event);

    const response = await MeController.handler(request);

    return parseResponse(response);
  } catch {
    return parseResponse(unauthorized({ error: "Invalid access token." }));
  }
}
