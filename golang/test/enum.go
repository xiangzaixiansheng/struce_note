package main

import "errors"

type OrderStatus int

var OrderStatusMap map[OrderStatus]string

func init() {
	OrderStatusMap = make(map[OrderStatus]string)
	OrderStatusMap[Created] = "Created"
	OrderStatusMap[Paided] = "Paided"
	OrderStatusMap[Delivering] = "Delivering"
	OrderStatusMap[Completed] = "Completed"
	OrderStatusMap[Canceled] = "Canceled"
}

const (
	Unkown     OrderStatus = 0 //未定义状态
	Created    OrderStatus = 1 //使用数字,禁用iota,原因:方便直接知道值是多少;避免中间插入新值影响原有的值
	Paided     OrderStatus = 2
	Delivering OrderStatus = 3
	Completed  OrderStatus = 4
	Canceled   OrderStatus = 5
)

func (i OrderStatus) String() string {
	return OrderStatusMap[i]
}

func (i OrderStatus) Value() int {
	return int(i)
}

func ParseOrderStatus(name string) (OrderStatus, error) {
	for k, v := range OrderStatusMap {
		if v == name {
			return k, nil
		}
	}
	return Unkown, errors.New("Unkown")
}
