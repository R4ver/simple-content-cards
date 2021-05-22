import { createElement, appendChildren } from "./helpers";

const routes = {};

const SCC = ( wrapperChildren ) => {
    for ( let i = 0; i < wrapperChildren.length; i++ ) {
        const child = wrapperChildren[i];
        const slug = child.dataset.title.split( " " ).join( "-" ).toLowerCase();

        child.addEventListener( "click", handleCardClick );

        child.classList.add( "scc-card" );
        child.dataset.sccId = `${slug}-${Date.now()}`;
        child.dataset.slug = slug;

        const {
            title,
            tags,
            content,
            excerpt,
            twitter,
            instagram,
            sccId
        } = child.dataset;

        routes[slug] = sccId;

        populateCard( {
            title,
            slug,
            tags,
            content,
            excerpt,
            twitter,
            instagram,
            images: getImages( child.dataset ),
            sccId
        } );
    }

    const path = window.location.pathname;
    const match = /^\/scc\/(.+)$/.exec( path );
    
    if ( match ) {
        const id = match[1];
        const data = document.querySelector( `[data-scc-id=${routes[id]}]` ).dataset;
        generateBigView( data );
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
    
    generateBigView( e.target.dataset );
};

const populateCard = card => {
    const header = createElement( "header", "", [ "scc-header" ] );

    if ( card.images.length ) {
        const headerImage = createElement( "img", "", [ "scc-header-image" ] );
        headerImage.src = card.images[0];
        header.appendChild( headerImage );
    }

    const contentWrapper = createElement( "div", "", [ "scc-card-meta" ] );

    const title = createElement( "h1", card.title, [ "scc-title" ] );

    const tagsContent = card.tags.split( "," ).join( " | " );
    const tags = createElement( "div", tagsContent, [ "scc-tags" ] );

    appendChildren( contentWrapper, [
        title,
        tags
    ] );

    appendChildren( document.querySelector( `[data-scc-id=${card.sccId}]` ), [
        header,
        contentWrapper,
    ] );
};

const generateBigView = card => {
    if ( document.querySelector( ".scc-view-wrapper" ) ) document.querySelector( ".scc-view-wrapper" ).remove();

    const wrapper = createElement( "div", "", [ "scc-view-wrapper" ] );
    wrapper.dataset.sccView = card.slug;

    const imageWrapper = createElement( "div", "", [ "scc-view-image" ] );
    const image = createElement( "img", "" );
    image.src = getImages( card, 0 );
    imageWrapper.appendChild( image );

    const title = createElement( "h1", card.title, [ "scc-title" ] );

    const tagsContent = card.tags.split( "," ).join( " | " );
    const tags = createElement( "div", tagsContent, [ "scc-tags" ] );

    appendChildren( wrapper, [
        imageWrapper,
        title,
        tags
    ] );

    document.body.appendChild( wrapper );
};

const getImages = ( card, index ) => {
    if ( index && !isNaN( index ) ) {
        return card.images.split( "," )[index];
    }

    return card.images.split( "," );
};