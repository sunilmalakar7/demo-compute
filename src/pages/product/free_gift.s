import { ApiContext } from '@/src/contexts/apiContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
// import OfferEmail from '../OfferEmail';
import NextImage from '@/shared/Image';
import { GlobalContext } from '@/src/contexts/globalContext';
import FormatePrice from '@/shared/FormatePrice';
import { convertStyleInJsObject } from '@/src/helper';

const FreeGiftsStyle = styled.div`
    width: 100%;
    @media screen and (min-width: 1261px) {
        width: 542px;
    }

    .offer-section-popup {
        max-height: 560px;
        height: 100%;
        overflow: auto;
        @media screen and (min-width: 1260px) {
            padding-bottom: 60px;
            height: 100vh;
            max-height: 100vh;
            overflow: hidden scroll;
        }
    }
    .popup-header {
        padding: 16px 16px 0px 16px;
        background: #fff;
        position: sticky;
        top: 0px;
        z-index: 1;

        @media screen and (min-width: 767px) {
            padding: 16px 32px;
            background: #fafafb;
        }

        h2 {
            font-size: 15px;
            line-height: 32px;
            letter-spacing: 0.4px;
            margin-bottom: 12px;
            color: #161618;
            margin-bottom: 0px;

            @media screen and (min-width: 767px) {
                font-size: 18px;
            }
        }
        .code {
            font-size: 13px;
            line-height: 20px;
            letter-spacing: 0.55px;
            color: #575763;
            display: block;

            @media screen and (min-width: 767px) {
                font-size: 12px;
            }
            @media screen and (min-width: 1260px) {
                display: inline-block;
            }
        }
    }

    .popup-products {
        padding: 16px;
        font-weight: 400;

        @media screen and (min-width: 767px) {
            padding: 16px 32px;
        }

        .product-card {
            padding: 32px 16px 16px 16px;
            display: flex;
            justify-content: space-between;
            border: 1px dashed #e7e7e9;
            position: relative;
            margin-bottom: 16px;

            span.offer-stripe {
                display: inline-block;
                font-size: 10px;
                line-height: 16px;
                background: #fff7f7;
                padding: 4px 16px 8px;
                letter-spacing: 0.65px;
                position: absolute;
                top: 0px;
                left: 0px;
            }

            .product-detail {
                h2 {
                    font-size: 13px;
                    line-height: 24px;
                    letter-spacing: 0.55px;
                    margin-bottom: 8px;
                    color: #161618;
                }

                p {
                    font-size: 11px;
                    line-height: 18px;
                    color: #575763;
                    margin-bottom: 0px;
                    max-width: 240px;
                    width: 100%;
                }
            }

            .product-image {
                max-width: 108px;
                width: 100%;

                @media screen and (min-width: 767px) {
                    max-width: 176px;
                }
                .image {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                img {
                    max-width: 64px !important;
                    width: 100% !important;
                    height: 64px !important;
                }
                .product-price {
                    text-align: center;
                    margin-bottom: 0px;
                    span {
                        display: inline-block;
                        font-size: 12px;
                        line-height: 20px;

                        &.discounted {
                            color: #6f6f79;
                            text-decoration: line-through;
                            margin-right: 8px;
                        }

                        &.main {
                            color: #161618;
                        }
                    }
                }
            }
        }
    }

    .email-section {
        padding: 16px;
        background: #fafafb;

        @media screen and (min-width: 767px) {
            padding: 24px 32px;
        }
    }
`;

