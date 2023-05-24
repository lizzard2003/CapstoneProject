import React, { Component } from 'react'

import AvailTrue from './AvailTrue'
import TakeBook from './TakeBook'

export class CheckOut extends Component {
    render() {
        return (
            <div>
                <div><AvailTrue /></div>
                <div><TakeBook /></div>
            </div>
        )
    }
}
export default CheckOut