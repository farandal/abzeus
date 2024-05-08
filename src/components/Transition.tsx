import React, { PropsWithChildren, ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export interface IPageTransition extends PropsWithChildren { }

const PageTransition = (props:IPageTransition):ReactNode => {
  const location = useLocation();
  
  const {children} = props;
  
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Routes location={location}>{children}</Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;