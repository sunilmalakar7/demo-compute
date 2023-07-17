// /Users/sunilmalakar/Desktop/Projects/frontend/components/Backend/Cart/Offer/CouponForm/index.js



import { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../../../../../src/contexts/globalContext';
import { getCouponDetailsByCode, getDiscountCodebyId, updateCartCoupon } from '../../../../../adapters/services/ct/ctCartServices';
import { getPromotionData } from '@/adapters/services/promotion';
import { gtmCouponEvent } from '@/src/helper/gtmHelper';
import { ApiContext } from '@/src/contexts/apiContext';

const CouponFormStyle = styled.div`
    display: flex;
    margin-top: 10px;

    .input-text {
        text-transform: uppercase;
        padding: 5px 14px;
        height: 40px;
        border: 1px solid #e4e4e4;
        border-radius: 2px;
        outline: none;
        font-family: Poppins, sans-serif;
        :focus {
            border-color: var(--primaryColor);
        }
    }
    .input-text:focus {
        border: 1px solid var(--primaryColor);
    }

    .apply {
        font-size: 15px;
        border-radius: 2px;
        height: 40px !important;
        margin-bottom: 0;
        background: var(--primaryColor) !important;
        color: #ffffff !important;
        border: 1px solid var(--primaryColor) !important;
        cursor: pointer;
    }

    .applied {
        background: #fff;
        border: 1px solid var(--primaryColor) !important;
        height: 40px;
        color: var(--primaryColor);
        font-size: 15px;
        border-radius: 2px;
        position: relative;

        span {
            position: relative;
            padding-right: 20px;

            :before {
                content: '';
                width: 10px;
                height: 6px;
                position: absolute;
                border-bottom: 2px solid var(--primaryColor);
                border-left: 2px solid var(--primaryColor);
                -webkit-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                transform: rotate(-45deg);
                right: 0px;
                top: 7px;
            }
        }
    }

    .err-code {
        display: block;
        color: var(--errorColor);
        font-size: 12px;
        margin-top: 5px;
        width: 150%;
    }
    .not-error {
        display: none;
    }
`;

const CouponForm = ({ id = '', placeholder, apply, applied, errortext, errorcode, isedit }) => {
    const [couponerr, setCopunerr] = useState(false);
    const { device, couponCode, clickable, defaultInfo } = useContext(GlobalContext);
    const {
        pageData: { cartData, setCartData, appliedCoupon },
    } = useContext(ApiContext);
    const [couponCodeText, setCouponCodeText] = useState(appliedCoupon?.code || '');
    const [showApplied, setShowApplied] = useState(false);
    const inputRef = useRef(null);


    const couponCodeLocaleCheck = async (newCouponCode) => {
        newCouponCode = newCouponCode.toUpperCase();
        let response = await getCouponDetailsByCode(newCouponCode);
        const validCoupons = response.filter(item => item?.name?.[defaultInfo.htmlLang] == newCouponCode);

        if (!validCoupons.length) {
            setCopunerr(`The discount code '${newCouponCode}' is not valid.`);
            setShowApplied(false);
            gtmCouponEvent(newCouponCode, 'invalid');
            return false;
        }
        return true;
    }

    const updateCoupon = async (resetCartCoupon) => {
        let newCouponCode = couponCodeText;

        console.log('Here resetCartCoupon', { resetCartCoupon }, { couponCodeText })

        if (!resetCartCoupon) {
            let isValidCoupon = await couponCodeLocaleCheck(newCouponCode);
            if(!isValidCoupon) return;
        }


        if (resetCartCoupon) {
            const promotion = await getPromotionData(resetCartCoupon, defaultInfo.store, defaultInfo.language);
            if (promotion[0]?.coupons[0]?.code) {
                newCouponCode = promotion[0]?.coupons[0]?.code;
            }

            const res = await getDiscountCodebyId(cartData?.discountCodes[0]?.discountCode?.id);

            if (newCouponCode.toLowerCase() == res.code.toLowerCase()) {
                return;
            }
        } else if (newCouponCode.toLowerCase() == appliedCoupon?.code.toLowerCase()) {
            setCopunerr(false);
            setShowApplied(true);
            return;
        }

        const res = await updateCartCoupon({
            cartId: cartData.id,
            version: cartData.version,
            newCouponCode: newCouponCode.toUpperCase(),
            oldDiscountCodeId: cartData?.discountCodes[0]?.discountCode?.id,
        });

        if (res.message) {
            setCopunerr(`The discount code '${couponCodeText.toUpperCase()}' is not valid.`);
            setShowApplied(false);
            gtmCouponEvent(couponCodeText, 'invalid');
        } else {
            setCartData(res);
            setCopunerr(false);
            setShowApplied(true);
            gtmCouponEvent(couponCodeText, 'valid');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            updateCoupon();
        }
    };

    const handleChangeText = (e) => {
        setCouponCodeText(e.target.value);
        if (showApplied) {
            setShowApplied(false);
        }
    };

    useEffect(() => {
        const resetCartCoupon = localStorage.getItem('resetCartCoupon');
        if (resetCartCoupon) {
            localStorage.removeItem('resetCartCoupon');
            updateCoupon(resetCartCoupon);
        }
    }, []);

    useEffect(() => {
        if (clickable[isedit]) {
            inputRef.current.focus();
        }
    }, [clickable]);

    useEffect(() => {
        if (appliedCoupon?.code) {

            (async () => {
                let isValidCoupon = await couponCodeLocaleCheck(appliedCoupon.code);
                setCouponCodeText(appliedCoupon.code);
                if(!isValidCoupon) return;
                setShowApplied(true);
            })()

            
            try {
                localStorage.setItem('cartCouponCode', appliedCoupon.code);
            } catch (err) {
                console.log("Issue in setting coupon code")
            }
        }
    }, [appliedCoupon]);

    return (
        <CouponFormStyle className="mt8 d-flex ">
            <div id={id} style={device === 'medium' ? { width: '50%' } : { width: '65%' }}>
                <input
                    style={{ width: '100%' }}
                    type="text"
                    className="input-text"
                    id="coupon_code"
                    name="coupon_code"
                    value={couponCodeText}
                    placeholder={placeholder ? placeholder : 'Enter Coupon code'}
                    onChange={(e) => {
                        handleChangeText(e);
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowApplied(false)}
                    onBlur={() => {
                        clickable[isedit] = false;
                    }}
                    ref={inputRef}
                />
                <span className={couponerr ? 'err-code d-block' : 'not-error'}>
                    {couponCodeText == '' ? errortext : couponerr ? couponerr : errorcode}
                </span>
            </div>

            <span style={device === 'medium' ? { width: '50%' } : { width: '35%' }}>
                {showApplied ? (
                    <span
                        className="p10 tac bgp tcw ml10 cp d-flex dfaic dfc applied"
                        style={{ pointerEvents: 'none' }}
                    >
                        <span>{applied}</span>
                    </span>
                ) : (
                    <span onClick={() => updateCoupon()} className="p10 tac bgp tcw ml10 cp d-flex dfaic dfc apply">
                        {apply}
                    </span>
                )}
            </span>
        </CouponFormStyle>
    );
};

export default CouponForm;
