# Test Directory

This directory contains all test files for the TypeScript starter project.

## Structure

- `*.test.ts` - Test files using Bun's test runner

## Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## Writing Tests

Tests use Bun's built-in test runner. Import test utilities from `bun:test`:

```typescript
import { describe, expect, test } from 'bun:test';

describe('My Feature', () => {
  test('should work', () => {
    expect(true).toBe(true);
  });
});
```
