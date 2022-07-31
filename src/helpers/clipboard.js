import { showInfo } from 'modules/notification';

export const saveToClipBoard = (dispatch, t) => (str) => {
    navigator.clipboard.writeText(str);
    dispatch(
        showInfo({
            message: t('message.copied_to_clipboard'),
        }),
    );
};
