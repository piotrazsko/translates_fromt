export const sliceLangsStr = (langArr) => {
    return langArr.join(', ').slice(0, 10) + (langArr.length > 3 ? '...' : '');
};
