import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SingUpController } from "../controllers/SignUpController";
import { parseEvent } from "../utils/parseEvent";
import { parseResponse } from "../utils/parseResponse";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = parseEvent(event);

  const response = await SingUpController.handler(request);

  return parseResponse(response);
}
