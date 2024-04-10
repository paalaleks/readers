"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "@/types/project.types";

interface OpenContextState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labelsView: boolean;
  setLabelsView: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  toggleCoverSelection: boolean;
  setToggleCoverSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenContext = createContext<OpenContextState | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [labelsView, setLabelsView] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [toggleCoverSelection, setToggleCoverSelection] = useState<boolean>(
    false
  );

  const value = {
    open,
    setOpen,
    labelsView,
    setLabelsView,
    selectedBook,
    setSelectedBook,
    toggleCoverSelection,
    setToggleCoverSelection,
  };

  return <OpenContext.Provider value={value}>{children}</OpenContext.Provider>;
};

export const useProvider = (): OpenContextState => {
  const context = useContext(OpenContext);
  if (context === undefined) {
    throw new Error("useProvider must be used within an Provider");
  }
  return context;
};
