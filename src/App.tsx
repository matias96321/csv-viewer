import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRed((prevIsRed) => !prevIsRed);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const divClassName = isRed ? 'red' : 'blue';

  return (
    <div className={divClassName}>
      <h1>Div que Alterna a className</h1>
      <p>A className está alternando a cada segundo!</p>
    </div>
  );
}

export default MyComponent;
