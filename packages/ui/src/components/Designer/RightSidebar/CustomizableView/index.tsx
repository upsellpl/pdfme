import React from 'react';
import { Divider, Typography } from 'antd';
import {i18n} from "../../../../i18n";
import PluginButtonList from "./PluginButtonList";
import {BasePdf, SchemaForUI} from "@pdfme/common";

const { Text } = Typography;

const headHeight = 40;

interface CustomMainViewItem {
    type: string;
    textContent?: string;
    actionName?: string;
}

interface CustomizableViewProps {
    config: CustomMainViewItem[];
    basePdf: BasePdf;
    schemas: SchemaForUI[];
}

const CustomizableView = ({ config, basePdf, schemas }: CustomizableViewProps) => {
    return (
        <div className={"pdf-editor-customizable-view"}>
            {config.map(({type, textContent, actionName}, index) => {
                switch (type) {
                    case 'header':
                        return <h2 key={index} className={"pdf-editor-customizable-view-h2"}>{textContent}</h2>;

                    case 'paragraph':
                        return <p key={index} className={"pdf-editor-customizable-view-paragraph"}>{textContent}</p>;

                    case 'button':
                        return <button key={index} className={"pdf-editor-customizable-view-button"} data-name={actionName}>{textContent}</button>;

                    case 'divider':
                        return <Divider key={index} className={"pdf-editor-customizable-view-divider"}/>;

                    case 'plugins':
                        return <PluginButtonList key={index} basePdf={basePdf} schemas={schemas}/>;

                    default:
                        return (
                            <div key={index}>
                                Unsupported type!
                            </div>
                        );
                }
            })}
        </div>
    );
};

export default CustomizableView;
