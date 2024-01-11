import { z } from 'zod'

export const cocktailsEnum = z.enum(['margarita', 'mojito', 'a1', 'kir'])
export type Cocktails = z.infer<typeof cocktailsEnum>