import React from 'react'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import purple from '@material-ui/core/colors/purple'

import { withStyles } from '@material-ui/core/styles'

const steps = ['Welcome', 'Deposit', 'Switch Network', 'Done']

const ColorlibConnector = withStyles({
  active: {
    '& $line': {
      backgroundColor: purple[200]
    }
  },
  completed: {
    '& $line': {
      backgroundColor: purple[200]
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0' // un-finished
  }
})(StepConnector)

const Progress = React.memo(({ step }: { step: number }) => {
  return (
    <div>
      <Stepper
        activeStep={step}
        alternativeLabel
        style={{ paddingLeft: 0 }}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
})

export default Progress
