import { ReactNode } from "react";
import { Outlet } from "react-router-dom";


export function BaseLayout(props: { children?: ReactNode }) {
    return (
        <main className="p-4">
            {props.children}
            <Outlet />
        </main>
    );
}
