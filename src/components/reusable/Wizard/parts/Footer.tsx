import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";

function Footer({actions}) {
    const [value, setValue] = useState()
    return (
        <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
            {
                actions.map(action => (
                    <BottomNavigationAction>
                        {action}
                    </BottomNavigationAction>
                ))
            }
        </BottomNavigation>
    )
}

export {
    Footer
}