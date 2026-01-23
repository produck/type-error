function _ErrorMessage(role, expected) {
	return `Invalid "${role}", one "${expected}" expected.`;
}

function _ThrowTypeError(role, expected) {
	throw new TypeError(ErrorMessage(role, expected));
}

function _AssertionChecker(validate, defaultExpected) {
	return function assert(value, role, expected = defaultExpected) {
		if (typeof role !== 'string') {
			_ThrowTypeError('args[1] as role', 'string');
		}

		if (typeof expected !== 'string') {
			_ThrowTypeError('args[2] as expected', 'string');
		}

		const isValid = validate(value);

		if (typeof isValid !== 'boolean') {
			_ThrowTypeError('validate()', 'boolean');
		}

		if (!isValid) {
			_ThrowTypeError(role, expected);
		}
	};
}

const isString = value => typeof value === 'string';
const assertString = _AssertionChecker(isString, 'string');

function assertRoleExpected(role, expected) {
	assertString(role, 'args[0] as role', 'string');
	assertString(expected, 'args[1] as expected', 'string');
}

export function ErrorMessage(role, expected) {
	assertRoleExpected(role, expected);

	return _ErrorMessage(role, expected);
}

export function ThrowTypeError(role, expected) {
	assertRoleExpected(role, expected);
	_ThrowTypeError(role, expected);
}

export function AssertionChecker(validate, defaultExpected) {
	if (typeof validate !== 'function') {
		ThrowTypeError('args[0] as validate', '(value: unknown) => boolean');
	}

	assertString(defaultExpected, 'args[1] as defaultExpected', 'string');

	return _AssertionChecker(validate, defaultExpected);
}
