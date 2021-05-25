import SCC from "./scc";
import { createElement, render } from "./helpers";

/**
 * Check if there's a SCC wrapper before initializing
 */
const SCCWrapper = document.querySelector( "[data-scc-wrapper]" );

if ( SCCWrapper ) {
    SCCWrapper.classList.add( "scc-wrapper" );

    SCC( SCCWrapper.children );
} else {
    console.error( "No Simple Content Cards wrapper found." );
}