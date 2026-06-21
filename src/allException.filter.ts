import { Catch,ArgumentsHost,HttpStatus,HttpException
 } from "@nestjs/common";
 import { BaseExceptionFilter } from "@nestjs/core";
 import { Request,Response } from "express";
 import { LoggerService } from "./logger/logger.service";
 import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
 import { WsException } from "@nestjs/websockets";   //websocket error


 type responseObj = {
      statusCode: number,
      timestamp: string,
      path:string,
      response: string | object,
    };

    @Catch()
export class allExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(allExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost): void {

    const ctx = host.switchToHttp();
    const responce = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObj:responseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response:'',
    };

    if(exception instanceof HttpException){
        responseObj.statusCode = exception.getStatus();
        responseObj.response = exception.getResponse();
    }else if(exception instanceof PrismaClientKnownRequestError){
        responseObj.statusCode = 422;
        responseObj.response = exception.message.replaceAll(/\n/g,'');
    }else{
        responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        responseObj.response = 'Internal Server Error';
    }
    responce.status(responseObj.statusCode)
            .json(responseObj);
    this.logger.error(responseObj.response,allExceptionFilter.name)        
    super.catch(exception,host);
  }

}