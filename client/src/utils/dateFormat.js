
const dateFormat = (date) => {
 
  const splitted = date.split('-')
  const mes = splitted[1]
  const day = splitted[2].slice(0, 2)


  const monthMap = {
    "01": 'Enero',
    "02": 'Feb',
    "03": 'Marzo',
    "04": 'Abril',
    "05": 'Mayo',
    "06": 'Junio',
    "07": 'Julio',
    "08": 'Agosto',
    "09": 'Septiembre',
    "10": 'Octubre',
    "11": 'Noviembre',
    "12": 'Diciembre'
  };


  return `${day} de ${monthMap[mes]}, ${splitted[0]}`
}

module.exports = { dateFormat }
