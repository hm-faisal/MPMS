import { describe, expect, test } from 'bun:test';

describe('Example Test Suite', () => {
	test('basic assertion', () => {
		expect(1 + 1).toBe(2);
	});

	test('string operations', () => {
		const greeting = 'Hello via Bun!';
		expect(greeting).toContain('Bun');
		expect(greeting.length).toBeGreaterThan(0);
	});

	test('array operations', () => {
		const numbers = [1, 2, 3, 4, 5];
		expect(numbers).toHaveLength(5);
		expect(numbers).toContain(3);
	});

	test('async operations', async () => {
		const promise = Promise.resolve('success');
		await expect(promise).resolves.toBe('success');
	});
});

describe('Math Utilities', () => {
	test('addition', () => {
		const add = (a: number, b: number) => a + b;
		expect(add(2, 3)).toBe(5);
		expect(add(-1, 1)).toBe(0);
	});

	test('multiplication', () => {
		const multiply = (a: number, b: number) => a * b;
		expect(multiply(2, 3)).toBe(6);
		expect(multiply(0, 100)).toBe(0);
	});
});
