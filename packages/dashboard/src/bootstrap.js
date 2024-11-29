import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start up the app
const mount = (el) => {
    const app = createApp(Dashboard)
    app.mount(el);
}


// If we're in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dashboard-dev-root')
    el && mount(el)
}

// We're running through container
// and we should export the mount function
export {mount}