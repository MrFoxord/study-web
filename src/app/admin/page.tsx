import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: { pricePainCEnts: true},
        _count: true
    })

    return {
        amount: (data._sum.pricePainCEnts || 0)/100,
        numberOfSales: data._count
    }
}

async function getUserData(){
    const [userCount, orderData] =await  Promise.all([
        db.user.count(),
        db.order.aggregate({
        _sum:{pricePainCEnts: true}
        })
    ])

    return {
        userCount,
        averagePerUser: userCount === 0 ? 0 : (orderData._sum.pricePainCEnts || 0) / userCount / 100
    }
}

async function getProductData() {
    const [active, inactive] = await Promise.all([
        db.product.count({where: {isAvailablePurchase: true}}),
        db.product.count({where: {isAvailablePurchase: false}}),
    ])

    return {
        activeCount: active,
        inactiveCount: inactive,
    }
}

export default async function AdminDashboard(){
    const [salesData, userData, productData]= await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ]);
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
            title="Sales" 
            subTitle={`${formatNumber(salesData.numberOfSales)} Orders`  } 
            body={formatCurrency(salesData.amount)}
        />
        <DashboardCard 
            title="Customers" 
            subTitle={`${formatCurrency(userData.averagePerUser)}  Average value`} 
            body={formatNumber(userData.userCount)}
        />
        <DashboardCard 
            title="Active products" 
            subTitle={`${formatNumber(productData.inactiveCount)} Inactive`  } 
            body={formatNumber(productData.activeCount)}
        />
    </div>
}
type DashboardCardProps = {
    title: string;
    subTitle: string;
    body: string;
}



function DashboardCard ({title, subTitle, body}: DashboardCardProps) {
    return <Card>
    <CardHeader>
        <CardTitle>
            {title}
        </CardTitle>
        <CardDescription>
        {subTitle}
    </CardDescription>
    </CardHeader>
    <CardContent>
        <p>{body}</p>
    </CardContent>
</Card>
}