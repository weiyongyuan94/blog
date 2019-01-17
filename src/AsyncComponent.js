import { Spin } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
            NProgress.start();
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const Component = this.state.component;
            if (Component){
                NProgress.done();
            }
            return Component ? <Component {...this.props} /> : <div style={{ width: '100vh', height: '100vh' }}><Spin style={{ position: "absolute", marginTop: '25%', marginLeft: '25%', color:'#D2103A'}} size='large' tip="Loading..."/></div>
        }
    }

    return AsyncComponent;
}