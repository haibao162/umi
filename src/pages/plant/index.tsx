import React, { useRef, useState, useEffect } from 'react';
import './index.less';
import qs from 'qs';
import { getPlantInfo } from '@/services/plant';
import { Button, Space, Swiper, Toast } from 'antd-mobile';

const TableList: React.FC<unknown> = () => {
  const searches: any = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [detail, setDetail] = useState({});
  console.log("API_URL", API_URL);

  useEffect(() => {
    document.title = "数字养护";
    getPlantInfo({ id: searches?.id }).then(res => {
      setDetail(res?.data);
    });
  }, []);

  console.log(detail);

  const info = detail?.info;
  const recordList = detail?.recordList;

  const items = info?.bannerList?.map((item, index) => (
    <Swiper.Item key={`${index}_plant`}>
      <div className='plant-item'><img src={item} className='plant-img'></img>

      </div>
    </Swiper.Item>
  ))


  return (
    <div className='plant-view'>
      <Swiper autoplay>{items}</Swiper>
      <div className='title'>
        <div className='name' style={{ fontWeight: 600 }}>{info?.name}</div>
        <div className='info'>{info?.introduce}</div>
      </div>
      <div className='container'>
        <div style={{ color: "#999" }}>胸径</div>
        <div>{info?.diameter}mm</div>
      </div>
      <div className='container'>
        <div style={{ color: "#999" }}>树龄</div>
        <div>{info?.age}年</div>
      </div>

      <div className='records'>
        <div className='record-title'>巡查记录</div>
        {
          recordList?.map((record, index) => {
            return <div key={`${index}_record`} className='items'>
                <div className='createTime'>{record?.createAt}</div>
                <img src={record?.imgs} />
            </div>
          })
        }
      </div>
    </div>
  );
};

export default TableList;
