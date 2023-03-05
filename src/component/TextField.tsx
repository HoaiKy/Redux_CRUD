import { ChangeEvent } from "react"

interface ITextFieldProps {
  label: string
  value: string
  type?: string
  onChange:(e: ChangeEvent<HTMLInputElement>)=>void
}

export const TextField = (props: ITextFieldProps) => {
  const {label, value, type = "text", onChange} = props
  return (
    <div>
    <label>{label}</label>
    <br/>
    <input type={type} onChange={onChange} value={value}/>
</div>
  )
}
