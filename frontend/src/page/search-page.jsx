import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";


const searchTitle = "Need a new search?";
const searchDesc = "If you didn't find what you were looking for, try a new search!";

const searchList = [
    {
        title: 'Interactively Morph High Standards Anding',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ]
    },
    {
        title: 'Financial Reporting Qoncil What Could More.',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ]
    },
    {
        title: 'Consulting Reporting Qounc Arei Could More.',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ]
    },
    {
        title: 'Strategic Social Media and of visual design',
        btnText: 'Read More',
        metaList: [
            {
                iconName: 'icofont-calendar',
                text: 'April 23,2021',
            },
            {
                iconName: 'icofont-ui-user',
                text: 'Begrass Tyson',
            },
            {
                iconName: 'icofont-speech-comments',
                text: '09 Comments',
            },
        ]
    },
]

const SearchPage = () => {
    return (
        <Fragment>
            <Header />
            <PageHeader title={'4 Results found for: Business'} curPage={'Search Result'} />
            <div className="blog-section padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <article>
                                <div className="section-wrapper">
                                    <div className="row row-cols-1 justify-content-center g-4">
                                        {searchList.map((val, i) => (
                                            <div className="col" key={i}>
                                                <div className="post-item style-2">
                                                    <div className="post-inner">
                                                        <div className="post-content">
                                                            <Link to="/blog-single"><h3>{val.title}</h3></Link>
                                                            <div className="meta-post">
                                                                <ul className="lab-ul">
                                                                    {val.metaList.map((val, i) => (
                                                                        <li key={i}><i className={val.iconName}></i>{val.text}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText} <i className="icofont-external-link"></i></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 col-12">
                            <aside>
                                <div className="widget widget-search">
                                    <h4>{searchTitle}</h4>
                                    <p>{searchDesc}</p>
                                    <form className="search-wrapper">
                                        <input type="text" name="s" placeholder="Search..." />
                                        <button type="submit"><i className="icofont-search-2"></i></button>
                                    </form>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}
 
export default SearchPage;