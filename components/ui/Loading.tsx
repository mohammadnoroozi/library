import React from "react";

export interface LoadingProps {
    children?: React.ReactNode,
}

const Loading = ({children}: LoadingProps): JSX.Element => {
    return (
        <div className="centered-container">
            <div className="text-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                {children&&<p>{children}</p>}
            </div>
        </div>
    );
};

export default Loading;
