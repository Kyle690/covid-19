import React from "react";
import {Spinner} from "react-bootstrap";

const Loading =({show})=>{
    return show?
        <div
            style={{
                position: 'fixed',
                zIndex: 999,
                height: '100%',
                width: '100%',
                overflow: 'show',
                margin: 'auto',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor:"rgba(0,0,0,0.5)",
                display:'block'
            }}
            className={'d-flex align-items-center justify-content-center'}
        >
            <Spinner
                animation="grow"
                variant="light"
            />
        </div>:
        null
};

export default Loading;