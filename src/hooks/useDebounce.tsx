import React from 'react'
import debounce from "lodash.debounce";

export function useDebounce(str: string, ms: number) {
    const [input, setInput] = React.useState<string>(``)
    const debounceInput = React.useMemo(() =>
        debounce((str: string) => {
            setInput(str)
            }, ms)
        ,[ms]
    )
    debounceInput(str)
    return input; 
}  
