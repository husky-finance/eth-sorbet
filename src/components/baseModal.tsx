import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
    minWidth: 600,
    minHeight: 300
  }
}))

type ModalProps = {
  content: any
  open: boolean
  handleClose: Function
}

export default function BaseModal({ content, open, handleClose }: ModalProps) {
  const classes = useStyles()
  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
      >
        <div className={classes.paper}>{content}</div>
      </Modal>
    </div>
  )
}
