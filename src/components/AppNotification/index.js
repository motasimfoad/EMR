import React from 'react';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';

const AppNotification = () => {
    return (
        <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
            <div className="d-flex align-items-center h-100 justify-content-center">
                <IntlMessages id="appNotification.message"/>
            </div>
        </CustomScrollbars>
    )
};

export default AppNotification;

