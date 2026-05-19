# type-error

> A helper utility to throw type errors using the Produck TypeError template

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Run linting
npm run lint
```

### Project Structure

```text
packages/main/
  ├── src/
  │   └── index.mjs          # Main entry point
  ├── test/
  │   ├── index.mjs          # Test runner
  │   └── main.spec.mjs      # Test suite
  ├── index.d.ts             # TypeScript type definitions
  └── package.json
```

### Testing

The project uses Node.js built-in test framework. Tests are located in `packages/main/test/main.spec.mjs`.

```bash
# Run all tests
npm test

# View test coverage
npm run coverage
```

## Dependencies

- [`@produck/ow`](https://github.com/produck/ow) - Underlying error handling utility

## Contributing

Contributions are welcome! Please ensure:

1. All tests pass: `npm test`
2. Code is properly linted: `npm run lint`
3. Test coverage is maintained for new features
4. Commit messages follow conventional commit format

## License

MIT © [Produck](https://github.com/produck/type-error)

## Related

- [@produck/ow](https://github.com/produck/ow) - Error handling foundation
- [Produck Organization](https://github.com/produck)
