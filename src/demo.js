import { commerce, image } from "faker";

const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    for ( let i = 0; i < 10; i++ ) {
        const elem = document.createElement( "a" );
        const keys = {
            title: commerce.productName(),
            tags: `${commerce.product()}, ${commerce.color()}, ${commerce.productMaterial()}`,
            content: commerce.productDescription(),
            excerpt: "Some product description shortened down for now",
            twitter: "R4verLIVE",
            instagram: "R4verLIVE",
            images: image.nature(),
        };

        Object.keys( keys ).forEach( key => elem.dataset[key] = keys[key] );

        elem.dataset.sccId = `${elem.dataset.title
            .split( " " )
            .join( "-" )
            .toLowerCase()}-${Date.now()}`;

        SCCWrapper.appendChild( elem );
    }
} else {
    console.error( "No Simple Content Cards wrapper found." );
}