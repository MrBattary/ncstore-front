import React from 'react';

import './style.css';

type MainLayoutProps = {
    children: unknown;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children = null }) => (
    <div className='layout'>
        <div className='layout__content'>{children}</div>
    </div>
);

export default MainLayout;
