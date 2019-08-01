

interface DataProps {
  name: string;
  value:number;
}

const maxBottom = 50
const initMin = 10

const getPieBottom = (data:DataProps[], offset=-5):number => {
  let dataLeng = (Array.isArray(data) ? data.filter(i => i&&i.value).map(i => i.name) : []).length
  let bottom = (100-((dataLeng+1)*4.2*2 ))/2 + offset
  return bottom >maxBottom ? maxBottom : bottom < initMin ? initMin : bottom
}

export default getPieBottom