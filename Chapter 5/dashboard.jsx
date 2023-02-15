import React from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import {
    ClockIcon,
} from "@heroicons/react/24/outline";
import Gis from "@/context/Gis";

import { StatisticsCard } from "@/widgets/cards";

import {
    statisticsCardsData,
} from "@/data";

import { Chart } from "react-google-charts";

import {
    totalData,
    optionsData,
    optionsSumberDayaGeologi,
    dataSumberDayaGeologi,
    dataFosil,
    optionsFosil,
    dataBatuan,
    optionsBatuan,
} from "@/data/pie-chart";

import { tableDataHome } from "@/data";

export function Home() {
    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                        footer={
                            <Typography className="font-normal text-blue-gray-600">
                                <strong className={footer.color}>{footer.value}</strong>
                                &nbsp;{footer.label}
                            </Typography>
                        }
                    />
                ))}
            </div>

            <div className="mb-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                <Card>
                    <CardBody>
                        <CardHeader
                            options={optionsData}
                            variant="h3"
                        >

                        </CardHeader>
                        <Chart
                            chartType="PieChart"
                            data={totalData}
                            options={optionsData}
                            width={"100%"}
                            height={"400px"}
                        />
                        <Card>
                            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                                <Typography variant="h6" color="white">
                                    Komulatif Data
                                </Typography>
                            </CardHeader>
                            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {["Jenis", "Total"].map((el) => (
                                                <th
                                                    key={el}
                                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                    >
                                                        {el}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableDataHome.map(
                                            ({ jenis, total }, key) => {
                                                const className = `py-3 px-5 ${key === tableDataHome.length - 1
                                                    ? ""
                                                    : "border-b border-blue-gray-50"
                                                    }`;
                                                return (
                                                    <tr key={jenis}>
                                                        <td className={className}>
                                                            <Typography
                                                                variant="3"
                                                            >
                                                                {jenis}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography
                                                                variant="3"
                                                            >
                                                                {total}
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardFooter>
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                            &nbsp;just updated
                        </Typography>
                    </CardFooter>
                </Card>
            </div>

            <div className="mb-12 grid gap-y-10 gap-x-3 md:grid-cols-2 xl:grid-cols-3">
                <Card>
                    <CardBody>
                        <CardHeader
                            options={optionsBatuan}
                            variant="h3"
                        >

                        </CardHeader>
                        <Chart
                            chartType="PieChart"
                            data={dataBatuan}
                            options={optionsBatuan}
                            width={"100%"}
                            height={"400px"}
                        />
                    </CardBody>
                    <CardFooter>
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                            &nbsp;just updated
                        </Typography>
                    </CardFooter>
                </Card>

                <Card>
                    <CardBody>
                        <CardHeader
                            options={optionsFosil}
                            variant="h3"
                        >

                        </CardHeader>
                        <Chart
                            chartType="PieChart"
                            data={dataFosil}
                            options={optionsFosil}
                            width={"100%"}
                            height={"400px"}
                        />
                    </CardBody>
                    <CardFooter>
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                            &nbsp;just updated
                        </Typography>
                    </CardFooter>
                </Card>


                <Card>
                    <CardBody>
                        <CardHeader
                            options={optionsSumberDayaGeologi}
                            variant="h3"
                        >

                        </CardHeader>
                        <Chart
                            chartType="PieChart"
                            data={dataSumberDayaGeologi}
                            options={optionsSumberDayaGeologi}
                            width={"100%"}
                            height={"400px"}
                        />
                    </CardBody>
                    <CardFooter>
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                            &nbsp;just updated
                        </Typography>
                    </CardFooter>
                </Card>

            </div>

            <Card >
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Opeenstreetmap
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <Gis />
                </CardBody>
            </Card>
        </div>
    );
}

export default Home;
