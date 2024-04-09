'use server'

import { revalidatePath } from "next/cache" 
export async function revalidateLibrariesPath() {
    revalidatePath("/libraries", "page");
}