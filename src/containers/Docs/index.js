import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageSkeleton, Pane, MarkDownView } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserRequest, getCurrentUserSelector } from 'modules/auth';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import remarkGfm from 'remark-gfm';
import markdown from './index.md';

// const markdown = `A paragraph with *emphasis* and **strong importance**.

// > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

// * Lists
// * [ ] todo
// * [x] done

// A table:

// | a | b |
// | - | - |
// `;

const Docs = ({ ...props }) => {
    const [doc, setDoc] = React.useState('');
    React.useEffect(() => {
        fetch(markdown)
            .then((response) => response.text())
            .then((text) => {
                setDoc(text);
            });
    }, []);
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
                        <MarkDownView
                            children={doc}
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
