# Project Structure

## Directory Organization

```
├── .kiro/                    # Kiro configuration and steering rules
│   └── steering/             # AI assistant guidance documents
├── e2e/                      # End-to-end test directory (currently empty)
├── pages/                    # Legacy page objects (deprecated - use src/ui/pages)
│   ├── locators.ts
│   └── loginActions.ts
├── playwright-report/        # Generated HTML test reports
├── src/                      # Source code for test framework
│   ├── config/               # Configuration files
│   │   └── env.ts            # Environment variables and test data
│   ├── ui/                   # UI test components
│   │   ├── components/       # Reusable UI components
│   │   ├── flows/            # Multi-step user flows
│   │   │   └── LoginFlow.ts
│   │   └── pages/            # Page Object Model classes
│   │       ├── DashboardPage.ts
│   │       ├── LoginPage.ts
│   │       ├── TranslateInboundPage.ts
│   │       └── TranslateOutboundPage.ts
│   └── utils/                # Utility functions and helpers
├── test-results/             # Test execution artifacts (screenshots, videos, traces)
└── tests/                    # Test specifications
    ├── regression/           # Regression test suite
    │   └── example.spec.ts
    └── smoke/                # Smoke test suite
        └── EDI_login_InboundTriggers.spec.ts
```

## Architecture Patterns

### Page Object Model (POM)
- Page classes are located in `src/ui/pages/`
- Each page class encapsulates locators and actions for a specific page
- Locators are defined as methods returning Playwright locators
- Actions are implemented as async methods
- Constructor accepts a `Page` object from Playwright

Example pattern:
```typescript
export class LoginPage {
  constructor(private page: Page) {}
  
  // Locators as methods
  loginUsername = () => this.page.locator('[data-test-id="login-username"]');
  
  // Actions as async methods
  async login(username: string, password: string) {
    await this.loginUsername().fill(username);
    // ...
  }
}
```

### Iframe Handling
- The application uses iframes extensively
- Frame locators are initialized in page constructors
- Use `contentFrame()` to access iframe content
- Example: `this.frame = page.locator('iframe[name="..."]').contentFrame()`

### Configuration Management
- Environment-specific config in `src/config/env.ts`
- Supports environment variable overrides
- Credentials and URLs centralized in config object

### Test Organization
- **Smoke tests**: Critical path tests in `tests/smoke/`
- **Regression tests**: Comprehensive tests in `tests/regression/`
- Test files use `.spec.ts` extension
- Import page objects and config at the top of each test

## Naming Conventions
- Page classes: PascalCase with "Page" suffix (e.g., `LoginPage`)
- Test files: Descriptive names with `.spec.ts` extension
- Locator methods: camelCase describing the element
- Action methods: camelCase describing the action (e.g., `login()`)

## Best Practices
- Always wait for `networkidle` after navigation or form submission
- Use explicit timeouts for slow-loading elements
- Leverage `expect()` assertions with timeout options
- Handle conditional elements with `isVisible()` checks before interaction
- Set appropriate test timeouts for complex flows (e.g., 120 seconds)
