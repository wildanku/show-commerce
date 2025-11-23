import axios from 'axios';
window.axios = axios;

// Always identify AJAX requests
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Use cookie-based CSRF tokens so the token stays in sync after
// session/token regeneration (e.g., on login/logout).
// Laravel sets the `XSRF-TOKEN` cookie on responses; axios will
// read it and send it back as `X-XSRF-TOKEN` automatically.
window.axios.defaults.withCredentials = true;
window.axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
window.axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Do NOT pin a static token header from the initial page load.
// This avoids sporadic 419 errors when the server rotates tokens.
delete window.axios.defaults.headers.common['X-CSRF-TOKEN'];

// Gracefully handle CSRF/session expiry: on 419, reload to refresh tokens.
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 419) {
      // Refresh the page to get a fresh CSRF cookie/meta
      window.location.reload();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
