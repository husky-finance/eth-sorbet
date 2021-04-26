import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    minHeight: 290,
    fontFamily: "'Titillium Web', sans-serif;",
    color: theme.palette.text.primary
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
      <h1 className={classes.title}> {title} </h1>
      {content}
      <br />
    </div>
  )
}
