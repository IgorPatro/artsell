import { HttpException, HttpStatus, UseGuards } from "@nestjs/common"
import { createZodGuard } from "nestjs-zod"
import { ZodSchema as NestZodSchema } from "nestjs-zod/z"
import { ZodSchema } from "zod"
import { messages } from "@artsell/network"

const ZodGuard = createZodGuard({
  createValidationException: (_error) => {
    return new HttpException(messages.VALIDATION_FAILED, HttpStatus.BAD_REQUEST)
  },
})

export const Validate = (schema: ZodSchema) =>
  UseGuards(new ZodGuard("body", schema as unknown as NestZodSchema))
