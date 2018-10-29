import React from 'react'
import MessageHelper from '../messageHelper'
import { ContextMenuTrigger } from "react-contextmenu"
import ImageZoom from 'react-medium-image-zoom'
import { MSGLST_CONTEXTMENU_IMAGE_ID } from './withMessageList'

/**
 * 绘制图片消息内容
 * @param {*} Component 
 */
export const renderImageContent = Component => props => {
    const { content } = props
    return <ContextMenuTrigger id={MSGLST_CONTEXTMENU_IMAGE_ID} attributes={{ url: MessageHelper.getFullFileName(content) }}>
        <Component {...props}>
            <ImageZoom
                image={{
                    src: MessageHelper.getThumbImg(content),
                    style: { maxWidth: '180px' }
                }}
                zoomImage={{
                    src: MessageHelper.getFullFileName(content),
                }}
            />
        </Component>
    </ContextMenuTrigger>

}

 

 