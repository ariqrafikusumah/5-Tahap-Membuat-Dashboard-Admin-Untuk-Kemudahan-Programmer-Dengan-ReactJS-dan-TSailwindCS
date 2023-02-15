const url = "https://sbc-sebatcabut.herokuapp.com";
const [formData, setFormData] = useState({
    id: null,
    no_register: "MGB-00002938",
    no_inventaris: "BSE00000001",
    kode_bmn: "6.06.01.05.005",
    nup_bmn: "0",
    merk_bmn: "Batuan",
    satuan: "Buah",
    kelompok_koleksi: "Batuan",
    jenis_koleksi: "Sedimen",
    sub_jenis_koleksi: "-",
    kode_jenis_koleksi: "BSE",
    ruang_simpan: "Gudang 3",
    lokasi_simpan: "31070101",
    kondisi: "B/Baik",
    nama_koleksi: "Batugamping",
    keterangan: "Batuan Sedimen (Klastik)",
    nama_formasi: "Bojongmanik",
    lokasi_temuan: "Desa Ujungjaya, Kec. Sumur, Kab. Pandeglang",
    koordinat: "Lat/Lon: 6� 49' 31.1268\" S, 105� 28' 35.5764\" E",
    pulau: "Jawa",
    peta: "Geologi",
    lembar_peta: "Ujungkulon",
    skala: "1:100000",
    cara_perolehan: "Penyelidikan geologi",
    tahun_perolehan: "2012",
    kolektor: "mamang garok",
    kepemilikan: "Museum Geologi Bandung",
    operator: "Administrator",
    tanggal_dicatat: "12/12/2022 6:57",
    nilai_perolehan: "-",
    nilai_buku: "-",
    foto: "test.jpg",
    foto_2: "testB.jpg",
    foto_3: "testC.jpg",
});

const [errors, setErrors] = useState({});
const [error, setError] = useState('');
const [id, setId] = useState('');


const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
}
const validate = () => {
    const newErrors = {};
    if (!formData.nup_bmn) {
        newErrors.nup_bmn = "NUP BMN is required";
    }
    return newErrors;
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    // Show SweetAlert2 confirm dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You want to post this data?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, post it!'
    });
    if (result.value, Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        await axios.post(url + '/batuan', formData)
            .then(res => {
                setId('');
                setErrors('');
                // Show success message
                Swal.fire(
                    'Success!',
                    'Your data has been posted.',
                    'success'
                )
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                setError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
                console.log(error);
            });
    }
}