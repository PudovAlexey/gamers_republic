import React, {useState} from "react";

type TControlInput = [
    (key) => {
        value: string | number
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    },
    Record<string, string | number>
]

function useFieldControl():TControlInput {
    const [controlValues, setControlValues] = useState<Record<string, string | number>>({})

    return [
        function(key) {
          return {
            value: controlValues[key],
            onChange: function(e) {
                const {value} = e.target
                
                setControlValues(prev => ({
                    ...prev,
                    [key]:  value
                }))
            }
          }
        },
        controlValues
    ]
}

export default useFieldControl