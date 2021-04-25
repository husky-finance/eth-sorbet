import React from 'react'

type ContentProps = {
  title: string
  content: any
}

export default function BaseContent({ title, content }: ContentProps) {
  return (
    <div>
      <h1> {title} </h1>
      {content}
      <br />
    </div>
  )
}
