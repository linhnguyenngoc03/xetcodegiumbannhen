import ProductFilter from '@/component/product/ProductFilter'
import ProductList2 from '@/component/product/ProductList2'
import ProductListSkeleton from '@/component/product/ProductListSkeleton'
import Layout1 from '@/component/theme/layout/Layout1'
import { Grid, Typography } from '@mui/material'
import React from 'react'

const Search = () => {
    return (
        <Layout1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ProductFilter />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h4">
                        Không tìm thấy sản phẩm
                    </Typography>
                </Grid>
            </Grid>
        </Layout1>
    )
}

export default Search