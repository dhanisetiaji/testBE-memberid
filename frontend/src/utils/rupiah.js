export const rupiah = (number) => {
    let Rupiah = new Intl.NumberFormat("id-ID", {
        currency: "IDR"
    }).format(number);
    return Rupiah.split(",")[0];
}