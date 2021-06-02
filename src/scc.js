import { sjsx, render, Fragment } from "./simple-jsx";

const routes = {};

const SCC = children => {

    [ ...children ].forEach( child => {
        const { title, content, excerpt, images, tags, twitter, instagram } = child.dataset;
        const slug = title.split( " " ).join( "-" ).toLowerCase();
        const sccId = `${slug}-${Date.now()}`;
        
        const cardData = {
            title,
            slug,
            content,
            excerpt,
            images: images.split( "," ),
            tags: tags.split( "," ),
            socials: {
                twitter,
                instagram
            },
            sccId
        };

        routes[slug] = cardData;

        child.classList.add( "scc-card" );
        child.dataset.slug = slug;
        child.onclick = handleCardClick;

        render( <PopulateCard {...cardData} />, child );
    } );

    let params = new URL( document.location ).searchParams;
    const id = params.get( "scc" );
    if ( id ) {
        console.log( "RENDERING BIG VIEW" );
        render( <BigView {...routes[id]} />, document.body );
    }
};

export default SCC;

const handleCardClick = e => {
    e.preventDefault();

    window.history.pushState(
        {},
        e.target.dataset.slug,
        `?scc=${e.target.dataset.slug}`
    );
    
    render( <BigView {...routes[e.target.dataset.slug]} />, document.body );
};

export const Header = ( { className, image } ) => (
    <header className={className}>
        <img className="scc-header-image" src={image} />
    </header>
);

const PopulateCard = ( { images, tags, title } ) => (
    <>
        <Header className="scc-header" image={images[0]} />
        <div className="scc-card-meta">
            <h1 className="scc-title">{title}</h1>
            <div className="scc-tags">
                {tags.map( ( tag, index ) => <span key={index}>{tag}</span> )}
            </div>
        </div>
    </>
);

const BigView = ( { slug, images, title, tags, content, socials } ) => {
    if ( document.querySelector( ".scc-view-wrapper" ) )
        document.querySelector( ".scc-view-wrapper" ).remove();

    const closeView = () => {
        document.querySelector( ".scc-view-wrapper" ).remove();
        window.history.pushState( {}, document.title, `${window.location.origin + window.location.pathname}` );
        document.documentElement.classList.remove( "scc-no-scroll" );
    };

    document.documentElement.classList.add( "scc-no-scroll" );

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
                    <h1 className="scc-view-content-title scc-title">{title}</h1>
                    <div className="scc-view-content-tags">
                        {tags.map( ( tag, index ) => (
                            <span key={index}>{tag}</span>
                        ) )}
                    </div>
                    <div className="scc-view-content-text">
                        <p>{content}</p>
                    </div>
                    <div className="scc-view-content-socials">
                        {Object.keys( socials ).map( social => (
                            <a key={social} href={`https://${social}/${socials[social]}`}>
                                <i className={`fab fa-${social}`} />
                            </a>
                        ) )}
                    </div>
                </div>
            </div>
        </div>
    );
};