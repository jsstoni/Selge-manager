import axios from "axios";
const reportes = {
    async reports() {
        const report = await axios({
            method: 'GET',
            url: '/reportes'
        })
        return report.data.resultado;
    },
}
export default reportes;