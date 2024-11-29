import { mount } from "auth/AuthApp";
import React, {useRef, useEffect} from "react";
import { useHistory } from "react-router-dom";

export default function AuthApp({ onSignIn }) {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if (history.location.pathname !== nextPathname) {
                    console.log(`[DEBUG] Container noticed navigation from a subapp to ${nextPathname} route.`);
                    history.push(nextPathname);
                }
            },
            onSignIn
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
}