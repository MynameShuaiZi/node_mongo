let testDrive=[
    {
        "name":"liming",
        "phone":133133133333,
        "type":"牵引车",
        "imperialroom":"G23",
        "emiStandard":"国五",
        "drive":"6×2R",
        "date":"2018/01/02",
        "hour":"08:00-09:00",
        "province":"北京",
        "city":"市辖市",
        "buyer":"北京华夏双龙汽车贸易有限公司"
    }
];
db.testDrives.drop();
db.testDrives.insert(testDrive);