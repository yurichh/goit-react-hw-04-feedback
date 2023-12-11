import { useState } from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';

import React from 'react';

const App = () => {
  const [state, setState] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0,
  });

  const statIncrement = name => {
    setState(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const countTotalFeedback = () =>
    Object.values(state).reduce((acc, currentValue) => acc + currentValue);

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    } else {
      return (state.Good / countTotalFeedback()) * 100;
    }
  };

  const currentValues = Object.keys(state);

  return (
    <div className="feedback-wrapper">
      <Section title="Please, leave your feedback">
        <FeedbackOptions
          options={currentValues}
          onLeaveFeedback={statIncrement}
        />
      </Section>
      {countTotalFeedback() === 0 ? (
        <Notification message="There is no feedback before" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={state.Good}
            neutral={state.Neutral}
            bad={state.Bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </div>
  );
};

export default App;
