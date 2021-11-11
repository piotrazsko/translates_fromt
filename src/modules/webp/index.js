import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
const modules = "webp";

const CHECK_WEBP = `${modules}/CHECK_WEBP`;

export const checkWebpAction = createAction(CHECK_WEBP);

const defaultState = true;

export default handleActions(
  {
    [checkWebpAction](state, action) {
      return support_format_webp();
    },
  },
  defaultState
);

export function support_format_webp() {
  const elem = document.createElement("canvas");

  if (!!(elem.getContext && elem.getContext("2d"))) {
    // was able or not to get WebP representation
    return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  } else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
}
