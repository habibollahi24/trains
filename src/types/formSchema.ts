import { z } from 'zod';

export const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'required' })
      .refine(
        (text) => {
          return /^\S+@\S+$/i.test(text);
        },
        { message: 'not valid' }
      ),

    password: z.string().min(4, { message: 'less than 4 characters' }),
    chom: z.string().min(4, { message: 'less than 4 characters' }),
    // chom: z.string().optional(),
    // chom: z.optional(),
    comfirm_password: z.string().min(4, { message: 'less than 4 characters' }),
    // states: z
    //   .array(
    //     z.object({
    //       label: z.string(),
    //       value: z.string(),
    //     })
    //   )
    //   .max(2, { message: '2 ta faghatt' })
    //   .min(1, { message: 'requred' }),
  })
  .refine(
    (keys) => {
      return keys.comfirm_password === keys.password;
    },
    { message: 'not match', path: ['comfirm_password'] }
  );

export type Schema_FormType = z.infer<typeof formSchema>;
