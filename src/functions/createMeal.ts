import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CreateMealController } from "../controllers/CreateMealController";
import { unauthorized } from "../utils/http";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { parseResponse } from "../utils/parseResponse";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event);

    console.log("data: ", request)

    const response = await CreateMealController.handle(request);
    return parseResponse(response);

  } catch (error){
    console.log({error})
    return parseResponse(unauthorized({ error: "Invalid access token." }));
  }
}
