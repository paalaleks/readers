"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface OpenContextState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labelsView: boolean;
  setLabelsView: React.Dispatch<React.SetStateAction<boolean>>;
  showLogo: boolean;
  setShowLogo: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenContext = createContext<OpenContextState | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [labelsView, setLabelsView] = useState<boolean>(false);
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const value = {
    open,
    setOpen,
    labelsView,
    setLabelsView,
    showLogo,
    setShowLogo,
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
