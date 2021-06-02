export const render = ( element, container ) => {
    // console.log( typeof element.type === "function" && element.type( element.props ) );
    // console.log( element );
    let dom = null;

    if ( Array.isArray( element ) ) {
        element = {
            type: "FRAGMENT",
            props: {
                children: element
            }
        };
    }

    if ( typeof element.type === "function" ) {
        element = element.type( element.props );
    }

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
    if ( Array.isArray( element ) ) {
        element = {
            props: {
                children: element
            }
        };
    }

    Object.keys( element.props )
        .filter( isProperty )
        .forEach( ( name ) => dom[name] = element.props[name] );

    element.props.children.forEach( ( child ) => render( child, dom ) );

    window.requestAnimationFrame( () => {
        container.appendChild( dom );
    } );
};

