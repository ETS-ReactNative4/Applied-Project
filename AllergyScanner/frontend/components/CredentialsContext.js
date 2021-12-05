import {createContext} from 'react';

// credentials context
// Pass two parameters to createContext
export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}});