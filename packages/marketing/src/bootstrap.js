import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, initialPath, defaultHistory = createMemoryHistory({ initialEntries: initialPath ? [initialPath] : []}) } = {}) => {
    const history = defaultHistory;

    onNavigate && history.listen(onNavigate)

    ReactDOM.render(
        <App history={history} />,
        el,
        () => console.log('Marketing is rendered!')
    )

    return {

        /**
         * The function to call when the parent app navigates.
         * The parent app should call this when the URL changes.
         * @param {object} location the new location object
         */
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
}


// If we're in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#marketing-dev-root')
    el && mount(el, {
        defaultHistory: createBrowserHistory()
    })
}

// We're running through container
// and we should export the mount function
export { mount }