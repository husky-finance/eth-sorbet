import React from 'react'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import StepIcon from '@material-ui/core/StepIcon'
import { withStyles } from '@material-ui/core/styles'

const steps = ['Welcome', 'Deposit', 'Switch Network', 'Done']

const ColorlibConnector = withStyles(
  (theme) => ({
    active: {
      '& $line': {
        backgroundColor: theme.palette.primary.main
      }
    },
    completed: {
      '& $line': {
        backgroundColor: theme.palette.primary.main
      }
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0' // un-finished
    }
  }),
  { withTheme: true }
)(StepConnector)

const CustomStepIcon = withStyles({
  root: {
    width: 18
  },
  active: {
    width: 24
  }
})(StepIcon)

const Progress = React.memo(({ step }: { step: number }) => {
  return (
    <div>
      <Stepper
        activeStep={step}
        alternativeLabel
        style={{ paddingLeft: 0, paddingRight: 0 }}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
})

export default Progress
