import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SingInController } from "../controllers/SignInController";
import { parseEvent } from "../utils/parseEvent";
import { parseResponse } from "../utils/parseResponse";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = parseEvent(event);

  const response = await SingInController.handler(request);

  return parseResponse(response);
}
