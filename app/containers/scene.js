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
      var actions = [];

      if (route.actionSet == 1) {
        actions = [
          { title: 'Back', show: 'always', onSelect: navigator.pop }
        ]
      }

      if (route.actionSet == 2) {
        actions = [
          { title: 'Alert', show: 'always', onSelect: () => alert('hi') }
        ]
      }

      if (route.actionSet == 3) {
        actions = [
          { title: 'Alert Hi', show: 'always', onSelect: () => alert('Hi') },
          { title: 'Alert Yo', show: 'always', onSelect: () => alert('Yo') },
          { title: 'Alert Hello', onSelect: () => alert('Hello') },
          { title: 'Alert Yay!', onSelect: () => alert('Yay!') },
        ]
      }

      let theme;
      if (route.dark) {
        theme = 'dark';
      }

      return {
        component: NavigatorTestPage,
        title: 'Navigator Test Page',
        theme,
        actions: actions,
        passProps: {
          route: route,
          nextRoute: route.nextRoute
        }
      };
      break;
  };
};
export default scene;
