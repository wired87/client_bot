import {createContext} from "react";

export const MainContext = createContext(
  {
    open: false,
    updateOpen: () => {},

    systemError: "",
    updateSystemError: (value:string) => {},

    loading: false,
    updateLoading: (value:boolean) => {},

    init: async () => {},
  });