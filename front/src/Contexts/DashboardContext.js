import { createContext } from 'react'

export const DashboardContext = createContext({});
export const DashboardProvider = DashboardContext.Provider;
export const DashboardConsumer = DashboardContext.Consumer;