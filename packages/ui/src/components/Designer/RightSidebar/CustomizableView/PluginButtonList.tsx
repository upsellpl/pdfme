import React, { useContext, useState, useEffect } from 'react';
import { Button, theme } from 'antd';
import { Plugin, Schema, BasePdf, getFallbackFontName } from '@pdfme/common';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { OptionsContext, PluginsRegistry } from '../../../../contexts.js';
import Renderer from '../../../Renderer.js';
import { setFontNameRecursively } from '../../../../helper';

const Draggable = (props: {
    plugin: Plugin<Schema>;
    scale: number;
    basePdf: BasePdf;
    children: React.ReactNode;
}) => {
    const { scale, basePdf, plugin } = props;
    const { token } = theme.useToken();
    const options = useContext(OptionsContext);
    const defaultSchema = plugin.propPanel.defaultSchema;

    if (options.font) {
        const fontName = getFallbackFontName(options.font);
        setFontNameRecursively(defaultSchema, fontName);
    }

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: defaultSchema.type,
        data: defaultSchema,
    });

    const style = { transform: CSS.Translate.toString(transform) };

    const renderedSchema = React.useMemo(() => (
        <div style={{ transform: `scale(${scale})` }}>
            <Renderer
                schema={{ ...defaultSchema, id: defaultSchema.type }}
                basePdf={basePdf}
                value={defaultSchema.content || ''}
                onChangeHoveringSchemaId={() => {}}
                mode="viewer"
                outline={`1px solid ${token.colorPrimary}`}
                scale={scale}
            />
        </div>
    ), [defaultSchema, basePdf, scale, token.colorPrimary]);

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {isDragging && renderedSchema}
            <div style={{ visibility: isDragging ? 'hidden' : 'visible' }}>{props.children}</div>
        </div>
    );
};

const PluginButtonList = ({
  basePdf,
}: {
    basePdf: BasePdf;
}) => {
    const { token } = theme.useToken();
    const pluginsRegistry = useContext(PluginsRegistry);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [isDragging]);

    return (
        <div
            className={"pdf-editor-plugin-button-list"}
            style={{
                background: token.colorBgLayout,
                overflow: isDragging ? 'visible' : 'auto',
            }}
        >
            {pluginsRegistry.entries().map(([label, plugin]) => {
                if (!plugin?.propPanel?.defaultSchema) return null;

                return (
                    <Draggable key={label} scale={1} basePdf={basePdf} plugin={plugin}>
                        <Button
                            className={"pdf-editor-plugin-button"}
                            onMouseDown={() => setIsDragging(true)}
                            style={{ display: 'block', width: '100%', marginBottom: 8 }}
                        >
                            {label}
                        </Button>
                    </Draggable>
                );
            })}
        </div>
    );
};

export default PluginButtonList;
