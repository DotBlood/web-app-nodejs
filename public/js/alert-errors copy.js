window.onload = function() {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'success'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    if (matches) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: 'success',
            title: (matches ? decodeURIComponent(matches[1]) : undefined)
        })
        document.cookie = 'success' + '=; Max-Age=0'
    }
}


