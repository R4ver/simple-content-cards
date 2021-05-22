import { commerce, image } from "faker";

const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    for ( let i = 0; i < 9; i++ ) {
        const elem = document.createElement( "a" );
        const keys = {
            title: commerce.productName(),
            tags: `${commerce.product()}, ${commerce.color()}, ${commerce.productMaterial()}`,
            content: commerce.productDescription(),
            excerpt: "Some product description shortened down for now",
            twitter: "R4verLIVE",
            instagram: "R4verLIVE",
            images: "https://picsum.photos/1280/720", //image.nature(),
        };
        
        const slug = keys.title.split( " " ).join( "-" ).toLowerCase();
        elem.href = slug;
        Object.keys( keys ).forEach( key => elem.dataset[key] = keys[key] );

        elem.dataset.sccId = `${slug}-${Date.now()}`;

        SCCWrapper.appendChild( elem );
    }
} else {
    console.error( "No Simple Content Cards wrapper found." );
}