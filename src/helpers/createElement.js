export const createElement = ( tag, content, classes ) => {
    const elem = document.createElement( tag );

    if ( content ) 
        elem.innerText = content;

    if ( classes ) 
        elem.classList.add( ...classes );

    return elem;
};