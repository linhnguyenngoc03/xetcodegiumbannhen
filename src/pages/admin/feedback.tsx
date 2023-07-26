import AdminLayout from '@/component/admin-component/AdminLayout'
import React, { useEffect, useState } from 'react'
import { Feedback } from '../../../package/model/feedback'
import FeedbackTable from "@/component/admin-component/feedback/FeedbackTable";
import { getFeedbackListApi } from "@/pages/api/feedback";
import { useAppSelector } from "@/feature/Hooks";
import { Dialog } from "@mui/material";
import { categoryList } from '@/config/setup';
export default function Product() {
    const [feedbackList, setFeedbackList] = useState(null)
    const alert = useAppSelector(state => state.alert)
    useEffect(() => {
        const getFeedbackList =async () => {
            const feedbackList = await getFeedbackListApi()
            setFeedbackList(feedbackList.reverse())
        }
        getFeedbackList()
    }, [alert])
  return (
    <AdminLayout>
      {feedbackList !== null ? <FeedbackTable feedbackList={feedbackList} /> : <Dialog open={true}/>}
    </AdminLayout>
  );
}

