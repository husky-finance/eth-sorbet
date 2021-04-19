import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  }
})

type ModalProps = {
  title: string
  description: string
  previous: Function
  next: Function
}

export default function BaseModal({
  title,
  description,
  previous,
  next
}: ModalProps) {
  const classes = useStyles()
  return (
    <Modal className={classes.root} open>
      <div>
        <h1> {title} </h1>
        <p> {description} </p>
        <button onClick={() => previous()}> Previous </button>
        <button onClick={() => next()}> Next </button>
      </div>
    </Modal>
  )
}
