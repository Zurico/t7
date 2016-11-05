/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import NotebookGraph from './index';

export default function(Register){

  Register.extension('graph', {container: () => NotebookGraph});

}
