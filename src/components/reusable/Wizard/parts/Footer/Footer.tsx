import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requiredButtonsConfig } from "./requiredButtonsConfig";
import { next, prev, toStep } from "../../store/stepSlice";
import { styleComponent } from "../../styles";
import { useTheme } from "@emotion/react";
const dispatchMethods = {
    next,
    prev
}

type TControlAction = {
    disabled: boolean
    label: string
    onClick: (e) => void
}

function Footer({}) {
    let actions = {}
    const theme = useTheme()
    const styles = styleComponent(theme)
    const dispatch = useDispatch()
    const {stepsDict} = useSelector((state) => state.wizardStep)
    actions = {...actions, ...requiredButtonsConfig}
    return (
        <BottomNavigation
        sx={styles.footerButtons}
        showLabels
        onChange={(event, newValue) => {
            // console.log(dispatchMethods[event.target.id])
            if (typeof dispatchMethods[event.currentTarget.id] === 'function') {
                dispatch(dispatchMethods[event.currentTarget.id]())

            }
            // setValue(newValue);
          }}
        >
            {
                Object.keys(actions).map(action => (
                    <BottomNavigationAction
                    sx={styles.footerButton}
                    id={action}
                    data-disabled={action.disabled}
                    label={actions[action].label}/>
                ))
            }
        </BottomNavigation>
    )
}

export {
    Footer
}