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