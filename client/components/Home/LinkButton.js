import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
const LinkButton = withStyles({
  root: {
    fontSize: 'medium',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
})(Button);

export default LinkButton;
