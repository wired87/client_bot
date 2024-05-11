import { useLoading, useOpen, useSystemError } from "./universalHooks";
import { useInit } from "./requests";

const useGlobals = () => {

  const { open, updateOpen } = useOpen();

  const { loading, updateLoading } = useLoading();

  const { systemError, updateSystemError } = useSystemError();
   // Args
  const initArgs = { updateLoading, updateSystemError, systemError };

  const { init } = useInit(initArgs);


  return {
    systemError,
    updateSystemError,
    open,
    updateOpen,
    loading,
    updateLoading,
    init,
  }
}

export default useGlobals;