"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FriendRequest } from "@/types/project.types";
import { revalidateLibrariesPath } from "./sa/revalidatePage";

export default function FriendNotifications({
  initialFriends,
}: {
  initialFriends: FriendRequest[];
}) {
  const supabase = createClient();
  const [friendRequests, setFriendRequests] =
    useState<FriendRequest[]>(initialFriends);

  const acceptFriendRequest = async (senderId: string, receiverId: string) => {
    // Start by fetching both users' current friends lists
    let receiverFriendsUpdateError = null;
    let senderFriendsUpdateError = null;

    const { data: receiverData, error: receiverFetchError } = await supabase
      .from("myLibrary")
      .select("friends")
      .eq("user_id", receiverId)
      .single();

    if (receiverFetchError) {
      console.error("Fetch receiver library error:", receiverFetchError);
      return;
    }

    const { data: senderData, error: senderFetchError } = await supabase
      .from("myLibrary")
      .select("friends")
      .eq("user_id", senderId)
      .single();

    if (senderFetchError) {
      console.error("Fetch sender library error:", senderFetchError);
      return;
    }

    // Update receiver's friends list
    if (receiverData) {
      const updatedReceiverFriends = Array.from(
        new Set([...(receiverData.friends || []), senderId])
      );

      const { error } = await supabase
        .from("myLibrary")
        .update({ friends: updatedReceiverFriends })
        .eq("user_id", receiverId);

      receiverFriendsUpdateError = error;
    }

    // Update sender's friends list
    if (senderData) {
      const updatedSenderFriends = Array.from(
        new Set([...(senderData.friends || []), receiverId])
      );

      const { error } = await supabase
        .from("myLibrary")
        .update({ friends: updatedSenderFriends })
        .eq("user_id", senderId);

      senderFriendsUpdateError = error;
    }

    // Check for errors in updating friends lists
    if (receiverFriendsUpdateError) {
      console.error(
        "Update receiver library error:",
        receiverFriendsUpdateError
      );
    }
    if (senderFriendsUpdateError) {
      console.error("Update sender library error:", senderFriendsUpdateError);
    }

    if (receiverFriendsUpdateError || senderFriendsUpdateError) {
      return; // Exit if there was any error updating the friends lists
    }

    // Update the friend request status to "accepted"
    const { error: friendsUpdateError } = await supabase
      .from("friends")
      .delete()
      .match({ sender_id: senderId, receiver_id: receiverId });

    if (friendsUpdateError) {
      console.error("Update friends status error:", friendsUpdateError);
      return;
    }

    revalidateLibrariesPath();
    fetchFriendRequests();
  };

  const declineFriendRequest = async (senderId: string, receiverId: string) => {
    const { data, error } = await supabase
      .from("friends")
      .delete()
      .eq("sender_id", senderId);

    if (error) {
      console.error("Operation error:", error);
    }
    revalidateLibrariesPath();
    fetchFriendRequests();
  };
  const fetchFriendRequests = async () => {
    const { data: friendRequestsData, error } = await supabase
      .from("friends")
      .select("*")
      .eq("receiver_id", initialFriends[0]?.receiver_id);
    if (error) {
      console.error("Operation error:", error);
    }
    setFriendRequests(friendRequestsData || []);
  };

  return (
    <Popover>
      {friendRequests.length > 0 ? (
        <>
          <div className="w-16 flex items-center justify-center ">
            <PopoverTrigger className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/70 text-primary-foreground relative">
              <Bell size={18} />
              <div className="rounded-full w-5 h-5 shadow flex items-center justify-center absolute -top-2 -right-2 text-primary border-2 border-primary/70 text-xs bg-background">
                {friendRequests.length}
              </div>
            </PopoverTrigger>
          </div>
          <PopoverContent
            className="bg-background w-64 border-accent mt-4 relative left-8"
            align="end"
          >
            {friendRequests.map((request) => {
              return (
                <div
                  key={request.sender_id}
                  className="flex flex-col items-center py-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={request?.sender_avatar || "/images/placeholder.png"}
                      height={100}
                      width={100}
                      alt="avatar"
                      className="rounded-full object-cover bg-accent w-9 h-9 mr-2"
                    />
                    <p className="flex items-center flex-wrap text-sm">
                      {request?.sender_username}
                      <span
                        className={`${
                          !request.sender_username ? "text-sm" : "text-xs"
                        }`}
                      >
                        {request.sender_email}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        acceptFriendRequest(
                          request.sender_id,
                          request.receiver_id
                        )
                      }
                      className="mr-4"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        declineFriendRequest(
                          request.sender_id,
                          request.receiver_id
                        )
                      }
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
          </PopoverContent>
        </>
      ) : undefined}
    </Popover>
  );
}
