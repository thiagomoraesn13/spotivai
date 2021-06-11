import React from 'react';


import { CustomPaper, Title } from '../wrappers/components'

const Errors = ({ info }) =>
  <CustomPaper>
    <Title primary gutterBottom variant="h6" component="p" align='center'>
      {info}
    </Title>
  </CustomPaper>

export default Errors
