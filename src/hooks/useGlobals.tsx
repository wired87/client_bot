import { useLoading, useOpen, useSystemError } from "./universalHooks";
import { useInit } from "./requests";

const useGlobals = () => {

  const { open, updateOpen } = useOpen();

  const { loading, updateLoading } = useLoading();

  const { systemError, updateSystemError } = useSystemError();

  const chatRequestArgs = { updateLoading, updateSystemError, systemError };

  // evtl in komps auslagern mit werten aus kontek
  const { init } = useInit(chatRequestArgs);

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