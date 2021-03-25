import React from 'react'
import styled from '@emotion/styled'
import { Pagination } from 'antd'
import Break from './break'

function TablePagination(props) {
    const StyledPagination = styled(Pagination)`
        float: right;
    `

    return (
        <div>
            <Break height={20} />
            <StyledPagination
                showQuickJumper
                showLessItems
                showSizeChanger={false}
                responsive
                current={ props.page }
                total={ props.totalData }
                onChange={ e => props.goTo(e) }
            />
            <Break height={50} />
        </div>
    )
}

export default TablePagination
