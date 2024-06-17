import React, { useRef, useState, useEffect } from 'react';
import './index.less';
import qs from 'qs';
import { addPlantInfo, getPlantInfo, uploadOSS } from '@/services/plant';
import { Form, ImageUploader, Input, TextArea, Button, Toast } from 'antd-mobile';

export const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'

export async function mockUpload(file: File) {
  try {
    const fd = new FormData();
        fd.append('file', file)
    const result = await uploadOSS(fd);
    return {
    url: result?.url,
  }
  } catch (error) {
    mockUploadFail();
  }
}

export async function mockUploadFail() {
  throw new Error('Fail to upload')
}

const TableList: React.FC<unknown> = () => {
  const searches: any = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [detail, setDetail] = useState({});
  const [fileList, setFileList] = useState<any[]>([
  ])
  const formRef = useRef();

  useEffect(() => {
    document.title = "数字养护";
    
  }, []);

  const onSubmit = () => {
		formRef?.current?.validateFields().then((params) => {
			console.log("values", params);
      const { name, age, diameter, introduce } = params;
      if(!name) {
        Toast.show("请输入树名");
        return;
      }
      if(!diameter) {
        Toast.show("请输入胸径");
        return;
      }
      if(!age) {
        Toast.show("请输入树龄");
        return;
      }
      if(!introduce) {
        Toast.show("请输入树木介绍");
        return;
      }
      if(!fileList.length) {
        Toast.show("请至少上传一张图片");
        return;
      }
      const imgs = fileList?.map(file => file.url).join(",");
      addPlantInfo({ name, age, diameter, introduce, imgs }).then(res => {
        console.log(res);
        if (res.code == 0) {
          Toast.show("添加成功");
        } else {
          Toast.show(res?.msg || "添加失败，请重新尝试");
        }
      });
			
		}).catch(e => {
			console.log(e)
		});

	};

  console.log("fileList", fileList);

  return (
    <div className='add-plant-view'>
      <Form layout='horizontal' ref={formRef}>
      <Form.Header />
        <div className='inp'>
          <Form.Item label='树名' name='name'>
            <Input placeholder='请输入' />
          </Form.Item>
        </div>

        <Form.Header />
        <div className='inp'>
          <Form.Item label='胸径' name='diameter'>
            <Input type="number" placeholder='请输入' />
          </Form.Item>
          <div style={{ display: "inline-block", paddingRight: "0.32rem" }}>毫米</div>
        </div>

        <Form.Header />
        <div className='inp'>
          <Form.Item label='树龄' name="age">
            <Input placeholder='请输入' />
          </Form.Item>
          <div style={{ display: "inline-block", paddingRight: "0.32rem" }}>年</div>

        </div>
        <Form.Header />

        <Form.Item name='introduce' label='树木介绍' className='introduce'>
          <TextArea
            placeholder='请输入'
            maxLength={200}
            rows={3}
            showCount
          />
        </Form.Item>
      </Form>
      <div className='upload-img'>
        <div style={{ fontSize: "0.32rem", marginBottom: "0.12rem" }}>数木图片</div>
      <ImageUploader
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
    />
    </div>
      <Button color='primary' className='submit-btn' onClick={() => {
        onSubmit();
      }}>提交</Button>
    </div>
  );
};

export default TableList;
