import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { sendContactEmail } from "./_core/email";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    sendBooking: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Navn er påkrævet"),
        email: z.string().email("Gyldig email påkrævet"),
        phone: z.string().min(1, "Telefonnummer er påkrævet"),
        studentNeeds: z.string().optional(),
        interestedPackage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await sendContactEmail(input, "Bookingformular");
          return { success: true };
        } catch (error) {
          console.error("Failed to send booking email:", error);
          throw new Error("Kunne ikke sende booking anmodning");
        }
      }),
    sendContact: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Navn er påkrævet"),
        email: z.string().email("Gyldig email påkrævet"),
        phone: z.string().min(1, "Telefonnummer er påkrævet"),
        studentNeeds: z.string().optional(),
        interestedPackage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await sendContactEmail(input, "Kontaktformular");
          return { success: true };
        } catch (error) {
          console.error("Failed to send contact email:", error);
          throw new Error("Kunne ikke sende besked");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
