'use server'

import { revalidatePath } from "next/cache" 
export async function revalidateHomePath() {
    revalidatePath("/", "page");
}