// Doucmentation Material-Tailwind
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FosilTable, SdgTabel } from ".";
import { PencilSquareIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';
import { Document, Page } from 'react-pdf';

export function Tables() {
    // * =======================================
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const handleDelete = async (id) => {
        // Show SweetAlert2 confirm dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.value) {
            try {
                const response = await axios.delete(`http://sbc-sebatcabut.herokuapp.com/batuan/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Clear input and error message
                setId('');
                setError('');
                // Show success message
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                console.log(response);
            } catch (error) {
                setError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
                console.error(error);
            }
        }
    };
    // * =======================================
    const handleUpdate = async (id, data) => {
        try {
            const res = await axios.put(`https://sbc-sebatcabut.herokuapp.com/batuan/${id}`, data);
            // handle successful update
            console.log(res.data);
        } catch (error) {
            // handle error
            console.log(error);
        }
    };
    // * =======================================
    const url = "https://sbc-sebatcabut.herokuapp.com";
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        setisLoading(true);
        // URL Ganti dengan alamat github atau API atau URL API 
        // Method @{get, post, put, patch, delete}
        axios
            .get(url + '/batuans')
            .then((response) => {
                setdata(response.data.data.data);
                console.log(response.data.data.data); // Menampilkan console log
                setisLoading(false);
            })
            .catch((err) => {
                // Jika Gagal
                console.log(err);
                setisError(true);
                setisLoading(false);
            });
    }, []);


    if (isLoading)
        return (
            <div className="grid place-items-center" role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    else if (data && !isError)


        return (
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card>
                    <CardBody className="px-3">
                        <div className="flex">
                            <div className="px-3">Berdasarkan : </div>
                            <div className="flex mx-auto gap-8">
                                <div className="border-4 p-3 rounded-xl bg-blue-500 text-white hover:text-white hover:bg-blue-600 w-52 cursor-pointer">Batuan</div>
                                <div className="border-4 p-3 rounded-xl text-black hover:text-white hover:bg-blue-600 w-52 cursor-pointer">Fosil</div>
                                <div className="border-4 p-3 rounded-xl text-black hover:text-white hover:bg-blue-600 w-52 cursor-pointer">Sumber Daya Geologi</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <form>
                    <div className="flex">
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                        <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                </li>
                            </ul>
                        </div>
                        <div className="relative w-full">
                            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>

                <Card>
                    <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Batuan - 6.06.01.05.005
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-3 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["NO", "NO REGISTER", "NO INVENTARIS", "ALAMAT LENGKAP", "NAMA KOLEKSI", "KODE KOLEKSI AWAL", "LOKASI PENYIMPANAN", "KETERANGAN", "Cetak", "edit", "DELETE", ""].map((el) => (
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

                                {data &&
                                    data.map((item, index) => (
                                        <tr className="border-b border-blue-gray-50 py-3 px-5 text-left" key={item}>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Typography
                                                    variant="3"
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Typography
                                                    variant="3"
                                                >
                                                    {item.no_register}
                                                </Typography>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                {item.no_inventaris}
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                {item.kode_bmn}
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                {item.nama_koleksi}
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                {item.lokasi_simpan}
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                {item.keterangan}
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Button className="flex gap-2" onClick={() => window.print()}><PrinterIcon className="w-5" /> Cetak</Button>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <a href={`batuan_edit/${item.id}`}><Button className="flex gap-2 bg-blue-gray-900" ><PencilSquareIcon className="w-5" />Edit</Button></a>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Button className="flex gap-2 bg-red-900" onClick={() => handleDelete(item.id)}><TrashIcon className="w-5" value={id} onChange={e => setId(e.target.value)} />Delete</Button>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                <Checkbox />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>

                {/* <FosilTable />
          <SdgTabel /> */}
            </div>
        );
}

export default Tables;
