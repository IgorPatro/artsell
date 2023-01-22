import { HttpException, HttpStatus, UseGuards } from "@nestjs/common"
import { createZodGuard } from "nestjs-zod"
import { ZodSchema } from "nestjs-zod/z"
import { messages } from "@art-nx/network"

const ZodGuard = createZodGuard({
  createValidationException: (_error) => {
    // TODO: Add field error message
    // console.log('error', error);
    return new HttpException(messages.VALIDATION_FAILED, HttpStatus.BAD_REQUEST)
  },
})

export const Validate = (schema: ZodSchema) =>
  UseGuards(new ZodGuard("body", schema))
