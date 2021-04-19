import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  }
})

export default function BaseModal() {
  const classes = useStyles()
  return (
    <Modal className={classes.root} open>
      <div>
        <h1> Title </h1>
        <p> Let's use another chain! </p>
      </div>
    </Modal>
  )
}
