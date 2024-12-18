import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE_',

  client: {
    VITE_APP_MODE: z.enum(['development', 'production'], {
      required_error: 'VITE_APP_MODE is required',
      invalid_type_error: 'VITE_APP_MODE must be either "development" or "production"',
    }),
    VITE_ESTIMATE_HOME_PAGE_URL: z
      .string({
        required_error: 'VITE_ESTIMATE_HOME_PAGE_URL is required',
        invalid_type_error: 'VITE_ESTIMATE_HOME_PAGE_URL must be a string',
      })
      .url('VITE_ESTIMATE_HOME_PAGE_URL must be a valid URL'),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
