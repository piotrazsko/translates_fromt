import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { PageSkeleton, Pane } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserRequest, getCurrentUserSelector } from 'modules/auth';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

const Docs = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCurrentUserRequest());
    }, []);
    const { apiKey, url, ...user } = useSelector(getCurrentUserSelector);
    return (
        <>
            <PageSkeleton title={t('title.docs')}>
                <Pane>
                    <Box>
                        <ReactMarkdown
                            children={markdown}
                            remarkPlugins={[remarkGfm]}
                        />
                    </Box>
                </Pane>
            </PageSkeleton>
        </>
    );
};

Docs.propTypes = {
    // : PropTypes.
};

export default Docs;
