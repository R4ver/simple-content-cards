import { createElement, appendChildren } from "./helpers";

const SCC = ( wrapperChildren ) => {
    for ( let i = 0; i < wrapperChildren.length; i++ ) {
        const child = wrapperChildren[i];
        child.dataset.sccId = `${child.dataset.title.split( " " ).join( "-" ).toLowerCase()}-${Date.now()}`;

        const {
            title,
            tags,
            content,
            excerpt,
            twitter,
            instagram,
            images,
            sccId
        } = child.dataset;

        populateCard( {
            title,
            tags,
            content,
            excerpt,
            twitter,
            instagram,
            images,
            sccId
        } );
    }
};
export default SCC;

const populateCard = cardData => {
    const title = createElement( "h1", cardData.title, [ "scc-title" ] );

    const tagsContent = cardData.tags.split( "," ).join( " | " );
    const tags = createElement( "div", tagsContent, [ "scc-tags" ] );

    const excerptWrapper = createElement( "div", "", [ "scc-excerpt-wrapper" ] );
    const content = createElement( "p", cardData.excerpt );
    excerptWrapper.appendChild( content );

    appendChildren( document.querySelector( `[data-scc-id=${cardData.sccId}]` ), [
        title,
        tags,
        excerptWrapper,
    ] );
};