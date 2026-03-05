# Technology Stack

## Framework & Tools
- **Test Framework**: Playwright (@playwright/test v1.58.2)
- **Language**: TypeScript
- **Runtime**: Node.js
- **Module System**: CommonJS

## Test Configuration
- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled (fullyParallel: true)
- **Retries**: 4 on CI, 0 locally
- **Workers**: 10 on CI, unlimited locally
- **Reporter**: HTML reports

## Browser Support
Tests run against three browser engines:
- Chromium (1920x1080 viewport)
- Firefox (1920x1080 viewport)
- WebKit (1920x1080 viewport)

## Timeouts
- Action timeout: 30 seconds
- Navigation timeout: 60 seconds
- Default test timeout: Can be overridden per test (e.g., 120 seconds for complex flows)

## Debugging & Diagnostics
- Trace collection: On failure only
- Screenshots: On failure only
- Videos: On failure only

## Common Commands
```bash
# Run all tests
npx playwright test

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test tests/smoke/EDI_login_InboundTriggers.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Show HTML report
npx playwright show-report

# Run tests with specific tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

## Environment Variables
Configuration supports environment variables:
- `D830RC3`: Base URL override
- `USERNAME94`: Username override
- `PASSWORD`: Password override
- `CI`: Enables CI-specific behavior (retries, workers, forbidOnly)
