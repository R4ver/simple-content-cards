const createTextElement = ( text ) => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
};



export const createElement = ( type, props = {}, ...children ) => {
    let sjsxElement = {
        type: type,
        props: {
            ...props,
            children: props && props.children ? props.children : children
        },
    };

    if ( typeof type === "function" ) {
        sjsxElement = sjsxElement.type( sjsxElement.props );
    }

    if ( sjsxElement.props && sjsxElement.props.onClick ) 
        sjsxElement.props.onclick = sjsxElement.props.onClick;

    return {
        type: sjsxElement.type,
        props: {
            ...sjsxElement.props,
            children: sjsxElement.props.children.map( ( child ) => {
                return typeof child === "object" ? child : createTextElement( child );
            } )
        }
    };
};

export const Fragment = ( props ) => ( {
    type: "FRAGMENT",
    props: {
        children: props.children,
    },
} );