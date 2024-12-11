// contexts/LanguageProviderClient.tsx
"use client";

import React, { ReactNode } from "react";
import { LanguageProvider } from "./language-provider";

interface Props {
  children: ReactNode;
}

const LanguageProviderClient: React.FC<Props> = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default LanguageProviderClient;
