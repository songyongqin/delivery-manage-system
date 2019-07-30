

interface DataProps {
  name: string;
  value:number;
}

const getPieBottom = (data:DataProps[], offset=-5):number => {
  let dataLeng = (Array.isArray(data) ? data.filter(i => i&&i.value).map(i => i.name) : []).length
  const bottom = (100-((dataLeng+1)*4.2*2 ))/2 + offset

  return bottom
}

export default getPieBottom