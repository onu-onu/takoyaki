import { Takotsubo } from "takotsubo";

window.onload = () => {
    const dlBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#download');
    const idElem: HTMLInputElement = <HTMLInputElement>document.querySelector('#id');
    const emailElem: HTMLInputElement = <HTMLInputElement>document.querySelector('#email');
    const passwordElem: HTMLInputElement = <HTMLInputElement>document.querySelector('#password');
    const startDateElem: HTMLInputElement = <HTMLInputElement>document.querySelector('#start-date');
    const endDateElem: HTMLInputElement = <HTMLInputElement>document.querySelector('#end-date');

    dlBtn.addEventListener('click', async () => {
        const takotusbo = new Takotsubo();
        try {
            let startDateEpoch: number = new Date(startDateElem.value).valueOf();
            let endDateEpoch: number = new Date(endDateElem.value).valueOf();
            if (startDateEpoch > endDateEpoch) {
                alert('時刻の指定が不正です');
            } else {
                let startDate = `${String(startDateElem.value)}T00:00:00Z`;
                let endDate = `${String(endDateElem.value)}T00:00:00Z`;
                const result = await takotusbo.fetchToken(String(emailElem.value), String(passwordElem.value));
                const data = await takotusbo.fetchData(result.token, String(idElem.value), startDate, endDate);
                const csvString: string = takotusboData2csvString(data);
                await downloadFile(csvString, `takoyaki_${String(startDateElem.value)}_${String(endDateElem.value)}`);
                alert('ダウンロード完了');
            }
        } catch (error) {
            alert('データ取得に失敗しました');
        }
    });
};

function downloadFile(content: string, fileName: string): Promise<Boolean> {
    return new Promise((resolve) => {
        const a = document.createElement("a");
        const file = new Blob([content], { type: 'csv/plain' });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
        resolve(true);
    });
}

function takotusboData2csvString(data: any[]): string {
    let csvString: string = data.map(d => `${d.startAt},${d.value},${d.costEstimate}`)
        .flat()
        .join('\n');
    return `date,power consumption,estimate cost\n${csvString}`;
}