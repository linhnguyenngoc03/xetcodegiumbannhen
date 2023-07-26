export const getFeedbackListApi = async () => {
  const response = await fetch(`http://localhost:8080/api/feedback/allFeedback`);
  if (response.ok) {
    const feedbackList: any = await response.json();
    return feedbackList;
  } else {
    return [];
  }
};
export const getFeedbackByFeedbackIdApi = async (feedbackId: any) => {
  const response = await fetch(
    `http://localhost:8080/api/feedback/getFeedbackById?feedbackId=${feedbackId}`
  );
  if (response.ok) {
    const feedback: any = await response.json();
    return feedback;
  } else {
    return null;
  }
};

export const deleteFeedbackApi = async (feedbackIdList: any) => {
  const result = feedbackIdList
    .map((feedbackId: any) => `feedbackId=${feedbackId}&`)
    .join("");
  const response = await fetch(
    `http://localhost:8080/api/feedback/deleteFeedback?${result}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (response.ok) {
    return true;
  }
};

export const updateFeedbackApi = async (
  content: any,
  userId: any,
  productId: any,
  date: any,
  feedbackId: any
) => {
  const response = await fetch(
    `http://localhost:8080/api/feedback/updateFeedback`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        user: {
          "userId": 0,
          "userRole": 0,
          "userName": "",
          "userUid": "",
          "email": "",
          "phoneNumber": "",
          "note": ""
        },
        product: {
          "categoryId": 0,
          "dateCreate": "",
          "dateUpdate": "",
          "description": "",
          "image": "",
          "price": 0,
          "productId": 0,
          "productName": "",
          "quantity": 0,
          "status": ""
        },
        date: "",
        feedbackId: feedbackId,
      }),
    }
  );
  if (response.ok) {
    return true;
  }
};

export const createFeedbackApi = async (
  content: any,
  userId: any,
  productId: any,
  date: any,
  feedbackId: any
) => {
  const response = await fetch(
    `http://localhost:8080/api/feedback/createFeedback`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        user: {
          "userId": userId,
          "userRole": 0,
          "userName": "",
          "userUid": "",
          "email": "",
          "phoneNumber": "",
          "note": ""
        },
        product: {
          "categoryId": 0,
          "dateCreate": "",
          "dateUpdate": "",
          "description": "",
          "image": "",
          "price": 0,
          "productId": productId,
          "productName": "",
          "quantity": 0,
          "status": ""
        },
        date: "",
        feedbackId: 0,
      }),
    }
  );
  if (response.ok) {
    return true;
  }
};

export const getFeedbackListByProductIdApi = async (productId: any) => {
  const response = await fetch(`http://localhost:8080/api/feedback/getFeedbackByProductId?productId=${productId}`);
  if (response.ok) {
    const feedbackList: any = await response.json();
    return feedbackList;
  } else {
    return [];
  }
};

export const getUserByUserUidApi = async (userUid: any) => {
  const response = await fetch(
    `http://localhost:8080/api/user/getUserByUserUid?userUid=${userUid}`
  );
  if (response.ok) {
    const user: any = await response.json();
    return user;
  } else {
    return null;
  }
};