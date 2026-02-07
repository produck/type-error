# @produck/type-error

A utility library for generating and throwing TypeError messages following the
Produck TypeError template format.

## Installation

```bash
npm install @produck/type-error
```

## API

### `ErrorMessage(role: string, expected: string): string`

Generates a formatted error message for type validation failures.

**Parameters:**
- `role` - Description of the parameter role (e.g., `"args[0]"`, `"options.name"`)
- `expected` - Expected type or value description (e.g., `"string"`, `"function"`)

**Returns:** Formatted error message string

**Throws:** `TypeError` if role or expected is not a string

**Example:**
```javascript
import { ErrorMessage } from '@produck/type-error';

const message = ErrorMessage('args[0]', 'string');
// Returns: Invalid "args[0]", one "string" expected.
```

### `ThrowTypeError(role: string, expected: string): never`

Throws a TypeError with a formatted message.

**Parameters:**
- `role` - Description of the parameter role
- `expected` - Expected type or value description

**Throws:** `TypeError` always with formatted message

**Example:**
```javascript
import { ThrowTypeError } from '@produck/type-error';

function myFunction(value) {
  if (typeof value !== 'string') {
    ThrowTypeError('args[0]', 'string');
  }
}
```

### `AssertionChecker(validate: Validate, defaultExpected: string): Assert`

Creates a reusable assertion function with a custom validation function.

**Parameters:**
- `validate` - Function that returns `true` if value is valid, `false` otherwise
- `defaultExpected` - Default "expected" message used in error messages

**Returns:** An assertion function `(value: unknown, role: string, expected?: string) => undefined`

**Throws:** `TypeError` if validate is not a function or defaultExpected is not
a string

**Example:**
```javascript
import { AssertionChecker } from '@produck/type-error';

const assertString = AssertionChecker(
  (value) => typeof value === 'string',
  'string'
);

// Use the assertion
try {
  assertString(42, 'args[0]');
} catch (error) {
  console.error(error.message);
  // TypeError: Invalid "args[0]", one "string" expected.
}

// With custom expected message
try {
  assertString(null, 'args[0]', 'non-null string');
} catch (error) {
  console.error(error.message);
  // TypeError: Invalid "args[0]", one "non-null string" expected.
}
```

## Usage Patterns

### Basic Validation

```javascript
import { ThrowTypeError } from '@produck/type-error';

function processData(data) {
  if (typeof data !== 'object' || data === null) {
    ThrowTypeError('args[0]', 'object');
  }
  // ...
}
```

### Creating Custom Validators

```javascript
import { AssertionChecker } from '@produck/type-error';

const assertNumber = AssertionChecker(
  (v) => typeof v === 'number',
  'number'
);

const assertArray = AssertionChecker(
  (v) => Array.isArray(v),
  'array'
);

function calculateSum(numbers) {
  assertArray(numbers, 'args[0]');
  return numbers.reduce((sum, n) => {
    assertNumber(n, 'array element');
    return sum + n;
  });
}
```

## License

MIT

## Author

ChaosLee
