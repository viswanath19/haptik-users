import * as React from "react";
import * as PropTypes from "prop-types";
import { isObject, omit } from 'lodash-es';

const Table = ( { children, striped, bordered, borderedRadius, hover, className, ...extraProps } ) => {

    let __class = {

    };
    return (
        <div className={"responsive-aio-table"}>
            <table style={{border:'1px solid black',borderCollapse:'collapse',width:'100%'}}
                { ...omit( extraProps ) }
                   className={"aio-table"}>
                { children }
            </table>
        </div>
    );
};

Table.propTypes = {
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
};

export default Table;