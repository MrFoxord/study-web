import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Sales" subTitle="test1" body="body"/>
        <DashboardCard title="Sales" subTitle="test1" body="body"/>
        <DashboardCard title="Sales" subTitle="test1" body="body"/>
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