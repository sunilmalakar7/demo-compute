import Image from 'next/image';
import React from 'react';

function BasicImage(props) {
    const { loader, loading="lazy", src, width, height, placeholder, priority, alt } = props;
    // console.log('Here Basic props', props)
    return (
        <Image
            loading={loading}
            loader={loader}
            priority={priority}
            width={width}
            height={height}
            src={src}
            alt={alt}
            quality={100}
            placeholder={placeholder}
        />
    );
}

export default BasicImage;
