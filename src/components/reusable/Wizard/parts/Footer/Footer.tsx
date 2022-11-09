import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requiredButtonsConfig } from "./requiredButtonsConfig";
import { next, prev, toStep } from "../store/stepSlice";
const dispatchMethods = {
    next,
    prev
}

type TControlAction = {
    disabled: boolean
    label: string
    onClick: (e) => void
}

type TControlProps = {
    actions: TControlAction[]
}

function Footer({actions}: TControlProps) {
    const dispatch = useDispatch()
    const {stepsDict} = useSelector((state) => state.wizardStep)
    actions = {...actions, ...requiredButtonsConfig}
    return (
        <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
            dispatch(dispatchMethods[event.target.id]())
            // setValue(newValue);
          }}
        >
            {
                Object.keys(actions).map(action => (
                    <BottomNavigationAction
                    id={action}
                    data-disabled={action.disabled}
                    label={actions[action].label}>
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