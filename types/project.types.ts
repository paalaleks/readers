import { RefObject } from "react";


export interface BlogPostMetadata {
  slug: string;
  id: string;
  date?: string; 
  [key: string]: any; 
}

export type CodeSeriesItem = {
  code: string;
  codeSeries: string;
};

export interface Book {
    key?: string;
    url?: string;
    cover: string;
    title: string;
    author: string;
    status?: string;
  }

export interface FriendLibrary {
    user_id: string;
    avatar: string;
    username: string;
    email: string;
    books: Book[];
  }
  export interface MyLibrary {
    id?: string;
    user_id?: string;
    username?: string;
    email?: string;
    avatar?: string;
    books?: Book[] | null;
    friends?: string[];
    codeSeries?: CodeSeriesItem[];
  }
  
  export interface FriendRequest {
    sender_id: string;
    receiver_id: string;
    status: string;
    sender_email: string;
    sender_username: string;
    sender_avatar: string;
  }

  export interface UserSuggestion {
    user_id: string;
    username?: string;
    email: string;
    avatar?: string;
  }

  export interface Messages {
    qrBody: string;
    qrSubject: string;
    libBody: string;
    libSubject: string;
  }

  export interface StyledMessageResult {
    styledSubject: string | undefined;
    styledBody: string | undefined;
    qrStyledSubject: string | undefined;
    qrStyledBody: string | undefined;
  }

  export interface MessagesProps {
    styledMessages: StyledMessageResult;
    staticUserId: string;
  }
  
  export interface ContentState {
    libSubject: string;
    libBody: string;
    qrSubject: string;
    qrBody: string;
  }
  
  export interface SavedSuccessfully {
    fieldset?: string;
    savedToDb?: string;
  }
  
  export interface LastFocused {
    ref: RefObject<HTMLParagraphElement>;
    fieldset: HTMLElement | null;
  }

  export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]