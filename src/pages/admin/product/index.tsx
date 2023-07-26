import React, { useEffect, useState } from "react";
import ProductTable from "@/component/admin-component/product/ProductTable";

import { getProductListApi } from "@/pages/api/ProductApi";
import { useAppSelector } from "@/feature/Hooks";
import AdminLayout from "@/component/admin-component/AdminLayout";
import { Dialog } from "@mui/material";
import { categoryList } from '@/config/setup';
export default function Product() {
    const [productList, setProductList] = useState(null)
    const alert = useAppSelector(state => state.alert)
    useEffect(() => {
        const getProductList =async () => {
            const productList = await getProductListApi()
            setProductList(productList.reverse())
        }
        getProductList()
    }, [alert])
  return (
    <AdminLayout>
      {productList !== null && categoryList !== null ? <ProductTable productList={productList} categoryList={categoryList}/> : <Dialog open={true}/>}
    </AdminLayout>
  );
}
