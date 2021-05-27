import SCC from "./scc";

/**
 * Check if there's a SCC wrapper before initializing
 */
const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    SCCWrapper.classList.add( "scc-wrapper" );

    const FAInject = document.createElement( "link" );
    FAInject.rel = "stylesheet";
    FAInject.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";

    document.head.appendChild( FAInject );

    SCC( SCCWrapper.children );
} else {
    console.error( "No Simple Content Cards wrapper found." );
}