import React, { Component } from 'react';

export default class StatusCheckbox extends Component {

    render() {
        
        return (
            <label>
                <input 
                    type='checkbox'
                    name='status'
                    value={this.props.status}
                    checked={this.props.status === 'active' ? 'on' : null}
                    onChange={this.props.handler}
                />
                Status
            </label>
        )
    }
}
