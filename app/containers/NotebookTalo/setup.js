/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import NotebookTalo from './index';

export default function(Register){

  Register.extension('talo', {container: () => NotebookTalo});

}
