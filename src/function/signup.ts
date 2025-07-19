import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SingUpController } from "../controllers/SignUpController";
import { parseEvent } from "../utils/parseEvent";

export async function handle(event: APIGatewayProxyEventV2) {
  const { body, params, queryParams } = parseEvent(event);

  await SingUpController.handler({
    body,
    params,
    queryParams,
  });
}
