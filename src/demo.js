import { commerce } from "faker";

const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    for ( let i = 0; i < 9; i++ ) {
        const elem = document.createElement( "a" );

        const sizes = [
            { x: 1920, y: 1080 },
            { x: 1280, y: 720 },
            { x: 800, y : 600 },
            { x: 400, y: 600 },
            { x: 500, y: 1080 },
            { x: 500, y: 500 }
        ];

        const size = sizes[Math.floor( Math.random() * sizes.length )];
        const imageUrl = `https://picsum.photos/${size.x}/${size.y}`;

        const keys = {
            title: commerce.productName(),
            tags: `${commerce.product()}, ${commerce.color()}, ${commerce.productMaterial()}`,
            content: commerce.productDescription(),
            excerpt: "",
            twitter: "R4verLIVE",
            instagram: "R4verLIVE",
            images: imageUrl,
        };
        
        var maxLength = 100;
        var trimmedString = keys.content.substr( 0, maxLength );
        trimmedString = trimmedString.substr(
            0,
            Math.min( trimmedString.length, trimmedString.lastIndexOf( " " ) )
        );

        keys.excerpt = trimmedString + "...";

        const slug = keys.title.split( " " ).join( "-" ).toLowerCase();
        elem.href = `?scc=${slug}`;
        Object.keys( keys ).forEach( key => elem.dataset[key] = keys[key] );

        elem.dataset.sccId = `${slug}-${Date.now()}`;

        SCCWrapper.appendChild( elem );
    }
} else {
    console.error( "No Simple Content Cards wrapper found." );
}