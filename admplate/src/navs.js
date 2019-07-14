export default  [
    { label: "首页", icon: "home", to: "/dashboard" },
    {
        label: "手术室管理",
        icon: "shopping-cart",
        to: "/manage/orders",
        children: [
            { label: "排班", icon: "circle-o", to: "/manage/orders" },
            { label: "维护", icon: "circle-o", to: "/manage/orders/done" }
        ]
    }
];
