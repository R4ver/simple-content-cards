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



export const createElement = ( type, props = {}, ...children ) => {
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
            children: children.map( ( child ) => 
                typeof child === "object" ? child : createTextElement( child )
            )
        }
    };
};

export const Fragment = ( props ) => props.children;