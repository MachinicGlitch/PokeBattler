import React from 'react';

function Timer() {
    let [counter, setCounter] = React.useState(10);

    React.useEffect(() => {
        const timer = counter > 0 && setTimeout( () => setCounter(counter - 1), 1000 );
        if (counter == 0)
        {
            setCounter(10)
        }
        }, [counter]);
  
    return (
        <div>Countdown: {counter}</div>
    )
}

export default Timer;