import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listOrderMine } from '../../Controllers/orderActions';

import { CURRENCY, DD_MM_YYYY } from '../../constants';
import LoadingOrError from '../../components/LoadingOrError';

export default function OrderHistoryScreen(props) {
  const dispatch = useDispatch();
  const orderMineList = useSelector((state) => state.orderMineList);

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1 className="p-1">Order History</h1>

      <LoadingOrError xl statusOf={orderMineList} />

      <table className="table">
        <thead>
          <tr>
            <th>USER_ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th className="tab__w6">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {orderMineList.orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, DD_MM_YYYY)}</td>
              <td>{order.totalPrice.toFixed(CURRENCY)}</td>
              <td>
                {order.isPaid ? order.paidAt.substring(0, DD_MM_YYYY) : 'No'}
              </td>

              <td>
                {order.isDelivered
                  ? order.deliveredAt.substring(0, DD_MM_YYYY)
                  : 'No'}
              </td>

              <td>
                <button
                  type="button"
                  className="small"
                  onClick={() => {
                    props.history.push(`/order/${order._id}`);
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}