import React, { Component } from 'react'
import AvailFalse from './AvailFalse'
import AddBook from './AddBook'

export class CheckIn extends Component {
    render() {
        return (
            <div>
                <div className='top'><AvailFalse /></div>
                <div className='bottom'><AddBook /></div>
            </div>
        )
    }
}

export default CheckIn