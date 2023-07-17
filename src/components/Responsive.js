import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
    .image-container {
        width: 100%;
        > div {
            position: unset !important;
        }
        .image {
            object-fit: contain;
            width: 100% !important;
            position: relative !important;
            height: unset !important;
        }
    }
`;


function Responsive(props) {
    const { loader, loading, src, sizes = `100%`, placeholder, priority, alt } = props;
    return (
        <Style>
            <div className={'image-container'}>
                <Image
                    className='image'
                    loading={loading}
                    loader={loader}
                    priority={priority}
                    src={src}
                    alt={alt}
                    layout="fill"
                    sizes={sizes}
                    placeholder={placeholder}
                />
            </div>
        </Style>
    );
}

export default Responsive;
