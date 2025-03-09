import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";

const subTitle = "Couldn't find what you're looking for!"
const title = "Oops!"
const searchTitle = "Need a new search?";
const searchDesc = "If you didn't find what you were looking for, try a new search!";



const SearchNone = () => {
    return (
        <Fragment>
            <Header />
            <PageHeader title={'Results Not found for: Business'} curPage={'Search None'} />
            <div className="blog-section padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <article>
                                <div className="section-wrapper">
                                    <div className="row row-cols-1 justify-content-center g-4">
                                        <div className="col">
                                            <div className="post-item style-2">
                                                <div className="post-inner">
                                                    <div className="post-content">
                                                        <h2 className="not-ruselt">{subTitle}</h2>
                                                        <h2 className="opps">{title}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
 
export default SearchNone;