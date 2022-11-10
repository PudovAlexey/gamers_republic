import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requiredButtonsConfig } from "./requiredButtonsConfig";
import { next, prev, toStep } from "../../store/stepSlice";
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