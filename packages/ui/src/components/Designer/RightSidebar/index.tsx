import React, {useContext} from 'react';
import { theme, Button } from 'antd';
import type { SidebarProps } from '../../../types.js';
import { RIGHT_SIDEBAR_WIDTH } from '../../../constants.js';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ListView from './ListView/index.js';
import DetailView from './DetailView/index.js';
import {OptionsContext} from "../../../contexts";
import CustomizableView from "./CustomizableView";

const Sidebar = (props: SidebarProps) => {
  const { sidebarOpen, setSidebarOpen, activeElements, schemas } = props;
  const options = useContext(OptionsContext);

  const { token } = theme.useToken();
  const getActiveSchemas = () =>
    schemas.filter((s) => activeElements.map((ae) => ae.id).includes(s.id));
  const getLastActiveSchema = () => {
    const activeSchemas = getActiveSchemas();
    return activeSchemas[activeSchemas.length - 1];
  };

  const sidebarPositionStyle = options.mainSidebarPosition === 'left' ? {
      left: 0,
  } : {
      right: 0
  };

  const iconProps = { strokeWidth: 1.5, size: 20 };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: sidebarOpen ? RIGHT_SIDEBAR_WIDTH : 0,
        ...sidebarPositionStyle
      }}
    >
      <div>
        <Button
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '1rem',
            right: '1rem',
            zIndex: 100,
          }}
          icon={sidebarOpen ? <ArrowRight {...iconProps} /> : <ArrowLeft {...iconProps} />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div
          style={{
            width: RIGHT_SIDEBAR_WIDTH,
            height: '100%',
            display: sidebarOpen ? 'block' : 'none',
            top: 0,
            right: 0,
            position: 'absolute',
            padding: '0.7rem 1rem',
            overflowY: 'auto',
            fontFamily: "'Open Sans', sans-serif",
            boxSizing: 'border-box',
            background: token.colorBgLayout,
          }}
        >
          <div>
            {getActiveSchemas().length === 0 ? (
                (Array.isArray(options.customMainView) && options.customMainView.length)  ? <CustomizableView config={options.customMainView} basePdf={props.basePdf} /> : <ListView {...props} />
            ) : (
              <DetailView {...props} activeSchema={getLastActiveSchema()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
