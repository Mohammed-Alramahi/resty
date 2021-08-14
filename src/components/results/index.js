import React from 'react';
import './result.css'
function Results(props) {
  return (
    <section section >
      <pre data-testid="results">{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section >
  );
}

export default Results;
