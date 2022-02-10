import React from 'react';
import HomeCSS from './Home.module.css';

function Home(): React.ReactNode {
  return (
    <div>
      <h1 className={HomeCSS.title}>Helllooo Homeeee</h1>
    </div>
  );
}

export default Home;
