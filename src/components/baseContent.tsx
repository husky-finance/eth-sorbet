import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 290,
    fontFamily: "'Titillium Web', sans-serif;"
  }
}))

type ContentProps = {
  title: string
  content: any
}

export default function BaseContent({ title, content }: ContentProps) {
  const classes = useStyles()
  return (
    <div className={classes.content}>
      <h1> {title} </h1>
      {content}
      <br />
    </div>
  )
}
