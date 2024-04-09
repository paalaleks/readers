"use server"

import { createClient } from "@/utils/supabase/server";
import { Messages } from "@/types/project.types";
import useUserServer from "@/hooks/useUserServer";
import { Book, FriendLibrary, StyledMessageResult } from "@/types/project.types";


async function fetchMessages(): Promise<Messages | null> {
    const supabase = createClient();
    const user = await useUserServer();

    if(!user) return null;
    try {
        let { data, error } = await supabase
        .from("myLibrary")
        .select("messages")
        .eq("user_id", user?.id)
        .single();

        if (error) throw error;

        if (!data) return null; 
        
        return data.messages;

    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}

export const useBorrowRequest = async (book: Book, lib: FriendLibrary) => {
    const messages = await fetchMessages();
    const emailSubject = messages?.libSubject;
    const emailBody = messages?.libBody;

    const formattedEmailSubject = emailSubject?.replace("TITLE", book.title)
        ?.replace("AUTHOR", book.author)
        ?.replace("OWNER", lib.username || "Friend") ;
    ;    

    const formattedEmailBody = emailBody?.replace("TITLE", book.title)
        ?.replace("AUTHOR", book.author)
        ?.replace("OWNER", lib.username || "Friend");

    if (!formattedEmailSubject || !formattedEmailBody) {
        console.error("Error formatting email subject or body.");
        return;
    }

    const mailtoHref = `mailto:${lib.email}?subject=${encodeURIComponent(
        formattedEmailSubject
    )}&body=${encodeURIComponent(formattedEmailBody)}`;
    return mailtoHref;
};

export const useStyledMessages = async (): Promise<StyledMessageResult> => {
    const messages = await fetchMessages();

    if (!messages) {
        console.error("No messages to format.");
        return { styledSubject: undefined, styledBody: undefined, qrStyledSubject: undefined, qrStyledBody: undefined };
    }

    const emailSubject = messages?.libSubject;
    const emailBody = messages?.libBody;


    const styledSubject = emailSubject?.replace("TITLE", `<span contenteditable="false" class="inserted-text">TITLE</span>`)
        ?.replace("AUTHOR", `<span contenteditable="false" class="inserted-text">AUTHOR</span>` || "")
        ?.replace("OWNER", `<span contenteditable="false" class="inserted-text">OWNER</span>` || "") ;

    ;    
    const styledBody = emailBody?.replace("TITLE", `<span contenteditable="false" class="inserted-text">TITLE</span>` || "")
        ?.replace("AUTHOR", `<span contenteditable="false" class="inserted-text">AUTHOR</span>` || "")
        ?.replace("OWNER", `<span contenteditable="false" class="inserted-text">OWNER</span>` || "") ;
    ;    
    const qrSubject = messages?.qrSubject;
    const qrMessageBody = messages?.qrBody;

    const qrStyledSubject = qrSubject?.replace("TITLE", `<span contenteditable="false" class="inserted-text">TITLE</span>`)
        ?.replace("AUTHOR", `<span contenteditable="false" class="inserted-text">AUTHOR</span>` || "")
        ?.replace("OWNER", `<span contenteditable="false" class="inserted-text">OWNER</span>` || "") ;

    ;
    const qrStyledBody = qrMessageBody?.replace("TITLE", `<span contenteditable="false" class="inserted-text">TITLE</span>` || "")
        ?.replace("AUTHOR", `<span contenteditable="false" class="inserted-text">AUTHOR</span>` || "")
        ?.replace("OWNER", `<span contenteditable="false" class="inserted-text">OWNER</span>` || "") ;    

    return { styledSubject, styledBody, qrStyledSubject, qrStyledBody} ;

}