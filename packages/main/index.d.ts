/**
 * Assertion function that validates a value and throws TypeError if invalid
 * @param value - The value to validate
 * @param role - Description of the parameter role (e.g., "args[0]")
 * @param expected - Expected type/value description (optional, uses default)
 */
export type Assert = (
  value: unknown,
  role: string,
  expected?: string
) => undefined;

/**
 * Validation function that checks if a value meets criteria
 * @param value - The value to validate
 * @returns true if valid, false otherwise
 */
export type Validate = (value: unknown) => boolean;

/**
 * Generates a formatted error message for type validation failures
 * @param role - Description of the parameter role
 * @param expected - Expected type/value description
 * @returns Formatted error message string
 * @throws TypeError when role or expected is not a string
 */
export function ErrorMessage(
  role: string,
  expected: string
): string;

/**
 * Throws a TypeError with a formatted message for type validation failures
 * @param role - Description of the parameter role
 * @param expected - Expected type/value description
 * @throws TypeError always throws with formatted message
 */
export function ThrowTypeError(
  role: string,
  expected: string
): never;

/**
 * Creates an assertion checker function with a custom validation function
 * @param validate - Function that returns true if value is valid
 * @param defaultExpected - Default "expected" message for the assertion
 * @returns Assertion function that validates values
 * @throws TypeError when validate is not a function or
 *                   defaultExpected is not a string
 */
export function AssertionChecker(
  validate: Validate,
  defaultExpected: string
): Assert;
