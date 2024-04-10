"use client";

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MyLibrary, UserSuggestion } from "@/types/project.types";

export default function AutocompletePeople({
  myLibrary,
}: {
  myLibrary: MyLibrary;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [friendReqSent, setFriendReqSent] = useState<string[]>([]);
  const supabase = createClient();

  const fetchSuggestions = useCallback(
    async (input: string) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("myLibrary")
        .select("user_id, username, email, avatar, books")
        .or(`email.ilike.%${input}%, username.ilike.%${input}%`)
        .neq("user_id", myLibrary.user_id)
        .limit(10);

      setLoading(false);
      if (error) {
        console.error("Error fetching suggestions", error);
        return;
      }

      setSuggestions(data || []);
    },
    [myLibrary.user_id, supabase]
  );

  useEffect(() => {
    if (myLibrary.user_id && inputValue) fetchSuggestions(inputValue);
  }, [inputValue, myLibrary.user_id, fetchSuggestions]);

  const fetchSentFriendRequests = useCallback(async () => {
    const { data, error } = await supabase
      .from("friends")
      .select("receiver_id")
      .eq("sender_id", myLibrary.user_id);

    if (error) {
      console.error("Error fetching sent friend requests", error);
      return;
    }

    const friendRequests = data.map((request: any) => request.receiver_id);
    setFriendReqSent(friendRequests);
  }, [supabase, myLibrary.user_id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (index: number) => {
    const user = suggestions[index];
    const { data: existingRequest, error: checkError } = await supabase
      .from("friends")
      .select("sender_id, receiver_id")
      .eq("sender_id", myLibrary.user_id)
      .eq("receiver_id", user.user_id)
      .single();

    if (checkError) {
      console.error("Error checking for existing friend request", checkError);
    }

    if (!existingRequest) {
      const { error: insertError } = await supabase.from("friends").insert([
        {
          sender_id: myLibrary.user_id,
          receiver_id: user.user_id,
          sender_avatar: myLibrary.avatar,
          sender_username: myLibrary.username,
          sender_email: myLibrary.email,
        },
      ]);

      if (insertError) {
        console.error("Error sending friend request", insertError);
      } else {
        console.log("Friend request sent successfully.");
      }
    }
    fetchSentFriendRequests();
  };

  return (
    <div className="relative flex justify-center w-full items-center">
      <div className="flex items-center w-full max-w-[290px] mx-auto relative">
        <Input
          placeholder="Search for people"
          type="text"
          className="mx-7 px-0 border-t-0 border-e-0 border-s-0 pl-2 rounded-none placeholder:text-foreground/50 focus-visible:ring-0 focus:border-b focus:gap-[1px] focus:border-primary"
          onChange={handleInputChange}
          value={inputValue}
        />
        {!loading && inputValue.length > 0 ? (
          <button
            className="absolute z-20 right-3 "
            onClick={() => {
              setInputValue("");
              setSuggestions([]);
            }}
          >
            <X size={16} />
          </button>
        ) : loading ? (
          <span className="absolute z-20 right-3 ">
            <Loader />
          </span>
        ) : null}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 bg-background border-accent border shadow-2xl rounded-xl max-h-60 max-w-[250px] overflow-auto z-50 ">
          {suggestions.map((suggestion, index) => {
            const isFriendRequestSent = friendReqSent.includes(
              suggestion.user_id
            );
            return (
              <li
                key={suggestion.user_id}
                className={`py-3 px-2 leading-4 flex items-center flex-wrap`}
              >
                <div className="flex items-center">
                  <Image
                    src={suggestion.avatar || "/images/avatar-circle.svg"}
                    height={100}
                    width={100}
                    alt="avatar"
                    className="rounded-full object-cover bg-accent w-9 h-9 mr-2"
                  />
                  <p className="flex items-center flex-wrap text-sm">
                    {suggestion.username}
                    <span
                      className={`${
                        !suggestion.username ? "text-sm" : "text-xs"
                      }`}
                    >
                      {suggestion.email}
                    </span>
                  </p>
                </div>
                <Button
                  variant={"secondary"}
                  onClick={() => handleSuggestionClick(index)}
                  className="mt-2 w-full h-8 flex items-center"
                  disabled={isFriendRequestSent}
                >
                  {isFriendRequestSent ? (
                    <UserCheck size={14} className="mr-1" />
                  ) : (
                    <UserPlus size={14} className="mr-1" />
                  )}
                  {isFriendRequestSent ? "Request sent" : "Add friend"}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}