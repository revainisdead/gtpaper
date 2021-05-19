

function findHostUrl() {
    // Ex.
    //  from: http://192.168.1.41:3000/test
    //  to    http://192.168.1.41:3000
    const url = window.location.href

    const loop = () => {
        let count_slash = 0;
        let last_index = 0;

        for (let i = 0; i < url.length; i++) {
            const val = url[i];

            if (val === "/") {
                count_slash += 1;
            }

            if (count_slash === 3) {
                last_index =  i;

                // Instead of having to track variable and use break, use function.
                return last_index;
            }
        }
    }
    const final_index = loop();
    // Add one for inclusive
    const host = url.slice(0, final_index + 1)

    return host;
}
