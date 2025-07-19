import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SingInController } from "../controllers/SignInController";
import { parseEvent } from "../utils/parseEvent";

export async function handle(event: APIGatewayProxyEventV2) {
  const { body, params, queryParams } = parseEvent(event);

  await SingInController.handler({
    body,
    params,
    queryParams,
  });
}
