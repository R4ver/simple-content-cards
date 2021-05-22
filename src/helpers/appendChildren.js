export const appendChildren = ( parent, children ) => {
    children.forEach( ( child ) => {
        parent.appendChild( child );
    } );
};
