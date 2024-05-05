import {RefObject, useState} from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateLoading = (b:boolean) => setLoading(b);

  return {loading, updateLoading};
}


export const useSysLoading = () => {
  const [sysLoading, setSysLoading] = useState<boolean>(false);

  const updateSysLoading = (b:boolean) => setSysLoading(b);

  return {sysLoading, updateSysLoading};
}


export const useError = () => {
  const [error, setError] = useState<string>("");

  const updateError = (value: string) => setError(value);

  return { error, updateError };
}


export const useSystemError = () => {
  const [systemError, setError] = useState<string>("");

  const updateSystemError = (value: string) => setError(value);

  return { systemError, updateSystemError };
}

export const useRetryInput = () => {
  const [retryInput, setRetryInput] = useState<string>("");

  const updateRetryInput = (value: string) => setRetryInput(value);

  return { retryInput, updateRetryInput };
}


export const useInput = () => {
  const [input, setInput] = useState<string>("");

  const updateInput = (value: string, textareaRef?: RefObject<HTMLTextAreaElement>) => {
    setInput(value);
    if (value.length > 0 && textareaRef)
      adjustHeight(textareaRef);
  };

  const adjustHeight = (textareaRef: RefObject<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    // Anpassen der Höhe an den Inhalt
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return { input, updateInput };
}