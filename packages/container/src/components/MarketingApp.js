import { mount } from "marketing/MarketingApp";
import React, {useRef, useEffect} from "react";
import { useHistory } from "react-router-dom";

export default function MarketingApp() {
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
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
}