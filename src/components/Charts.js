// import React, { useEffect, useState } from "react";
// import { Line, Doughnut, Bar } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     BarElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { ClipLoader } from "react-spinners";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     BarElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const ChartComponent = ({ data = [] }) => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(!(data && data.length > 0));
//     }, [data]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <ClipLoader size={50} color="#36d7b7" />
//                 <p className="ml-4 text-lg">Loading data...</p>
//             </div>
//         );
//     }

//     // Helper: Group data by key
//     const groupByKey = (array, key) => {
//         return array.reduce((result, currentItem) => {
//             const groupKey = currentItem[key];
//             result[groupKey] = (result[groupKey] || 0) + currentItem.amount;
//             return result;
//         }, {});
//     };
//     const formatTime = (date) => {
//         const d = new Date(date);
//         const hours = d.getHours().toString().padStart(2, "0");
//         const minutes = d.getMinutes().toString().padStart(2, "0");
//         return `${hours}:${minutes}`;
//     };
//     const groupByTime = (array) => {
//         return array.reduce((result, currentItem) => {
//             const time = formatTime(currentItem.date); // Extract HH:mm
//             result[time] = (result[time] || 0) + currentItem.amount; // Sum the amounts for the same time
//             return result;
//         }, {});
//     };

//     // Prepare Chart Data
//     const timeChartData = {
//         labels: data.map((item) => new Date(item.date).toLocaleDateString()), // Only show the date
//         datasets: [
//             {
//                 label: "Amount Spent",
//                 data: data.map((item) => item.amount),
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 backgroundColor: "rgba(75, 192, 192, 0.2)",
//                 fill: true,
//                 tension: 0.4,
//                 pointBackgroundColor: "rgba(75, 192, 192, 1)",
//             },
//         ],
//     };
//     const timeGroupedData = groupByTime(data);
//     const TimeSpendingChartData = {
//         labels: Object.keys(timeGroupedData), // Time (HH:mm)
//         datasets: [
//             {
//                 label: "Spending at Time",
//                 data: Object.values(timeGroupedData), // Total spending at each time
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 backgroundColor: "rgba(75, 192, 192, 0.2)",
//                 fill: true,
//                 tension: 0.4,
//                 pointBackgroundColor: "rgba(75, 192, 192, 1)",
//             },
//         ],
//     };

