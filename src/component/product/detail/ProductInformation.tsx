import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import FeedbackTable from "@/component/product/detail/FeedbackList";
import { getFeedbackListByProductIdApi, getUserByUserUidApi } from "@/pages/api/feedback";
import { useAppSelector } from "@/feature/Hooks";
import { Dialog } from "@mui/material";
import { Product } from "../../../../package/model/product";
import FeedbackCreateForm from './FeedbackCreate';
import { auth } from "@/config/firebase";
import { User } from '../../../../package/model/user';

const StyledTab = styled(Tab)({
  fontWeight: 1000,
  color: "black"
});
export default function ProductInformation({ product }: {product: Product}) {
  const [value, setValue] = React.useState("1");
  const [feedbackList, setFeedbackList] = useState(null)
  const [user, setUser] = useState<User | null>(null)
  const uid = auth.currentUser?.uid
  useEffect(() => {
      const getUser = async () => {
          const user = await getUserByUserUidApi(uid)
          setUser(user)
      }
      getUser()
  }, [uid])
  
  const alert = useAppSelector(state => state.alert)
    useEffect(() => {
        const getFeedbackList = async () => {
            const feedbackList = await getFeedbackListByProductIdApi(product.productId)
            setFeedbackList(feedbackList.reverse())
        }
        getFeedbackList()
    }, [alert])
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box marginTop={5}>
        <TabList onChange={handleChange}>
          <StyledTab label="Chi tiết" value="1" />
          <StyledTab label="Đánh giá" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">Bạn có thắc mắc gì hay muốn hỏi thêm thông tin về sản phẩm 
      hãy liên hệ số điện thoại 0123.456.789 và để biết thêm nhiều thông tin về các chương trình của Hommie.</TabPanel>
      <TabPanel value="2">
        {feedbackList !== null ? <FeedbackTable feedbackList={feedbackList} /> : <Dialog open={true}/>}
        {user != undefined || user != null? <FeedbackCreateForm userId={user?.userId} productId={product.productId}/> : <p style={{color: "red"}}>* Cần đăng nhập đề gửi đánh giá về các sản phẩm</p>}
      </TabPanel>
    </TabContext>
  );
}
