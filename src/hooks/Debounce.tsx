import React from 'react'
import debounce from "lodash.debounce";

function Debounce(str: string, ms: number) {
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

export const useDebounce = (value: string, int: number) => {
    return Debounce(value, int)
}
 