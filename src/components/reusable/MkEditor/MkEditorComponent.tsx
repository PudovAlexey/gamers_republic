import React from 'react'
import { FormControl, FormHelperText } from '@mui/material'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import InputLabel from '@mui/material/InputLabel'

type TComponentProps = {
value: string
onChange: (value: string) => void
title?: string
placeholder?: string
validationRules?: {
  required?: boolean
  disabled?: boolean
}
sx?: Record<string, string | number>
helperText?: string
error?: boolean
view?: {
  menu: boolean,
  md: boolean,
  html: boolean
} 
}

const MarkdownEditor = ({
  sx,
  value,
  onChange,
  title,
  placeholder,
  validationRules,
  helperText,
  error,
  view
  
}: TComponentProps) => {
  const mdParser = new MarkdownIt()
  const menuConfig = {
    menu: true,
    md: true,
    html: true,
    both: true,
    fullScreen: false,
    hideMenu: false,
  }
  const defaultView = view || { menu: true, md: true, html: true }

  return (
    <FormControl fullWidth error={error}>
      <InputLabel style={{ position: 'unset', transform: 'unset' }}>{`${title}${
        Boolean(validationRules?.required) ? ' *' : ''
      }`}</InputLabel>
      <MdEditor
        name={title || ""}
        placeholder={placeholder}
        readOnly={Boolean(validationRules?.disabled)}
        style={{ 
          height: 'max-content',
          border: 'none',
          ...sx
         }}
        renderHTML={(text) => mdParser.render(text)}
        value={(value as string) || ''}
        onChange={({ text }) => onChange(text)}
        canView={menuConfig}
        view={defaultView}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export { MarkdownEditor }
