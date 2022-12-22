import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Section = ({ children, className }) => {
    return (
        <Box className={className} width="100%">
            <Container maxWidth="lg">{children}</Container>
        </Box>
    );
};

export default Section;