//     // Chart options
//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: true,
//         scales: {
//             x: {
//                 grid: {
//                     display: true,
//                 },
//                 ticks: {
//                     callback: function (value) {
//                         return value; // Directly use HH:mm as label
//                     },
//                 },
//             },
//             y: {
//                 grid: {
//                     display: true,
//                 },
//             },
//         },
//     };
//     const categoryData = groupByKey(data, "category");
//     const categoryChartData = {
//         labels: Object.keys(categoryData),
//         datasets: [
//             {
//                 data: Object.values(categoryData),
//                 backgroundColor: [
//                     "rgba(255, 99, 132, 0.6)",
//                     "rgba(54, 162, 235, 0.6)",
//                     "rgba(255, 206, 86, 0.6)",
//                     "rgba(75, 192, 192, 0.6)",
//                     "rgba(153, 102, 255, 0.6)",
//                 ],
//                 borderColor: [
//                     "rgba(255, 99, 132, 1)",
//                     "rgba(54, 162, 235, 1)",
//                     "rgba(255, 206, 86, 1)",
//                     "rgba(75, 192, 192, 1)",
//                     "rgba(153, 102, 255, 1)",
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const monthlyData = groupByKey(
//         data.map((item) => ({
//             ...item,
//             month: new Date(item.date).toLocaleString("default", {
//                 month: "short",
//                 year: "numeric",
//             }),
//         })),
//         "month"
//     );

//     const monthlyChartData = {
//         labels: Object.keys(monthlyData),
//         datasets: [
//             {
//                 label: "Monthly Spending",
//                 data: Object.values(monthlyData),
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const methodData = groupByKey(data, "method");
//     const methodChartData = {
//         labels: Object.keys(methodData),
//         datasets: [
//             {
//                 data: Object.values(methodData),
//                 backgroundColor: [
//                     "rgba(255, 99, 132, 0.6)",
//                     "rgba(54, 162, 235, 0.6)",
//                     "rgba(255, 206, 86, 0.6)",
//                 ],
//                 borderColor: [
//                     "rgba(255, 99, 132, 1)",
//                     "rgba(54, 162, 235, 1)",
//                     "rgba(255, 206, 86, 1)",
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const locationData = groupByKey(data, "location");
//     const locationChartData = {
//         labels: Object.keys(locationData),
//         datasets: [
//             {
//                 label: "Spending by Location",
//                 data: Object.values(locationData),
//                 backgroundColor: "rgba(153, 102, 255, 0.6)",
//                 borderColor: "rgba(153, 102, 255, 1)",
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const topExpenses = [...data]
//         .sort((a, b) => b.amount - a.amount)
//         .slice(0, 5);

//     return (
//         <div className="w-full max-w-6xl mx-auto p-6">
//             <h2 className="text-3xl font-semibold mb-6 text-center">
//                 Interactive Expense Analysis
//             </h2>

//             {/* Amount Spent Over Time */}
//             <div className="bg-white p-6 rounded-lg mb-2">
//                 <h3 className="text-xl font-medium text-center mb-4">
//                     Amount Spent Over Time
//                 </h3>
//                 <Line
//                     data={timeChartData}
//                     options={{
//                         responsive: true,
//                         maintainAspectRatio: true,
//                         scales: {
//                             x: {

//                                 grid: {
//                                     display: true,
//                                 },
//                             },
//                             y: {

//                                 grid: {
//                                     display: true,
//                                 },
//                             },
//                         },
//                     }}
//                     className="h-full w-fit"
//                 />
//             </div>

//             {/* Expense Distribution by Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2">
//                 <div className="bg-white p-6 rounded-lg col-span-1">
//                     <h3 className="text-xl font-medium text-center mb-4">
//                         Expense Distribution by Category
//                     </h3>
//                     <Doughnut data={categoryChartData} />
//                 </div>

//                 {/* Spends by Payment Method */}
//                 <div className="bg-white p-6 rounded-lg col-span-1">
//                     <h3 className="text-xl font-medium text-center mb-4">
//                         Spends by Payment Method
//                     </h3>
//                     <Doughnut data={methodChartData} />
//                 </div>
//             </div>

//             {/* Spend on Geo Locations */}
//             <div className="bg-white p-6 rounded-lg col-span-1">
//                 <h3 className="text-xl font-medium text-center mb-4">
//                     Spend on Geo Locations
//                 </h3>
//                 <Bar data={locationChartData} />
//             </div>

//             {/* Monthly Spending */}
//             <div className="bg-white p-6 rounded-lg col-span-1">
//                 <h3 className="text-xl font-medium text-center mb-4">
//                     Monthly Spending
//                 </h3>
//                 <Bar data={monthlyChartData} />
//             </div>
//             <div className="w-full max-w-6xl mx-auto p-6">
//                 <h2 className="text-3xl font-semibold mb-6 text-center">
//                     Spending Over Time
//                 </h2>

//                 <div className="bg-white p-6 rounded-lg mb-4">
//                     <h3 className="text-xl font-medium text-center mb-4">
//                         Spending vs Time
//                     </h3>
//                     <Line data={TimeSpendingChartData} />
//                 </div>
//             </div>

//             {/* Top Expenses Table */}
//     <div className="gap-8">
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//             <h3 className="text-lg font-semibold text-center mb-4">
//                 Top Largest Expenses
//             </h3>
//             <div className="overflow-x-auto p-4 rounded-md bg-white">
//                 <table className="w-full border border-gray-300 table-auto text-sm">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">Category</th>
//                             <th className="px-4 py-2">Location</th>
//                             <th className="px-4 py-2">Method</th>
//                             <th className="px-4 py-2">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {topExpenses.map((item, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                                 <td className="px-4 py-2">
//                                     {new Date(item.date).toLocaleString()}
//                                 </td>
//                                 <td className="px-4 py-2">{item.category}</td>
//                                 <td className="px-4 py-2">{item.location}</td>
//                                 <td className="px-4 py-2">{item.method}</td>
//                                 <td className="px-4 py-2">
//                                     ${item.amount.toFixed(2)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
// </div>
//     );
// };

// export default ChartComponent;


import React, { useEffect, useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { ClipLoader } from "react-spinners";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChartComponent = ({ data = [] }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!(data && data.length > 0));
    }, [data]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color="#36d7b7" />
                <p className="ml-4 text-lg">Loading data...</p>
            </div>
        );
    }

    const groupByKey = (array, key) => {
        return array.reduce((result, currentItem) => {
            const groupKey = currentItem[key];
            result[groupKey] = (result[groupKey] || 0) + currentItem.amount;
            return result;
        }, {});
    };

    const formatTime = (date) => {
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, "0");
        const minutes = d.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const groupByTime = (array) => {
        return array.reduce((result, currentItem) => {
            const time = formatTime(currentItem.date);
            result[time] = (result[time] || 0) + currentItem.amount;
            return result;
        }, {});
    };

    const timeChartData = {
        labels: data.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: "Amount Spent",
                data: data.map((item) => item.amount),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const timeGroupedData = groupByTime(data);
    const TimeSpendingChartData = {
        labels: Object.keys(timeGroupedData),
        datasets: [
            {
                label: "Spending at Time",
                data: Object.values(timeGroupedData),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const categoryData = groupByKey(data, "category");
    const categoryChartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: [
                    "rgba(255, 87, 51, 0.6)",  // Bright Orange-Red
                    "rgba(72, 201, 176, 0.6)", // Aqua Green
                    "rgba(255, 193, 7, 0.6)",  // Vibrant Yellow
                    "rgba(33, 150, 243, 0.6)", // Bright Blue
                    "rgba(156, 39, 176, 0.6)", // Deep Purple
                    "rgba(244, 67, 54, 0.6)",  // Bright Red
                    "rgba(0, 188, 212, 0.6)",  // Cyan
                    "rgba(139, 195, 74, 0.6)", // Lime Green
                    "rgba(255, 152, 0, 0.6)",  // Amber
                    "rgba(103, 58, 183, 0.6)"  // Violet
                ],
                borderColor: [
                    "rgba(255, 87, 51, 1)",  // Bright Orange-Red
                    "rgba(72, 201, 176, 1)", // Aqua Green
                    "rgba(255, 193, 7, 1)",  // Vibrant Yellow
                    "rgba(33, 150, 243, 1)", // Bright Blue
                    "rgba(156, 39, 176, 1)", // Deep Purple
                    "rgba(244, 67, 54, 1)",  // Bright Red
                    "rgba(0, 188, 212, 1)",  // Cyan
                    "rgba(139, 195, 74, 1)", // Lime Green
                    "rgba(255, 152, 0, 1)",  // Amber
                    "rgba(103, 58, 183, 1)"  // Violet
                ],
                borderWidth: 1,
            },
        ],
    };

    const monthlyData = groupByKey(
        data.map((item) => ({
            ...item,
            month: new Date(item.date).toLocaleString("default", {
                month: "short",
                year: "numeric",
            }),
        })),
        "month"
    );

    const monthlyChartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: "Monthly Spending",
                data: Object.values(monthlyData),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const methodData = groupByKey(data, "paymentMethod");
    const methodChartData = {
        labels: Object.keys(methodData),
        datasets: [
            {
                data: Object.values(methodData),
                backgroundColor: [
                    "rgba(255, 99, 71, 0.6)",   // Tomato Red
                    "rgba(60, 179, 113, 0.6)",  // Medium Sea Green
                    "rgba(255, 165, 0, 0.6)",   // Orange
                    "rgba(100, 149, 237, 0.6)", // Cornflower Blue
                    "rgba(186, 85, 211, 0.6)",  // Orchid Purple
                    "rgba(220, 20, 60, 0.6)",   // Crimson Red
                    "rgba(70, 130, 180, 0.6)",  // Steel Blue
                    "rgba(173, 255, 47, 0.6)",  // Lime Yellow
                    "rgba(255, 105, 180, 0.6)", // Hot Pink
                    "rgba(240, 128, 128, 0.6)"
                ],
                borderColor: [
                    "rgba(255, 99, 71, 0.8)",   // Tomato Red
                    "rgba(60, 179, 113, 0.8)",  // Medium Sea Green
                    "rgba(255, 165, 0, 0.8)",   // Orange
                    "rgba(100, 149, 237, 0.8)", // Cornflower Blue
                    "rgba(186, 85, 211, 0.8)",  // Orchid Purple
                    "rgba(220, 20, 60, 0.8)",   // Crimson Red
                    "rgba(70, 130, 180, 0.8)",  // Steel Blue
                    "rgba(173, 255, 47, 0.8)",  // Lime Yellow
                    "rgba(255, 105, 180, 0.8)", // Hot Pink
                    "rgba(240, 128, 128, 0.8)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const locationData = groupByKey(data, "location");
    const locationChartData = {
        labels: Object.keys(locationData),
        datasets: [
            {
                label: "Spending by Location",
                data: Object.values(locationData),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const topExpenses = [...data]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || "";
                        return `${label}: $${context.raw}`;
                    },
                },
            },
            legend: {
                display: true,
                position: "bottom",
                onClick: (e, legendItem) => {
                    console.log(`Clicked on ${legendItem.text}`);
                },
            },
        },
        animation: {
            duration: 1000,
            easing: "easeInOutQuad",
        },
    };

    const mydata = data;
    const recurringStats = mydata.reduce(
        (stats, item) => {
            const key = item.recurring ? "recurring" : "nonRecurring";
            stats[key].count += 1;
            stats[key].totalAmount += item.amount;
            return stats;
        },
        {
            recurring: { count: 0, totalAmount: 0 },
            nonRecurring: { count: 0, totalAmount: 0 },
        }
    );

    // Prepare chart data
    const chartData = {
        labels: ["Recurring", "Non-Recurring"],
        datasets: [
            {
                label: "Count of Payments",
                data: [recurringStats.recurring.count, recurringStats.nonRecurring.count],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Total Amount ($)",
                data: [recurringStats.recurring.totalAmount, recurringStats.nonRecurring.totalAmount],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Recurring vs Non-Recurring Payments (Count & Total Amount)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    const mysubLocationsData = data;
    const subLocationCounts = mysubLocationsData.reduce((counts, txn) => {
        const subLocation = txn.subLocation || "N/A";
        counts[subLocation] = (counts[subLocation] || 0) + 1;
        return counts;
    }, {});

    // Extract labels and values
    const labels = Object.keys(subLocationCounts);
    const values = Object.values(subLocationCounts);

    // Chart Data
    const subLocationdata = {
        labels,
        datasets: [
            {
                label: "Transactions by Sub-location",
                data: values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(70, 130, 180, 0.6)",  // Steel Blue
                    "rgba(173, 255, 47, 0.6)",  // Lime Yellow
                    "rgba(255, 105, 180, 0.6)", // Hot Pink
                    "rgba(240, 128, 128, 0.6)",
                    "rgba(255, 65, 120, 0.6)", // Hot Pink
                    "rgba(120, 118, 48, 0.6)"
                ],

                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(70, 130, 180, 1)",  // Steel Blue
                    "rgba(173, 255, 47, 1)",  // Lime Yellow
                    "rgba(255, 105, 180, 1)", // Hot Pink
                    "rgba(240, 128, 128, 1)",
                    "rgba(255, 65, 120, 1)", // Hot Pink
                    "rgba(120, 118, 48, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart Options
    const optionsforSubLoactions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Transactions by Sub-location",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Transactions",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Sub-locations",
                },
            },
        },
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 gap-4">
            <h2 className="text-3xl font-semibold mb-6 text-center">
                Interactive Expense Analysis
            </h2>

            <div className="bg-white p-6 rounded-lg mb-4">
                <h3 className="text-xl font-medium text-center mb-4">
                    Amount Spent Over Time
                </h3>
                <Line data={timeChartData} options={commonOptions} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-center mb-4">
                        Expense Distribution by Category
                    </h3>
                    <Doughnut data={categoryChartData} options={commonOptions} />
                </div>
                <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-center mb-4">
                        Spending by Payment Method
                    </h3>
                    <Doughnut data={methodChartData} options={commonOptions} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-medium text-center mb-4">
                    Spending by Location
                </h3>
                <Bar data={locationChartData} options={commonOptions} />
            </div>

            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-medium text-center mb-4">
                    Spend vs Time (HH:mm)
                </h3>
                <Line data={TimeSpendingChartData} options={commonOptions} />
            </div>

            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-medium text-center mb-4">
                    Monthly Spending
                </h3>
                <Bar data={monthlyChartData} options={commonOptions} />
            </div>

            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-medium text-center mb-4">
                    Recurring vs Non-Recurring
                </h3>
                <Bar data={chartData} options={options} />
            </div>

            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-medium text-center mb-4">
                    SubLoactions Spending
                </h3>
                <Bar data={subLocationdata} options={optionsforSubLoactions} />
            </div>





            <div className="gap-8 mt-4">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold text-center mb-4">
                        Top Largest Expenses
                    </h3>
                    <div className="overflow-x-auto p-4 rounded-md bg-white">
                        <table className="w-full border border-gray-300 table-auto text-sm text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Location</th>
                                    <th className="px-4 py-2">Method</th>
                                    <th className="px-4 py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topExpenses.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            {new Date(item.date).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">{item.category}</td>
                                        <td className="px-4 py-2">{item.location}</td>
                                        <td className="px-4 py-2">{item.paymentMethod}</td>
                                        <td className="px-4 py-2">
                                            ${item.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
