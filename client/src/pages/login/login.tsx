import { Form, Icon, Input, Button } from 'antd';
import * as React from "react";
import { BaseComponent } from "../../core/web/baseComponent/react";
import { ViewOperation } from "../../core/decorator/decorator";
import { routerManger } from "../../core/routeManager/routeManager";

class SubmitedForm extends BaseComponent<{ form: any, onHandleSubmit: Function }, any> {
    @ViewOperation()
    async handleSubmit(e: any) {
        const values = await this.handleFormData(e);
        this.props.onHandleSubmit(values);
    }
    handleFormData(e: any) {
        // todo 这段代码提取出来，做成一个form组件
        e.preventDefault();
        return new Promise((resolve, reject) => {

            this.props.form.validateFields((err: any, values: any) => {
                if (err) {
                    reject(err);
                }
                resolve(values);
            });
        });
    }
    render() {
        return (<Form onSubmit={this.handleSubmit}>{this.props.children}</Form>);
    }
}

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<{ form: any }, any> {
    @ViewOperation()
    async handleSubmit(value: any) {
        localStorage.setItem('user', JSON.stringify(value))
        routerManger.push("12")
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <SubmitedForm {...this.props} onHandleSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </SubmitedForm>
        );
    }
}

export const WrappedNormalLoginForm = Form.create()(NormalLoginForm);