import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	ErrorMessage,
	ThrowTypeError,
	AssertionChecker,
} from '../src/index.mjs';

describe('::Message()', () => {
	it('should get message.', () => {
		const expected = 'Invalid "foo", one "bar" expected.';

		assert.equal(ErrorMessage('foo', 'bar'), expected);
	});

	it('should throw if bad role.', () => {
		assert.throws(() => ErrorMessage(null), {
			name: 'TypeError',
			message: 'Invalid "args[0] as role", one "string" expected.',
		});
	});

	it('should throw if bad expected.', () => {
		assert.throws(() => ErrorMessage('foo', null), {
			name: 'TypeError',
			message: 'Invalid "args[1] as expected", one "string" expected.',
		});
	});
});

describe('::Throw()', () => {
	it('should throw TypeError.', () => {
		assert.throws(() => ThrowTypeError('foo', 'bar'), {
			name: 'TypeError',
			message: 'Invalid "foo", one "bar" expected.',
		});
	});

	it('should throw if bad role.', () => {
		assert.throws(() => ThrowTypeError(null), {
			name: 'TypeError',
			message: 'Invalid "args[0] as role", one "string" expected.',
		});
	});

	it('should throw if bad expected.', () => {
		assert.throws(() => ThrowTypeError('foo', null), {
			name: 'TypeError',
			message: 'Invalid "args[1] as expected", one "string" expected.',
		});
	});
});

describe('::AssertionChecker()', () => {
	it('should get a assert function.', () => {
		assert.ok(typeof AssertionChecker(() => true, 'foo') === 'function');
	});

	it('should throw if bad validate.', () => {
		assert.throws(() => AssertionChecker(null), {
			name: 'TypeError',
			message: 'Invalid "args[0] as validate", one "(value: unknown) => boolean" expected.',
		});
	});

	it('should throw if bad defaultExpected.', () => {
		assert.throws(() => AssertionChecker(() => true, null), {
			name: 'TypeError',
			message: 'Invalid "args[1] as defaultExpected", one "string" expected.',
		});
	});

	describe('>assert()', () => {
		const assertString = AssertionChecker(v => typeof v === 'string', 'string');

		it('should get ok.', () => {
			assertString('foo', 'bar');
		});

		it('should throw if bad role.', () => {
			assert.throws(() => assertString(null), {
				name: 'TypeError',
				message: 'Invalid "args[1] as role", one "string" expected.',
			});
		});

		it('should throw if bad expected.', () => {
			assert.throws(() => assertString(null, 'foo', null), {
				name: 'TypeError',
				message: 'Invalid "args[2] as expected", one "string" expected.',
			});
		});

		it('should throw if bad validate().', () => {
			const badAssert = AssertionChecker(v => v, 'string');

			assert.throws(() => badAssert(1, 'foo'), {
				name: 'TypeError',
				message: 'Invalid "validate()", one "boolean" expected.',
			});
		});
	});
});
