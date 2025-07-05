export default {
    install(app) {
        const logout = () => {
            localStorage.clear();
            window.location.href = '/login';
        };

        app.provide('localStorage', {
            data: {
                notificationOn: localStorage.getItem('notificationOn') === 'true',
                minutesAdjudicated: parseInt(localStorage.getItem('minutesAdjudicated'), 10) || 15,
            },
            logout
        });
    }
}
