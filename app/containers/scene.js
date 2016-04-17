/**
 * containers/scene.js
 * A function to return the scene based on a route. All navigator sceness are
 # registered here, and this function is used across all navigators in the app.
 */
'use strict';

import React from 'react';

import SamplePage from 'views/SamplePage';
import NavigatorTestPage from '../views/NavigatorTestPage';

export const scene = (route, navigator) => {
  switch (route.name) {
    case 'sample-page':
      return {
        component: SamplePage,
        title: 'Sample Page'
      };
      break;

    case 'test':
      return {
        component: NavigatorTestPage,
        title: 'Navigator Test Page',
        passProps: {
          route: route,
          nextRoute: route.nextRoute
        }
      };
      break;
  };
};
export default scene;
