let user=[
    {
    "userId":"1",
    "userName":"shuaizi",
    "userPassword":"123456",
     "carList":[]
    },
    {
        "userId":"2",
        "userName":"liaoxiaomin",
        "userPassword":"123456",
        "carList":[]
    }
];
db.users.drop();
db.users.insert(user);
