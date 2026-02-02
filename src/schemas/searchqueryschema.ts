import z from "zod";

export const searchQuerySchema = z.object({
    query:z.string()
           .max(100,{message:"Do not exceed characters limit 100"})
            .optional(),

})
