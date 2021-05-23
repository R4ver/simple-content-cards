import SCC from "./scc";
import { createElement, render } from "./helpers";

/**
 * Check if there's a SCC wrapper before initializing
 */
const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {

    const App = createElement( "div", { className: "scc-wrapper" }, ...SCC( SCCWrapper.children ) );

    console.log( App );
    render( App, SCCWrapper );
} else {
    console.error( "No Simple Content Cards wrapper found." );
}