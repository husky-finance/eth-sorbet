import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 30px',
    position: 'fixed'
  }
})

type ModalProps = {
  title: string
  description: string
  content?: any
  previous: Function
  next: Function
  open: boolean
  handleClose: Function
}

export default function BaseModal({
  title,
  description,
  content,
  previous,
  next,
  open,
  handleClose
}: ModalProps) {
  const classes = useStyles()
  return (
    <Modal className={classes.modal} open={open} onClose={() => handleClose()}>
      <div>
        <h1> {title} </h1>
        <p> {description} </p>
        {content}
        <br />
        <button onClick={() => previous()}> Previous </button>
        <button onClick={() => next()}> Next </button>
      </div>
    </Modal>
  )
}
