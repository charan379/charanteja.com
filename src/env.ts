import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.string().optional(),
  },

  clientPrefix: 'VITE_',

  client: {
    VITE_APP_TITLE: z.string().optional(),
    VITE_BASE_URL: z.string().optional(),
    VITE_GA_MEASUREMENT_ID: z.string().optional(),
  },

  runtimeEnv: {
    SERVER_URL: typeof process !== 'undefined' ? process.env.SERVER_URL : undefined,
    VITE_APP_TITLE:
      typeof import.meta !== 'undefined' && import.meta.env
        ? import.meta.env.VITE_APP_TITLE
        : typeof process !== 'undefined'
          ? process.env.VITE_APP_TITLE
          : undefined,
    VITE_BASE_URL:
      typeof import.meta !== 'undefined' && import.meta.env
        ? import.meta.env.VITE_BASE_URL
        : typeof process !== 'undefined'
          ? process.env.VITE_BASE_URL
          : undefined,
    VITE_GA_MEASUREMENT_ID:
      typeof import.meta !== 'undefined' && import.meta.env
        ? import.meta.env.VITE_GA_MEASUREMENT_ID
        : typeof process !== 'undefined'
          ? process.env.VITE_GA_MEASUREMENT_ID
          : undefined,
  },

  emptyStringAsUndefined: true,

  onValidationError: (issues) => {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(issues, null, 2),
    )
    throw new Error('Invalid environment variables')
  },
})
