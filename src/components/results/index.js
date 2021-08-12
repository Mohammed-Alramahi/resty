import React from 'react';
import { print } from 'pretty-print';
function Results(props) {

  return (

    <section section >
      <pre data-testid="results">{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section >
  );
}

export default Results;
