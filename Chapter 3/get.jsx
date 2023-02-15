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