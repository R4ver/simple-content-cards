import SCC from "./scc";

/**
 * Check if there's a SCC wrapper before initializing
 */
const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    SCCWrapper.classList.add( "scc-wrapper" );

    if ( "sccCardsGradientHeader" in SCCWrapper.dataset ) {
        SCCWrapper.classList.add( "has-header-gradient" );
    }

    const googlePreconnect = document.createElement( "link" );
    googlePreconnect.rel = "preconnect";
    googlePreconnect.href = "https://fonts.gstatic.com";

    const googleFont = document.createElement( "link" );
    googleFont.rel = "stylesheet";
    googleFont.href =
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap";

    const FAInject = document.createElement( "link" );
    FAInject.rel = "stylesheet";
    FAInject.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";

    document.head.appendChild( googlePreconnect );
    document.head.appendChild( googleFont );
    document.head.appendChild( FAInject );

    SCC( SCCWrapper.children );
} else {
    console.error( "No Simple Content Cards wrapper found." );
}