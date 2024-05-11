import { useLoading, useOpen, useSysLoading, useSystemError } from "./universalHooks";
import { useInit } from "./requests";

const useGlobals = () => {

  const { open, updateOpen } = useOpen();

  const { loading, updateLoading } = useLoading();

  const {sysLoading, updateSysLoading} = useSysLoading();

  const { systemError, updateSystemError } = useSystemError();
   // Args
  const initArgs = { updateSysLoading, updateSystemError, systemError };

  const { init } = useInit(initArgs);

  return {
    systemError,
    updateSystemError,
    open,
    updateOpen,
    loading, updateLoading,
    sysLoading, updateSysLoading,
    init,
  }
}

export default useGlobals;