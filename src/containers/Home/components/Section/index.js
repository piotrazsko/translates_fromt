import React from 'react';

import Container from '@mui/material/Container';

const Section = ({ children, className }) => {
    return (
        <Container maxWidth="sm" className={className}>
            {children}
        </Container>
    );
};

export default Section;
