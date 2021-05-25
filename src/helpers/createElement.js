// export const createElement = ( tag, content, classes ) => {
//     const elem = document.createElement( tag );

//     if ( content ) 
//         elem.innerText = content;

//     if ( classes ) 
//         elem.classList.add( ...classes );

//     return elem;
// };

const createTextElement = ( text ) => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
};



export const createElement = ( type, props, ...children ) => {
    return {
        type,
        props: {
            ...props,
            children: children.map( ( child ) =>
                typeof child === "object" ? child : createTextElement( child )
            )
        }
    };
};

export const render = ( element, container ) => {
    let dom = null;

    switch ( element.type ) {
        case "TEXT_ELEMENT":
            dom = document.createTextNode( "" );
            break;

        case "FRAGMENT":
            dom = document.createDocumentFragment();
            break;

        case "<>":
            dom = document.createDocumentFragment();
            break;

        default:
            dom = document.createElement( element.type );
            break;
    }

    const isProperty = ( key ) => key !== "children";
    Object.keys( element.props )
        .filter( isProperty )
        .forEach( ( name ) => {
            dom[name] = element.props[name];
        } );

    element.props.children.forEach( ( child ) => render( child, dom ) );

    container.appendChild( dom );
};