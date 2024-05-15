'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </AuthProvider>
  );
}