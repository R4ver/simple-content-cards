import { sjsx, render, Fragment } from "./simple-jsx";

const routes = {};
const SCCState = {
    cards: []
};

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
            tags: child.dataset.tags.split( "," ),
            socials: {
                twitter: child.dataset.twitter,
                instagram: child.dataset.instagram
            },
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
        render( BigView( routes[id] ), document.body );
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
    
    render( BigView( routes[e.target.dataset.slug] ), document.body );
};

const populateCard = ( { images, tags, title } ) => (
    <>
        <header className="scc-header">
            <img src={images[0]} />
        </header>
        <div className="scc-card-meta">
            <h1 className="scc-title">{title}</h1>
            <div className="scc-tags">
                {tags.map( tag => <span>{tag}</span> )}
            </div>
        </div>
    </>
);

const BigView = ( { slug, images, title, tags, content, socials } ) => {
    if ( document.querySelector( ".scc-view-wrapper" ) )
        document.querySelector( ".scc-view-wrapper" ).remove();

    const closeView = () => document.querySelector( ".scc-view-wrapper" ).remove();

    return (
        <div className="scc-view-wrapper" data-scc-view={slug}>
            <div className="scc-view-overlay" onClick={closeView}>
                <button className="scc-view-close-button"></button>
            </div>
            <div className="scc-view-content-wrapper">
                <div className="scc-view-image">
                    <img src={images[0]} />
                </div>
                <div className="scc-view-content">
                    <h1 className="scc-view-content-title">{title}</h1>
                    <div className="scc-view-content-tags">
                        {tags.map( ( tag ) => (
                            <span>{tag}</span>
                        ) )}
                    </div>
                    <div className="scc-view-content-text">
                        <p>{content}</p>
                    </div>
                    <div className="scc-view-content-socials">
                        {Object.keys( socials ).map( social => (
                            <a key={social} href={`https://${social}/${socials[social]}`}>{social}</a>
                        ) )}
                    </div>
                </div>
            </div>
        </div>
    );
};