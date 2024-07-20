export default {
    install(app) {
        const localStorageData = {
            notificationOn: localStorage.getItem('notificationOn') === 'true',
            minutesAdjudicated: parseInt(localStorage.getItem('minutesAdjudicated'), 10) || 15,
        };

        app.provide('localStorageData', localStorageData);
    }
}
