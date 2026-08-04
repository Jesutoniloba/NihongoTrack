# Todo List

## Auth and Token Handling

- [x] Make `refresh()` verify the refresh token against the stored database value.
- [x] Rework `logout()` so it clears the correct user session safely.
- [x] Avoid trusting only `email` in refresh flows.

## Vocab Authorization

- [ ] Fix `getAllVocabsService()` so it accepts `userId` as an argument.
- [ ] Remove the undefined `userId` reference inside `src/models/vocab-model.js`.
- [ ] Prevent users from reading another user’s vocab by ID.
- [ ] Prevent users from updating another user’s vocab by ID.
- [ ] Prevent users from deleting another user’s vocab by ID.

## Database and Models

- [ ] Fix `deleteUsersService()` to delete from `users`, not `user`.
- [ ] Remove stray `console.log(userId)` from vocab model code.
- [ ] Review whether `updated_at` should be updated automatically on writes.

## Validation

- [ ] Fix the typo `messsage` to `message` in `createVocabSchema`.
- [ ] Correct the username length message in `registerSchema`.
- [ ] Review whether `z.email()` usage matches the installed Zod version and intended API.
- [ ] Consider adding validation for `refresh()` and `logout()` inputs.

## Controllers and Responses

- [ ] Change update and delete responses from `201` to a more appropriate status code.
- [ ] Review the response body format for consistency across controllers.
- [ ] Standardize spelling in messages like `Sucessfully`.
- [ ] Handle missing records more explicitly in `login()` and `refresh()`.

## Error Handling

- [ ] Add more specific API error responses where possible instead of always returning `500`.
- [ ] Consider distinguishing validation, auth, and database errors.

## Server and Config

- [ ] Fix the server log format in `src/server.js` to use `http://localhost:${port}`.
- [ ] Avoid logging `DATABASE_URL` in `src/config/db.js`.
- [ ] Check whether startup table creation should run in all environments.

## Tests

- [ ] Update root route tests to match the actual route behavior.
- [ ] Update register validation tests to match the current Zod error shape.
- [ ] Fix login tests to align with the current controller logic and mocks.
- [ ] Update logout tests to reflect the current logout behavior.
- [ ] Add tests for invalid, expired, missing, and malformed access tokens.
- [ ] Add authorization tests for cross-user vocab access.

## Cleanup

- [ ] Review naming consistency across services, controllers, and validators.
- [ ] Remove dead or outdated code paths after fixes are applied.
- [ ] Re-run the full test suite after each major auth or ownership change.
