import { Button, Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { formatNumber } from '../../../utils/common';
import PaypalButton from './PaypalButton';

const PaypalCheckout = ({ shipping, showModal, total, sell, tranSuccess, onChange }) => {
    return (
        <div className="flex justify-between flex-col h-full">
            <div>
                <h2 className={`${shipping?.address ? 'flex justify-between' : ''}`}>
                    <span className="text-lg">Địa chỉ nhận hàng</span>{' '}
                    {!shipping?.address && (
                        <span className="text-[12px] text-red-500 font-mono">
                            {' '}
                            (* Cập nhật địa chỉ trước khi thanh toán)
                        </span>
                    )}
                    {shipping?.address && (
                        <span
                            onClick={showModal}
                            className="text-md text-blue-500 cursor-pointer hover:opacity-80 underline font-mono"
                        >
                            Thay đổi
                        </span>
                    )}
                </h2>
                <div>
                    {shipping?.address ? (
                        <div className="ml-2">
                            <Row gutter={[0, 4]}>
                                <Col span={10}>
                                    <span className="font-bold">Họ tên:</span>
                                </Col>
                                <Col span={14}>{shipping.name}</Col>
                                <Col span={10}>
                                    <span className="font-bold">Địa chỉ:</span>
                                </Col>
                                <Col span={14}>{shipping.address}</Col>
                                <Col span={10}>
                                    <span className="font-bold">Số điện thoại:</span>
                                </Col>
                                <Col span={14}>{shipping.phone}</Col>
                            </Row>
                        </div>
                    ) : (
                        <>
                            Chưa có địa chỉ{' '}
                            <Button onClick={showModal} className="mt-4" type="primary">
                                Thêm
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <Row className="total mt-10">
                <Col span={24}>
                    <Card size="small">
                        <div className="payment-info">
                            <span>Tạm tính</span>
                            <span>{formatNumber(parseInt(total))}đ</span>
                        </div>
                        <div className="payment-info">
                            <span>Giảm giá</span>
                            <span>-{formatNumber(parseInt(sell))}đ</span>
                        </div>
                        <div className="payment-info">
                            <span>Thanh toán paypal</span>
                            <span>-{formatNumber(parseInt(200000))}đ</span>
                        </div>
                        <Divider style={{ margin: '10px 0', marginTop: '20px' }} />
                        <div className="payment-total">
                            <span>Tổng cộng</span>
                            <span>{formatNumber(parseInt(total - sell - 200000))}đ</span>
                        </div>
                        <span className="payment-VAT">(Đã bao gồm VAT nếu có)</span>
                    </Card>
                    <div style={{ width: '100%', marginTop: '10px' }}>
                        <PaypalButton total={parseInt((total - sell - 200000) / 23000)} tranSuccess={tranSuccess} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PaypalCheckout;
