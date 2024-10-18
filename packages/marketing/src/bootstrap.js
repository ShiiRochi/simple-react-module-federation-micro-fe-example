import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App";

// Mount function to start up the app
const mount = (el) => {
    ReactDOM.render(
        <App />,
        el,
        () => console.log('Marketing is rendered!')
    )
}


// If we're in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#marketing-dev-root')
    el && mount(el)
}

// We're running through container
// and we should export the mount function
export { mount }