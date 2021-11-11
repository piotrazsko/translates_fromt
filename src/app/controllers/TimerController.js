export default class TimerController {
    getInformationData(action, delay = 100000) {
        if (typeof action === 'function') {
            action();
            this.timer = setInterval(function() {
                action(undefined, {
                    onSuccess: (data) => {},
                });
            }, delay);
        }
    }
    stopUpdateDate() {
        clearInterval(this.timer);
    }
}
