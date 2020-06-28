import {Form, Input, Upload, Button, Icon} from 'antd';
import React from 'react';
import QiniuService from '@/utils/qiniu';
import {id} from '@/utils';
import {getQiNiuToken} from '@/axios';

const qiniuService = new QiniuService();
class NavModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadData: {
                token: QiniuService.token,
                key: id(12)
            },
            uploadDomain: QiniuService.config.domain,
            params: this.props.params,
            defaultFileList: [],
            imageUrl: this.props.params.path
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        const oldParams = this.state.params;
        if(this.props.params && oldParams.id !== this.props.params.id) {
            this.props.form.resetFields();
            const {path, title} = this.props.params;
            const fileList = [{
                uid: '-1',
                name: `${title}的上传的图片`,
                status: 'done',
                url: path,
                thumbUrl: path
            }]
    
            this.setState({defaultFileList: fileList, imageUrl: path, params: this.props.params});
        }
    }
    async beforeUpload (file) {
        if (QiniuService.token) {
            return true;
        }

        await this.fetchUploadToken();
    }

    async fetchUploadToken () {
        const tokenRes =  await getQiNiuToken();
        if( tokenRes && tokenRes.success) {
            QiniuService.token = tokenRes.data;
            const domain = await qiniuService.getUploadUrl(tokenRes.data)
            QiniuService.config = {domain};
            let {uploadData} = this.state;
            uploadData.token = tokenRes.data;
            this.setState({
                uploadData,
                uploadDomain: domain
            })
            return true;
        }

        return true;
       
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }


    handleUploadChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            console.log(info);
            const imageKey = info.file.response.key;
            let  {imageUrl} = this.state;
            imageUrl = QiniuService.oss + imageKey;
            this.setState({
                imageKey,
                imageUrl,
                loading: false,
            });
        }
    }

    render() {
        const uploadButton = (
            <Button>
                <Icon type="upload" /> 点击上传
            </Button>
        );
        const {getFieldDecorator} = this.props.form;
        const {params, defaultFileList, imageUrl} = this.state;
        return (
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="主页ID">
                {getFieldDecorator('homePageId', {
                    rules: [{ required: true, message: '请输入主页ID' }],
                    initialValue: params.homePageId || ''
                })(<Input />)}
            </Form.Item>
            <Form.Item label="标题">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入标题' }, {maxlength: 200}],
                    initialValue: params.title || ''
                })(
                    <Input />
                )}
            </Form.Item>

            <Form.Item label="跳转地址">
                {getFieldDecorator('redirectPath', {
                    rules: [{ required: true, message: '请输入跳转地址' }],
                    initialValue: params.redirectPath || ''
                })(
                    <Input />
                )}
            </Form.Item>

            <Form.Item label="顺序">
                {getFieldDecorator('rank', {
                    rules: [{ required: true, message: '请输入顺序' }],
                    initialValue: params.rank || ''
                })(
                    <Input />
                )}
            </Form.Item>

            <Form.Item label="图片"  extra={imageUrl ? '点击图片区域即可上传图片' : ""}>
                {getFieldDecorator('path', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue: imageUrl,
                    rules: [{ required: true, message: '图片是必须项' }],
                })(
                    <Upload 
                    name="file" 
                    action={this.state.uploadDomain}
                    multiple={false} 
                    data={this.state.uploadData}
                    beforeUpload={this.beforeUpload.bind(this)}
                    showUploadList={false}
                    onChange={this.handleUploadChange.bind(this)}
                    accept={".png, .jpg, .jpeg"}>
                       {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                )}
            </Form.Item>
        </Form>
        )   
    }
}

export default Form.create(
    {
        name: 'navModalForm', 
    })(NavModal);