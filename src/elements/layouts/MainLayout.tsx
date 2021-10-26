import React from 'react';

import NavigationBar from '../components/navigation/NavigationBar';

import './style.css';

type MainLayoutProps = {
    children: unknown;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children = null }) => (
    <div className='layout'>
        <NavigationBar />
        <div className='layout__content'>{children}</div>
    </div>
);

export default MainLayout;
