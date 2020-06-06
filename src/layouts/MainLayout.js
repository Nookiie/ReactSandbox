import React, { Component } from 'react';

export default class MainLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ background: 'lightblue' }}>
                {this.props.children}
            </div>
        );
    }
}