import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';

export function handleErrorResponse(response: FastifyReply, error: any) {
  const status = error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal Server Error';

  return response.status(status).send({
    status: false,
    message: message,
  });
}

export function handleSuccessResponse(
  response: FastifyReply,
  message: string,
  data?: any,
) {
  const status = HttpStatus.OK;

  // Create the response object
  const responseObject: any = {
    status: true, // Changed to true to reflect successful operation
    message: message,
  };

  // Add data to the response object only if it is present
  if (data !== undefined && data !== null) {
    responseObject.data = data;
  }

  return response.status(status).send(responseObject);
}
