import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Laravel Echo + Pusher for real-time broadcasting
 * Uncomment when Pusher credentials are configured in .env
 */
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true,
//     authEndpoint: '/broadcasting/auth',
//     auth: {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
//         },
//     },
// });
