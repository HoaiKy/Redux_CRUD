import React from 'react'

type IModalProps = {
    label: string
    children?: JSX.Element
    onClose: () => void
}

const Modal = (props: IModalProps) => {
    const {label,children, onClose} = props
  return (
    <div>
    <div>
      <div >
        <span onClick={onClose} >&times;</span>
       <h1>{label}</h1>
       <p>{children}</p>
      </div>
    </div>
  </div>
  )
}

export default Modal