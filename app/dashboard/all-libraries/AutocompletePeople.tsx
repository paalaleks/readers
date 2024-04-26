"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useRef,
} from "react";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { MyLibrary, UserSuggestion } from "@/types/project.types";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export default function AutocompletePeople({
  myLibrary,
}: {
  myLibrary: MyLibrary;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [friendReqSent, setFriendReqSent] = useState<string[]>([]);
  const ref = useRef<HTMLUListElement>(null);
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

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };
  useOnClickOutside<HTMLUListElement>(ref, handleClickOutside);

  return (
    <div className="relative flex justify-center w-full items-center">
      <div className="flex items-center w-full max-w-[290px] mx-auto relative">
        <Input
          placeholder="Search for people"
          type="text"
          className="ml-0 mr-7 xs:mx-7 px-0 border-t-0 border-e-0 border-s-0 pl-2 border-b-2 rounded-none placeholder:text-muted-foreground focus-visible:ring-0 focus:border-b-2 focus:gap-[1px] focus:border-primary"
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

        {suggestions.length > 0 && (
          <ul
            ref={ref}
            className="absolute right-3 xs:right-0 top-full mt-2 bg-background ring-background ring-4 shadow-2xl rounded-xl max-h-60 w-full overflow-auto z-50 gap-y-4 flex flex-col items-center py-4 px-3 border border-accent"
          >
            {suggestions.map((suggestion, index) => {
              const isFriendRequestSent = friendReqSent.includes(
                suggestion.user_id
              );
              return (
                <li
                  key={suggestion.user_id}
                  className={`px-2 leading-4 flex items-center flex-wrap`}
                >
                  <div className="flex items-center">
                    <Image
                      src={suggestion.avatar || "/images/avatar-circle.svg"}
                      height={100}
                      width={100}
                      alt="avatar"
                      className="rounded-full object-cover bg-accent w-9 h-9 mr-2"
                    />
                    <div className="flex flex-col items-start flex-wrap text-sm">
                      <p>{suggestion.username}</p>
                      <p
                        className={`${
                          !suggestion.username ? "text-sm" : "text-xs"
                        }`}
                      >
                        {suggestion.email}
                      </p>
                    </div>
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
    </div>
  );
}
