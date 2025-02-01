import { createContext, useContext, useState } from "react";

interface AutosaveIndicatorContextProps{
    status:'unsaved'|'saved'|'pending';
    onSetStatus:(status:'unsaved'|'saved'|'pending')=>void
}
export const AutosaveIndicatorContext=createContext<AutosaveIndicatorContextProps|null>(null)
interface Props{
    children:React.ReactNode
}


export const AutosaveIndicatorProvider=({children}:Props)=>{
    const [status,setStatus]=useState<'unsaved'|'saved'|'pending'>('saved');
    const onSetStatus=(status:'unsaved'|'saved'|'pending')=>{
        setStatus(status)
    }

    return(
        <AutosaveIndicatorContext.Provider value={{status,onSetStatus,}}>
            {children}
        </AutosaveIndicatorContext.Provider>
    )

}
export const useAutosaveIndicator = () => {
    const ctx = useContext(AutosaveIndicatorContext);
    if (!ctx) throw new Error("invalid use");
  
    return ctx;
  };