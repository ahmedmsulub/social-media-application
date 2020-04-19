import React, { Component } from 'react';
import styles from './wrapper.module.css'

class Wrapper extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.props.children}
            </div>
        );
    }
}

export default Wrapper;