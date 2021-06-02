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
    // console.log( type, props, children );

    if ( typeof type === "function" && type.name === "Fragment" ) {
        props = {};
        type = "FRAGMENT";
    }

    if ( props && props.onClick ) 
        props.onclick = props.onClick;
    
    return {
        type,
        props: {
            ...props,
            children: children.map( ( child ) => {
                return typeof child === "object" ? child : createTextElement( child );
            } )
        }
    };
};

export const Fragment = ( props ) => ( {
    type: "FRAGMENT",
    props: {
        children: props.children
    }
} );