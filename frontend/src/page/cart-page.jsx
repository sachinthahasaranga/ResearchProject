import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";


const ShopCartList = [
    {
        imgUrl: 'assets/images/shop/01.jpg',
        imgAlt: 'Product Thumb',
        title: 'Product Text Here',
        price: '$250',
        totalPrice: '$750',
        delImgUrl: 'assets/images/shop/del.png',
        delImgAlt: 'Remove Thumb',
    },
    {
        imgUrl: 'assets/images/shop/02.jpg',
        imgAlt: 'Product Thumb',
        title: 'Product Text Here',
        price: '$250',
        totalPrice: '$750',
        delImgUrl: 'assets/images/shop/del.png',
        delImgAlt: 'Remove Thumb',
    },
    {
        imgUrl: 'assets/images/shop/03.jpg',
        imgAlt: 'Product Thumb',
        title: 'Product Text Here',
        price: '$250',
        totalPrice: '$750',
        delImgUrl: 'assets/images/shop/del.png',
        delImgAlt: 'Remove Thumb',
    },
    {
        imgUrl: 'assets/images/shop/04.jpg',
        imgAlt: 'Product Thumb',
        title: 'Product Text Here',
        price: '$250',
        totalPrice: '$750',
        delImgUrl: 'assets/images/shop/del.png',
        delImgAlt: 'Remove Thumb',
    },
    {
        imgUrl: 'assets/images/shop/05.jpg',
        imgAlt: 'Product Thumb',
        title: 'Product Text Here',
        price: '$250',
        totalPrice: '$750',
        delImgUrl: 'assets/images/shop/del.png',
        delImgAlt: 'Remove Thumb',
    },
]


const CartPage = () => {
    return (
        <Fragment>
            <Header />
            <PageHeader title={'Shop Cart'} curPage={'Cart Page'} />
            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="cat-product">Product</th>
                                        <th className="cat-price">Price</th>
                                        <th className="cat-quantity">Quantity</th>
                                        <th className="cat-toprice">Total</th>
                                        <th className="cat-edit">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ShopCartList.map((val, i) => (
                                        <tr key={i}>
                                            <td className="product-item cat-product">
                                                <div className="p-thumb">
                                                    <Link to="/shop-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                                </div>
                                                <div className="p-content">
                                                    <Link to="/shop-single">{val.title}</Link>
                                                </div>
                                            </td>
                                            <td className="cat-price">{val.price}</td>
                                            <td className="cat-quantity">
                                                <div className="cart-plus-minus">
                                                    <div className="dec qtybutton">-</div>
                                                    <input className="cart-plus-minus-box" type="text" name="qtybutton" defaultValue="3" />
                                                    <div className="inc qtybutton">+</div>
                                                </div>
                                            </td>
                                            <td className="cat-toprice">{val.totalPrice}</td>
                                            <td className="cat-edit">
                                                <a href="#"><img src={`${val.delImgUrl}`} alt={`${val.delImgAlt}`} /></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-bottom">
                            <div className="cart-checkout-box">
                                <form className="coupon" action="/">
                                    <input type="text" name="coupon" placeholder="Coupon Code..." className="cart-page-input-text" />
                                    <input type="submit" value="Apply Coupon" />
                                </form>
                                <form className="cart-checkout" action="/">
                                    <input type="submit" value="Update Cart" />
                                    <input type="submit" value="Proceed to Checkout" />
                                </form>
                            </div>
                            <div className="shiping-box">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="calculate-shiping">
                                            <h3>Calculate Shipping</h3>
                                            <div className="outline-select">
                                                <select>
                                                    <option value="volvo">United Kingdom (UK)</option>
                                                    <option value="saab">Bangladesh</option>
                                                    <option value="saab">Pakisthan</option>
                                                    <option value="saab">India</option>
                                                    <option value="saab">Nepal</option>
                                                </select>
                                                <span className="select-icon"><i className="icofont-rounded-down"></i></span>
                                            </div>
                                            <div className="outline-select shipping-select">
                                                <select>
                                                    <option value="volvo">State/Country</option>
                                                    <option value="saab">Dhaka</option>
                                                    <option value="saab">Benkok</option>
                                                    <option value="saab">Kolkata</option>
                                                    <option value="saab">Kapasia</option>
                                                </select>
                                                <span className="select-icon"><i className="icofont-rounded-down"></i></span>
                                            </div>
                                            <input type="text" name="coupon" placeholder="Postcode/ZIP" className="cart-page-input-text"/>	
                                            <button type="submit">Update Total</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="cart-overview">
                                            <h3>Cart Totals</h3>
                                            <ul className="lab-ul">
                                                <li>
                                                    <span className="pull-left">Cart Subtotal</span>
                                                    <p className="pull-right">$ 0.00</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Shipping and Handling</span>
                                                    <p className="pull-right">Free Shipping</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Order Total</span>
                                                    <p className="pull-right">$ 2940.00</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default CartPage;