# Todo List

## Security

- [ ] Add tests for invalid, expired, missing, and malformed access tokens.
- [ ] Add authorization tests for cross-user vocab access.

## Logic

- [ ] Review whether `updated_at` should be updated automatically on writes.
- [ ] Handle missing records more explicitly in `login()` and `refresh()`.
- [ ] Consider adding validation for `refresh()` and `logout()` inputs.
- [ ] Avoid logging `DATABASE_URL` in `src/config/db.js`.
- [ ] Check whether startup table creation should run in all environments.
- [ ] Re-run the full test suite after each major auth or ownership change.

## HTTP / Responses

- [ ] Review the response body format for consistency across controllers.
- [ ] Add more specific API error responses where possible instead of always returning `500`.
- [ ] Consider distinguishing validation, auth, and database errors.

## Validation

- [ ] Review whether `z.email()` usage matches the installed Zod version and intended API.
- [ ] Update register validation tests to match the current Zod error shape.

## Tests

- [x] Add a REST Client `request.rest` file for endpoint testing.
- [ ] Update root route tests to match the actual route behavior.
- [ ] Fix login tests to align with the current controller logic and mocks.
- [ ] Update logout tests to reflect the current logout behavior.

## Spelling

- [ ] Fix the typo `messsage` to `message` in `createVocabSchema`.

## Cleanup

- [ ] Review naming consistency across services, controllers, and validators.
- [ ] Remove stray `console.log(userId)` from vocab model code.
- [ ] Remove dead or outdated code paths after fixes are applied.
