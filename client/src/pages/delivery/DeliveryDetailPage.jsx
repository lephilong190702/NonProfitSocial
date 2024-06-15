import React from 'react'
import DeliveryDetail from '../../components/delivery/DeliveryDetail'

const DeliveryDetailPage = ({ orders }) => {
  return (
    <DeliveryDetail orders={orders}/>
  )
}

export default DeliveryDetailPage