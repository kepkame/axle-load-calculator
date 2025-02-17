import { ZodNumber, ZodEffects, ZodTypeAny, ZodOptional, ZodDefault, ZodNullable } from 'zod';

interface IZodCheck {
  kind: 'min' | 'max';
  value: number;
  inclusive: boolean;
  message?: string;
}

/** Extracts the min and max constraints from a ZodNumber schema */
export const getZodMinMax = (schema: ZodTypeAny) => {
  // If ZodEffects is passed (because of preprocess), get the internal circuitry
  if (schema instanceof ZodEffects) {
    schema = schema._def.schema;
  }

  // Deploying ZodOptional, ZodDefault, ZodNullable
  while (
    schema instanceof ZodOptional ||
    schema instanceof ZodDefault ||
    schema instanceof ZodNullable
  ) {
    schema = schema._def.innerType;
  }

  // Check if the schema is now a ZodUnion (e.g. number | NaN)
  if ('options' in schema && Array.isArray(schema.options)) {
    schema = schema.options.find((option) => option instanceof ZodNumber) ?? schema;
  }

  const checks: IZodCheck[] = schema._def.checks ?? [];

  const min: number = checks.find((check) => check.kind === 'min')?.value ?? -Infinity;
  const max: number = checks.find((check) => check.kind === 'max')?.value ?? Infinity;

  return { min, max };
};