const FreeGiftsPopup = () => {
    const { pageData } = useContext(ApiContext);
    const { promotion, discountPercent, price, freeGifts } = pageData;
    const globalData = useContext(GlobalContext);
    const { couponCode, defaultInfo } = globalData;
    const [freeItem, setFreeItem] = useState([]);
    let priceRange = Math.max(...freeGifts.map((val) => val.above));
    // const [giftFullPrices, setGiftFullPrice] = useState(0);
    // const [productNames, setProductNames] = useState("");

    const prepareOffers = (obj) => {

        let bonusConditionsGift = JSON.parse(JSON.stringify(obj));
        let freeItems = {};
        bonusConditionsGift
            .filter((val) => val.above)
            .map((item) => {
                freeItems[parseInt(item.above)] = Object.assign([], item.freeGifts);
                return item;
            })
            .forEach((item) => {
                Object.keys(freeItems)
                    .filter((val) => val < item.above)
                    .forEach((gift) => {
                        item.freeGifts.push(...freeItems[gift]);
                    });
            });

        bonusConditionsGift.map((val) => {
            if (val.freeGifts.length > 1) {
                val.freeGifts = [...new Map(val?.freeGifts.map((item) => [item['variantId'], item])).values()].filter(
                    (val) => val,
                );
                return val;
            } else {
                val.freeGifts = val.freeGifts.filter((val) => val);
                return val;
            }
        });

        bonusConditionsGift.map((val) => {
            let freeGiftsPrice = 0;
            val.freeGifts.forEach((item) => {
                freeGiftsPrice += item?.freeGiftPrice || 0;
            });
            val.freeGiftsPrice = freeGiftsPrice;
        });

        return bonusConditionsGift;
    };

    useState(() => {

        // let productName = "";
        // let price = freeGifts.reduce((acc, item, key) => {
        //     console.log('here item-------', key, item)
        //     productName += (key == 0 ? item?.name :  " & " +  item?.name);
        //     return acc + item?.freeGiftPrice;
        // }, 0);
        // setGiftFullPrice(price)
        // setProductNames(productName)

        let giftItem = prepareOffers(promotion[0]?.offerConditions?.bonusConditions || []);

        setFreeItem(giftItem.reverse());
    }, []);

    console.log('priceRange:----', { priceRange }, { couponCode }, { freeItem }, { freeGifts }, { defaultInfo });
    return (
        <FreeGiftsStyle>
            <div className="offer-section-popup">
                <div className="popup-header">
                    <h2> You can’t miss it </h2>
                </div>

                <div>
                    <h3 className="tac"> FREE SHIPPING & FREE 30 DAYS RETURN </h3>
                </div>

                <div className="popup-header">
                    <h2>
                        {discountPercent ? discountPercent + '% OFF +' : ''} on orders above $500 + <span> FREE GIFT </span>
                    </h2>
                    <span className="code">Code: {couponCode} Applied </span>
                </div>

                <div className="popup-products">
                        {/* {freeItem.map((item) => {
                            return item.freeGifts.length ? (
                                <div className="product-card">
                                    <div className="product-detail">
                                        <h2>
                                            On orders {item?.above >= 0 ? 'above' : 'below'}{' '}
                                            <FormatePrice
                                                price={item?.above >= 0 ? item.above : item?.to}
                                                round="round"
                                            />
                                        </h2>
                                        {item?.freeGifts?.map((val, index) => {
                                            return (
                                                <p className="ttc">
                                                    {!index && val?.name?.replace('Free ', '').replace('free ', '')}
                                                    {index ? `& ${val?.jewelryType}` : ''}
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <div className="product-image">
                                        <div className="image">
                                            {item?.freeGifts?.map((val, index) => {
                                                return (
                                                    <NextImage
                                                        width={200}
                                                        height={200}
                                                        src={val?.media[0]?.path}
                                                        alt="Product Image"
                                                    />
                                                );
                                            })}
                                        </div>
                                        <p className="product-price">
                                            <span className="discounted">
                                                <FormatePrice price={item.freeGiftsPrice} round={'ceil'} />
                                            </span>
                                            <span className="main">0</span>
                                        </p>
                                    </div>
                                    {(item?.from <= price && price <= item?.to) ||
                                    (item?.above && price > item?.above && priceRange == item?.above) ? (
                                        <span className="offer-stripe">Your order includes</span>
                                    ) : null}
                                </div>
                            ) : null;
                        })} */}
                    </div>



                {/* <div className="popup-products">
                    {
                        freeGifts?.map((gift, key) => {
                            
                            return (
                                <div className="product-card" key={key}>
                                    <NextImage
                                        width={72}
                                        height={72}
                                        src={gift?.media[0]?.path}
                                        alt="Product Image"
                                    />
                                    <div className="product-detail">
                                        <h4> {gift?.name} worth 
                                            <FormatePrice price={gift.freeGiftsPrice} round={'ceil'} />
                                        </h4>
                                        <h4> On orders below $999 </h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <div>
                    <h3> You are getting this now </h3>
                    <div className='df'>

                        {
                            freeGifts?.map((gift, key) => {
                                return (
                                    <>
                                    <NextImage
                                        width={72}
                                        height={72}
                                        src={gift?.media[0]?.path}
                                        alt="Product Image"
                                        />
                                        {freeGifts.length -1 != key  && <span className=''> + </span>} 
                                         </>
                                )
                            })
                        }

                        <p>{productNames} ${giftFullPrices}</p>
                        <p> On Orders above <span> $1,999 </span> </p>
                    </div>
                </div> */}
            </div>
        </FreeGiftsStyle>
    );
};
export default FreeGiftsPopup;
