import { Book, Messages } from "@/types/project.types";

export const useQrBorrow = async (book: Book, email: string, username: string, 
    messages: Messages ) => {

   const qrSubject = messages?.qrSubject;
   const qrBody = messages?.qrBody;

   const formattedQrSubject = qrSubject?.replace("TITLE", book.title)
       ?.replace("AUTHOR", book.author)
       ?.replace("OWNER", username || "Friend") ;
   ;    

   const formattedQrBody = qrBody?.replace("TITLE", book.title)
       ?.replace("AUTHOR", book.author)
       ?.replace("OWNER", username || "Friend");

   if (!formattedQrSubject || !formattedQrBody) {
       console.error("Error formatting email subject or body.");
       return;
   }

   const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
       formattedQrSubject
   )}&body=${encodeURIComponent(formattedQrBody)}`;
   
   return mailtoHref;
}