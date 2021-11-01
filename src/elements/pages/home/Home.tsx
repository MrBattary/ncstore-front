import React from 'react';

import './style.css';

type homeProps = {};

const Home: React.FC<homeProps> = () => {
    return (
        <>
            <div className='home'>
                <label className='home__label'>Mocked Home</label>
            </div>
        </>
    );
};

export default Home;
