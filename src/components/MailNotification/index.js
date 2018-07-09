import React from 'react';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';

const MailNotification = () => {
    return (
        <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
            <div className="d-flex align-items-center h-100 justify-content-center">
                <IntlMessages id="mailNotification.message"/>
            </div>
        </CustomScrollbars>
    )
};

export default MailNotification;

