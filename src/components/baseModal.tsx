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
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    minWidth: 600,
    minHeight: 300
  },
  main: {
    padding: theme.spacing(3, 8, 3)
  },
  footer: {
    padding: theme.spacing(1, 0, 1)
  }
}))

type ModalProps = {
  content: any
  footer?: any
  open: boolean
  handleClose: Function
}

export default function BaseModal({
  content,
  footer,
  open,
  handleClose
}: ModalProps) {
  const classes = useStyles()
  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
      >
        <div className={classes.paper}>
          <div className={classes.main}> {content} </div>
          <br />
          {footer && <div className={classes.footer}> {footer} </div>}
        </div>
      </Modal>
    </div>
  )
}
