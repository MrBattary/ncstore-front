import React, { useState } from 'react';

import { Tooltip } from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

type textWithCopyTooltipProps = {
    text: string;
};

const TextWithCopyTooltip: React.FC<textWithCopyTooltipProps> = ({ text }) => {
    const [isVisibleCopiedTooltip, setVisibleCopiedTooltip] = useState<boolean>(false);

    const copyKeyToClipboard = () => {
        setVisibleCopiedTooltip(true);
        setTimeout(() => setVisibleCopiedTooltip(false), 1000);
    };

    return (
        <CopyToClipboard text={text} onCopy={copyKeyToClipboard}>
            <Tooltip
                title={'Copied!'}
                open={isVisibleCopiedTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement='right'
            >
                <p className='order-content__license-key'>{text}</p>
            </Tooltip>
        </CopyToClipboard>
    );
};

export default TextWithCopyTooltip;
