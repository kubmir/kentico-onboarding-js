import {
  FlatButton,
  RaisedButton,
  Step,
  StepLabel,
  Stepper
} from 'material-ui';
import * as React from 'react';

interface IStepper {
  readonly finished: boolean;
  readonly stepIndex: number;
}

export class HorizontalLinearStepper extends  React.Component<{}, IStepper> {

  constructor() {
    super();
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 250px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: '0 50px'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Add new note...</StepLabel>
          </Step>
          <Step>
            <StepLabel>Click on the added note</StepLabel>
          </Step>
          <Step>
            <StepLabel>Update your note</StepLabel>
          </Step>
          <Step>
            <StepLabel>You finished tutorial of notes application!</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
             <div>
               <div style={{marginTop: 12}}>
                 <FlatButton
                   label="Back"
                   disabled={stepIndex === 0}
                   onClick={this.handlePrev}
                   style={{marginRight: 12}}
                 />
                 <RaisedButton
                   label={stepIndex === 3 ? 'Finish' : 'Next'}
                   primary={true}
                   onClick={this.handleNext}
                 />
               </div>
             </div>
           )}
        </div>
      </div>
    );
  }
}

