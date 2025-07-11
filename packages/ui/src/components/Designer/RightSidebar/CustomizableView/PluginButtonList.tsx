import React, { useContext, useState, useEffect } from 'react';
import { Button, theme } from 'antd';
import {Plugin, Schema, BasePdf, getFallbackFontName, SchemaForUI} from '@publigo/pdfme-common';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { OptionsContext, PluginsRegistry, I18nContext } from '../../../../contexts.js';
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
    schemas,
    addSchema,
    pluginTypes,
}: {
    basePdf: BasePdf;
    schemas: SchemaForUI[];
    addSchema?: (defaultSchema: import('@publigo/pdfme-common').Schema) => void;
    pluginTypes?: string[];
}) => {
    const { token } = theme.useToken();
    const pluginsRegistry = useContext(PluginsRegistry);
    const t = useContext(I18nContext);
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
            {(pluginTypes && pluginTypes.length > 0
                    ? pluginsRegistry.entries().filter(([, plugin]) =>
                        plugin.propPanel.defaultSchema.type != null &&
                        pluginTypes.includes(plugin.propPanel.defaultSchema.type)
                    )
                    : pluginsRegistry.entries()
            ).map(([name, plugin]) => {
                if (!plugin?.propPanel?.defaultSchema) return null;

                const label = plugin.propPanel.defaultSchema.label ?? name;
                const onePerDoc = !!plugin.propPanel.defaultSchema.onePerDoc;
                const disabled = onePerDoc && (schemas.some(schema => schema.type === plugin.propPanel.defaultSchema.type));

                return (
                <Button
                    key={name}
                    className="pdf-editor-plugin-button"
                    style={{ display: 'block', width: '100%', marginBottom: 8 }}
                    disabled={disabled}
                    title={disabled ? t('plugin.onePerDoc') : undefined}
                    onClick={() => addSchema?.(plugin.propPanel.defaultSchema)}
                >
                    {label}
                </Button>
                );
            })}
        </div>
    );
};

export default PluginButtonList;
