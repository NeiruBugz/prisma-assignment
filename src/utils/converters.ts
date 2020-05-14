export const csvConverter = (csv: string) => {
  const lines = csv.split('\n');
  const result: any = [];
  let headers = lines[0].split(',');
  headers = headers.map((header) => header.match(/\w+/)).flat();

  for (let i = 1; i < lines.length - 1; i++) {
    const obj: any = {};
    const currentLine = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j]?.replace(/['"]+/g, '');
    }

    result.push(computeConversion(obj));
  }

  return result;
};

const computeConversion = (obj: any) =>
  Object.assign(obj, { conversion: (Number(obj.trials) / Number(obj.installs)).toFixed(2) });
