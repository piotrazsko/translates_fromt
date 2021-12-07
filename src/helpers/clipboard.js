export const saveToClipBoard = async (str) => {
    return await navigator.clipboard.writeText(str);
    // const range = new Range();
    // const div = document.createElement('div');
    // div.textContent = 'str';
    // div.style = {
    //     display: 'none',
    // };
    // document.body.appendChild(div);
    // const selection = window.getSelection();
    // selection.removeAllRanges();
    // range.selectNode(div);
    // selection.addRange(range);
    // document.execCommand('copy');
};
