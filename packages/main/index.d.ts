export type Assert = (value: unknown, role: string, expected?: string) => undefined;
export type Validate = (value: unknown) => boolean;

export function ErrorMessage(role: string, expected: string): string;
export function ThrowTypeError(role: string, expected: string): never;
export function AssertionChecker(validate: Validate, defaultExpected: string): Assert;
