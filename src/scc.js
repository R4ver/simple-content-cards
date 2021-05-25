import { createElement, appendChildren, render } from "./helpers";

const routes = {};
const SCCState = {
    cards: []
};

// const SCC = ( wrapperChildren ) => {
//     for ( let i = 0; i < wrapperChildren.length; i++ ) {
//         const child = wrapperChildren[i];
//         const slug = child.dataset.title.split( " " ).join( "-" ).toLowerCase();

//         child.addEventListener( "click", handleCardClick );

//         child.classList.add( "scc-card" );
//         child.dataset.sccId = `${slug}-${Date.now()}`;
//         child.dataset.slug = slug;

//         const {
//             title,
//             tags,
//             content,
//             excerpt,
//             twitter,
//             instagram,
//             sccId
//         } = child.dataset;

//         routes[slug] = sccId;

//         populateCard( {
//             title,
//             slug,
//             tags,
//             content,
//             excerpt,
//             twitter,
//             instagram,
//             images: getImages( child.dataset ),
//             sccId
//         } );
//     }

// const path = window.location.pathname;
// const match = /^\/scc\/(.+)$/.exec( path );
    
// if ( match ) {
//     const id = match[1];
//     const data = document.querySelector( `[data-scc-id=${routes[id]}]` ).dataset;
//     generateBigView( data );
// }
// };
const SCC = children => {

    [ ...children ].forEach( child => {
        const slug = child.dataset.title.split( " " ).join( "-" ).toLowerCase();
        const sccId = `${slug}-${Date.now()}`;
        
        const cardData = {
            title: child.dataset.title,
            slug,
            content: child.dataset.content,
            excerpt: child.dataset.excerpt,
            images: child.dataset.images.split( "," ),
            tags: child.dataset.tags.split( "," ).join( " | " ),
            instagram: child.dataset.instagram,
            twitter: child.dataset.twitter,
            sccId
        };

        routes[slug] = cardData;

        child.classList.add( "scc-card" );
        child.dataset.slug = slug;
        child.onclick = handleCardClick;
        const card = populateCard( cardData );
        SCCState.cards.push( card );

        render( card, child );
    } );

    const path = window.location.pathname;
    const match = /^\/scc\/(.+)$/.exec( path );

    if ( match && match[1] !== "undefined" ) {
        const id = match[1];
        console.log( routes );
        generateBigView( routes[id] );
    }
};

export default SCC;

const handleCardClick = e => {
    e.preventDefault();

    window.history.pushState(
        {},
        e.target.dataset.slug,
        `${window.location.origin}/scc/${e.target.dataset.slug}`
    );
    
    generateBigView( routes[e.target.dataset.slug] );
};


const populateCard = card => (
    createElement(
        "<>",
        {},
        createElement(
            "header",
            { className: "scc-header" },
            createElement( "img", { src: card.images[0] } )
        ),
        createElement(
            "div",
            { className: "scc-card-meta" },
            createElement( "h1", { className: "scc-title" }, card.title ),
            createElement( "div", { className: "scc-tags" }, createElement( "p", {}, card.excerpt ) )
        )
    )
);

const generateBigView = card => {
    console.log( card );
    if ( document.querySelector( ".scc-view-wrapper" ) ) document.querySelector( ".scc-view-wrapper" ).remove();

    const wrapper = createElement(
        "div",
        { className: "scc-view-wrapper", "data-scc-view": card.slug },
        createElement(
            "div",
            { className: "scc-view-image" },
            createElement( "img", { src: card.images[0] } )
        ),
        createElement( "h1", { className: "scc-title" }, card.title ),
        createElement( "div", { className: "scc-tags" }, card.tags )
    );

    render( wrapper, document.body );
};